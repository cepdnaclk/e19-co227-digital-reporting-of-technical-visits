// The Cloud Functions for Firebase SDK to create Cloud Functions and triggers.
const { logger } = require("firebase-functions");
const { onRequest } = require("firebase-functions/v2/https");
const {
  onDocumentCreated,
  onDocumentUpdated,
} = require("firebase-functions/v2/firestore");
const { getStorage } = require("firebase-admin/storage");
const nodemailer = require("nodemailer");

const pdfkit = require("pdfkit");

// The Firebase Admin SDK to access Firestore.
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");

initializeApp();
const storage = getStorage();

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
    subject: "New Task Created",
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

exports.taskCompletion = onDocumentUpdated("Tasks/{taskId}", async (event) => {
  const taskData = event.data.after.data();
  const taskPrevData = event.data.before.data();

  if (taskData.isCompleted && !taskPrevData.isCompleted) {
    const fileBucket = storage.bucket();

    const filePath = "images/logo.jpg";

    const [downloadResponse] = await fileBucket.file(filePath).download();

    logger.log("Image downloaded!");

    const pdfBuffer = await generatePDF(
      event.data.after.data(),
      downloadResponse
    );

    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes
    const formattedDate = currentDate.toLocaleString().replace(/\//g, "_");

    // Upload the PDF to Google Cloud Storage
    const pdfFileName = `taskReports/task_${taskData.company}_${taskData.title}_${formattedDate}.pdf`;
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
      subject: "Task Completed",
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

  if (taskData.isArrived && !taskPrevData.isArrived) {
    const currentDate = new Date();
    currentDate.setHours(currentDate.getHours() + 5); // Add 5 hours
    currentDate.setMinutes(currentDate.getMinutes() + 30); // Add 30 minutes
    const formattedDate = currentDate.toLocaleString();

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
      subject: "Technician Arrived",
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
  }
});

// Function to generate PDF using pdfkit
async function generatePDF(taskData, logo) {
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
    doc.fontSize(48); // Adjust font size for the watermark
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
