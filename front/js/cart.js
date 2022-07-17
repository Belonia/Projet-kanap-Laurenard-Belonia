const addProduct = JSON.parse(localStorage.getItem("cart_list"));

// calcule des produits dans le panier
const computeTotal = (data) => {
  let totalPrice = 0;
  let totalQuantity = 0;
  if (addProduct) {
    addProduct.forEach((product) => {
      totalPrice += data.price * product.quantity;
      totalQuantity += product.quantity;
    });
  }
  document.getElementById("totalPrice").innerHTML = totalPrice;
  document.getElementById("totalQuantity").innerHTML = totalQuantity;
};
//-----------------------------------------------

// fonction pour la modification de la quantite des produits dans le panier
const onQuantityChange = (event, product) => {
  const newQuantity = parseInt(event.currentTarget.value);

  const index = addProduct.findIndex(
    (element) => element.id === product.id && element.color === product.color
  );

  if (index > -1) {
    const existingProduct = addProduct[index];
    existingProduct.quantity = newQuantity;
    addProduct[index] = existingProduct;
  }

  localStorage.setItem("cart_list", JSON.stringify(addProduct));

  window.location.reload();
};
//-------------------------------------------

// Suppression des produits du panier
let produitTab = JSON.parse(localStorage.getItem("cart_list"));

function onDeletion(product) {
  const newList = produitTab.filter(
    (p) => p._id != product._id || p.color != product.color
  );

  localStorage.setItem("cart_list", JSON.stringify(newList));

  window.location.reload();
}
//-----------------------------------------------

// creation des elements html du panier
let products = [];
const createElement = (product, data) => {
  const cartItems = document.getElementById("cart__items");
  const child = document.createElement("article");
  child.className = "cart__item";

  const imageDiv = document.createElement("div");
  imageDiv.className = "cart__item__img";

  const image = document.createElement("img");

  image.src = product.imageUrl;
  image.alt = product.altText;

  imageDiv.appendChild(image);
  child.appendChild(imageDiv);

  const contentDiv = document.createElement("div");
  contentDiv.className = "cart__item__content";

  const descriptionDiv = document.createElement("div");
  descriptionDiv.className = "cart__item__content__description";
  const title = document.createElement("h2");
  title.innerHTML = product.name;

  const color = document.createElement("p");
  color.innerHTML = product.color;

  const price = document.createElement("p");
  price.innerHTML = `${data.price} €`;

  descriptionDiv.appendChild(title);
  descriptionDiv.appendChild(color);
  descriptionDiv.appendChild(price);

  contentDiv.appendChild(descriptionDiv);

  const settingsDiv = document.createElement("div");
  settingsDiv.className = "cart__item__content__settings";

  const quantityDiv = document.createElement("div");
  quantityDiv.className = "cart__item__content__settings__quantity";

  quantityLabel = document.createElement("p");
  quantityLabel.innerHTML = "Qté : ";

  quantityInput = document.createElement("input");
  quantityInput.type = "number";
  quantityInput.className = "itemQuantity";
  quantityInput.name = "itemQuantity";
  quantityInput.min = "1";
  quantityInput.max = "100";
  quantityInput.value = product.quantity;

  quantityInput.addEventListener("change", (event) =>
    onQuantityChange(event, product)
  );

  quantityDiv.appendChild(quantityLabel);
  quantityDiv.appendChild(quantityInput);

  settingsDiv.appendChild(quantityDiv);

  const deleteDiv = document.createElement("div");
  deleteDiv.className = "cart__item__content__settings__delete";

  const deleteText = document.createElement("p");
  deleteText.className = "deleteItem";
  deleteText.innerHTML = "Supprimer";

  deleteText.addEventListener("click", () => onDeletion(product));

  deleteDiv.appendChild(deleteText);
  settingsDiv.appendChild(deleteDiv);
  contentDiv.appendChild(settingsDiv);
  child.appendChild(contentDiv);
  cartItems.appendChild(child);
};
// recoverData pour recuperer l'id
const recoverData = (product) => {
  fetch(`http://localhost:3000/api/products/${product._id}`)
    .then((reponse) => {
      return reponse.json();
    })
    .then((data) => {
      createElement(product, data);
      computeTotal(data);
    });
};
const panierDisplay = () => {
  if (addProduct) {
    addProduct.forEach((product, i) => {
      recoverData(product);
      products.push(product._id);
    });
  }
};
panierDisplay();
//---------------------------------------------------

// FORMULAIRE //

//formulaire HTML
const form = document.querySelector(".cart__order__form");

//Expressions regulieres pour formulaire
const nameRegEx = /^[a-zA-Zàâæçéèêëîïôœùûüÿ\-]+$/;
const addressRegEx = /^[A-Za-z0-9àâæçéèêëîïôœùûüÿ.,-_'\s]+/i;
const cityRegEx = /^[A-Za-z0-9àâæçéèêëîïôœùûüÿ\-_.,'\s]+/i;
const mailRegEx = /^[a-zA-Z0-9.-_]+[@]{1}[a-zA-Z0-9.-_]+[.]{1}[a-z]{2,10}/i;

// Variables des expression regulieres
let testFirstName;
let testLastName;
let testAddress;
let testCity;
let testMail;

//input prénom
function checkingFirstName() {
  let errorFirstName = document.querySelector("#firstNameErrorMsg");
  testFirstName = nameRegEx.test(form.firstName.value);

  // verification de l'expression reguliere
  if (testFirstName) {
    errorFirstName.textContent = "";
  } else {
    errorFirstName.textContent = "non valide";
    errorFirstName.style.color = "#9F2F00";
    errorFirstName.style.fontWeight = "bold";
  }
}
//input nom de famille
function checkingLastName() {
  let errorLastName = document.querySelector("#lastNameErrorMsg");
  testLastName = nameRegEx.test(form.lastName.value);
  // verification de l'expression reguliere
  if (testLastName) {
    errorLastName.textContent = "";
  } else {
    errorLastName.textContent = "non valide";
    errorLastName.style.color = "#9F2F00";
    errorLastName.style.fontWeight = "bold";
  }
}
// input adresse
function checkingAddress() {
  let errorAddress = document.querySelector("#addressErrorMsg");
  testAddress = addressRegEx.test(form.address.value);
  // verif de l'expression reguliere
  if (testAddress) {
    errorAddress.textContent = "";
  } else {
    errorAddress.textContent = "Non valide";
    errorAddress.style.color = "#9F2F00";
    errorAddress.style.fontWeight = "bold";
  }
}
// input ville
function checkingCity() {
  let errorCity = document.querySelector("#cityErrorMsg");
  testCity = cityRegEx.test(form.city.value);
  // verif de l'expression reguliere
  if (testCity) {
    errorCity.textContent = "";
  } else {
    errorCity.textContent = "Non valide";
    errorCity.style.color = "#9F2F00";
    errorCity.style.fontWeight = "bold";
  }
}

// input mail
function checkingMail() {
  let errorMail = document.querySelector("#emailErrorMsg");
  testMail = mailRegEx.test(form.email.value);
  //verif expression reguliere
  if (testMail) {
    errorMail.textContent = "";
  } else {
    errorMail.textContent = "Non valide";
    errorMail.style.color = "#9F2F00";
    errorMail.style.fontWeight = "bold";
  }
}
// Evenements input ------------------------

form.firstName.addEventListener("change", checkingFirstName);
form.lastName.addEventListener("change", checkingLastName);
form.address.addEventListener("change", checkingAddress);
form.city.addEventListener("change", checkingCity);
form.email.addEventListener("change", checkingMail);

let buttonForm = document.querySelector("#order");

//validation du formulaire

function validCart() {
  buttonForm.addEventListener("click", (e) => {
    e.preventDefault();
    const contact = {
      firstName: document.querySelector("#firstName").value,
      lastName: document.querySelector("#lastName").value,
      address: document.querySelector("#address").value,
      city: document.querySelector("#city").value,
      email: document.querySelector("#email").value,
    };
    if (testFirstName && testLastName && testAddress && testCity && testMail) {
      sendToServer(contact);
    } else {
      alert("Erreur dans la saisie des informations personnelles");
    }
  });
}
validCart();
//---------------------------------------------------

// //recuperation de l'URL

//requete post
async function sendToServer(contact) {
  if (products.length) {
    const requete = await fetch("http://localhost:3000/api/products/order", {
      method: "POST",
      body: JSON.stringify({ contact, products }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!requete.ok) {
      alert("Une erreur s'est produite !");
    } else {
      let reponse = await requete.json();

      orderId = reponse.orderId;

      if (orderId != "") {
        location.href = "confirmation.html?id=" + orderId;
      }
    }
  } else {
    alert("Veuillez selectionner un produit");
  }
}
