const nodemailer = require('nodemailer')



const createTrans = () => {
    const transport = nodemailer.createTransport({
        host: "nmtp.mailtrap.io",
        port:2525,
        auth: {
            user:"34df9fdcb3c5fc",
            pass:"544856435bc4f7"
        }
    });
    return transport;
}

const sendMail = async () => {
    const transporter = createTrans()
    const info = await transporter.sendMail({
        from: '"Fred Foo" <foo@example.com>',
        to: "bar@example.com, baz@example.com",
        subject:"hello tacataca",
        html:"<b>hello world</b>"
    });
    console.log("message sent: %s", info.messageId);

    return
}

exports.sendMail = () => sendMail()