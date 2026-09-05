// Function to move to next Slider
function nextSlide() {
  let currentSlide = scCarousel.querySelector(".sc-carousel-item.active"),
    newSlide =
      currentSlide.nextElementSibling ??
      scCarousel.querySelector(".sc-carousel-item:first-child"),
    currentName = newSlide.dataset.colorName;

  currentSlide.classList.remove("active");
  newSlide.classList.add("active");

  changeMainColor(currentName);

  updateImg(currentName, logoEle, "logo");
  correctImag.forEach(function (correctImg) {
    updateImg(currentName, correctImg, "correct");
  });
}

// Function to move to previuos Slider
function prevSlide() {
  let currentSlide = scCarousel.querySelector(".sc-carousel-item.active"),
    prevSlide =
      currentSlide.previousElementSibling ??
      scCarousel.querySelector(".sc-carousel-item:last-child"),
    currentName = prevSlide.dataset.colorName;

  currentSlide.classList.remove("active");
  prevSlide.classList.add("active");

  changeMainColor(currentName);

  updateImg(currentName, logoEle, "logo");
  correctImag.forEach(function (correctImg) {
    updateImg(currentName, correctImg, "correct");
  });
}

// Function to change website color
function changeMainColor(colorName) {
  let html = document.querySelector("html"),
    newColor = getComputedStyle(html).getPropertyValue(`--${colorName}-color`);
  html.style.setProperty("--main-color", newColor);
}

// Function to change logo website color
function updateImg(imgName, imgEle, commonName) {
  let logo = document.querySelector(".navbar img"),
    logoSrc = imgEle.src,
    logoSrcArr = logoSrc.split("/");
  logoSrcArr[logoSrcArr.length - 1] = `${imgName}-${commonName}.png`;
  let newLogoSrc = logoSrcArr.join("/");
  imgEle.setAttribute("src", newLogoSrc);
}

// Function to check if website has Scrolled
function checkScrolledNav() {
  if (window.scrollY > 10) {
    navBar.classList.add("scrolled");
  } else {
    navBar.classList.remove("scrolled");
  }
}

function updateNavLink(sectionId) {
  let section = document.querySelector(`#${sectionId}`),
    sectionTop = section.offsetTop,
    sectionHeight = section.clientHeight,
    sectionBottom = sectionTop + sectionHeight;

  if (window.scrollY > sectionTop && window.scrollY < sectionBottom) {
    let sectionId = section.getAttribute("id"),
      currentNavLink = navBar.querySelector(".nav-link.active"),
      navLinkOfSection = document.querySelector(`a[href="#${sectionId}"]`);
    currentNavLink.classList.remove("active");
    navLinkOfSection.classList.add("active");
  }
}

function prepareProduct(imagesList) {
  let imageEle = "";

  imagesList.forEach(function (image) {
    imageEle += `<li class="mainBorder p-2 rounded-2">
                        <img
                            src="./nike_images/products/${image}"
                            class="img-fluid"
                             onclick="changeImage ('${image}', this)"
                            alt=""
                        />
                        </li>`;
  });

  return imageEle;
}

function preparePrice(price, discount) {
  return `<p class="mb-0">
                <span class="text-decoration-line-through mainColor ${discount == 0 ? "d-none" : ""}"
                >${price} <sup>$</sup></span
                >
                <span>${(price - price * discount).toFixed(2)} <sup>$</sup></span>
            </p>`;
}

function prepareSize(sizeList) {
  let sizeEle = "";

  sizeList.forEach(function (size, index) {
    sizeEle += `<li class="rounded-2 mainBorder mainButton ${index == 0 ? 'active' : ''}" onclick=" changeActive (this);">${size}</li>`;
  });

  return sizeEle;
}

function prepareLiList(indicatorsList) {
  let indicatorEle = "";

  indicatorsList.forEach(function (indicator, index) {
    indicatorEle += `<li class="rounded-circle mainBorder mainButton ${index == 0 ? "active" : ""}" onclick="changeImage ('${indicator}', this); changeActive (this);" ></li>`;
  });

  return indicatorEle;
}

function changeImage(imgName, that) {
  let slectedImg = that.closest(".product").querySelector(".slectedImage img"),
    imgSrc = slectedImg.src,
    imgSrcArr = imgSrc.split("/");

  imgSrcArr[imgSrcArr.length - 1] = imgName;
  slectedImg.setAttribute("src", imgSrcArr.join("/"));
}

function changeActive (that){

    let currentActive = that.parentElement.querySelector(".active")
    currentActive.classList.remove("active")
    that.classList.add("active")
}

function openPopup(popupName) {
    let popupEle = document.querySelector(`.popup[data-popup-name="${popupName}"]`);
    popupEle.classList.add("active");
    setTimeout(function(){
        popupEle.classList.add("show")
    }, 1);
}

function closePopup (){
    let popupEle = document.querySelector(".popup");
    popupEle.classList.remove("show");
    setTimeout(function(){
        popupEle.classList.remove("active")
    }, 1000)
    
}