// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const {
  onDocumentCreated,
  onDocumentUpdated,
} = require("firebase-functions/v2/firestore");
const {onSchedule} = require("firebase-functions/v2/scheduler");
const { getStorage,getDownloadURL } = require("firebase-admin/storage");
const nodemailer = require("nodemailer");
const axios = require("axios");
const pdfkit = require("pdfkit");
const moment = require("moment");


// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");



initializeApp();
const storage = getStorage();

exports.technicianArrivesTommorow = onSchedule("every day 16:30",async(event)=>{
  const tomorrow = moment().add(1, "days");
  const tomorrowStart = tomorrow.startOf("day").toDate();
  const tomorrowEnd = tomorrow.endOf("day").toDate();
  const firestore = getFirestore();
  try {
    const tasksSnapshot = await firestore.collection("tasks")
      .where("startDate", ">=", tomorrowStart)
      .where("startDate", "<=", tomorrowEnd)
      .get();

    if (tasksSnapshot.empty) {
      console.log("No tasks scheduled for tomorrow.");
      return null;
    }

    // Create an email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "visitloginfo@gmail.com",
        pass: "tqzb jwnh vkdw zdds",
      },
    });

    tasksSnapshot.forEach((taskDoc) => {
      const taskData = taskDoc.data();
      const clientEmail = taskData.companyEmail;
      // const technicianName = taskData.technicianName;

      const mailOptions = {
        from: "visitloginfo@gmail.com",
        to: clientEmail,
        subject: `Task ${taskData.title}`,
        text: `Hello,

This is a reminder that your technician for the task: ${taskData.title} will arrive tomorrow. Please be ready for their visit.

Thank you,
VisitLog`,
      };

      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.error("Error sending email:", error);
        } else {
          console.log("Email sent:", info.response);
        }
      });
    });

    return null;
  } catch (error) {
    console.error("Error querying Firestore:", error);
    return null;
  }


});


exports.welcomeNewClient = onDocumentCreated(
  "Clients/{clientId}",
  async (event) => {
    const clientData = event.data.data();

    const fileBucket = storage.bucket();

    const filePath = "images/welcome.jpg";

    const [downloadResponse] = await fileBucket.file(filePath).download();

    logger.log("Image downloaded!");

    // Create an email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "visitloginfo@gmail.com",
        pass: "tqzb jwnh vkdw zdds",
      },
    });

    // Compose the welcome email
    const welcomeMailOptions = {
      from: "visitloginfo@gmail.com",
      to: clientData.email,
      subject: "Welcome to Visit Log Engineering Services Company",
      text: `Dear ${clientData.companyName},\n\nWelcome to Visit Log Engineering Services Company. We are excited to have you as our client.`,
      attachments: [
        {
          filename: "welcome.jpg", // The name you want for the attached image
          content: downloadResponse, // The file buffer
        },
      ],
    };

    transporter.sendMail(welcomeMailOptions, (error, info) => {
      if (error) {
        console.log("Error sending welcome email:", error);
      } else {
        console.log("Welcome email sent: " + info.response);
      }
    });
  }
);

//This Function Accounts for Task Creation

exports.sendTaskEmail = onDocumentCreated("Tasks/{taskId}", (event) => {
  const taskData = event.data.data();

  // Create an email transporter
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "visitloginfo@gmail.com",
      pass: "tqzb jwnh vkdw zdds",
    },
  });

  // Compose the task notification email
  const taskMailOptions = {
    from: "visitloginfo@gmail.com",
    to: taskData.companyEmail, // Assuming you store the client's email in the task document.
    subject: `Task ${taskData.title}`,
    text: `Dear Client,\n\nA new task has been created for you. 
    \n\nTask : ${taskData.title}\nDescription:${taskData.description}`,
  };

  transporter.sendMail(taskMailOptions, (error, info) => {
    if (error) {
      console.log("Error sending task notification email:", error);
    } else {
      console.log("Task notification email sent: " + info.response);
    }
  });
});
//This Function Accounts For 3 state Transitions of a task
// 1. Arrival of a Technician
// 2. Completion of a Task by a technician
// 3. Verification of a Task by the admin

exports.taskCompletion = onDocumentUpdated("Tasks/{taskId}", async (event) => {
  const taskData = event.data.after.data();
  const taskPrevData = event.data.before.data();

  // 2. Completion of a Task by a technician
  if (taskData.isCompleted && !taskPrevData.isCompleted) {
    const fileBucket = storage.bucket();

    const filePath = "images/logo.jpg";

    const [downloadResponse] = await fileBucket.file(filePath).download();

    logger.log("Image downloaded!");
    const imageBuffers = [];
    if (taskData.imageUrls) {
      for (const url of taskData.imageUrls) {
        // Make sure to use 'const' with 'for...of'
        try {
          const response = await axios.get(url, {
            responseType: "arraybuffer",
          });
          const imageBuffer = Buffer.from(response.data);
          imageBuffers.push(imageBuffer);
        } catch (error) {
          console.error("Error downloading image:", error);
        }
      }
    }

    const pdfBuffer = await generateTechnicianPDF(
      event.data.after.data(),
      downloadResponse,
      imageBuffers
    );

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes
    const formattedDate = currentDate.toLocaleString().replace(/\//g, "_");

    // Upload the PDF to Google Cloud Storage
    const pdfFileName = `taskReports/task_/Technician_Copies/${taskData.company}_${taskData.title}_${formattedDate}.pdf`;
    const pdfFile = fileBucket.file(pdfFileName);
    await pdfFile.save(pdfBuffer);

    const url = await getDownloadURL(pdfFile);
    
    

    // Update the Firestore document with the technicianReportUrl
    const firestore = getFirestore();
    const taskRef = firestore.doc(`Tasks/${event.params.taskId}`);

    try {
      await taskRef.update({
        technicianReportUrl: url,
      });
    } catch (error) {
      console.error("Error updating Firestore document:", error);
    }
    notification={
      'body':`Technician Completed the task: ${taskData.title}`,
      'isRead':false
    }
    const notificationCollectionRef = firestore.collection("Notifications")
    notificationCollectionRef.add(notification);

    // Create an email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "visitloginfo@gmail.com",
        pass: "tqzb jwnh vkdw zdds",
      },
    });

    // Compose the task notification email
    const taskMailOptions = {
      from: "visitloginfo@gmail.com",
      to: taskData.companyEmail, // Assuming you store the client's email in the task document.
      subject: `Task ${taskData.title}`,
      text: `Dear Client,\n\nYour Task is Completed Task details: ${taskData.title}\n. The Task File is attached herewith`,
      attachments: [
        {
          filename: pdfFileName,
          content: pdfBuffer, // Attach the PDF buffer
        },
      ],
    };

    transporter.sendMail(taskMailOptions, (error, info) => {
      if (error) {
        console.log("Error sending task notification email:", error);
      } else {
        console.log("Task notification email sent: " + info.response);
      }
    });
  }
  // 1. Arrival of a Technician
  else if (taskData.isArrived && !taskPrevData.isArrived) {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes
    const formattedDate = currentDate.toLocaleString();

    const firestore = getFirestore();
    
    notification={
      'body':`Technician Arrived for the task: ${taskData.title}`,
      'isRead':false
    }
    
    const notificationCollectionRef = firestore.collection("Notifications")
    notificationCollectionRef.add(notification);

    // Create an email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "visitloginfo@gmail.com",
        pass: "tqzb jwnh vkdw zdds",
      },
    });

    // Compose the task notification email
    const taskMailOptions = {
      from: "visitloginfo@gmail.com",
      to: taskData.companyEmail, // Assuming you store the client's email in the task document.
      subject: `Task ${taskData.title}`,
      text: `Dear Client,\n\nYour Technician is arrived at your location for the following task: ${taskData.title}\n. 
      Arrival Date and Time: ${formattedDate} `,
    };

    transporter.sendMail(taskMailOptions, (error, info) => {
      if (error) {
        console.log("Error sending task notification email:", error);
      } else {
        console.log("Task notification email sent: " + info.response);
      }
    });

    //3. Upon Verification By Admin
  } else if (taskData.isArrived && !taskPrevData.isArrived) {
    const fileBucket = storage.bucket();

    const filePath = "images/logo.jpg";

    const [downloadResponse] = await fileBucket.file(filePath).download();

    logger.log("Image downloaded!");

    const pdfBuffer = await generateClientPDF(
      event.data.after.data(),
      downloadResponse
    );

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes
    const formattedDate = currentDate.toLocaleString().replace(/\//g, "_");

    // Upload the PDF to Google Cloud Storage
    const pdfFileName = `taskReports/task_/Client_Copies/${taskData.company}_${taskData.title}_${formattedDate}.pdf`;
    const emailFileName = `${taskData.company}_${taskData.title}_${formattedDate}.pdf`;
    const pdfFile = fileBucket.file(pdfFileName);
    
    await pdfFile.save(pdfBuffer);
    // Create an email transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "visitloginfo@gmail.com",
        pass: "tqzb jwnh vkdw zdds",
      },
    });

    // Compose the task notification email
    const taskMailOptions = {
      from: "visitloginfo@gmail.com",
      to: taskData.companyEmail, // Assuming you store the client's email in the task document.
      subject: `Task ${taskData.title}`,
      text: `Dear Client,\n\nYour Task is Completed Task details: ${taskData.title}\n. The Task File is attached herewith`,
      attachments: [
        {
          filename: emailFileName,
          content: pdfBuffer, // Attach the PDF buffer
        },
      ],
    };

    transporter.sendMail(taskMailOptions, (error, info) => {
      if (error) {
        console.log("Error sending task notification email:", error);
      } else {
        console.log("Task notification email sent: " + info.response);
      }
    });
  }
});

// Function to generate PDF using pdfkit
async function generateTechnicianPDF(taskData, logo, imageBuffers) {
  return new Promise((resolve, reject) => {
    const pdfBuffer = [];
    const doc = new pdfkit();

    // Pipe the PDF content into a buffer
    doc.on("data", (chunk) => {
      pdfBuffer.push(chunk);
    });

    doc.on("end", () => {
      resolve(Buffer.concat(pdfBuffer));
    });

    // doc.image(logo,10,10);

    // Set font and size for the PDF
    doc.font("Helvetica-Bold");
    doc.fontSize(18);
    // Add a watermark
    doc.fillOpacity(0.3); // Reduce opacity for the watermark
    doc.fontSize(38); // Adjust font size for the watermark
    doc.moveDown();
    

    doc.text("     VISIT LOG SERVICES", {
      align: "center",
      valign: "center",
      opacity: 0.2, // Adjust opacity as needed
      width: 400, // Adjust width as needed
      height: 200, // Adjust height as needed
      angle: 45, // Adjust angle as needed
    });
    doc.fillOpacity(1); // Reset opacity to default
    doc.fontSize(12); // Reset font size to default

    // Add the company logo
    doc.image(logo, 10, 10, { width: 100 }); // Adjust position and width as needed

    // Add a title to the PDF
    doc.text("Task Completion Report - Technician Copy", { align: "center" });

    // Set font and size for the client details
    doc.font("Helvetica");
    doc.fontSize(12);

    // Add client details
    doc.text(`Client Name: ${taskData.company}`);
    doc.text(`Client Email: ${taskData.companyEmail}`);
    doc.text(`Client Address: ${taskData.address}`);

    // Add task details
    doc.text(`Task Title: ${taskData.title}`);
    doc.text(`Task Description: ${taskData.description}`);

    const jsDate = taskData.startDate.toDate();

    // Format the JavaScript Date object as a string (e.g., "YYYY-MM-DD HH:MM:SS")
    const formattedStartDate = `${jsDate.getFullYear()}-${String(
      jsDate.getMonth() + 1
    ).padStart(2, "0")}-${String(jsDate.getDate()).padStart(2, "0")} ${String(
      jsDate.getHours()
    ).padStart(2, "0")}:${String(jsDate.getMinutes()).padStart(
      2,
      "0"
    )}:${String(jsDate.getSeconds()).padStart(2, "0")}`;

    doc.text(`Start Date: ${formattedStartDate}`);
    doc.text(`Is Completed: ${taskData.isCompleted ? "Yes" : "No"}`);
    doc.moveDown();
    doc.moveDown();
    if (imageBuffers.length > 0) {
      const imageWidth = 240; // Adjust the width of each image as needed
      const imagesPerRow = 2; // Number of images per row
      let imagesInCurrentRow = 0;

      let yRef = doc.y
    
      for (const image of imageBuffers) {
        if (imagesInCurrentRow >= imagesPerRow) {
          
          imagesInCurrentRow = 0;
          doc.moveDown()
          yRef = doc.y
          
        }
    
        doc.image(image, (imagesInCurrentRow * (imageWidth+10)) + 20, yRef, {fit: [imageWidth,imageWidth], align: 'center', valign: 'center'});
    
        imagesInCurrentRow++;
    
        // // Check if there's space for more images in the current row
        // if (imagesInCurrentRow < imagesPerRow) {
          
        //   doc.moveUp(); // Move up to the same line as the previous image
          

        // } else {
        //   doc.moveDown(); // Move down to the next row

        //   yRef = doc.y
        // }
      }
    }
    

    // Add a line break
    doc.moveDown();
    

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes
    const formattedDate = currentDate.toLocaleString();

    // Add a footer with the current date
    doc.text(`Report generated on: ${formattedDate}`, {
      align: "right",
      y: doc.page.height, // Adjust the Y-coordinate to position the footer as desired
    });

    doc.end();
  });
}
// Function to generate PDF using pdfkit
async function generateClientPDF(taskData, logo) {
  return new Promise((resolve, reject) => {
    const pdfBuffer = [];
    const doc = new pdfkit();

    // Pipe the PDF content into a buffer
    doc.on("data", (chunk) => {
      pdfBuffer.push(chunk);
    });

    doc.on("end", () => {
      resolve(Buffer.concat(pdfBuffer));
    });

    // doc.image(logo,10,10);

    // Set font and size for the PDF
    doc.font("Helvetica-Bold");
    doc.fontSize(18);
    // Add a watermark
    doc.fillOpacity(0.3); // Reduce opacity for the watermark
    doc.fontSize(38); // Adjust font size for the watermark
    doc.text("VISIT LOG SERVICES", {
      align: "center",
      valign: "center",
      opacity: 0.2, // Adjust opacity as needed
      width: 400, // Adjust width as needed
      height: 200, // Adjust height as needed
      angle: 45, // Adjust angle as needed
    });
    doc.fillOpacity(1); // Reset opacity to default
    doc.fontSize(12); // Reset font size to default

    // Add the company logo
    doc.image(logo, 10, 10, { width: 100 }); // Adjust position and width as needed

    // Add a title to the PDF
    doc.text("Task Completion Report", { align: "center" });

    // Set font and size for the client details
    doc.font("Helvetica");
    doc.fontSize(12);

    // Add client details
    doc.text(`Client Name: ${taskData.company}`);
    doc.text(`Client Email: ${taskData.companyEmail}`);
    doc.text(`Client Address: ${taskData.address}`);

    // Add task details
    doc.text(`Task Title: ${taskData.title}`);
    doc.text(`Task Description: ${taskData.description}`);

    const jsDate = taskData.startDate.toDate();

    // Format the JavaScript Date object as a string (e.g., "YYYY-MM-DD HH:MM:SS")
    const formattedStartDate = `${jsDate.getFullYear()}-${String(
      jsDate.getMonth() + 1
    ).padStart(2, "0")}-${String(jsDate.getDate()).padStart(2, "0")} ${String(
      jsDate.getHours()
    ).padStart(2, "0")}:${String(jsDate.getMinutes()).padStart(
      2,
      "0"
    )}:${String(jsDate.getSeconds()).padStart(2, "0")}`;

    doc.text(`Start Date: ${formattedStartDate}`);
    doc.text(`Is Completed: ${taskData.isCompleted ? "Yes" : "No"}`);

    // You can include additional task-related details here

    // Add a line break
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();
    doc.moveDown();

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes
    const formattedDate = currentDate.toLocaleString();

    // Add a footer with the current date
    doc.text(`Report generated on: ${formattedDate}`, {
      align: "right",
      y: doc.page.height, // Adjust the Y-coordinate to position the footer as desired
    });

    doc.end();
  });
}
