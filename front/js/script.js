// recuperation des informations des produits
const fetchData = () => {
  fetch("http://localhost:3000/api/products")
    .then((reponse) => {
      return reponse.json();
    })
    .then(generateItems);
};
//-----------------------------------------
// on crée les elements html via JS
const generateItems = (productItems) => {
  productItems.forEach(generateItem);
};

const generateItem = (productItem) => {
  const section = document.getElementById("items");

  const child = document.createElement("a");

  child.href = `./product.html?id=${productItem._id}`;

  child.innerHTML = `<article>
    <img src="${productItem.imageUrl}">
    <h3 class="productName">${productItem.name}</h3>
    
    <p class="productDescription">${productItem.description}</p>
  </article>`;

  section.appendChild(child);
};

window.addEventListener("DOMContentLoaded", fetchData);
//----------------------------------------------
