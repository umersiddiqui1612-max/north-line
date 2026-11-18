const filterButtons = [...document.querySelectorAll(".filter-button")];
const productCards = [...document.querySelectorAll(".product-card")];
const resultCount = document.querySelector(".results-count");
const searchField = document.querySelector(".search-field");
const searchInput = searchField.querySelector("input");
const emptyState = document.querySelector(".empty-state");
const toast = document.querySelector(".toast");
const bagCount = document.querySelector(".bag-count");
let activeFilter = "all";
let itemCount = 0;
let toastTimer;

function updateProducts() {
  const query = searchInput.value.trim().toLowerCase();
  let visibleCount = 0;

  productCards.forEach((card) => {
    const matchesCategory = activeFilter === "all" || card.dataset.category === activeFilter;
    const matchesSearch = card.dataset.name.toLowerCase().includes(query);
    const isVisible = matchesCategory && matchesSearch;
    card.hidden = !isVisible;
    if (isVisible) visibleCount += 1;
  });

  resultCount.textContent = `${String(visibleCount).padStart(2, "0")} ${visibleCount === 1 ? "PIECE" : "PIECES"}`;
  emptyState.hidden = visibleCount > 0;
}

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => toast.classList.remove("show"), 2600);
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    activeFilter = button.dataset.filter;
    filterButtons.forEach((item) => item.classList.toggle("active", item === button));
    updateProducts();
  });
});

document.querySelectorAll("[data-nav-filter]").forEach((link) => {
  link.addEventListener("click", () => {
    const filter = link.dataset.navFilter;
    const button = filterButtons.find((item) => item.dataset.filter === filter);
    if (button) button.click();
    document.querySelector(".main-nav").classList.remove("open");
    document.querySelector(".menu-toggle").setAttribute("aria-expanded", "false");
  });
});

document.querySelector(".search-toggle").addEventListener("click", () => {
  searchField.hidden = false;
  searchInput.focus();
});

document.querySelector(".close-search").addEventListener("click", () => {
  searchInput.value = "";
  searchField.hidden = true;
  updateProducts();
});

searchInput.addEventListener("input", updateProducts);

document.querySelectorAll(".favorite-button").forEach((button) => {
  button.addEventListener("click", () => {
    const isFavorite = button.getAttribute("aria-pressed") !== "true";
    button.setAttribute("aria-pressed", String(isFavorite));
    button.textContent = isFavorite ? "♥" : "♡";
    showToast(isFavorite ? "Added to your wishlist" : "Removed from your wishlist");
  });
});

document.querySelectorAll(".quick-add").forEach((button) => {
  button.addEventListener("click", () => {
    itemCount += 1;
    bagCount.textContent = String(itemCount);
    document.querySelector(".bag-button").setAttribute("aria-label", `Shopping bag, ${itemCount} ${itemCount === 1 ? "item" : "items"}`);
    showToast(`${button.dataset.product} added to your bag · $${button.dataset.price}`);
  });
});

document.querySelector(".menu-toggle").addEventListener("click", (event) => {
  const menu = document.querySelector(".main-nav");
  const isOpen = menu.classList.toggle("open");
  event.currentTarget.setAttribute("aria-expanded", String(isOpen));
});

document.querySelector(".newsletter-form").addEventListener("submit", (event) => {
  event.preventDefault();
  const email = document.querySelector("#email");
  if (!email.checkValidity()) {
    email.reportValidity();
    return;
  }
  document.querySelector(".form-message").textContent = "You're on the list. Keep an eye on your inbox.";
  event.currentTarget.reset();
});
