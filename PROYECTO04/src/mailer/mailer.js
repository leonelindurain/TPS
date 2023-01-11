const dotenv = require('dotenv').config() // 1

var nodemailer = require('nodemailer');
const NODEMAILER_PASS = process.env.NODEMAILER_PASS
const NODEMAILER_MAIL = process.env.NODEMAILER_MAIL

const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 587,
    auth: {
        user: NODEMAILER_MAIL,
        pass: NODEMAILER_PASS
    }
});

const mailer = async (mailOptions) => {
    try {
        const info = await transporter.sendMail(mailOptions)
        logger.info(info)
    } catch (error) {
        logger.error(error)
    }
}


const mailerSendOrder = (products, email) => {
    const sendOrderMessage = `
                        <div style="width:500px">
                        <p>Nuevo pedido del usuario:</p>
                        <h3>${email}</h3>
                        <table style="text-align: center; border-collapse: collapse;width: 100%">
                        
                        <thead>
                            <tr>
                                <th>Titulo</th>
                                <th>Precio</th>
                                <th>Cantidad</th>
                                <th>Imagen</th>
                            </tr>
                        </thead>
                        <tbody>`+
                            products.map((el, index) => `
                            <tr>
                                <td>${el.description}</td>
                                <td>$ ${el.price}</td>
                                <td>${el.quantity}</td>
                                <td>
                                    <img src=${el.thumbnail} style="width: 50px;height: 50px"/>
                                </td>
                            </tr>`
                            ).join('')
                            +`</tbody>
                            
                          </table>
                
                        </div>
                          `

    const mailOptions = {
        from: 'MaraArtesanias',
        to: process.env.MAIL_ADMIN,
        subject: `Nueva Orden de Compra de: ${email}`,
        html: sendOrderMessage
        // html: '<h1 style="color: blue;">Contenido de prueba desde <span style="color: green;">Node.js con Nodemailer</span></h1>'
    }

    mailer(mailOptions)
}


module.exports = { mailer, mailerSendOrder }