let scCarousel = document.querySelector("#SC-Carousel"),
  nextBtn = scCarousel.querySelector("button.next"),
  prevBtn = scCarousel.querySelector("button.prev");

nextBtn.addEventListener("click", function(){
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
