const nodemailer = require('nodemailer')



const sendEmailCheckout = async (email, uniqueString) => {
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
          height:100px;" src='https://franchiseconceptsinc.com/chicagopictureframes/wp-content/uploads/sites/50/2020/12/Thanks-For-Shopping-With-Us.jpg' alt='logo Hexagon'/>
          
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

exports.sendEmail = () => sendEmailCheckout()