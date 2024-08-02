const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cron = require('node-cron');
const nodemailer = require('nodemailer');

const app = express();
app.use(bodyParser.json()); // Middleware to parse JSON request bodies

const PORT = process.env.PORT || 3018; // Port for the server
const MONGO_URI = 'mongodb://127.0.0.1:27017/API'; // MongoDB connection URI

// Connection to MongoDB
mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error('MongoDB connection error:', err));

// Defined schema for the Email model
const emailSchema = new mongoose.Schema({
    recipient: { type: String, required: true }, // Email recipient address
    subject: { type: String, required: true }, // Email subject
    body: { type: String, required: true }, // Email body content
    scheduleTime: { type: Date, required: true }, // Date and time when the email should be sent
    recurring: {
        frequency: { type: String, enum: ['daily', 'weekly', 'monthly', 'quarterly'] }, // Frequency of recurrence
        time: { type: String }, // Time of the day in HH:MM format
        day: { type: String }, //  Day of the week or month
    },
    attachments: [String], // List of attachment file paths
});

const Email = mongoose.model('Email', emailSchema);

// Creating a transporter object for sending emails using Nodemailer
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'yatripatel0101@gmail.com',
        pass: 'yatriroad',
    },
});

// Function to send an email
const sendEmail = async (email) => {
    const mailOptions = {
        from: 'yatripatel0101@gmail.com',
        to: email.recipient,
        subject: email.subject,
        text: email.body,
        attachments: email.attachments.map((attachment) => ({ path: attachment })),
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
    }
};

// Function to schedule a one-time email
const scheduleEmail = (email) => {
    const date = new Date(email.scheduleTime);
    const cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${date.getMonth() + 1} *`;

    cron.schedule(cronTime, () => {
        sendEmail(email);
    });
};

// Function to schedule a recurring email
const scheduleRecurringEmail = (email) => {
    const date = new Date(email.scheduleTime);
    let cronTime;

    switch (email.recurring.frequency) {
        case 'daily':
            cronTime = `${date.getMinutes()} ${date.getHours()} * * *`;
            break;
        case 'weekly':
            const dayOfWeek = date.getDay();
            cronTime = `${date.getMinutes()} ${date.getHours()} * * ${dayOfWeek}`;
            break;
        case 'monthly':
            const dayOfMonth = date.getDate();
            cronTime = `${date.getMinutes()} ${date.getHours()} ${dayOfMonth} * *`;
            break;
        case 'quarterly':
            const month = date.getMonth() + 1;
            cronTime = `${date.getMinutes()} ${date.getHours()} ${date.getDate()} ${month} */3`;
            break;
        default:
            throw new Error('Invalid recurring frequency');
    }

    cron.schedule(cronTime, () => {
        sendEmail(email);
    });
};

// Route to schedule a new email
app.post('/schedule-email', async (req, res) => {
    const { recipient, subject, body, scheduleTime, recurring, attachments } = req.body;

    // Convert scheduleTime to a Date object and validate it
    let scheduleDate = new Date(scheduleTime);
    if (isNaN(scheduleDate.getTime())) {
        return res.status(400).send({ error: 'Invalid scheduleTime format' });
    }

    const newEmail = new Email({ recipient, subject, body, scheduleTime: scheduleDate, recurring, attachments });
    try {
        await newEmail.save();

        if (!recurring) {
            scheduleEmail(newEmail);
        } else {
            scheduleRecurringEmail(newEmail);
        }

        res.status(201).send(newEmail);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Route to get all scheduled emails
app.get('/scheduled-emails', async (req, res) => {
    try {
        const emails = await Email.find();
        res.status(200).send(emails);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Route to get a specific email by ID
app.get('/scheduled-emails/:id', async (req, res) => {
    try {
        const email = await Email.findById(req.params.id);
        if (!email) {
            return res.status(404).send({ error: 'Email not found' });
        }
        res.status(200).send(email);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Route to delete a specific email by ID
app.delete('/scheduled-emails/:id', async (req, res) => {
    try {
        const result = await Email.findByIdAndDelete(req.params.id);
        if (!result) {
            return res.status(404).send({ error: 'Email not found' });
        }
        res.status(204).send();
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

// Route for the root endpoint
app.get('/', (req, res) => {
    res.send('Email Scheduling API is running');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
