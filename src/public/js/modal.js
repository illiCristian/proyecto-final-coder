const spinner = document.getElementById("spinner");
const sucessMessage = document.getElementById("sucessMessage");

function openModal(btn) {
  const productId = btn.dataset.id;

  spinner.style.display = "block";
  fetch(`/api/productsDatabase/${productId}`)
    .then((response) => response.json())
    .then((product) => {
      const modal = document.getElementById("product-modal");
      const modalContent = modal.querySelector(".modal-content");
      modal.style.display = "block";
      spinner.style.display = "none";
      console.log(product);
      modalContent.innerHTML = `<div class="bg-white shadow-md p-6 rounded-lg text-center">
      <h2 class="text-gray-900 font-bold text-2xl mb-2 underline w-full">${product.title}</h2>
      <p class="text-gray-600 mb-4">${product.description}</p>
      <p class="text-gray-800 font-semibold text-xl mb-4">Precio: $${product.price}</p>
      <p class="text-blue-900 font-semibold text-xl mb-4">Stock: ${product.stock}</p>
      <img src=${product.thumbnail} class="w-64 h-64 object-contain mx-auto my-4 rounded-md shadow-md" alt="${product.title}"/>
      <div class="flex justify-center space-x-4">
        <button class="transform p-2 rounded-lg hover:bg-gray-900 hover:text-white transition duration-200 cursor-pointer bg-white text-gray-800 font-semibold w-1/2"
          onclick="addToCart('${product._id}')"
        >Agregar al carrito</button>
        <button class="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded-lg w-1/2"
          onclick="closeModal()"
        >Cerrar</button>
      </div>
    </div>
    
    `;
    });
}
async function addToCart(id, req) {
  spinner.style.display = "block";
  try {
    const result = await fetch(`/api/cartsDb/${id}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    if (result.status === 404) {
      spinner.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Error al agregar al carrito",
        footer: "Producto actualmente sin stock!",
      });
    }
    if (result.statusText === "Unauthorized") {
      spinner.style.display = "none";
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Debes estar logueado para agregar al carrito",
        footer:
          '<a href="/login" class="underline text-lg font-bold text-gray-600 hover:text-gray-900">Ir al login?</a>',
      });
    }
    if (result.status === 200) {
      spinner.style.display = "none";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto agregado al carrito",
        showConfirmButton: false,
        timer: 1500,
      });
      setTimeout(() => {
        modal.style.display = "none";
      }, 2000);
    }
  } catch (error) {
    spinner.style.display = "none";
    alert("Error al agregar al carrito");
    console.log(error);
  }
}
const modal = document.getElementById("product-modal");
function closeModal() {
  modal.style.display = "none";
}

/* const dropdownToggleButton = document.getElementById("dropdownDefaultButton");
const dropdownMenu = document.getElementById("dropdown");


function toggleDropdown() {
  dropdownMenu.classList.toggle("hidden");
}

// Agregar evento click al botón del dropdown
dropdownToggleButton.addEventListener("click", toggleDropdown); */

const form = document.getElementById("contactForm");
async function submitForm() {
  let errorEmail = document.getElementById("errorEmail");
  spinner.style.display = "block";
  const obj = {};
  const data = new FormData(form);
  data.forEach((value, key) => (obj[key] = value));
  console.log(data);
  try {
    const result = await fetch("/api/users/contact", {
      method: "POST",
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(result);
    if (result.status === 400) {
      spinner.style.display = "none";
      errorEmail.style.display = "block";
      return;
    }
    if (result.status === 200) {
      spinner.style.display = "none";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Mail enviado correctamente!!",
        showConfirmButton: false,
        timer: 1500,
      });
      form.reset();
      errorEmail.style.display = "none";
    }
    spinner.style.display = "none";
  } catch (error) {
    console.log(error);
    spinner.style.display = "none";
  }
}

const productContainers = [...document.querySelectorAll(".product-container")];
const nxtBtn = [...document.querySelectorAll(".nxt-btn")];
const preBtn = [...document.querySelectorAll(".pre-btn")];

productContainers.forEach((item, i) => {
  let containerDimensions = item.getBoundingClientRect();
  let containerWidth = containerDimensions.width;

  nxtBtn[i].addEventListener("click", () => {
    item.scrollLeft += containerWidth;
  });

  preBtn[i].addEventListener("click", () => {
    item.scrollLeft -= containerWidth;
  });
});
