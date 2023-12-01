const express = require('express');
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(express.static('./'));
app.get('/bootstrap/css/bootstrap.min.css', (req, res) => {
    res.type('text/css');
    res.sendFile(__dirname + '/node_modules/bootstrap/dist/css/bootstrap.min.css');
});

app.post('/send-email', (req, res) => {
    const { toEmail, title, body } = req.body;

    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'cherish0rihyun@gmail.com',
            pass: 'fwho cgee woze lcan',
        },
    });

    const mailOptions = {
        from: 'cherish0rihyun@gmail.com',
        to: toEmail,
        subject: title,
        text: body,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('이메일 전송 중 오류 발생:', error);
            res.status(500).json({ success: false, error: '이메일 전송 중 오류 발생' });
        } else {
            console.log('이메일 전송 성공:', info.response);
            res.json({ success: true, message: '이메일이 성공적으로 전송되었습니다.' });
        }
    });
});

app.listen(port, () => {
    console.log(`서버가 http://localhost:${port} 포트에서 실행 중입니다.`);
});
