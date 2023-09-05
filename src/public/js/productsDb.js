const product = [];
const form = document.getElementById("product-form");
const spinner = document.getElementById("spinner");

form.addEventListener("submit", async function (e) {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const price = document.getElementById("price").value;
  const thumbnail = document.getElementById("thumbnail").value;
  const code = document.getElementById("code").value;
  const stock = document.getElementById("stock").value;
  const category = document.getElementById("category").value;
  product.push({
    title,
    description,
    price,
    thumbnail,
    code,
    stock,
    category,
  });

  spinner.style.display = "block";
  fetch("/api/productsDatabase", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title,
      description: description,
      price: price,
      thumbnail: thumbnail,
      code: code,
      stock: stock,
      category: category,
      status: false,
    }),
  })
    .then((response) =>
      response.json((response) => {
        spinner.style.display = "none";
        if (response.status === "succes") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto Creado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
    )
    .then((data) => {
      console.log(data);
      spinner.style.display = "none";
      location.replace(`/productsDb/${data.payload._id}`);

      form.reset();
    })
    .catch((error) => {
      spinner.style.display = "none";
      console.error(error.message + "algun error random");
    });
});
/* {
        if (response.status === "succes") {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Producto Creado con exito",
            showConfirmButton: false,
            timer: 1500,
          });
          location.replace(`/productsDb${response.payload._id}`);
        }
      } */
//Borrar producto por id
const deleteForm = document.getElementById("productdeleteForm");
deleteForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const id = deleteForm.elements.id.value;
  console.log(id);
  spinner.style.display = "block";
  fetch(`/api/productsDatabase/${id}`, {
    method: "DELETE",
  })
    .then((response) => {
      if (response.status === 401) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No tienes permisos para borrar este producto",
          showConfirmButton: false,
          timer: 1500,
        });

        spinner.style.display = "none";
      }
      spinner.style.display = "none";
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response;
    })
    .then((data) => {
      location.replace("/products");
      console.log("Delete successful:", data);
    })
    .catch((error) => {
      spinner.style.display = "none";
      console.error("There was a problem deleting the resource:", error);
    });
});

//Editar producto
const formEdit = document.getElementById("product-form-edit");

formEdit.addEventListener("submit", async function (e) {
  spinner.style.display = "block";
  e.preventDefault();
  const id = document.getElementById("idEdit").value;
  const title = document.getElementById("titleEdit").value;
  const description = document.getElementById("descriptionEdit").value;
  const price = document.getElementById("priceEdit").value;
  const thumbnail = document.getElementById("thumbnailEdit").value;
  const code = document.getElementById("codeEdit").value;
  const stock = document.getElementById("stockEdit").value;
  const category = document.getElementById("categoryEdit").value;

  const requestBody = {};
  if (title) {
    requestBody.title = title;
  }
  if (description) {
    requestBody.description = description;
  }
  if (price) {
    requestBody.price = price;
  }
  if (thumbnail) {
    requestBody.thumbnail = thumbnail;
  }
  if (code) {
    requestBody.code = code;
  }
  if (stock) {
    requestBody.stock = stock;
  }
  if (category) {
    requestBody.category = category;
  }

  fetch(`/api/productsDatabase/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then((response) => {
      if (response.status === 401) {
        Swal.fire({
          position: "center",
          icon: "error",
          title: "No tienes permisos para editar este producto",
          showConfirmButton: false,
          timer: 1500,
        });
        spinner.style.display = "none";
      }
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      spinner.style.display = "none";
      Swal.fire({
        position: "center",
        icon: "success",
        title: "Producto editado con exito",
        showConfirmButton: false,
        timer: 1500,
      });
      formEdit.reset();

      return response.json();
    })
    .then((data) => {
      location.reload();
      console.log("Update successful:", data);
    })
    .catch((error) => {
      console.error("There was a problem updating the resource:", error);
    });
});

function openImageUploader(btn) {
  const productId = btn.dataset.id;
  const imageInput = document.getElementById("imageInput");
  imageInput.dataset.productId = productId;
  imageInput.click();
}

// Puedes escuchar el evento "change" en el input de tipo "file" para manejar la carga de imágenes
document
  .getElementById("imageInput")
  .addEventListener("change", async function () {
    // Aquí puedes agregar tu lógica para procesar la imagen seleccionada
    const selectedImage = this.files[0];
    if (selectedImage) {
      spinner.style.display = "block";
      console.log("Imagen seleccionada:", selectedImage);
      const productId = this.dataset.productId;

      const formData = new FormData();

      formData.append("images", selectedImage);
      //formData.append("productId", productId);

      try {
        const result = await fetch(
          `/api/productsDatabase/editimage/${productId}`,
          {
            method: "PUT",
            body: formData,
          }
        );
        console.log(result);
        spinner.style.display = "none";
        if (result.status === 401) {
          Swal.fire({
            position: "center",
            icon: "error",
            title: "No tienes permisos para borrar este producto",
            showConfirmButton: false,
            timer: 1500,
          });
        }
        if (result.status === 200) {
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Imagen agregada con exito",
            showConfirmButton: false,
            timer: 1500,
          });
          setTimeout(() => {
            location.reload();
          }, 2000);
        }
      } catch (error) {
        spinner.style.display = "block";
        console.log(error);
      }
    }
  });
