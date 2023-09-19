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
    text: `Dear Client,\n\nA new task has been created for you. Task details: ${taskData.title}`,
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
  const fileBucket = storage.bucket();

  const filePath = "images/welcome.jpg";

  const [downloadResponse] = await fileBucket.file(filePath).download();

  const pdfBuffer = await generatePDF(event.data.after.data());

  // Upload the PDF to Google Cloud Storage
  const pdfFileName = `task_${event.params.taskId}.pdf`;
  const pdfFile = fileBucket.file(pdfFileName);
  await pdfFile.save(pdfBuffer);

  logger.log("Image downloaded!");

  const taskData = event.data.after.data();
  const taskPrevData = event.data.before.data();

  if (taskData.isCompleted && !taskPrevData.isCompleted) {
    const pdfBuffer = await generatePDF(event.data.after.data());

    // Upload the PDF to Google Cloud Storage
    const pdfFileName = `task_${event.params.taskId}.pdf`;
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
      subject: "New Task Created",
      text: `Dear Client,\n\nYour Task is Completed Task details: ${taskData.title}\n. The Task File is attached herewith`,
      attachments: [
        {
          filename: "welcome.jpg", // The name you want for the attached image
          content: downloadResponse, // The file buffer
        },
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
});

// Function to generate PDF using pdfkit
async function generatePDF(taskData) {
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

    // Add content to the PDF
    doc.text(`Task Title: ${taskData.title}`);
    doc.text(`Task Description: ${taskData.description}`);
    doc.end();
  });
}
