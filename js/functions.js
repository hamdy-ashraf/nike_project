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

function prepareProduct(imagesList, isProduct = false) {
  let imageEle = "";

  imagesList.forEach(function (image) {
    imageEle += `<li class="${isProduct ? "" : "mainBorder rounded-2"} p-2">
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

function prepareSize(sizeList, isProductCard = null) {
  let sizeEle = "";

  sizeList.forEach(function (size, index) {
    if (isProductCard == null) {
      sizeEle += `<li class="rounded-2 mainBorder mainButton ${index == 0 ? "active" : ""}" onclick="changeActive (this); updateSize('${size}', this);">${size}</li>`;
    } else {
      sizeEle += `<li class="rounded-2 mainBorder mainButton ${isProductCard.size == size ? "active" : ""}" onclick="changeActive (this); updateSize('${size}', this);">${size}</li>`;
    }
  });

  return sizeEle;
}

function prepareColor(colorList, isProductCard = null) {
  let colorEle = "";

  colorList.forEach(function (color, index) {
    if (isProductCard == null) {
      colorEle += `<li
                        class="rounded-circle mainBorder mainButton ${index == 0 ? "active" : ""}"
                        onclick="changeActive(this); updateColor('${color}', this);"
                        style="background-color: ${color}"
                      ></li>`;
    } else {
      colorEle += `<li
                        class="rounded-circle mainBorder mainButton ${isProductCard.color == color ? "active" : ""}"
                        onclick="changeActive(this); updateColor('${color}', this);"
                        style="background-color: ${color}"
                      ></li>`;
    }
  });

  return colorEle;
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

function changeActive(that) {
  let currentActive = that.parentElement.querySelector(".active");
  currentActive.classList.remove("active");
  that.classList.add("active");
}

function openPopup(popupName) {
  let popupEle = document.querySelector(
    `.popup[data-popup-name="${popupName}"]`,
  );
  popupEle.classList.add("active");
  setTimeout(function () {
    popupEle.classList.add("show");
  }, 1);
}

function closePopup(popupName) {
  let popupEle = document.querySelector(
    `.popup[data-popup-name="${popupName}"]`,
  );
  popupEle.classList.remove("show");
  setTimeout(function () {
    popupEle.classList.remove("active");
  }, 1000);
}

function getProduct(productId) {
  return products.filter(function (product) {
    return product.id == productId;
  })[0];
}

function showProduct(productId) {
  let product = getProduct(productId),
    popupProduct = document.querySelector(
      `.popup[data-popup-name="product"] .box`,
    );

  let isProductCard = checkIsProduct(product.id);
  //   console.log(product);
  popupProduct.innerHTML = `
    <div class="product" data-slected-size="${isProductCard?.size ?? product.sizes[0]}" data-slected-color="${isProductCard?.color ?? product.colors[0]}">
          <div class="row">
            <div class="col-lg-6">
              <div class="item">
                <div class="slectedImage">
                  <img
                    src="./nike_images/products/${product.images[0]}"
                    class="img-fluid"
                    alt=""
                  />
                </div>
                <ul class="d-flex list-unstyled">
                  ${prepareProduct(product.images, true)}
                </ul>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="item">
                <h4>${product.name}</h4>
                ${preparePrice(product.price, product.discount)}
                <hr />
                <p>${product.description}</p>
                <div class="size d-flex column-gap-3 list-unstyled">
                  <h6>Size :</h6>
                  <ul class="d-flex column-gap-2 p-0">
                    ${prepareSize(product.sizes, isProductCard)}
                  </ul>
                </div>
                <div class="color d-flex column-gap-3">
                  <h6>Color :</h6>
                  <ul class="d-flex column-gap-2 p-0 list-unstyled">
                    ${prepareColor(product.colors, isProductCard)}
                  </ul>
                </div>
                ${
                  isProductCard == null
                    ? `<button class="btn mainColor mainBorder" onclick="addToCard(${product.id}, this);">Add To Card</button>`
                    : `<button class="btn mainColor mainBorder remove" onclick="removeFromCard(${product.id}, this);">Remove From Card</button>`
                }
              </div>
            </div>
          </div>
        </div>
    `;
}

// Function to add to card
function addToCard(productId, that) {
  let newOrder = that.closest(".product"),
    productEle = {
      id: productId,
      size: newOrder.dataset.slectedSize,
      color: newOrder.dataset.slectedColor,
    };

  cardProducts.push(productEle);
  updateLocalStorage();
  that.setAttribute("onclick", `removeFromCard(${productId},this)`);
  toggleOrderBtn(that, "remove");
}

function removeFromCard(productId, that) {
  cardProducts = cardProducts.filter(function (product) {
    return product.id != productId;
  });

  updateLocalStorage();

  that.setAttribute("onclick", `addToCard(${productId},this)`);
  toggleOrderBtn(that, "add");
}

function toggleOrderBtn(btn, status) {
  if (status == "add") {
    btn.classList.remove("remove");
    btn.textContent = "Add To Card";
  } else if (status == "remove") {
    btn.classList.add("remove");
    btn.textContent = "Remove From Card";
  }
}

function updateSize(size, that) {
  let productEle = that.closest(".product");
  productEle.dataset.slectedSize = size;
}

function updateColor(color, that) {
  let productEle = that.closest(".product");
  productEle.dataset.slectedColor = color;
}

function updateLocalStorage() {
  localStorage.setItem("products", JSON.stringify(cardProducts));
}

function checkIsProduct(productId) {
  let result = cardProducts.filter(function (product) {
    return product.id == productId;
  });

  return result.length == 1 ? result[0] : null;
}

function showAddOrRemove(products) {
  if (checkIsProduct()) {
  }
}

function showCard() {
  let shopPopupContent = document.querySelector(
    ".popup[data-popup-name='shop'] .box .row",
  );

  if (cardProducts.length == 0) {
    shopPopupContent.innerHTML = `<p class="alert alert-warning text-center">There are no products</p>`
  } else {
    shopPopupContent.innerHTML = "";

    cardProducts.forEach(function (cardProduct) {
      let product = getProduct(cardProduct.id);

      shopPopupContent.innerHTML += `
        <div class="col-4">
            <div class="item">
            <div class="product bg-light rounded-3 p-3 d-flex flex-column row-gap-2" data-product-id="${product.id}">
                <img
                src="./nike_images/products/${product.images[0]}"
                class="img-fluid"
                alt=""
                />
                <h4>${product.name.slice(0, 10)}...</h4>
                <div class="price d-flex column-gap-3">
                    <h6>Price :</h6>
                        ${preparePrice(product.price, product.discount)}
                    </div>
                <div class="size d-flex column-gap-3 list-unstyled">
                      <h6>Size :</h6>
                      <ul class="d-flex column-gap-2 p-0">
                        ${prepareSize([cardProduct.size])}
                      </ul>
                    </div>
                    <div class="color d-flex column-gap-3">
                      <h6>Color :</h6>
                      <ul class="d-flex column-gap-2 p-0 list-unstyled">
                        ${prepareColor([cardProduct.color])}
                      </ul>
                    </div>
                <button class="btn mainColor mainButton mainBorder w-100" onclick="removeFromShop(${product.id})">
                Remove
                </button>
            </div>
            </div>
        </div>
        `;
    });
  }

  openPopup("shop");
}

function removeFromShop(productId) {
  let shopProduct = document.querySelector(
    `.popup[data-popup-name="shop"] .box .product[data-product-id="${productId}"]`,
  );
  shopProduct.parentElement.parentElement;
  shopProduct.remove();

  let buttonOfLatestProduct = document.querySelector(
    `#Latest .product[data-product-id="${productId}"] button`,
  );

  removeFromCard(productId, buttonOfLatestProduct);

   let shopPopupContent = document.querySelector(
    ".popup[data-popup-name='shop'] .box .row",
  );
   if (cardProducts.length == 0) {
    shopPopupContent.innerHTML = `<p class="alert alert-warning text-center">There are no products</p>`
  }
}
