import { renderSelectedCard,renderCLickedCard,descriptionWindow, deleteJob  } from "./jobs.js";
import { saveButton } from "./shared.js";
document.addEventListener('DOMContentLoaded',() => {
  renderSelectedCard();
  renderCLickedCard();
  saveButton();
  descriptionWindow();
  deleteJob();
})
  