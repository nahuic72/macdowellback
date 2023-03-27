const { response } = require('express');
const nodemailer = require('nodemailer');
const PdfMailManager = require('../../models/pdfMail');



const postEmailOrder = async ({id}) => {
    
    const email = await PdfMailManager.getEmail(id)

    // Notificación de formulario - cliente.
    let notificaciones = [
        {
            subject: "Te enviamos tu ticket",
            titulo : `Ticket de compra numero: ${id}`,
            notificacion: "Gracias por su compra en McDowell."
        }
    ]

     // Plantilla de correo
     const fs = require("fs");
     const ubicacionPlantilla = require.resolve("../../html/email.html");
     let contenidoHtml = fs.readFileSync(ubicacionPlantilla, 'utf8');
     contenidoHtml = contenidoHtml.replace("{{titulo}}", notificaciones[0].titulo);
     contenidoHtml = contenidoHtml.replace("{{notificacion}}", notificaciones[0].notificacion);
     
           
    // Configurar el correo electrónico
    var transport = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: process.env.USERMAIL,
            pass: process.env.PASSMAIL,
        }
    });


    let info = await transport.sendMail({
        from: '"McDowell Proyecto" <mcdowellproyecto@gmail.com>', 
        to: `${email}`,
        subject: `Envio ticket numero: ${id}`,
        html: contenidoHtml,
       attachments: [
            {
                filename: `ticket_${id}.pdf`,
                path: `./pdf/ticket_${id}.pdf`,
                cid: 'ticket' 
            },
            {
                filename: 'McDowell.png',
                path: './public/images/McDowell.png',
                cid: 'McDowell' 
                }
            ] 
    });
};



module.exports = { postEmailOrder };