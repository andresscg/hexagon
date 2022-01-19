const nodemailer = require("nodemailer")

const sendEmail = async (email, uniqueString) => {
  console.log(email)
  console.log(uniqueString)

  const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: "useremailverifyhexagon@gmail.com",
      pass: "Hexagon2022",
    },
    tls: {
      rejectUnauthorized: false,
    },
  })

  let sender = "useremailverifyHexagon@gmail.com"
  let mailOptions = {
    from: sender,
    to: email,
    subject: "User email verification ",
    html: `
      <div>
          <img style="display: block;
          margin-left: auto;
          margin-right: auto;
          width: 100px;
          " src='https://i.imgur.com/GjurQqE.png' alt='logo Hexagon'/>
          <h2 style="text-align:center;  font-size: 1.5rem;">Thank you for registering with us!</h2>
          <p style="text-align:center">With your account you can: Buy, comment, give Likes</p>
          <p style="text-align:center; font-size: 1.2rem;">Please, to verify your email, click <a href=https://hexagon-techstore.herokuapp.com/api/verify/${uniqueString}>aqui</a></p>
      </div>`,
  }
  await transporter.sendMail(mailOptions, function (error, response) {
    if (error) {
      console.log(error)
    } else {
      console.log("Mensaje enviado")
    }
  })
}

exports.sendEmail = sendEmail
