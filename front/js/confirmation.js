let idFromOrder = document.querySelector("#orderId");

// recuperation de l'id dans l'URL
const newUrl = new URL(window.location.href);
let orderId = newUrl.searchParams.get("id");

// ajout de l'id dans le html via js
idFromOrder.textContent = `${orderId}`;
localStorage.removeItem("cart_list");
