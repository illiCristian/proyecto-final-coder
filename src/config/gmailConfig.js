import nodemailer from "nodemailer";
import config from "./config.js";

const adminEmail = config.gmail.adminAccount;
const adminPass = config.gmail.adminPass;

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  auth: {
    user: adminEmail,
    pass: adminPass,
  },
  secure: false,
  tls: {
    rejectUnauthorized: false,
  },
});

export const sendRecoveryPass = async (userEmail, token) => {
  const link = `/resetpassword?token=${token}`;
  try {
    const res = await transporter.sendMail({
      from: adminEmail,
      to: userEmail,
      subject: "Restablecer contraseña",
      html: `
        <div>
        <h2>Has solicitado un cambio de contraseña.</h2>
        <p>Da clic en el siguiente enlace para restableces la contraseña</p>
        <a href="${link}">
        <button> Restablecer contraseña </button>
        </a>        
        </div>
        `,
    });
    console.log(res);
  } catch (error) {
    console.log(error);
  }
};

export const sendContactEmail = async (userEmail) => {
  try {
    const res = await transporter.sendMail({
      from: adminEmail,
      to: userEmail,
      subject: "Contacto",
      html: `
        <div>
        <h2>Has solicitado un contacto  .</h2>
        <p>Uno de nuestros representastes le contactara en breve</p>
        <p>Gracias por confiar en nosotros</p>      
        </div>
        `,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sendNotifyMail = async (userEmail) => {
  try {
    const res = await transporter.sendMail({
      from: adminEmail,
      to: userEmail,
      subject: "Contacto",
      html: `
        <div>
        <h2>Notificacion de ecommerce  .</h2>
        <p>Debido a la inactividad, su cuenta fue borrada de nuestra base de datos</p>
        <p>Si desea volver a reactivar la cuenta lo invitamos a contactarse con nosotros </p>      
        </div>
        `,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};
export const sendNotifyMailProduct = async (userEmail) => {
  try {
    const res = await transporter.sendMail({
      from: adminEmail,
      to: userEmail,
      subject: "Contacto",
      html: `
        <div>
        <h2>Notificacion de ecommerce  .</h2>
        <p>Debido a la inactividad, su producto fue borrado de nuestra base de datos</p>
        <p>Si desea volver a reactivar el producto lo invitamos a contactarse con nosotros </p>      
        </div>
        `,
    });
    return res;
  } catch (error) {
    console.log(error);
  }
};

export const sendPurchaseEmail = async (
  userEmail,
  totalAmount,
  newTicket,
  productos
) => {
  try {
    await transporter.sendMail({
      from: "CodersHouse",
      to: userEmail,
      subject: "Compra realizada",
      html: `
      <h1>Compra realizada con exito!</h1>  <br>
      <p>Gracias por confiar en nosotros</p><br>
      <p>Detalles de la compra:</p><br>
      Codigo de compra: ${newTicket.code}<br>
      Comprador: ${newTicket.purcharser}<br>
      Productos: ${productos}<br>
      Monto total: ${newTicket.amount}<br>
      <strong>Monto total</strong>: ${totalAmount}<br>`,
    });
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
};
export default transporter;
