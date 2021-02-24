const functions = require("firebase-functions");
const admin = require("firebase-admin");

const nodemailer = require("nodemailer");
const cors = require("cors")({origin: true});
admin.initializeApp();

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your Email Address",
    pass: "Your Email Password",
  },
});
exports.sendMail = functions.https.onRequest((req, res) => {
  cors(req, res, () => {
    const dest = req.query.dest;

    const mailOptions = {
      from: "Your Name",
      to: dest,
      subject: "This is Demo mail!!!",
      html: `<p style="font-size: 16px;">Demo Successfull!!</p>
                <br />
            `,
    };
    return transporter.sendMail(mailOptions, (erro, info) => {
      if (erro) {
        return res.send(erro.toString());
      }
      return res.send("Sended");
    });
  });
});
