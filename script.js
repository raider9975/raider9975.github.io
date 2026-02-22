(function () {
  "use strict";

  // 프로필 사진 경로 시도: P.png → assets/P.png → placeholder
  var profileImg = document.querySelector(".profile-photo");
  if (profileImg) {
    var paths = ["P.png", "assets/P.png", "assets/placeholder.svg"];
    var tryIndex = 0;
    profileImg.addEventListener("error", function () {
      tryIndex++;
      if (tryIndex < paths.length) {
        this.src = paths[tryIndex];
      }
    });
    profileImg.addEventListener("load", function () {
      tryIndex = paths.length;
    });
  }

  var navLinks = document.querySelectorAll(".sidebar .nav-link");
  var sections = document.querySelectorAll("section[id]");

  function updateActiveNav() {
    var scrollY = window.scrollY || window.pageYOffset;
    var windowH = window.innerHeight;
    var trigger = scrollY + windowH * 0.35;

    sections.forEach(function (section) {
      var id = section.getAttribute("id");
      var rect = section.getBoundingClientRect();
      var top = rect.top + scrollY;
      var height = section.offsetHeight;

      if (trigger >= top && trigger < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove("nav-link--active");
          if (link.getAttribute("href") === "#" + id) {
            link.classList.add("nav-link--active");
          }
        });
      }
    });
  }

  navLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      var href = this.getAttribute("href");
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        var target = document.querySelector(href);
        if (target) {
          target.scrollIntoView({ behavior: "smooth", block: "start" });
        }
      }
    });
  });

  window.addEventListener("scroll", function () {
    updateActiveNav();
  });
  window.addEventListener("resize", updateActiveNav);
  updateActiveNav();

  // Section fade-in on scroll (Brittany-style)
  var observerOptions = {
    root: null,
    rootMargin: "0px 0px -80px 0px",
    threshold: 0.1
  };
  var observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
      }
    });
  }, observerOptions);

  sections.forEach(function (section) {
    observer.observe(section);
  });
})();
