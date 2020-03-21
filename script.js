"use strict";

/* Header function */

function linksScrollAfterClick() {
  const pageLinks = document.querySelectorAll(".navigation__link");
  const stateClass = "navigation__link--current";
  pageLinks.forEach(link => {
    link.addEventListener("click", function(evt) {
      evt.preventDefault();
      console.log(this);
      pageLinks.forEach(link => link.classList.remove(stateClass));
      this.classList.add(stateClass);
      scrollToTarget(this);
    });
  });
}

function scrollToTarget(element) {
  const currentTarget = document.querySelector(element.getAttribute("href"));
  currentTarget.scrollIntoView(true);
}

linksScrollAfterClick();

/* Slider function */

function sliderMove() {
  let currentSlide = 0;
  let visibleSliderClass = "slider__slide--visible";
  const slider = document.querySelector(".slider");
  const sliderItem = slider.querySelectorAll(".slider__slide");

  const sliderItemLenght = sliderItem.length;
  const sliderButtons = slider.querySelectorAll(".slider__btn");
  const stateButtonClasss = "disabled";

  sliderButtons.forEach(button => {
    button.addEventListener("click", function() {
      /* Prevent double click */
      this.classList.add(stateButtonClasss);
      setTimeout(() => this.classList.remove(stateButtonClasss), 750);
      const currentDirection = this.dataset.direction;

      sliderItem.forEach(slide => slide.classList.remove("next", "prev"));
      if (currentDirection === "next") {
        if (currentSlide == sliderItemLenght - 1) {
          sliderItem[currentSlide].classList.remove(visibleSliderClass);
          currentSlide = 0;
          sliderItem[currentSlide].classList.add(
            visibleSliderClass,
            currentDirection
          );
          return;
        }
        sliderItem[currentSlide].classList.remove(visibleSliderClass);
        currentSlide++;
      } else {
        if (!currentSlide) {
          sliderItem[currentSlide].classList.remove(visibleSliderClass);
          currentSlide = sliderItemLenght - 1;
          sliderItem[currentSlide].classList.add(
            visibleSliderClass,
            currentDirection
          );
          return;
        }
        sliderItem[currentSlide].classList.remove(visibleSliderClass);
        currentSlide--;
      }
      sliderItem[currentSlide].classList.add(
        visibleSliderClass,
        currentDirection
      );
    });
  });
}

sliderMove();

/* Slider. Touch screen function */

function switchPhoneScreen() {
  const phoneZone = document.querySelectorAll(".slider__zone");
  phoneZone.forEach(phone => {
    const phoneButton = phone.querySelector(".slider__phone-button");
    phoneButton.addEventListener("click", () => {
      phone.classList.toggle("slider__zone--off");
    });
  });
}

switchPhoneScreen();

/* Portfolio. Переключение табов */

function togglePortfolioTabs() {
  const portflioLinks = document.querySelectorAll(".portfolio__link");
  const portfolioCells = document.querySelectorAll(".portfolio .grid__cell");
  let classList;
  let isCliked = false;
  portflioLinks.forEach(link => {
    link.addEventListener("click", function(evt) {
      evt.preventDefault();

      this.classList.add("portfolio__link--active");
      getSiblings(this.parentElement).forEach(sibling => {
        sibling
          .querySelector(".portfolio__link")
          .classList.remove("portfolio__link--active");
      });

      if (isCliked) {
        portfolioCells.forEach((cell, i) =>
          cell.classList.remove(classList[i])
        );
      }
      classList = createArrayWithCssClass(1, 12);
      setTimeout(() => {
        portfolioCells.forEach((cell, i) => cell.classList.add(classList[i]));
        isCliked = true;
      }, 0);
    });
  });
}

function createArrayWithCssClass(from, to, n = to) {
  return [...Array(to - from + 1).keys()]
    .map(i => i + from)
    .reduce(
      (arr, el) => (
        arr.splice(Math.random() * (arr.length + 1), 0, `item-${el}`), arr
      ),
      []
    )
    .slice(0, n);
}

togglePortfolioTabs();

/* Portfolio. images function  */

function getSiblings(n) {
  return [...n.parentElement.children].filter(c => c != n);
}

function toggleStateForPortfolio() {
  const settings = {
    parentClass: ".portfolio__work",
    stateClass: "is-active"
  };
  const { parentClass, stateClass } = settings;
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

toggleStateForPortfolio();

/* Get a quote form function */

class FormHandler {
  constructor(options = {}) {
    this.settings = this.setSettings(options);
    this.init();
  }

  init() {
    const { pageForm, formFields } = this.settings;
    this.form = document.querySelector(pageForm);
    this.fields = this.form.querySelectorAll(formFields);
    this.response = {};
    this.filteredResponse = {};
    this.getFormFields();
  }

  setSettings(options) {
    const defaults = {
      pageForm: ".form",
      formFields: ".form__field"
    };
    return Object.assign({}, defaults, options);
  }

  getFormFields(obj = this.response) {
    return new Promise((resolve, reject) => {
      this.fields.forEach(field => (obj[field.dataset.response] = field.value));
      Object.keys(obj).length == 0 ? reject(obj) : resolve(obj);
    });
  }

  filterResponse(data = this.response) {
    const arr = Object.values(data).map(i => i);
    for (let i of Object.keys(data)) {
      const key = i;
      const value = data[i];
      switch (key) {
        case "subject":
        case "description":
          this.filteredResponse[key] = value;
          break;
        default:
          break;
      }
    }
  }

  renderResult(data = this.filteredResponse) {
    let commonPopupData = "";
    for (let i of Object.keys(data)) {
      const value = data[i];
      commonPopupData += `<p>${
        value ? `${i[0].toUpperCase()}${i.slice(1)}: ${value}` : `Without ${i}`
      }</p>`;
    }
    const popupTemplate = `<div class="popup">
          <div class="popup__inner">
              <div class="popup__content">
                <h3 class="popup__title">The letter was sent</h3>
                ${commonPopupData}
                <button class="popup__button">OK</button>
              </div>
          </div>
      </div>`;
    document.body.insertAdjacentHTML("beforeend", popupTemplate);
  }

  closePopup(evt) {
    const currentTarget = evt.target;
    if (
      currentTarget.classList.contains("popup") ||
      currentTarget.classList.contains("popup__button")
    ) {
      document.querySelector(".popup").remove();
      this.resetForm();
    }
    return false;
  }

  resetForm() {
    this.form.reset();
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const pageForm = new FormHandler();
  pageForm.form.addEventListener("submit", evt => {
    evt.preventDefault();
    const response = pageForm.getFormFields();
    response
      .then(() => pageForm.filterResponse())
      .then(() => pageForm.renderResult());
  });
  document.body.addEventListener("click", evt => pageForm.closePopup(evt));
});
