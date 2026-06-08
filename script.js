const nav = document.querySelector(".main-nav");
const toggle = document.querySelector(".menu-toggle");

if (toggle && nav) {
  toggle.addEventListener("click", () => {
    const opened = document.body.classList.toggle("menu-open");
    toggle.setAttribute("aria-expanded", String(opened));
  });

  nav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const revealItems = document.querySelectorAll(".reveal");

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("visible"));
}

const modal = document.querySelector(".flavor-modal");
const detailButtons = document.querySelectorAll(".detail-trigger");

if (modal && detailButtons.length) {
  const flavorName = modal.querySelector("#modalFlavorName");
  const mood = modal.querySelector(".modal-mood");
  const description = modal.querySelector(".modal-description");
  const notes = modal.querySelector("[data-modal-notes]");
  const texture = modal.querySelector("[data-modal-texture]");
  const scene = modal.querySelector("[data-modal-scene]");
  const pairing = modal.querySelector("[data-modal-pairing]");
  const price = modal.querySelector("[data-modal-price]");

  const openModal = (button) => {
    flavorName.textContent = button.dataset.flavor;
    mood.textContent = button.dataset.mood;
    description.textContent = button.dataset.description;
    notes.textContent = button.dataset.notes;
    texture.textContent = button.dataset.texture;
    scene.textContent = button.dataset.scene;
    pairing.textContent = button.dataset.pairing;
    price.textContent = button.dataset.price;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    document.body.classList.add("modal-open");
  };

  const closeModal = () => {
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
    document.body.classList.remove("modal-open");
  };

  detailButtons.forEach((button) => {
    button.addEventListener("click", () => openModal(button));
  });

  modal.querySelectorAll("[data-modal-close]").forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && modal.classList.contains("is-open")) {
      closeModal();
    }
  });
}
