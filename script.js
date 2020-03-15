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

/* Slider. Переключение слайдов */
function sliderMove() {
  let currentSlide = 0;
  let visibleSliderClass = "slider__slide--visible";
  const slider = document.querySelector(".slider");
  const sliderItem = slider.querySelectorAll(".slider__slide");
  const sliderItemLenght = sliderItem.length;
  const sliderButtons = slider.querySelectorAll(".slider__btn");

  sliderButtons.forEach(button => {
    button.addEventListener("click", function() {
      const currentDirection = this.dataset.direction;

      if (currentDirection === "next") {
        if (currentSlide == sliderItemLenght - 1) {
          sliderItem[currentSlide].classList.remove(visibleSliderClass);
          currentSlide = 0;
          sliderItem[currentSlide].classList.add(visibleSliderClass);
          return;
        }
        sliderItem[currentSlide].classList.remove(visibleSliderClass);
        currentSlide++;
        sliderItem[currentSlide].classList.add(visibleSliderClass);
      } else {
        if (!currentSlide) {
          sliderItem[currentSlide].classList.remove(visibleSliderClass);
          currentSlide = sliderItemLenght - 1;
          sliderItem[currentSlide].classList.add(visibleSliderClass);
          return;
        }
        sliderItem[currentSlide].classList.remove(visibleSliderClass);
        currentSlide--;
        sliderItem[currentSlide].classList.add(visibleSliderClass);
      }
    });
  });
}
/* Slider. Активация экранов телефонов */
function switchPhoneScreen() {
  const phoneZone = document.querySelectorAll(".slider__zone");
  phoneZone.forEach(phone => {
    const phoneButton = phone.querySelector(".slider__phone-button");
    phoneButton.addEventListener("click", function() {
      phone.classList.toggle("slider__zone--off");
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
  sliderMove();
  switchPhoneScreen();
});
