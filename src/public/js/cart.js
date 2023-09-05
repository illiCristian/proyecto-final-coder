const spinner = document.getElementById("spinner");

function increaseQuantity(index) {
  const quantityElement = document.getElementById(`quantity${index}`);
  const currentQuantity = parseInt(quantityElement.textContent);
  quantityElement.textContent = currentQuantity + 1;
}

function decreaseQuantity(index) {
  const quantityElement = document.getElementById(`quantity${index}`);
  const currentQuantity = parseInt(quantityElement.textContent);
  if (currentQuantity > 0) {
    quantityElement.textContent = currentQuantity - 1;
  }
}

const deleteButton = document.getElementById("deleteProduct");
async function deleteProduct(productId) {
  spinner.style.display = "block";
  try {
    const res = await fetch("/api/session/current");
    const userData = await res.json();
    const cartId = userData.payload.cart;
    const response = await fetch(
      `/api/cartsDb/${cartId}/product/${productId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const data = await response.json();
    spinner.style.display = "none";
    location.reload();
  } catch (error) {
    console.log(error);
  }
}
/* deleteProduct.addEventListener("click", async () => {
  try {
    const response = await fetch("/api/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.log(error);
  }
}); */

const cartCheckout = document.getElementById("checkout");
cartCheckout.addEventListener("click", async () => {
  try {
    spinner.style.display = "block";
    const response = await fetch("/api/session/current");
    const data = await response.json();
    const cartId = data.payload.cart;
    const purchaseResponse = await fetch(`/api/cartsdb/${cartId}/purchase`);
    const purchaseData = await purchaseResponse.json();
    spinner.style.display = "none";
    if (purchaseData.status === "success") {
      Swal.fire({
        position: "center",
        icon: "success",
        title:
          "Compra realizada con exito, recibiras un mail con los datos de la compra",
        showConfirmButton: false,
        timer: 1500,
      });
      location.replace("/");
    }
  } catch (error) {
    console.log(error);
    spinner.style.display = "none";
  }
});

/* Integracion Api Mercado pago */

const mercadopago = new MercadoPago(
  "TEST-72cf3e50-8cae-4fbf-8e61-eed51837566e",
  {
    locale: "es-AR", // The most common are: 'pt-BR', 'es-AR' and 'en-US'
  }
);

document
  .getElementById("checkout-btn")
  .addEventListener("click", async function () {
    const orderData = {
      product: " test",
    };
    spinner.style.display = "block";
    const response = await fetch("/api/session/current");
    const data = await response.json();
    const cartId = data.payload.cart;
    fetch(`/api/payment/create_preference/${cartId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(orderData),
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (preference) {
        spinner.style.display = "none";
        createCheckoutButton(preference.id);
      })
      .catch(function () {
        spinner.style.display = "none";
        alert("Unexpected error");
      });
  });

function createCheckoutButton(preferenceId) {
  // Initialize the checkout
  const bricksBuilder = mercadopago.bricks();

  const renderComponent = async (bricksBuilder) => {
    if (window.checkoutButton) window.checkoutButton.unmount();
    await bricksBuilder.create(
      "wallet",
      "button-checkout", // class/id where the payment button will be displayed
      {
        initialization: {
          preferenceId: preferenceId,
        },
        callbacks: {
          onError: (error) => console.error(error),
          onReady: () => {},
        },
      }
    );
  };
  window.checkoutButton = renderComponent(bricksBuilder);
}
