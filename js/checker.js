/*Сравнение похожих объявлений*/
/*
let mainMenu = document.querySelector(".main-nav");
let mainMenuButton = document.querySelector(".main-nav__toggle");
let interactiveMap = document.querySelector(".dealers__map-container");
let staticMap = document.querySelector(".dealers__map-wrapper");
let sliderImageBefore = document.querySelector(".example__image-before");
let sliderImageAfter = document.querySelector(".example__image-after");
let sliderButtonsContainer = document.querySelector(".example__slider-controls-wrapper");
let sliderIndicator = document.querySelector(".example__slider-toggle");


if(sliderButtonsContainer) {
  let slider = document.querySelector('.example__slider-container');
  let thumb = slider.querySelector('.example__slider-toggle');

thumb.onmousedown = function(event) {
  event.preventDefault();


      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);

      function onMouseMove(event) {
        if(slider.offsetWidth <= 84) return '';
        let newLeft = event.clientX - slider.getBoundingClientRect().left;

        if (newLeft < 5) {
          newLeft = thumb.offsetWidth/2;
      if(sliderImageBefore.classList.contains("example__image-hidden")) {
        sliderImageAfter.classList.toggle("example__image-hidden");
        sliderImageBefore.classList.toggle("example__image-hidden");
        sliderIndicator.classList.toggle("example__slider-toggle--after");
        sliderIndicator.classList.toggle("example__slider-toggle--before");
      }
        }

        let rightEdge = slider.offsetWidth - (thumb.offsetWidth/2);
        if (newLeft > rightEdge) {
          newLeft = rightEdge;
      if(sliderImageAfter.classList.contains("example__image-hidden")) {
        sliderImageBefore.classList.toggle("example__image-hidden");
        sliderImageAfter.classList.toggle("example__image-hidden");
        sliderIndicator.classList.toggle("example__slider-toggle--after");
        sliderIndicator.classList.toggle("example__slider-toggle--before");
      }

        }

        thumb.style.left = newLeft + 'px';
      }

      function onMouseUp() {
         if(slider.offsetWidth <= 84) return '';
        document.removeEventListener('mouseup', onMouseUp);
        document.removeEventListener('mousemove', onMouseMove);
      }

    };

    thumb.ondragstart = function() {
      return false;
    };


  sliderButtonsContainer.addEventListener("click", function(evt) {
    let slider = document.querySelector('.example__slider-container');
    let target = evt.target;
    if(target.classList.contains("example__slider-text--before")) {
      if(sliderImageBefore.classList.contains("example__image-hidden")) {
        sliderImageAfter.classList.toggle("example__image-hidden");
        sliderImageBefore.classList.toggle("example__image-hidden");
        sliderIndicator.classList.toggle("example__slider-toggle--after");
        sliderIndicator.classList.toggle("example__slider-toggle--before");
        if(slider.offsetWidth != 84) {
          thumb.style.left = thumb.offsetWidth/2 + 'px';
        }
      }
    }
    if(target.classList.contains("example__slider-text--after")) {
      if(sliderImageAfter.classList.contains("example__image-hidden")) {
        sliderImageBefore.classList.toggle("example__image-hidden");
        sliderImageAfter.classList.toggle("example__image-hidden");
        sliderIndicator.classList.toggle("example__slider-toggle--after");
        sliderIndicator.classList.toggle("example__slider-toggle--before");
        if(slider.offsetWidth != 84) {
          thumb.style.left = slider.offsetWidth - (thumb.offsetWidth/2) + 'px';
        }
      }
    }
  });

  document.addEventListener('resize', function (evt) {
    alert(document.documentElement.clientWidth);
  })
}

if(mainMenu.classList.contains("main-nav--withoutjs")) {
  mainMenu.classList.remove("main-nav--withoutjs")
}

mainMenuButton.addEventListener("click", function() {
  mainMenu.classList.toggle('main-nav--closed');
  mainMenu.classList.toggle('main-nav--opened');
});

if(interactiveMap.classList.contains("invisible")) {
  interactiveMap.classList.toggle("invisible");
  staticMap.classList.toggle("invisible");
}
*/
