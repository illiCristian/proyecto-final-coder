import mercadopago from "mercadopago";
import config from "../config/config.js";
import CartController from "./cart.controller.js";

const cartController = new CartController();
export default class PaymentController {
  createOrder = async (req, res) => {
    const cartId = req.params.cid;
    const userEmail = req.session.user.email;

    const items = await cartController.purchaseMp(cartId, userEmail);
    console.log(items);
    mercadopago.configure({
      access_token: config.mp.testToken,
    });
    try {
      let preference = {
        items: [items],
        back_urls: {
          success: "http://localhost:8080/api/payment/success",
          failure: "/api/payment/failure",
          pending: "/api/payment/pending",
        },
        auto_return: "approved",
      };

      mercadopago.preferences
        .create(preference)
        .then(function (response) {
          res.json({
            id: response.body.id,
          });
        })
        .catch(function (error) {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  successPayment = async (req, res) => {
    res.send(
      "Pago aprobado exitoxamente, recibira un mail con los datos de la compra "
    );
  };
  failurePayment = async (req, res) => {
    res.send(" failure payment");
  };
  pendingPayment = async (req, res) => {
    res.send(" pending payment");
  };
  webhook = async (req, res) => {
    const payment = req.query;
    try {
      if (payment.type === "payment") {
        console.log(payment);
        const data = await mercadopago.payment.findById(req.query["data.id"]);
        console.log(data);
      }
      res.status(200).json({ message: "ok" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: error.message });
    }

    res.send("Hello webhook");
  };
}

/*       const result = await mercadopago.preferences.create({
        items: [
          {
            title: "Mi producto",
            unit_price: 100,
            quantity: 1,
            currency_id: "ARS",
          },
        ],
        back_urls: {
          success: "/api/payment/success",
          failure: "/api/payment/failure",
          pending: "/api/payment/pending",
        },
        auto_return: "approved",
        notification_url:
          "https://b317-2803-9800-b015-7d41-9048-7d1-2a96-cd41.ngrok.io/api/payment/webhook",
      });
      
      console.log(result); */
