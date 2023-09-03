import mercadopago from "mercadopago";
import config from "../config/config.js";

export default class PaymentController {
  createOrder = async (req, res) => {
    mercadopago.configure({
      access_token: config.mp.testToken,
    });
    try {
      const result = await mercadopago.preferences.create({
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
        notification_url:
          "https://b317-2803-9800-b015-7d41-9048-7d1-2a96-cd41.ngrok.io/api/payment/webhook",
      });
      console.log(result);
    } catch (error) {
      console.log(error);
    }

    res.send("Hello create order");
  };
  successPayment = async (req, res) => {
    res.send("Hello success payment");
  };
  failurePayment = async (req, res) => {
    res.send("Hello failure payment");
  };
  pendingPayment = async (req, res) => {
    res.send("Hello pending payment");
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
