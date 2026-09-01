// Function to move to next Slider
function nextSlide() {
  let currentSlide = scCarousel.querySelector(".sc-carousel-item.active"),
    newSlide =
      currentSlide.nextElementSibling ??
      scCarousel.querySelector(".sc-carousel-item:first-child");

  currentSlide.classList.remove("active");
  newSlide.classList.add("active");

  changeMainColor(newSlide.dataset.colorName);

  updateLogo(newSlide.dataset.colorName);
}

// Function to move to previuos Slider
function prevSlide() {
  let currentSlide = scCarousel.querySelector(".sc-carousel-item.active"),
    prevSlide =
      currentSlide.previousElementSibling ??
      scCarousel.querySelector(".sc-carousel-item:last-child");

  currentSlide.classList.remove("active");
  prevSlide.classList.add("active");

  changeMainColor(prevSlide.dataset.colorName);

  updateLogo(prevSlide.dataset.colorName);
}

// Function to change website color
function changeMainColor(colorName) {
  let html = document.querySelector("html"),
    newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);
  html.style.setProperty("--main-color", newColor);
}

// Function to change logo website color
function updateLogo(logoName) {
  let logo = document.querySelector(".navbar img"),
    logoSrc = logo.src,
    logoSrcArr = logoSrc.split("/");
  logoSrcArr[logoSrcArr.length - 1] = `${logoName}-logo.png`;
  let newLogoSrc = logoSrcArr.join("/");
  logo.setAttribute("src", newLogoSrc);

}
