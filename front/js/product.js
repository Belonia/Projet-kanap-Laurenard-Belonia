// Récupere l'id de l'URL a l'aide de l'objet URL
const getProductIdFromUrl = () => {
  const url = location.href;
  const productUrl = new URL(url);
  const id = productUrl.searchParams.get("id");
  return id;
};
//------------------------------------------------

// On injecte l'id récuperé dans l'url qu'on va utiliser pour interagir avec notre API
const fetchItem = (id) => {
  fetch(`http://localhost:3000/api/products/${id}`)
    .then((reponse) => {
      return reponse.json();
    })
    .then(generateItem);
};
//-------------------------------------------------

// Recuperation des elements HTML
const generateItem = (productItem) => {
  console.log(productItem);
  const imgProduct = document.createElement("img");
  imgProduct.src = `${productItem.imageUrl}`;
  imgProduct.alt = `${productItem.altTxt}`;
  document.querySelector(".item__img").appendChild(imgProduct);

  const nameProduct = document.getElementById("title");
  nameProduct.innerHTML = `${productItem.name}`;

  const priceProduct = document.getElementById("price");
  priceProduct.innerHTML = `${productItem.price}`;

  const descriptionProduct = document.getElementById("description");
  descriptionProduct.innerHTML = `${productItem.description}`;

  const select = document.getElementById("colors");
  productItem.colors.forEach((color) => {
    const tagOption = document.createElement("option");
    tagOption.innerHTML = `${color}`;
    tagOption.value = `${color}`;
    select.appendChild(tagOption);
    console.log(color);
  });
  addCart(productItem);
};
//------------------------------------------------

// Ajout des produits au panier
const addCart = (productItem) => {
  const button = document.getElementById("addToCart");
  button.addEventListener("click", () => {
    const productColor = document.getElementById("colors").value;
    console.log(productColor);
    console.log(productItem);
    const quantity = parseInt(document.getElementById("quantity").value);
    console.log(quantity);
    if (
      productColor == null ||
      productColor === "" ||
      quantity == null ||
      quantity == 0
    ) {
      alert("Veuillez selectionner une couleur et une quantité ");
    }
    //---------------------------------------------

    // données du localStorage
    const data = {
      _id: productItem._id,
      altText: productItem.altText,
      imageUrl: productItem.imageUrl,
      description: productItem.description,
      color: productColor,
      quantity: quantity,
      name: productItem.name,
    };
    //---------------------------------------

    // ajout quantité produit plutot que ajout de plusieurs  produits similaires dans le localstorage
    let cart = [];

    try {
      const existingCart = JSON.parse(localStorage.getItem("cart_list"));
      cart.push(...existingCart);
    } catch (e) {
      console.log("no local storage element");
    }

    const index = cart.findIndex(
      (element) => element.id === data.id && element.color === data.color
    );

    if (index > -1) {
      const existingProduct = cart[index];
      existingProduct.quantity = existingProduct.quantity + data.quantity;
      cart[index] = existingProduct;
    } else {
      cart.push(data);
    }

    localStorage.setItem("cart_list", JSON.stringify(cart));
  });
};
//----------------------------------------
const fetchIdAndItem = () => {
  const id = getProductIdFromUrl();
  fetchItem(id);
};

window.addEventListener("DOMContentLoaded", fetchIdAndItem);
