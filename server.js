const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');
const Billing = require('./models/Billing'); // The Billing model you created

const app = express();
const port = 3000;

mongoose.connect('mongodb://localhost/billingdb', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Route to handle form submission
app.post('/submit-billing', async(req, res) => {
    try {
        const { firstName, lastName, phoneNumber, email, address, address2, country, state, zip } = req.body;

        // Save billing information in the database
        const billing = new Billing({
            firstName,
            lastName,
            phoneNumber,
            email,
            address,
            address2,
            country,
            state,
            zip,
        });
        await billing.save();

        // Send a confirmation email (optional)
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'your-email@gmail.com', // Your email
                pass: 'your-email-password', // Your email password or app password
            },
        });

        const mailOptions = {
            from: 'your-email@gmail.com',
            to: email,
            subject: 'Billing Information Submitted',
            text: `Hello ${firstName} ${lastName}, your billing information has been received. Thank you for your submission.`,
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                console.log(error);
            } else {
                console.log('Email sent: ' + info.response);
            }
        });

        res.send('Billing information submitted successfully!');
    } catch (error) {
        res.status(500).send('Error occurred: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});