var interleaveOffset = 0.5;

var swiperOptions = {
  loop: true,
  speed: 1000,
  grabCursor: true,
  autoplay: true,
  watchSlidesProgress: true,
  mousewheelControl: true,
  keyboardControl: true,
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev"
  },
  on: {
    progress: function() {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        var slideProgress = swiper.slides[i].progress;
        var innerOffset = swiper.width * interleaveOffset;
        var innerTranslate = slideProgress * innerOffset;
        swiper.slides[i].querySelector(".slide-inner").style.transform =
          "translate3d(" + innerTranslate + "px, 0, 0)";
      }
    },
    touchStart: function() {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = "";
      }
    },
    setTransition: function(speed) {
      var swiper = this;
      for (var i = 0; i < swiper.slides.length; i++) {
        swiper.slides[i].style.transition = speed + "ms";
        swiper.slides[i].querySelector(".slide-inner").style.transition =
          speed + "ms";
      }
    }
  }
};

var swiper = new Swiper(".swiper-container", swiperOptions);

$(document).ready(function() {
  AOS.init({ disable: "mobile" });
});

/* For mobile support, delet the 'mobile' */

var t1 = new TimelineMax({ paused: true });

t1.to(".one", 0.8, {
  y: 6,
  rotation: 45,
  ease: Expo.easeInOut
});
t1.to(".two", 0.8, {
  y: -6,
  rotation: -45,
  ease: Expo.easeInOut,
  delay: -0.8
});

t1.to(".menu", 0.8, {
  top: "0%",
  ease: Expo.easeInOut,
  delay: -0.7
});

t1.staggerFrom(
  ".menu ul li",
  0.8,
  { x: -200, opacity: 0, ease: Expo.easeOut },
  0.3
);

t1.reverse();
$(document).on("click", ".toggle-btn", function() {
  t1.reversed(!t1.reversed());
});
$(document).on("click", "a", function() {
  t1.reversed(!t1.reversed());
});
