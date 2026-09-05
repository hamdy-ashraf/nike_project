let scCarousel = document.querySelector("#SC-Carousel"),
  nextBtn = scCarousel.querySelector("button.next"),
  prevBtn = scCarousel.querySelector("button.prev"),
  logoEle = document.querySelector("#Logo"),
  correctImag = document.querySelectorAll(".title img"),
  navBar = document.querySelector("nav.navbar"),
  navLinks = navBar.querySelectorAll(".nav-link"),
  sections = document.querySelectorAll("section, header"),
  latestContent = document.querySelector("#Latest .content"),
  featuredContent = document.querySelector("#Featured .content .row"),
  popupBoxes = document.querySelectorAll(".popup .box");
// console.log(popupKey);
checkScrolledNav();

nextBtn.addEventListener("click", function () {
  nextSlide();
});

prevBtn.addEventListener("click", prevSlide);

// Function to move to next Slider through Arrows Buttons
document.addEventListener("keydown", function (e) {
  if (e.key == "ArrowRight") {
    nextSlide();
  } else if (e.key == "ArrowLeft") {
    prevSlide();
  }
});

window.addEventListener("scroll", function () {
  checkScrolledNav();

  sections.forEach(function (section) {
    updateNavLink(section.id);
  });
});

navLinks.forEach(function (navLink) {
  navLink.addEventListener("click", function (e) {
    e.preventDefault();
    let currentNavLink = navBar.querySelector(".nav-link.active"),
      currentId = navLink.getAttribute("href"),
      currentSection = document.querySelector(currentId),
      topOfSection = currentSection.offsetTop;
    window.scrollTo(0, topOfSection - navBar.clientHeight);
    currentNavLink.classList.remove("active");
    navLink.classList.add("active");
    changeActiveBySection(navLink);
  });
});

window.addEventListener("DOMContentLoaded", function () {});

latest.forEach(function (product) {
  latestContent.innerHTML += `
    <div class="product">
        <div class="row mainBorder bg-light p-3 rounded-3 mb-3">
            <div class="col-lg-6 part1">
            <div class="item">
                <div class="row">
                <div class="col-md-2 box1">
                    <div class="item">
                    <ul
                        class="list-unstyled d-flex flex-row flex-md-column row-gap-md-2 column-gap-2"
                    >
                        ${prepareProduct(product.images)}
                    </ul>
                    </div>
                </div>
                <div class="col-md-10 box2">
                    <div
                    class="item h-100"
                    >
                    <div class="slectedImage d-flex justify-content-center align-items-center">
                    <img
                        src="./nike_images/products/${product.images[0]}"
                        class="img-fluid"
                        alt=""
                    />
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
            <div class="col-lg-6 part2">
            <div class="item d-flex flex-column row-gap-2">
                <h2 class="mainColor">${product.name}</h2>
                <p>
                ${product.description}
                </p>
                <div class="price d-flex column-gap-3">
                <h6>Price :</h6>
                    ${preparePrice(product.price, product.discount)}
                </div>
                <div class="size d-flex column-gap-3 list-unstyled">
                <h6>Size :</h6>
                <ul class="d-flex column-gap-2 p-0">
                    ${prepareSize(product.sizes)}
                </ul>
                </div>
                <button class="btn mainColor mainBorder">Add To Card</button>
            </div>
            </div>
        </div>
    </div>`;
});

features.forEach(function (product) {
  featuredContent.innerHTML += `
        <div class="col-lg-3 col-md-6">
            <div class="item bg-light p-4 rounded-3 overflow-hidden">
            <div class="product position-relative">
                <div class="discount text-center ${product.discount == 0 ? "d-none" : ""}">${product.discount * 100}%</div>
                <div class="head">
                <div class="slectedImage">
                <img
                    src="./nike_images/products/${product.images[0]}"
                    class="img-fluid"
                    alt=""
                />
                </div>
                </div>
                <div class="icons">
                <i
                    class="fas fa-search key mb-3 d-flex justify-content-center align-items-center rounded-circle m-auto"
                ></i>
                <ul
                    class="list-unstyled d-flex justify-content-center align-items-center column-gap-2"
                >
                    ${prepareLiList(product.images)}
                </ul>
                </div>
                <div class="body text-center">
                <p>${product.name}</p>
                ${preparePrice(product.price, product.discount)}
                </div>
            </div>
            </div>
        </div>
            `;
});

popupBoxes.forEach(function (box) {
  box.addEventListener("click", function (e) {
    e.stopPropagation();
  });
});
