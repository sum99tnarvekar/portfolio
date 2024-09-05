require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');


const app = express();
app.use(express.json());
app.use(cors())

app.post('/api/send-mail', async (req, res) => {
    const { name, email, phone, subject, message } = req.body;

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: "zippo5128@gmail.com",
            pass: "zoyenibekfedqzig",
        },
    });

    const mailOptions = {
        from: email,
        to: "zippo5128@gmail.com",
        subject: `New Contact Form Submission: ${subject}`,
        text: `
            Name: ${name}
            Email: ${email}
            Phone: ${phone}
            Message: ${message}
        `,
    };

    try {
        await transporter.sendMail(mailOptions);
        res.status(200).send('Email sent successfully');
    } catch (error) {
        console.error('Error sending email:', error);
        res.status(500).send('Failed to send email');
    }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
