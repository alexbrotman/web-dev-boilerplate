function openModalEvent() {
  event.preventDefault();
  const target = this.getAttribute("data-modal-target");

  try {
    const modal = document.querySelector(`[data-modal-id='${target}']`);
    modal.classList.add("_active");
  } catch (error) {
    console.log(error);
  }
}

const closeModalEvent = () => {
  event.preventDefault();
  const open_modal = document.querySelector("._modal._active");
  try {
    open_modal.classList.remove("_active");
  } catch (error) {
    console.log(error);
  }
};

const attachEventListeners = () => {
  const modal_triggers = document.querySelectorAll("._modal-trigger");

  for (let i = 0; i < modal_triggers.length; i++) {
    modal_triggers[i].addEventListener("click", openModalEvent);
  }

  const modal_backgrounds = document.querySelectorAll("._modal__background");
  for (let i = 0; i < modal_backgrounds.length; i++) {
    modal_backgrounds[i].addEventListener("click", closeModalEvent);
  }

  const close_buttons = document.querySelectorAll("._modal__close-button");
  for (let i = 0; i < close_buttons.length; i++) {
    close_buttons[i].addEventListener("click", closeModalEvent);
  }
};

if (
  document.readyState === "complete" ||
  document.readyState === "loaded" ||
  document.readyState === "interactive"
) {
  attachEventListeners();
} else {
  window.addEventListener("DOMContentLoaded", () => {
    attachEventListeners();
  });
}
