/* Header */

function linksScrollAfterClick() {
  const pageLinks = document.querySelectorAll(".navigation__item a");

  pageLinks.forEach(link => {
    link.addEventListener("click", function(evt) {
      evt.preventDefault();
      const currentTarget = document.querySelector(this.getAttribute("href"));
      currentTarget.scrollIntoView();
    });
  });
}

/* Portfolio. Взаимодействие с картинками  */
function toggleStateForPortfolio() {
  const settings = {
    parentClass: ".portfolio__work",
    stateClass: "is-active",
    getSiblings(n) {
      return [...n.parentElement.children].filter(c => c != n);
    }
  };
  const { parentClass, stateClass, getSiblings } = settings;
  const portfolioWorks = document.querySelectorAll(parentClass);
  portfolioWorks.forEach(work => {
    work.addEventListener("click", function(evt) {
      evt.preventDefault();
      this.classList.toggle(stateClass);
      getSiblings(this.parentElement).forEach(sibling => {
        sibling.querySelector(parentClass).classList.remove(stateClass);
      });
    });
  });
}

document.addEventListener("DOMContentLoaded", () => {
  linksScrollAfterClick();
  toggleStateForPortfolio();
});
