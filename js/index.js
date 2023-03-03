/******/ (function() { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ 623:
/***/ (function() {

function clampBuilder(minWidthPx, maxWidthPx, minFontSize, maxFontSize) {
  var root = document.querySelector('html');
  var pixelsPerRem = Number(getComputedStyle(root).fontSize.slice(0, -2));
  var minWidth = minWidthPx / pixelsPerRem;
  var maxWidth = maxWidthPx / pixelsPerRem;
  var slope = (maxFontSize - minFontSize) / (maxWidth - minWidth);
  var yAxisIntersection = -minWidth * slope + minFontSize;
  return "clamp(".concat(minFontSize, "rem, ").concat(yAxisIntersection, "rem + ").concat(slope * 100, "vw, ").concat(maxFontSize, "rem)");
}

var div = document.querySelector('body');
var containerWidth = getComputedStyle(document.documentElement).getPropertyValue('--containerWidth');
div.style.fontSize = clampBuilder(320, containerWidth, .75, 1);

/***/ }),

/***/ 400:
/***/ (function() {

var popupLinks = document.querySelectorAll('.popup-link');
var body = document.querySelector('body');
var lockPadding = document.querySelectorAll('._lp');
var unlock = true;
var timeout = 800;

if (popupLinks.length > 0) {
  var _loop = function _loop(index) {
    var popupLink = popupLinks[index];
    popupLink.addEventListener("click", function (e) {
      var popupName = popupLink.getAttribute('href').replace('#', '');
      var curentPopup = document.getElementById(popupName);
      popupOpen(curentPopup);
      e.preventDefault();
    });
  };

  for (var index = 0; index < popupLinks.length; index++) {
    _loop(index);
  }
}

var popupCloseIcon = document.querySelectorAll('.modal__close');

if (popupCloseIcon.length > 0) {
  var _loop2 = function _loop2(_index) {
    var el = popupCloseIcon[_index];
    el.addEventListener('click', function (e) {
      popupClose(el.closest('.modal'));
      e.preventDefault();
    });
  };

  for (var _index = 0; _index < popupCloseIcon.length; _index++) {
    _loop2(_index);
  }
}

function popupOpen(curentPopup) {
  if (curentPopup && unlock) {
    var popupActive = document.querySelector('.modal._active');

    if (popupActive) {
      popupClose(popupActive, false);
    } else {
      bodyLock();
    }

    curentPopup.classList.add('_active');
    curentPopup.addEventListener("click", function (e) {
      if (!e.target.closest('.modal__content')) {
        popupClose(e.target.closest('.modal'));
      }
    });
  }
}

function popupClose(popupActive) {
  var doUnlock = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;

  if (unlock) {
    popupActive.classList.remove('_active');

    if (doUnlock) {
      bodyUnLock();
    }
  }
}

function bodyLock() {
  var lockPaddingValue = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';

  if (lockPadding.length > 0) {
    for (var _index2 = 0; _index2 < lockPadding.length; _index2++) {
      var el = lockPadding[_index2];
      el.style.paddingRight = lockPaddingValue;
    }
  }

  body.style.paddingRight = lockPaddingValue;
  body.classList.add('_lock');
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

function bodyUnLock() {
  setTimeout(function () {
    if (lockPadding.length > 0) {
      for (var _index3 = 0; _index3 < lockPadding.length; _index3++) {
        var el = lockPadding[_index3];
        el.style.paddingRight = '0px';
      }
    }

    body.style.paddingRight = '0px';
    body.classList.remove('_lock');
  }, timeout);
  unlock = false;
  setTimeout(function () {
    unlock = true;
  }, timeout);
}

document.addEventListener('keydown', function (e) {
  if (e.which === 27) {
    var popupActive = document.querySelector('.modal._active');
    popupClose(popupActive);
  }
});

(function () {
  // проверяем поддержку
  if (!Element.prototype.closest) {
    // реализуем
    Element.prototype.closest = function (css) {
      var node = this;

      while (node) {
        if (node.matches(css)) return node;else node = node.parentElement;
      }

      return null;
    };
  }
})();

(function () {
  // проверяем поддержку
  if (!Element.prototype.matches) {
    // определяем свойство
    Element.prototype.matches = Element.prototype.matchesSelector || Element.prototype.webkitMatchesSelector || Element.prototype.mozMatchesSelector || Element.prototype.msMatchesSelector;
  }
})();

/***/ }),

/***/ 94:
/***/ (function() {

var more = document.querySelectorAll('._more');
var widths = [0, 768, 850];

function resizeFn() {
  if (window.innerWidth >= widths[0] && window.innerWidth < widths[1]) {
    for (var i = 0; i < more.length; i++) {
      more[i].addEventListener('click', function () {
        var showPerClick = 4;
        var hidden = this.parentNode.querySelectorAll('._hidden');

        for (var i = 0; i < showPerClick; i++) {
          if (!hidden[i]) return this.outerHTML = ''; // hidden[i].classList.add('box');

          hidden[i].classList.remove('_hidden');
        }
      });
    }
  } else if (window.innerWidth >= widths[1] && window.innerWidth < widths[2]) {} else {}
}

window.onresize = resizeFn;
resizeFn();

/***/ }),

/***/ 362:
/***/ (function() {

/*--------------------------------------------------------ONE--------------------------------------------------------*/
var modalSliderOneHeight = document.getElementById('modal-slider-one-height');
var referencesModalThumbsOneHeight = document.getElementById('references-modal-thumbs-one-height');
var blockModal = document.querySelector('.rm-one .modal__content');

if (typeof blockModal != 'undefined' && blockModal != null) {
  window.addEventListener('resize', function () {
    var mB = getStyle(document.querySelector(".references-modal__slider_viewport"), "margin-bottom");
    var pT = getStyle(document.querySelector(".rm-one > .modal__content"), "padding-top");
    var pB = getStyle(document.querySelector(".rm-one > .modal__content"), "padding-bottom");
    var b1 = Number(pT.replace(/px$/, ''));
    var b2 = Number(pB.replace(/px$/, ''));
    var b3 = Number(mB.replace(/px$/, ''));
    var blockModalHeight = blockModal.clientHeight;
    var blockModalHeightTwo = referencesModalThumbsOneHeight.clientHeight;
    var totalBlockModalHeight = blockModalHeight - blockModalHeightTwo - b3 - (b1 + b2);
    modalSliderOneHeight.style.height = totalBlockModalHeight + 'px';
  });
  var mB = getStyle(document.querySelector(".references-modal__slider_viewport"), "margin-bottom");
  var pT = getStyle(document.querySelector(".rm-one > .modal__content"), "padding-top");
  var pB = getStyle(document.querySelector(".rm-one > .modal__content"), "padding-bottom");
  var b1 = Number(pT.replace(/px$/, ''));
  var b2 = Number(pB.replace(/px$/, ''));
  var b3 = Number(mB.replace(/px$/, ''));
  var blockModalHeight = blockModal.clientHeight;
  var blockModalHeightTwo = referencesModalThumbsOneHeight.clientHeight;
  var totalBlockModalHeight = blockModalHeight - blockModalHeightTwo - b3 - (b1 + b2);
  modalSliderOneHeight.style.height = totalBlockModalHeight + 'px';
}

function getStyle(oElm, strCssRule) {
  var strValue = "";

  if (document.defaultView && document.defaultView.getComputedStyle) {
    strValue = document.defaultView.getComputedStyle(oElm, "").getPropertyValue(strCssRule);
  } else if (oElm.currentStyle) {
    strCssRule = strCssRule.replace(/\-(\w)/g, function (strMatch, p1) {
      return p1.toUpperCase();
    });
    strValue = oElm.currentStyle[strCssRule];
  }

  return strValue;
}

/***/ }),

/***/ 228:
/***/ (function() {

if (typeof document.querySelector('.photo-products') != 'undefined' && document.querySelector('.photo-products') != null) {
  var showMore = document.querySelector('.photo-products-btn');
  var productsLength = document.querySelectorAll('._card').length;
  var items = 9;
  showMore.addEventListener('click', function () {
    items += 3;
    var array = Array.from(document.querySelector('.catalog__right-body').children);
    var visItems = array.slice(0, items);
    visItems.forEach(function (el) {
      return el.classList.remove('_hide');
    });

    if (visItems.length === productsLength) {
      showMore.style.display = 'none';
    }
  });
}

document.querySelectorAll('[data-filter]').forEach(function (item) {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    handleFilterItems(item);
  });
});

function handleFilterItems(filterItem) {
  if (filterItem.getAttribute('data-filter') === '' || filterItem.getAttribute('data-filter') === '._card') {
    document.querySelectorAll('[data-filter]').forEach(function (item) {
      item.classList.remove('_active');
    });
  } else {
    document.querySelector('[data-filter="._card"]').classList.remove('_active');
  }

  if (filterItem.classList.contains('_active')) {
    filterItem.classList.remove('_active');

    if (!document.querySelectorAll('[data-filter]._active').length) {
      document.querySelector('[data-filter="._card"]').classList.add('_active');
    }
  } else {
    filterItem.classList.add('_active');
  }

  handleFilterTeaser();
}

function handleFilterTeaser() {
  document.querySelectorAll('._card').forEach(function (item) {
    item.classList.add('hide');
  });

  if (document.querySelectorAll('[data-filter]._active').length === 0) {
    document.querySelectorAll('._card').forEach(function (item) {
      item.classList.remove('hide');
    });
  } else {
    document.querySelectorAll('[data-filter]._active').forEach(function (item) {
      var filterTag = item.getAttribute('data-filter');
      document.querySelectorAll(filterTag).forEach(function (tag) {
        tag.classList.remove('hide');
      });
    });
  }
}

if (typeof document.querySelector('.video') != 'undefined' && document.querySelector('.video') != null) {
  // function togglePlay() {
  // 	const playState = myVideo.paused ? 'play' : 'pause';
  // 	myVideo[playState]();
  // }
  var updateButton = function updateButton() {
    var togglePlayBtn = document.querySelector('._play');

    if (this.paused) {
      togglePlayBtn.style.display = 'flex';
    } else {
      togglePlayBtn.style.display = 'none';
    }
  };

  var Play = function Play() {
    myVideo.play();
  };

  var stopVideo = function stopVideo() {
    myVideo.pause();
    myVideo.currentTime = 0;
    myVideo.load();
    btnPlay.style.display = 'flex';
  };

  var myVideo = document.querySelector('.video-frame');
  var playBtn = document.querySelector('._play');
  var modalClose = document.querySelector('.video-stop');
  var btnPlay = document.querySelector('._play');
  modalClose.addEventListener('click', stopVideo);
  playBtn.addEventListener('click', Play);
  myVideo.addEventListener('play', updateButton);
  myVideo.addEventListener('pause', updateButton);
}

/***/ }),

/***/ 784:
/***/ (function() {

var sidebar = document.querySelector('.sidebar');
var $header = document.getElementById('header');
var topNavHover = document.getElementById('top-nav-hover');
var tableHeaderOne = document.getElementById('table-header-one');
var tableHeaderTwo = document.getElementById('table-header-two');
var w = document.documentElement.clientWidth;
var offsetHeightHeader = $header.offsetHeight;
var element = document.getElementById('elementId');

if (typeof sidebar != 'undefined' && sidebar != null) {
  sidebar.style.top = offsetHeightHeader + 20 + 'px';

  if (w > 768) {
    window.addEventListener('resize', function () {
      var offsetHeightHeaderResize = $header.offsetHeight;
      sidebar.style.top = offsetHeightHeaderResize + 20 + 'px';
    });
  } else {
    sidebar.style.top = offsetHeightHeader + 20 + 'px';
  }
}

if (typeof document.querySelector('._resistance') != 'undefined' && document.querySelector('._resistance') != null) {
  sidebar.style.top = offsetHeightHeader + 20 + 'px';
  topNavHover.style.top = offsetHeightHeader + 'px';
  tableHeaderOne.style.top = offsetHeightHeader + 99 + 'px';
  tableHeaderTwo.style.top = offsetHeightHeader + 99 + 'px';

  if (w > 768) {
    window.addEventListener('resize', function () {
      var offsetHeightHeaderResize = $header.offsetHeight;
      sidebar.style.top = offsetHeightHeaderResize + 20 + 'px';
      topNavHover.style.top = offsetHeightHeaderResize + 'px';
      tableHeaderOne.style.top = offsetHeightHeaderResize + 99 + 'px';
      tableHeaderTwo.style.top = offsetHeightHeaderResize + 99 + 'px';
    });
  } else {
    sidebar.style.top = offsetHeightHeader + 20 + 'px';
    topNavHover.style.top = offsetHeightHeader + 'px';
    tableHeaderOne.style.top = offsetHeightHeader + 99 + 'px';
    tableHeaderTwo.style.top = offsetHeightHeader + 99 + 'px';
  }

  window.addEventListener('scroll', function () {
    if (document.documentElement.scrollTop > offsetHeightHeader) {
      topNavHover.classList.add('_add-style');
    } else {
      topNavHover.classList.remove('_add-style');
    }
  });
}

if (typeof document.querySelector('._questionnaires') != 'undefined' && document.querySelector('._questionnaires') != null) {
  topNavHover.style.top = offsetHeightHeader + 'px';

  if (w > 768) {
    window.addEventListener('resize', function () {
      var offsetHeightHeaderResize = $header.offsetHeight;
      topNavHover.style.top = offsetHeightHeaderResize + 'px';
    });
  } else {
    topNavHover.style.top = offsetHeightHeader + 'px';
  }

  window.addEventListener('scroll', function () {
    if (document.documentElement.scrollTop > offsetHeightHeader) {
      topNavHover.classList.add('_add-style');
    } else {
      topNavHover.classList.remove('_add-style');
    }
  });
}

if (typeof document.querySelector('._questionnaires-thanks') != 'undefined' && document.querySelector('._questionnaires-thanks') != null) {
  topNavHover.style.top = offsetHeightHeader + 'px';

  if (w > 768) {
    window.addEventListener('resize', function () {
      var offsetHeightHeaderResize = $header.offsetHeight;
      topNavHover.style.top = offsetHeightHeaderResize + 'px';
    });
  } else {
    topNavHover.style.top = offsetHeightHeader + 'px';
  }

  window.addEventListener('scroll', function () {
    if (document.documentElement.scrollTop > offsetHeightHeader) {
      topNavHover.classList.add('_add-style');
    } else {
      topNavHover.classList.remove('_add-style');
    }
  });
}

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
!function() {
"use strict";

;// CONCATENATED MODULE: ./src/js/files/checks.js
var ua = window.navigator.userAgent;
var msie = ua.indexOf('MSIE ');
var isMobile = {
  Android: function Android() {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function BlackBerry() {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function iOS() {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function Opera() {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function Windows() {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function any() {
    return isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows();
  }
};

function isIE() {
  ua = navigator.userAgent;
  return ua.indexOf('MSIE ') > -1 || ua.indexOf('Trident/') > -1;
}

if (isIE()) {
  document.querySelector('html').classList.add('_ie');
}

if (isMobile.any()) {
  document.querySelector('html').classList.add('_touch');
}

function testWebP(callback) {
  var webP = new Image();

  webP.onload = webP.onerror = function () {
    callback(webP.height === 2);
  };

  webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
}

testWebP(function (support) {
  if (support === true) {
    document.querySelector('html').classList.add('_webp');
  } else {
    document.querySelector('html').classList.add('_no-webp');
  }
});

function ibg() {
  if (isIE()) {
    var _ibg = document.querySelectorAll('._ibg');

    for (var i = 0; i < _ibg.length; i++) {
      if (_ibg[i].querySelector('img') && _ibg[i].querySelector('img').getAttribute('src') != null) {
        _ibg[i].style.backgroundImage = 'url(' + _ibg[i].querySelector('img').getAttribute('src') + ')';
      }
    }
  }
}

ibg();
window.addEventListener('load', function () {
  if (document.querySelector('.wrapper')) {
    setTimeout(function () {
      document.querySelector('.wrapper').classList.add('_loaded');
    }, 0);
  }
});
// EXTERNAL MODULE: ./src/js/files/calculate.js
var calculate = __webpack_require__(623);
;// CONCATENATED MODULE: ./src/js/files/lock.js
var unlock = true;
function body_lock(delay) {
  var body = document.querySelector('body');

  if (body.classList.contains('_lock')) {
    body_lock_remove(delay);
  } else {
    body_lock_add(delay);
  }
}
function body_lock_remove(delay) {
  var body = document.querySelector('body');

  if (unlock) {
    var lock_padding = document.querySelectorAll('._lp');
    setTimeout(function () {
      for (var index = 0; index < lock_padding.length; index++) {
        var el = lock_padding[index];
        el.style.paddingRight = '0px';
      }

      body.style.paddingRight = '0px';
      body.classList.remove('_lock');
    }, delay);
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
function body_lock_add(delay) {
  var body = document.querySelector('body');

  if (unlock) {
    var lock_padding = document.querySelectorAll('._lp');

    for (var index = 0; index < lock_padding.length; index++) {
      var el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }

    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    body.classList.add('_lock');
    unlock = false;
    setTimeout(function () {
      unlock = true;
    }, delay);
  }
}
;// CONCATENATED MODULE: ./src/pug/includes/burger/burger.js

var bodyLockStatus = true;

var bodyLockToggle = function bodyLockToggle() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;

  if (document.documentElement.classList.contains('_lock')) {
    bodyUnlock(delay);
  } else {
    bodyLock(delay);
  }
};

var bodyUnlock = function bodyUnlock() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  var body = document.querySelector("body");

  if (bodyLockStatus) {
    var lock_padding = document.querySelectorAll("._lp");
    setTimeout(function () {
      for (var index = 0; index < lock_padding.length; index++) {
        var el = lock_padding[index];
        el.style.paddingRight = '0px';
      }

      body.style.paddingRight = '0px';
      document.documentElement.classList.remove("_lock");
    }, delay);
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
};

var bodyLock = function bodyLock() {
  var delay = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 500;
  var body = document.querySelector("body");

  if (bodyLockStatus) {
    var lock_padding = document.querySelectorAll("._lp");

    for (var index = 0; index < lock_padding.length; index++) {
      var el = lock_padding[index];
      el.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    }

    body.style.paddingRight = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
    document.documentElement.classList.add("_lock");
    bodyLockStatus = false;
    setTimeout(function () {
      bodyLockStatus = true;
    }, delay);
  }
}; //Добавление класса бургеру===================================================================================


var iconMenu = document.querySelector(".icon-menu");
var menuBody = document.querySelector('.menu__body');
var menuClose = document.querySelector('.menu__close');

if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    if (unlock) {
      body_lock();
      iconMenu.classList.toggle('_active');
      menuBody.classList.toggle('_active');
    }
  });
}

if (menuClose) {
  menuClose.addEventListener("click", function (e) {
    if (unlock) {
      body_lock();
      menuClose.classList.remove('_active');
      menuBody.classList.remove('_active');
    }
  });
} //Прокрутка по клику и закрытие меню============================================================================


var menuLinks = document.querySelectorAll('._link[data-link]');

if (menuLinks.length > 0) {
  var onMenuLinkClick = function onMenuLinkClick(e) {
    var menuLink = e.target;

    if (menuLink.dataset.link && document.querySelector(menuLink.dataset.link)) {
      var linkBlock = document.querySelector(menuLink.dataset.link);
      var linkBlockValue = linkBlock.getBoundingClientRect().top + pageYOffset - document.querySelector('header').offsetHeight;

      if (iconMenu.classList.contains('_active')) {
        if (unlock) {
          body_lock();
          iconMenu.classList.toggle('_active');
          menuBody.classList.toggle('_active');
        }
      }

      window.scrollTo({
        top: linkBlockValue,
        behavior: "smooth"
      });
      e.preventDefault();
    }
  };

  menuLinks.forEach(function (menuLink) {
    menuLink.addEventListener("click", onMenuLinkClick);
  });
}
// EXTERNAL MODULE: ./src/js/files/popup.js
var popup = __webpack_require__(400);
;// CONCATENATED MODULE: ./src/js/files/spoiler.js
var spoilers = document.querySelectorAll("._spoiler");
var spoilersGo = true;

if (spoilers.length > 0) {
  var _loop = function _loop(index) {
    var spoiler = spoilers[index];
    spoiler.addEventListener("click", function (e) {
      if (spoilersGo) {
        spoilersGo = false;

        if (spoiler.classList.contains('_spoiler-992') && window.innerWidth > 992) {
          return false;
        }

        if (spoiler.classList.contains('_spoiler-768') && window.innerWidth > 768) {
          return false;
        }

        if (spoiler.closest('._spoilers').classList.contains('_one')) {
          var current_spoilers = spoiler.closest('._spoilers').querySelectorAll('._spoiler');

          for (var i = 0; i < current_spoilers.length; i++) {
            var el = current_spoilers[i];

            if (el !== spoiler) {
              el.classList.remove('_active');

              _slideUp(el.nextElementSibling);
            }
          }
        }

        spoiler.classList.toggle('_active');

        _slideToggle(spoiler.nextElementSibling);

        setTimeout(function () {
          spoilersGo = true;
        }, 500);
      }
    });
  };

  for (var index = 0; index < spoilers.length; index++) {
    _loop(index);
  }
}

var _slideUp = function _slideUp(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.transitionProperty = 'height, margin, padding';
  target.style.transitionDuration = duration + 'ms';
  target.style.height = target.offsetHeight + 'px';
  target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  window.setTimeout(function () {
    target.style.display = 'none';
    target.style.removeProperty('height');
    target.style.removeProperty('padding-top');
    target.style.removeProperty('padding-bottom');
    target.style.removeProperty('margin-top');
    target.style.removeProperty('margin-bottom');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};
var _slideDown = function _slideDown(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  target.style.removeProperty('display');
  var display = window.getComputedStyle(target).display;
  if (display === 'none') display = 'block';
  target.style.display = display;
  var height = target.offsetHeight;
  target.style.overflow = 'hidden';
  target.style.height = 0;
  target.style.paddingTop = 0;
  target.style.paddingBottom = 0;
  target.style.marginTop = 0;
  target.style.marginBottom = 0;
  target.offsetHeight;
  target.style.transitionProperty = "height, margin, padding";
  target.style.transitionDuration = duration + 'ms';
  target.style.height = height + 'px';
  target.style.removeProperty('padding-top');
  target.style.removeProperty('padding-bottom');
  target.style.removeProperty('margin-top');
  target.style.removeProperty('margin-bottom');
  window.setTimeout(function () {
    target.style.removeProperty('height');
    target.style.removeProperty('overflow');
    target.style.removeProperty('transition-duration');
    target.style.removeProperty('transition-property');
    target.classList.remove('_slide');
  }, duration);
};
var _slideToggle = function _slideToggle(target) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;

  if (!target.classList.contains('_slide')) {
    target.classList.add('_slide');

    if (window.getComputedStyle(target).display === 'none') {
      return _slideDown(target, duration);
    } else {
      return _slideUp(target, duration);
    }
  }
};
// EXTERNAL MODULE: ./src/js/files/showmore.js
var showmore = __webpack_require__(94);
;// CONCATENATED MODULE: ./src/pug/components/certificate/certificates/certificates.js

!function (e) {
  "function" != typeof e.matches && (e.matches = e.msMatchesSelector || e.mozMatchesSelector || e.webkitMatchesSelector || function (e) {
    for (var t = this, o = (t.document || t.ownerDocument).querySelectorAll(e), n = 0; o[n] && o[n] !== t;) {
      ++n;
    }

    return Boolean(o[n]);
  }), "function" != typeof e.closest && (e.closest = function (e) {
    for (var t = this; t && 1 === t.nodeType;) {
      if (t.matches(e)) return t;
      t = t.parentNode;
    }

    return null;
  });
}(window.Element.prototype);
document.addEventListener('DOMContentLoaded', function () {
  var modalButtons = document.querySelectorAll('._open-modal'),
      closeButtons = document.querySelectorAll('.modal__close');
  modalButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      e.preventDefault();
      var modalId = this.getAttribute('data-modal'),
          modalElem = document.querySelector('.modal[data-modal="' + modalId + '"]');
      modalElem.classList.add('_active');
      body_lock_add();
    });
  });
  closeButtons.forEach(function (item) {
    item.addEventListener('click', function (e) {
      var parentModal = this.closest('.modal');
      parentModal.classList.remove('_active');
      body_lock_remove();
    });
  });
  document.body.addEventListener('keyup', function (e) {
    var key = e.keyCode;

    if (key === 27) {
      document.querySelector('.modal._active').classList.remove('_active');
      document.querySelector('.overlay').classList.remove('_active');
    }

    ;
  }, false);
});
;// CONCATENATED MODULE: ./src/pug/components/references/references.js


if (typeof document.querySelector('.references') != 'undefined' && document.querySelector('.references') != null) {
  var referencesBody = document.querySelector('.references__body');
  var blockFilter = document.getElementById('references-filter');
  var blockThead = document.getElementById('table-header');
  var H = document.getElementById('header');
  var heightHeader = H.offsetHeight;
  var heightFilter = blockFilter.offsetHeight;
  blockFilter.style.top = heightHeader + 'px';
  blockThead.style.top = heightHeader + 95 + 'px';
  var w = document.documentElement.clientWidth;

  if (w > 1280 || isMobile.any()) {
    window.addEventListener('resize', function () {
      var heightHeaderResize = H.offsetHeight;
      blockFilter.style.top = heightHeaderResize + 'px';
      blockThead.style.top = heightHeaderResize + 95 + 'px';
    });
  } else {
    blockFilter.style.top = heightHeader + 'px';
    blockThead.style.top = heightHeader + 95 + 'px';
  }

  if (w > 1280) {
    window.addEventListener('scroll', function () {
      if (document.documentElement.scrollTop > heightHeader + (heightFilter + 37)) {
        referencesBody.classList.add('_scroll');
      } else {
        referencesBody.classList.remove('_scroll');
      }
    });
  }
}

document.querySelectorAll('[data-control]').forEach(function (item) {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    handleFilterItems(item);
  });
});

function handleFilterItems(filterItem) {
  if (filterItem.getAttribute('data-control') === '' || filterItem.getAttribute('data-control') === '.all') {
    document.querySelectorAll('[data-control]').forEach(function (item) {
      item.classList.remove('_active');
    });
  } else {
    document.querySelector('[data-control=".all"]').classList.remove('_active');
  }

  if (filterItem.classList.contains('_active')) {
    filterItem.classList.remove('_active');

    if (!document.querySelectorAll('[data-control]._active').length) {
      document.querySelector('[data-control=".all"]').classList.add('_active');
    }
  } else {
    filterItem.classList.add('_active');
  }

  handleFilterTeaser();
}

function handleFilterTeaser() {
  document.querySelectorAll('.all').forEach(function (item) {
    item.classList.add('_hidden');
  });

  if (document.querySelectorAll('[data-control]._active').length === 0) {
    document.querySelectorAll('.all').forEach(function (item) {
      item.classList.remove('_hidden');
    });
  } else {
    document.querySelectorAll('[data-control]._active').forEach(function (item) {
      var filterTag = item.getAttribute('data-control');
      var s = document.querySelectorAll('.table__subtitle');
      document.querySelectorAll(filterTag).forEach(function (tag) {
        tag.classList.remove('_hidden');
      });
    });
  }
}

document.querySelectorAll('[data-choice]').forEach(function (item) {
  item.addEventListener('click', function (event) {
    event.preventDefault();
    handleFilterItemsTwo(item);
  });
});

function handleFilterItemsTwo(filterItem) {
  if (filterItem.getAttribute('data-choice') === '' || filterItem.getAttribute('data-choice') === '.o') {
    document.querySelectorAll('[data-choice]').forEach(function (item) {});
  } else {
    document.querySelector('[data-choice=".o"]').classList.remove('active');
  }

  if (filterItem.classList.contains('active')) {
    filterItem.classList.remove('active');

    if (!document.querySelectorAll('[data-choice]._active').length) {
      document.querySelector('[data-choice=".o"]').classList.add('active');
    }
  } else {
    filterItem.classList.add('active');
  }

  handleFilterTeaserTwo();
}

function handleFilterTeaserTwo() {
  var values = [];
  document.querySelectorAll('.o').forEach(function (item) {});

  if (document.querySelectorAll('[data-choice].active').length === 0) {
    document.querySelectorAll('.o').forEach(function (item) {
      values.push(item.innerHTML);
    });
  } else {
    document.querySelectorAll('[data-choice].active').forEach(function (item) {
      var filterTag = item.getAttribute('data-choice');
      document.querySelectorAll(filterTag).forEach(function (tag) {
        values.push(tag.innerHTML);
      });
    });
  }

  document.querySelector('#choice').innerHTML = values.join(', ');
}
// EXTERNAL MODULE: ./src/pug/components/references/popups/references-modal-one/references-modal-one.js
var references_modal_one = __webpack_require__(362);
;// CONCATENATED MODULE: ./src/pug/components/user/user.js

var sidebarIconArrow = document.querySelectorAll('.sidebar__icon-arrow');
var sidebarList = document.querySelector('.sidebar__list');
var user_w = document.documentElement.clientWidth;

if (user_w < 768 || isMobile.any()) {
  sidebarIconArrow.forEach(function (item) {
    item.addEventListener('click', function () {
      sidebarList.classList.toggle('_show');
    });
  });
}
;// CONCATENATED MODULE: ./src/pug/components/catalog/product1/product1.js
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); Object.defineProperty(Constructor, "prototype", { writable: false }); return Constructor; }


document.addEventListener("click", documentActions);

function documentActions(e) {
  var targetElement = e.target;

  if (isMobile.any()) {
    if (targetElement.classList.contains('product__burger')) {
      targetElement.closest('.product__nav-hover-menu').classList.toggle('_hover');
    }

    if (!targetElement.closest('.product__nav-hover-menu') && document.querySelectorAll('.product__nav-hover-menu._hover').length > 0) {
      _removeClasses(document.querySelectorAll('.product__nav-hover-menu._hover'), "_hover");
    }

    if (!targetElement.closest('.menu__close') && document.querySelectorAll('.menu__body._active').length > 0) {
      _removeClasses(document.querySelectorAll('.menu__body._active'), "_hover");
    }
  }
}

function _removeClasses(el, class_name) {
  for (var i = 0; i < el.length; i++) {
    el[i].classList.remove(class_name);
  }
}

if (typeof document.querySelector('.catalog__card-text--show') != 'undefined' && document.querySelector('.catalog__card-text--show') != null) {
  var readMore = /*#__PURE__*/function () {
    function readMore() {
      _classCallCheck(this, readMore);

      this.content = '.catalog__card-text--show';
      this.buttonToggle = '.catalog__show-more-btn';
    }

    _createClass(readMore, [{
      key: "bootstrap",
      value: function bootstrap() {
        this.setNodes();
        this.init();
        this.addEventListeners();
      }
    }, {
      key: "setNodes",
      value: function setNodes() {
        this.nodes = {
          contentToggle: document.querySelector(this.content)
        };
        this.buttonToggle = this.nodes.contentToggle.parentElement.querySelector(this.buttonToggle);
      }
    }, {
      key: "init",
      value: function init() {
        var contentToggle = this.nodes.contentToggle;
        this.stateContent = contentToggle.innerHTML;
        contentToggle.innerHTML = "".concat(this.stateContent.substring(0, 500), "...");
      }
    }, {
      key: "addEventListeners",
      value: function addEventListeners() {
        this.buttonToggle.addEventListener('click', this.onClick.bind(this));
      }
    }, {
      key: "onClick",
      value: function onClick(event) {
        var targetEvent = event.currentTarget;
        var contentToggle = this.nodes.contentToggle;

        if (targetEvent.getAttribute('aria-checked') === 'true') {
          targetEvent.setAttribute('aria-checked', 'false');
          contentToggle.classList.add('_more');
          contentToggle.innerHTML = this.stateContent;
          this.buttonToggle.innerHTML = 'Читать меньше';
        } else {
          targetEvent.setAttribute('aria-checked', 'true');
          contentToggle.innerHTML = "".concat(this.stateContent.substring(0, 500), "...");
          contentToggle.classList.remove('_more');
          this.buttonToggle.innerHTML = 'Читать больше';
        }
      }
    }]);

    return readMore;
  }();

  var product1_w = document.documentElement.clientWidth;

  if (product1_w < 768 || isMobile.any()) {
    var initReadMore = new readMore();
    initReadMore.bootstrap();
  }
}

var tabs = document.querySelectorAll("._tabs");

var product1_loop = function _loop(index) {
  var tab = tabs[index];
  var tabs_items = tab.querySelectorAll("._tabs-item");
  var tabs_blocks = tab.querySelectorAll("._tab");

  var _loop2 = function _loop2(_index) {
    var tabs_item = tabs_items[_index];
    tabs_item.addEventListener("click", function (e) {
      for (var _index2 = 0; _index2 < tabs_items.length; _index2++) {
        var _tabs_item = tabs_items[_index2];

        _tabs_item.classList.remove('_active');

        tabs_blocks[_index2].classList.remove('_active');
      }

      tabs_item.classList.add('_active');

      tabs_blocks[_index].classList.add('_active');
    });
  };

  for (var _index = 0; _index < tabs_items.length; _index++) {
    _loop2(_index);
  }
};

for (var product1_index = 0; product1_index < tabs.length; product1_index++) {
  product1_loop(product1_index);
}

var product1_select = function select() {
  var selectHeader = document.querySelectorAll('.references__filter-choice');
  var selectItem = document.querySelectorAll('.references__item');
  selectHeader.forEach(function (item) {
    item.addEventListener('click', selectToggle);
  });
  selectItem.forEach(function (item) {
    item.addEventListener('click', selectChoose);
  });

  function selectToggle() {
    this.parentElement.classList.toggle('_active');
  }

  function selectChoose() {
    var select = this.closest('.product__filter-inner'),
        l = select.querySelector('.references__filter-choice'),
        currentText = select.querySelector('.references__filter-current');
    currentText.innerText = this.innerText;
    l.classList.remove('_active');
    var w = document.documentElement.clientWidth;

    if (w < 768 || isMobile.any()) {
      document.querySelector('.references__list').style.display = 'none';
    }
  }
};

var productFilter = document.getElementById('product-filter');

if (typeof productFilter != 'undefined' && productFilter != null) {
  product1_select();
}
// EXTERNAL MODULE: ./src/pug/components/specialist/photo-products/photo-products.js
var photo_products = __webpack_require__(228);
// EXTERNAL MODULE: ./src/pug/components/specialist/table-resistance/table-resistance.js
var table_resistance = __webpack_require__(784);
;// CONCATENATED MODULE: ./src/js/index.js

var page = document.getElementById('main');
var js_heightHeader = document.getElementById('header').offsetHeight;
var js_w = document.documentElement.clientWidth;
window.addEventListener('resize', function () {
  page.style.marginTop = js_heightHeader + 'px';
});

if (js_w > 768 || isMobile.any()) {
  page.style.marginTop = js_heightHeader + 'px';
}

var list = document.querySelectorAll('._item');

function accordion(e) {
  e.stopPropagation();

  if (this.classList.contains('_open')) {
    this.classList.remove('_open');
  } else if (this.parentElement.parentElement.classList.contains('_open')) {
    this.classList.add('_open');
  } else {
    for (var i = 0; i < list.length; i++) {
      list[i].classList.remove('_open');
    }

    this.classList.add('_open');
  }
}

for (var i = 0; i < list.length; i++) {
  list[i].addEventListener('click', accordion);
}














}();
/******/ })()
;