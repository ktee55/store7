/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./resources/js/app.js":
/*!*****************************!*\
  !*** ./resources/js/app.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_bling_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/bling.js */ "./resources/js/components/bling.js");

(function ($, $$) {
  var listLandscape = function listLandscape() {
    var listimgs = $$('.item-list .square img');
    listimgs.forEach(function (listimg) {
      if (listimg.width > listimg.height) {
        listimg.parentNode.parentNode.classList.add('landscape');
      }
    });
  };
  listLandscape();
  var makeSquare = function makeSquare() {
    var squares = $$('.square');
    squares.forEach(function (square) {
      // console.log(square.offsetWidth);
      square.style.height = square.offsetWidth + 'px';
    });
  };
  if ($('.square')) {
    makeSquare();
  }
  var navbarCollapseFunction = function navbarCollapseFunction() {
    var triggers = $$('.navbar-toggler-icon');
    var navbars = $$('.navbar-collapse');
    function navbarToggle(i, e) {
      navbars[i].classList.toggle('collapse');
    }
    triggers.forEach(function (trigger, i) {
      return trigger.on('click', navbarToggle.bind(event, i));
    });

    // navbarToggler.on('click', function () {
    //   navbarCollapse.classList.toggle('collapse');
    // })

    // document.body.on('click', function (e) {
    //   // if(!e.target.classList.contains('navbar-toggler-icon')) {
    //   if (e.target !== navbarToggler) {
    //     navbarCollapse.classList.add('collapse');
    //   }
    // })
  }; //navbarCollapseFunction

  navbarCollapseFunction();
  if ($('#id_featured_image')) {
    $('#id_featured_image').on('change', function () {
      var filename = this.value.replace(/^.*[\\\/]/, '');
      $('#label_for_featured_image').innerHTML = filename;
    });
  }
  var multiFormControl = function multiFormControl() {
    // 画像アップロードフォームにて、2番目以降のフォームを隠す（１個だけ表示する）
    var hideOthers = function hideOthers(elem) {
      var el = document.querySelectorAll(elem);
      for (var i = 1; i < el.length; i++) {
        el[i].classList.add('hide');
        el[0].classList.add('mt-0');
      }
    }; // hideOthers

    // hideOthers('link-form'); //Post新規投稿ページ =>下記functionに統一=>
    hideOthers('.photo-form .multiField'); //Photo Upload Page
    // hideOthers('.item-form .multiField'); //Item Create Page

    // クリックで１個ずつフォームの表示・非表示
    var toggleForms = function toggleForms(elem) {
      var el = document.querySelectorAll(elem);
      var i = 1;
      if ($('#add-form')) {
        $('#add-form').on('click', function (e) {
          e.preventDefault();
          el[i].classList.remove('hide');
          i++;
        });
      }
      if ($('#remove-form')) {
        $('#remove-form').on('click', function (e) {
          i > 1 ? i-- : i;
          e.preventDefault();
          el[i].classList.add('hide');
        });
      }
    }; // toggleForms

    // toggleForms('link-form'); //Post新規投稿ページ =>下記functionに統一=>
    toggleForms('.photo-form .multiField'); //Photo Upload Page
    // toggleForms('.item-form .multiField');  //Item Create Page

    // 既にデータが入ってるフォームのみ表示
    function hideEmptyForms1(elem) {
      var linkForms = document.querySelectorAll(elem);
      linkForms.forEach(function (form) {
        var urlinput = form.querySelector('.urlinput');
        if (urlinput.value == "" || urlinput.value == null) {
          //空のフォームを非表示、表示/非表示をコントロール、"削除する"チェックボックスを非表示にする->SCSS
          form.classList.add('hide', 'togglable', 'url-empty');
        }
      });
      // PostにURLがひとつもない場合(新規投稿含む)、ひとつだけ空のフォームを表示
      var el = document.querySelectorAll('.no-urls .togglable')[0];
      if (el) {
        el.classList.remove('hide');
      }
      toggleForms('.togglable');
    } //hideEmptyFormas

    hideEmptyForms1('.link-form');
    function hideEmptyForms2(elem) {
      var imgForms = document.querySelectorAll(elem);
      imgForms.forEach(function (form) {
        if (!form.getElementsByTagName('a').length) {
          form.classList.add('hide', 'togglable', 'img-empty');
        }
      });
      // // ひとつだけ空のフォームを表示
      // document.querySelectorAll('.togglable')[0].classList.remove('hide');
      // Itemにその他画像がひとつもない場合(新規投稿含む)のみ、ひとつだけ空のフォームを表示
      var el = document.querySelectorAll('.no-data .togglable')[0];
      if (el) {
        el.classList.remove('hide');
      }
      toggleForms('.togglable');
    }
    hideEmptyForms2('.item-form .multiField');
  }; //multi_form_control

  multiFormControl();
  var imageFormThumbs = function imageFormThumbs() {
    var mainImgLink = document.querySelector('#div_id_image a');

    // let imgSrc = mainImgLink.getAttribute('href');
    // let containDiv = document.createElement('div');
    // containDiv.setAttribute('class', 'thumb-wrap');
    // containDiv.innerHTML = `<img src="${imgSrc}">`;
    // mainImgLink.parentNode.insertBefore(containDiv, mainImgLink.parentNode.firstChild);

    var mainImgThumb = document.querySelector('#main-thumb');
    mainImgLink.parentNode.insertBefore(mainImgThumb, mainImgLink.parentNode.firstChild);
    var otherImgLinks = document.querySelectorAll('.photo-formset .multiField a');
    var otherImgThumbs = document.querySelectorAll('.thumb-container img');
    otherImgLinks.forEach(function (link, i) {
      // let imgSrc = link.getAttribute('href');
      var containDiv = document.createElement('div');
      containDiv.setAttribute('class', 'thumb-wrap');
      // // let imgThumb = document.createElement('img');
      // // imgThumb.setAttribute('src', `${imgSrc}`);
      // containDiv.innerHTML = `<img src="${imgSrc}">`;
      // link.parentNode.insertBefore(containDiv, link.parentNode.firstChild);
      containDiv.appendChild(otherImgThumbs[i]);
      link.parentNode.insertBefore(containDiv, link.parentNode.firstChild);
    });
  };
  if ($('#div_id_image a')) {
    imageFormThumbs();
  }
  var modalControl = function modalControl() {
    var modals = $$('.modal');
    function expandModal(i, e) {
      modals[i].classList.add('show-modal');
    }
    function closeModal(i, e) {
      if (!e.target.classList.contains('keep-modal')) {
        modals[i].classList.remove('show-modal');
        // modals.forEach(modal => () => {
        //   modal.classList.remove('show-modal');
        // })
      }
    }

    var trigers = $$('.expand-modal');
    if ($('.expand-modal')) {
      trigers.forEach(function (triger, i) {
        return triger.on('click', expandModal.bind(event, i));
      });
      // $('.expand-modal').on('click', expandModal);
    }

    // modal.on('click', closeModal);
    modals.forEach(function (modal, i) {
      return modal.on('click', closeModal.bind(event, i));
    });
  }; // modal_control

  if ($('.modal')) {
    modalControl();
  }

  // // Without bing.js
  // let modal = document.querySelector('.modal');
  // let photos = document.querySelectorAll('#photos img');

  // function insertImage() {
  //   let image = '<a href="' + this.dataset.origin + '"><img src="' + this.dataset.medium + '"></a>';
  //   document.querySelector('#id_content').value += image;
  // }

  // function expandModal() {
  //   modal.classList.add('show');
  // }

  // function closeModal(e) {
  //   // console.log(e);
  //   // if(e.target==='form') return;
  //   modal.classList.remove('show');
  // }

  // photos.forEach( photo => photo.addEventListener('click', insertImage));

  // document.querySelector('#expand-modal').addEventListener('click', expandModal);

  // modal.addEventListener('click', closeModal);
})(_components_bling_js__WEBPACK_IMPORTED_MODULE_0__.$, _components_bling_js__WEBPACK_IMPORTED_MODULE_0__.$$);

/***/ }),

/***/ "./resources/js/components/bling.js":
/*!******************************************!*\
  !*** ./resources/js/components/bling.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "$": () => (/* binding */ $),
/* harmony export */   "$$": () => (/* binding */ $$)
/* harmony export */ });
// based on https://gist.github.com/paulirish/12fb951a8b893a454b32

var $ = document.querySelector.bind(document);
var $$ = document.querySelectorAll.bind(document);
Node.prototype.on = window.on = function (name, fn) {
  this.addEventListener(name, fn);
};
NodeList.prototype.__proto__ = Array.prototype; // eslint-disable-line

NodeList.prototype.on = NodeList.prototype.addEventListener = function (name, fn) {
  this.forEach(function (elem) {
    elem.on(name, fn);
  });
};


/***/ }),

/***/ "./resources/scss/styles.scss":
/*!************************************!*\
  !*** ./resources/scss/styles.scss ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
// extracted by mini-css-extract-plugin


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
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = __webpack_modules__;
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/chunk loaded */
/******/ 	(() => {
/******/ 		var deferred = [];
/******/ 		__webpack_require__.O = (result, chunkIds, fn, priority) => {
/******/ 			if(chunkIds) {
/******/ 				priority = priority || 0;
/******/ 				for(var i = deferred.length; i > 0 && deferred[i - 1][2] > priority; i--) deferred[i] = deferred[i - 1];
/******/ 				deferred[i] = [chunkIds, fn, priority];
/******/ 				return;
/******/ 			}
/******/ 			var notFulfilled = Infinity;
/******/ 			for (var i = 0; i < deferred.length; i++) {
/******/ 				var [chunkIds, fn, priority] = deferred[i];
/******/ 				var fulfilled = true;
/******/ 				for (var j = 0; j < chunkIds.length; j++) {
/******/ 					if ((priority & 1 === 0 || notFulfilled >= priority) && Object.keys(__webpack_require__.O).every((key) => (__webpack_require__.O[key](chunkIds[j])))) {
/******/ 						chunkIds.splice(j--, 1);
/******/ 					} else {
/******/ 						fulfilled = false;
/******/ 						if(priority < notFulfilled) notFulfilled = priority;
/******/ 					}
/******/ 				}
/******/ 				if(fulfilled) {
/******/ 					deferred.splice(i--, 1)
/******/ 					var r = fn();
/******/ 					if (r !== undefined) result = r;
/******/ 				}
/******/ 			}
/******/ 			return result;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/jsonp chunk loading */
/******/ 	(() => {
/******/ 		// no baseURI
/******/ 		
/******/ 		// object to store loaded and loading chunks
/******/ 		// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 		// [resolve, reject, Promise] = chunk loading, 0 = chunk loaded
/******/ 		var installedChunks = {
/******/ 			"/static_files/js/app": 0,
/******/ 			"static_files/css/styles": 0
/******/ 		};
/******/ 		
/******/ 		// no chunk on demand loading
/******/ 		
/******/ 		// no prefetching
/******/ 		
/******/ 		// no preloaded
/******/ 		
/******/ 		// no HMR
/******/ 		
/******/ 		// no HMR manifest
/******/ 		
/******/ 		__webpack_require__.O.j = (chunkId) => (installedChunks[chunkId] === 0);
/******/ 		
/******/ 		// install a JSONP callback for chunk loading
/******/ 		var webpackJsonpCallback = (parentChunkLoadingFunction, data) => {
/******/ 			var [chunkIds, moreModules, runtime] = data;
/******/ 			// add "moreModules" to the modules object,
/******/ 			// then flag all "chunkIds" as loaded and fire callback
/******/ 			var moduleId, chunkId, i = 0;
/******/ 			if(chunkIds.some((id) => (installedChunks[id] !== 0))) {
/******/ 				for(moduleId in moreModules) {
/******/ 					if(__webpack_require__.o(moreModules, moduleId)) {
/******/ 						__webpack_require__.m[moduleId] = moreModules[moduleId];
/******/ 					}
/******/ 				}
/******/ 				if(runtime) var result = runtime(__webpack_require__);
/******/ 			}
/******/ 			if(parentChunkLoadingFunction) parentChunkLoadingFunction(data);
/******/ 			for(;i < chunkIds.length; i++) {
/******/ 				chunkId = chunkIds[i];
/******/ 				if(__webpack_require__.o(installedChunks, chunkId) && installedChunks[chunkId]) {
/******/ 					installedChunks[chunkId][0]();
/******/ 				}
/******/ 				installedChunks[chunkId] = 0;
/******/ 			}
/******/ 			return __webpack_require__.O(result);
/******/ 		}
/******/ 		
/******/ 		var chunkLoadingGlobal = self["webpackChunkdj_ecommerce"] = self["webpackChunkdj_ecommerce"] || [];
/******/ 		chunkLoadingGlobal.forEach(webpackJsonpCallback.bind(null, 0));
/******/ 		chunkLoadingGlobal.push = webpackJsonpCallback.bind(null, chunkLoadingGlobal.push.bind(chunkLoadingGlobal));
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module depends on other loaded chunks and execution need to be delayed
/******/ 	__webpack_require__.O(undefined, ["static_files/css/styles"], () => (__webpack_require__("./resources/js/app.js")))
/******/ 	var __webpack_exports__ = __webpack_require__.O(undefined, ["static_files/css/styles"], () => (__webpack_require__("./resources/scss/styles.scss")))
/******/ 	__webpack_exports__ = __webpack_require__.O(__webpack_exports__);
/******/ 	
/******/ })()
;
//# sourceMappingURL=data:application/json;charset=utf-8;base64,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RUE7VUFDQTtVQUNBOztVQUVBO1VBQ0E7Ozs7O1dDekJBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsK0JBQStCLHdDQUF3QztXQUN2RTtXQUNBO1dBQ0E7V0FDQTtXQUNBLGlCQUFpQixxQkFBcUI7V0FDdEM7V0FDQTtXQUNBLGtCQUFrQixxQkFBcUI7V0FDdkM7V0FDQTtXQUNBLEtBQUs7V0FDTDtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7Ozs7O1dDM0JBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EseUNBQXlDLHdDQUF3QztXQUNqRjtXQUNBO1dBQ0E7Ozs7O1dDUEE7Ozs7O1dDQUE7V0FDQTtXQUNBO1dBQ0EsdURBQXVELGlCQUFpQjtXQUN4RTtXQUNBLGdEQUFnRCxhQUFhO1dBQzdEOzs7OztXQ05BOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBOztXQUVBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBLE1BQU0scUJBQXFCO1dBQzNCO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7V0FDQTtXQUNBOzs7OztVRWpEQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kai1lY29tbWVyY2UvLi9yZXNvdXJjZXMvanMvYXBwLmpzIiwid2VicGFjazovL2RqLWVjb21tZXJjZS8uL3Jlc291cmNlcy9qcy9jb21wb25lbnRzL2JsaW5nLmpzIiwid2VicGFjazovL2RqLWVjb21tZXJjZS8uL3Jlc291cmNlcy9zY3NzL3N0eWxlcy5zY3NzIiwid2VicGFjazovL2RqLWVjb21tZXJjZS93ZWJwYWNrL2Jvb3RzdHJhcCIsIndlYnBhY2s6Ly9kai1lY29tbWVyY2Uvd2VicGFjay9ydW50aW1lL2NodW5rIGxvYWRlZCIsIndlYnBhY2s6Ly9kai1lY29tbWVyY2Uvd2VicGFjay9ydW50aW1lL2RlZmluZSBwcm9wZXJ0eSBnZXR0ZXJzIiwid2VicGFjazovL2RqLWVjb21tZXJjZS93ZWJwYWNrL3J1bnRpbWUvaGFzT3duUHJvcGVydHkgc2hvcnRoYW5kIiwid2VicGFjazovL2RqLWVjb21tZXJjZS93ZWJwYWNrL3J1bnRpbWUvbWFrZSBuYW1lc3BhY2Ugb2JqZWN0Iiwid2VicGFjazovL2RqLWVjb21tZXJjZS93ZWJwYWNrL3J1bnRpbWUvanNvbnAgY2h1bmsgbG9hZGluZyIsIndlYnBhY2s6Ly9kai1lY29tbWVyY2Uvd2VicGFjay9iZWZvcmUtc3RhcnR1cCIsIndlYnBhY2s6Ly9kai1lY29tbWVyY2Uvd2VicGFjay9zdGFydHVwIiwid2VicGFjazovL2RqLWVjb21tZXJjZS93ZWJwYWNrL2FmdGVyLXN0YXJ0dXAiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgJCwgJCQgfSBmcm9tICcuL2NvbXBvbmVudHMvYmxpbmcuanMnO1xuXG4oZnVuY3Rpb24gKCQsICQkKSB7XG5cbiAgY29uc3QgbGlzdExhbmRzY2FwZSA9ICgpID0+IHtcbiAgICBsZXQgbGlzdGltZ3MgPSAkJCgnLml0ZW0tbGlzdCAuc3F1YXJlIGltZycpO1xuICAgIGxpc3RpbWdzLmZvckVhY2goKGxpc3RpbWcpID0+IHtcbiAgICAgIGlmIChsaXN0aW1nLndpZHRoID4gbGlzdGltZy5oZWlnaHQpIHtcbiAgICAgICAgbGlzdGltZy5wYXJlbnROb2RlLnBhcmVudE5vZGUuY2xhc3NMaXN0LmFkZCgnbGFuZHNjYXBlJylcbiAgICAgIH1cbiAgICB9KVxuICB9XG4gIGxpc3RMYW5kc2NhcGUoKTtcblxuICBjb25zdCBtYWtlU3F1YXJlID0gKCkgPT4ge1xuXG4gICAgbGV0IHNxdWFyZXMgPSAkJCgnLnNxdWFyZScpO1xuXG4gICAgc3F1YXJlcy5mb3JFYWNoKChzcXVhcmUpID0+IHtcbiAgICAgIC8vIGNvbnNvbGUubG9nKHNxdWFyZS5vZmZzZXRXaWR0aCk7XG4gICAgICBzcXVhcmUuc3R5bGUuaGVpZ2h0ID0gc3F1YXJlLm9mZnNldFdpZHRoICsgJ3B4JztcbiAgICB9KTtcblxuICB9XG5cbiAgaWYgKCQoJy5zcXVhcmUnKSkge1xuICAgIG1ha2VTcXVhcmUoKTtcbiAgfVxuXG4gIGNvbnN0IG5hdmJhckNvbGxhcHNlRnVuY3Rpb24gPSAoKSA9PiB7XG5cbiAgICBsZXQgdHJpZ2dlcnMgPSAkJCgnLm5hdmJhci10b2dnbGVyLWljb24nKVxuICAgIGxldCBuYXZiYXJzID0gJCQoJy5uYXZiYXItY29sbGFwc2UnKVxuXG4gICAgZnVuY3Rpb24gbmF2YmFyVG9nZ2xlKGksIGUpIHtcbiAgICAgIG5hdmJhcnNbaV0uY2xhc3NMaXN0LnRvZ2dsZSgnY29sbGFwc2UnKTtcbiAgICB9XG4gICAgdHJpZ2dlcnMuZm9yRWFjaCgodHJpZ2dlciwgaSkgPT4gdHJpZ2dlci5vbignY2xpY2snLCBuYXZiYXJUb2dnbGUuYmluZChldmVudCwgaSkpKTtcblxuICAgIC8vIG5hdmJhclRvZ2dsZXIub24oJ2NsaWNrJywgZnVuY3Rpb24gKCkge1xuICAgIC8vICAgbmF2YmFyQ29sbGFwc2UuY2xhc3NMaXN0LnRvZ2dsZSgnY29sbGFwc2UnKTtcbiAgICAvLyB9KVxuXG4gICAgLy8gZG9jdW1lbnQuYm9keS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgIC8vICAgLy8gaWYoIWUudGFyZ2V0LmNsYXNzTGlzdC5jb250YWlucygnbmF2YmFyLXRvZ2dsZXItaWNvbicpKSB7XG4gICAgLy8gICBpZiAoZS50YXJnZXQgIT09IG5hdmJhclRvZ2dsZXIpIHtcbiAgICAvLyAgICAgbmF2YmFyQ29sbGFwc2UuY2xhc3NMaXN0LmFkZCgnY29sbGFwc2UnKTtcbiAgICAvLyAgIH1cbiAgICAvLyB9KVxuXG4gIH0gLy9uYXZiYXJDb2xsYXBzZUZ1bmN0aW9uXG5cbiAgbmF2YmFyQ29sbGFwc2VGdW5jdGlvbigpO1xuXG5cbiAgaWYgKCQoJyNpZF9mZWF0dXJlZF9pbWFnZScpKSB7XG4gICAgJCgnI2lkX2ZlYXR1cmVkX2ltYWdlJykub24oJ2NoYW5nZScsIGZ1bmN0aW9uICgpIHtcbiAgICAgIGxldCBmaWxlbmFtZSA9IHRoaXMudmFsdWUucmVwbGFjZSgvXi4qW1xcXFxcXC9dLywgJycpXG4gICAgICAkKCcjbGFiZWxfZm9yX2ZlYXR1cmVkX2ltYWdlJykuaW5uZXJIVE1MID0gZmlsZW5hbWU7XG4gICAgfSlcbiAgfVxuXG5cbiAgY29uc3QgbXVsdGlGb3JtQ29udHJvbCA9ICgpID0+IHtcblxuICAgIC8vIOeUu+WDj+OCouODg+ODl+ODreODvOODieODleOCqeODvOODoOOBq+OBpuOAgTLnlarnm67ku6XpmY3jga7jg5Xjgqnjg7zjg6DjgpLpmqDjgZnvvIjvvJHlgIvjgaDjgZHooajnpLrjgZnjgovvvIlcbiAgICBjb25zdCBoaWRlT3RoZXJzID0gKGVsZW0pID0+IHtcbiAgICAgIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbSk7XG4gICAgICBmb3IgKGxldCBpID0gMTsgaSA8IGVsLmxlbmd0aDsgaSsrKSB7XG4gICAgICAgIGVsW2ldLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgZWxbMF0uY2xhc3NMaXN0LmFkZCgnbXQtMCcpO1xuICAgICAgfVxuICAgIH0gLy8gaGlkZU90aGVyc1xuXG4gICAgLy8gaGlkZU90aGVycygnbGluay1mb3JtJyk7IC8vUG9zdOaWsOimj+aKleeov+ODmuODvOOCuCA9PuS4i+iomGZ1bmN0aW9u44Gr57Wx5LiAPT5cbiAgICBoaWRlT3RoZXJzKCcucGhvdG8tZm9ybSAubXVsdGlGaWVsZCcpOyAvL1Bob3RvIFVwbG9hZCBQYWdlXG4gICAgLy8gaGlkZU90aGVycygnLml0ZW0tZm9ybSAubXVsdGlGaWVsZCcpOyAvL0l0ZW0gQ3JlYXRlIFBhZ2VcblxuXG4gICAgLy8g44Kv44Oq44OD44Kv44Gn77yR5YCL44Ga44Gk44OV44Kp44O844Og44Gu6KGo56S644O76Z2e6KGo56S6XG4gICAgY29uc3QgdG9nZ2xlRm9ybXMgPSAoZWxlbSkgPT4ge1xuICAgICAgbGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtKTtcbiAgICAgIGxldCBpID0gMTtcbiAgICAgIGlmICgkKCcjYWRkLWZvcm0nKSkge1xuICAgICAgICAkKCcjYWRkLWZvcm0nKS5vbignY2xpY2snLCBmdW5jdGlvbiAoZSkge1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBlbFtpXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAgICAgaSsrO1xuICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICBpZiAoJCgnI3JlbW92ZS1mb3JtJykpIHtcbiAgICAgICAgJCgnI3JlbW92ZS1mb3JtJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBpID4gMSA/IGktLSA6IGk7XG4gICAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgIGVsW2ldLmNsYXNzTGlzdC5hZGQoJ2hpZGUnKTtcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9IC8vIHRvZ2dsZUZvcm1zXG5cbiAgICAvLyB0b2dnbGVGb3JtcygnbGluay1mb3JtJyk7IC8vUG9zdOaWsOimj+aKleeov+ODmuODvOOCuCA9PuS4i+iomGZ1bmN0aW9u44Gr57Wx5LiAPT5cbiAgICB0b2dnbGVGb3JtcygnLnBob3RvLWZvcm0gLm11bHRpRmllbGQnKTsgLy9QaG90byBVcGxvYWQgUGFnZVxuICAgIC8vIHRvZ2dsZUZvcm1zKCcuaXRlbS1mb3JtIC5tdWx0aUZpZWxkJyk7ICAvL0l0ZW0gQ3JlYXRlIFBhZ2VcblxuXG4gICAgLy8g5pei44Gr44OH44O844K/44GM5YWl44Gj44Gm44KL44OV44Kp44O844Og44Gu44G/6KGo56S6XG4gICAgZnVuY3Rpb24gaGlkZUVtcHR5Rm9ybXMxKGVsZW0pIHtcbiAgICAgIGxldCBsaW5rRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW0pO1xuICAgICAgbGlua0Zvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICAgIGxldCB1cmxpbnB1dCA9IGZvcm0ucXVlcnlTZWxlY3RvcignLnVybGlucHV0Jyk7XG4gICAgICAgIGlmICh1cmxpbnB1dC52YWx1ZSA9PSBcIlwiIHx8IHVybGlucHV0LnZhbHVlID09IG51bGwpIHtcbiAgICAgICAgICAvL+epuuOBruODleOCqeODvOODoOOCkumdnuihqOekuuOAgeihqOekui/pnZ7ooajnpLrjgpLjgrPjg7Pjg4jjg63jg7zjg6vjgIFcIuWJiumZpOOBmeOCi1wi44OB44Kn44OD44Kv44Oc44OD44Kv44K544KS6Z2e6KGo56S644Gr44GZ44KLLT5TQ1NTXG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJywgJ3RvZ2dsYWJsZScsICd1cmwtZW1wdHknKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgICAvLyBQb3N044GrVVJM44GM44Gy44Go44Gk44KC44Gq44GE5aC05ZCIKOaWsOimj+aKleeov+WQq+OCgCnjgIHjgbLjgajjgaTjgaDjgZHnqbrjga7jg5Xjgqnjg7zjg6DjgpLooajnpLpcbiAgICAgIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uby11cmxzIC50b2dnbGFibGUnKVswXTtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICB9XG5cbiAgICAgIHRvZ2dsZUZvcm1zKCcudG9nZ2xhYmxlJyk7XG4gICAgfSAvL2hpZGVFbXB0eUZvcm1hc1xuXG4gICAgaGlkZUVtcHR5Rm9ybXMxKCcubGluay1mb3JtJyk7XG5cblxuICAgIGZ1bmN0aW9uIGhpZGVFbXB0eUZvcm1zMihlbGVtKSB7XG4gICAgICBsZXQgaW1nRm9ybXMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW0pO1xuICAgICAgaW1nRm9ybXMuZm9yRWFjaChmb3JtID0+IHtcbiAgICAgICAgaWYgKCFmb3JtLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdhJykubGVuZ3RoKSB7XG4gICAgICAgICAgZm9ybS5jbGFzc0xpc3QuYWRkKCdoaWRlJywgJ3RvZ2dsYWJsZScsICdpbWctZW1wdHknKTtcbiAgICAgICAgfVxuICAgICAgfSlcbiAgICAgIC8vIC8vIOOBsuOBqOOBpOOBoOOBkeepuuOBruODleOCqeODvOODoOOCkuihqOekulxuICAgICAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnRvZ2dsYWJsZScpWzBdLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIC8vIEl0ZW3jgavjgZ3jga7ku5bnlLvlg4/jgYzjgbLjgajjgaTjgoLjgarjgYTloLTlkIgo5paw6KaP5oqV56i/5ZCr44KAKeOBruOBv+OAgeOBsuOBqOOBpOOBoOOBkeepuuOBruODleOCqeODvOODoOOCkuihqOekulxuICAgICAgbGV0IGVsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLm5vLWRhdGEgLnRvZ2dsYWJsZScpWzBdO1xuICAgICAgaWYgKGVsKSB7XG4gICAgICAgIGVsLmNsYXNzTGlzdC5yZW1vdmUoJ2hpZGUnKTtcbiAgICAgIH1cblxuICAgICAgdG9nZ2xlRm9ybXMoJy50b2dnbGFibGUnKTtcbiAgICB9XG4gICAgaGlkZUVtcHR5Rm9ybXMyKCcuaXRlbS1mb3JtIC5tdWx0aUZpZWxkJyk7XG5cbiAgfSAvL211bHRpX2Zvcm1fY29udHJvbFxuXG5cbiAgbXVsdGlGb3JtQ29udHJvbCgpXG5cblxuICBjb25zdCBpbWFnZUZvcm1UaHVtYnMgPSAoKSA9PiB7XG5cbiAgICBsZXQgbWFpbkltZ0xpbmsgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjZGl2X2lkX2ltYWdlIGEnKTtcblxuICAgIC8vIGxldCBpbWdTcmMgPSBtYWluSW1nTGluay5nZXRBdHRyaWJ1dGUoJ2hyZWYnKTtcbiAgICAvLyBsZXQgY29udGFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgIC8vIGNvbnRhaW5EaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0aHVtYi13cmFwJyk7XG4gICAgLy8gY29udGFpbkRpdi5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltZ1NyY31cIj5gO1xuICAgIC8vIG1haW5JbWdMaW5rLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbnRhaW5EaXYsIG1haW5JbWdMaW5rLnBhcmVudE5vZGUuZmlyc3RDaGlsZCk7XG5cbiAgICBsZXQgbWFpbkltZ1RodW1iID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI21haW4tdGh1bWInKTtcbiAgICBtYWluSW1nTGluay5wYXJlbnROb2RlLmluc2VydEJlZm9yZShtYWluSW1nVGh1bWIsIG1haW5JbWdMaW5rLnBhcmVudE5vZGUuZmlyc3RDaGlsZCk7XG5cblxuICAgIGxldCBvdGhlckltZ0xpbmtzID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLnBob3RvLWZvcm1zZXQgLm11bHRpRmllbGQgYScpO1xuICAgIGxldCBvdGhlckltZ1RodW1icyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50aHVtYi1jb250YWluZXIgaW1nJylcblxuICAgIG90aGVySW1nTGlua3MuZm9yRWFjaCgobGluaywgaSkgPT4ge1xuICAgICAgLy8gbGV0IGltZ1NyYyA9IGxpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgICBsZXQgY29udGFpbkRpdiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpO1xuICAgICAgY29udGFpbkRpdi5zZXRBdHRyaWJ1dGUoJ2NsYXNzJywgJ3RodW1iLXdyYXAnKTtcbiAgICAgIC8vIC8vIGxldCBpbWdUaHVtYiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2ltZycpO1xuICAgICAgLy8gLy8gaW1nVGh1bWIuc2V0QXR0cmlidXRlKCdzcmMnLCBgJHtpbWdTcmN9YCk7XG4gICAgICAvLyBjb250YWluRGl2LmlubmVySFRNTCA9IGA8aW1nIHNyYz1cIiR7aW1nU3JjfVwiPmA7XG4gICAgICAvLyBsaW5rLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGNvbnRhaW5EaXYsIGxpbmsucGFyZW50Tm9kZS5maXJzdENoaWxkKTtcbiAgICAgIGNvbnRhaW5EaXYuYXBwZW5kQ2hpbGQob3RoZXJJbWdUaHVtYnNbaV0pO1xuICAgICAgbGluay5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjb250YWluRGl2LCBsaW5rLnBhcmVudE5vZGUuZmlyc3RDaGlsZCk7XG4gICAgfSlcblxuICB9XG5cbiAgaWYgKCQoJyNkaXZfaWRfaW1hZ2UgYScpKSB7XG4gICAgaW1hZ2VGb3JtVGh1bWJzKCk7XG4gIH1cblxuXG4gIGNvbnN0IG1vZGFsQ29udHJvbCA9ICgpID0+IHtcblxuICAgIGxldCBtb2RhbHMgPSAkJCgnLm1vZGFsJyk7XG5cbiAgICBmdW5jdGlvbiBleHBhbmRNb2RhbChpLCBlKSB7XG4gICAgICBtb2RhbHNbaV0uY2xhc3NMaXN0LmFkZCgnc2hvdy1tb2RhbCcpO1xuICAgIH1cblxuICAgIGZ1bmN0aW9uIGNsb3NlTW9kYWwoaSwgZSkge1xuICAgICAgaWYgKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ2tlZXAtbW9kYWwnKSkge1xuICAgICAgICBtb2RhbHNbaV0uY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1tb2RhbCcpO1xuICAgICAgICAvLyBtb2RhbHMuZm9yRWFjaChtb2RhbCA9PiAoKSA9PiB7XG4gICAgICAgIC8vICAgbW9kYWwuY2xhc3NMaXN0LnJlbW92ZSgnc2hvdy1tb2RhbCcpO1xuICAgICAgICAvLyB9KVxuICAgICAgfVxuICAgIH1cblxuICAgIGxldCB0cmlnZXJzID0gJCQoJy5leHBhbmQtbW9kYWwnKTtcbiAgICBpZiAoJCgnLmV4cGFuZC1tb2RhbCcpKSB7XG4gICAgICB0cmlnZXJzLmZvckVhY2goKHRyaWdlciwgaSkgPT4gdHJpZ2VyLm9uKCdjbGljaycsIGV4cGFuZE1vZGFsLmJpbmQoZXZlbnQsIGkpKSk7XG4gICAgICAvLyAkKCcuZXhwYW5kLW1vZGFsJykub24oJ2NsaWNrJywgZXhwYW5kTW9kYWwpO1xuICAgIH1cblxuICAgIC8vIG1vZGFsLm9uKCdjbGljaycsIGNsb3NlTW9kYWwpO1xuICAgIG1vZGFscy5mb3JFYWNoKChtb2RhbCwgaSkgPT4gbW9kYWwub24oJ2NsaWNrJywgY2xvc2VNb2RhbC5iaW5kKGV2ZW50LCBpKSkpO1xuXG5cbiAgfSAvLyBtb2RhbF9jb250cm9sXG5cbiAgaWYgKCQoJy5tb2RhbCcpKSB7XG4gICAgbW9kYWxDb250cm9sKCk7XG4gIH1cblxuXG5cblxuXG4gIC8vIC8vIFdpdGhvdXQgYmluZy5qc1xuICAvLyBsZXQgbW9kYWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcubW9kYWwnKTtcbiAgLy8gbGV0IHBob3RvcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJyNwaG90b3MgaW1nJyk7XG5cbiAgLy8gZnVuY3Rpb24gaW5zZXJ0SW1hZ2UoKSB7XG4gIC8vICAgbGV0IGltYWdlID0gJzxhIGhyZWY9XCInICsgdGhpcy5kYXRhc2V0Lm9yaWdpbiArICdcIj48aW1nIHNyYz1cIicgKyB0aGlzLmRhdGFzZXQubWVkaXVtICsgJ1wiPjwvYT4nO1xuICAvLyAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNpZF9jb250ZW50JykudmFsdWUgKz0gaW1hZ2U7XG4gIC8vIH1cblxuICAvLyBmdW5jdGlvbiBleHBhbmRNb2RhbCgpIHtcbiAgLy8gICBtb2RhbC5jbGFzc0xpc3QuYWRkKCdzaG93Jyk7XG4gIC8vIH1cblxuICAvLyBmdW5jdGlvbiBjbG9zZU1vZGFsKGUpIHtcbiAgLy8gICAvLyBjb25zb2xlLmxvZyhlKTtcbiAgLy8gICAvLyBpZihlLnRhcmdldD09PSdmb3JtJykgcmV0dXJuO1xuICAvLyAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3cnKTtcbiAgLy8gfVxuXG4gIC8vIHBob3Rvcy5mb3JFYWNoKCBwaG90byA9PiBwaG90by5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGluc2VydEltYWdlKSk7XG5cbiAgLy8gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2V4cGFuZC1tb2RhbCcpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgZXhwYW5kTW9kYWwpO1xuXG4gIC8vIG1vZGFsLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgY2xvc2VNb2RhbCk7XG5cbn0pKCQsICQkKTsiLCIvLyBiYXNlZCBvbiBodHRwczovL2dpc3QuZ2l0aHViLmNvbS9wYXVsaXJpc2gvMTJmYjk1MWE4Yjg5M2E0NTRiMzJcblxuY29uc3QgJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IuYmluZChkb2N1bWVudCk7XG5jb25zdCAkJCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwuYmluZChkb2N1bWVudCk7XG5cbk5vZGUucHJvdG90eXBlLm9uID0gd2luZG93Lm9uID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gIHRoaXMuYWRkRXZlbnRMaXN0ZW5lcihuYW1lLCBmbik7XG59O1xuXG5Ob2RlTGlzdC5wcm90b3R5cGUuX19wcm90b19fID0gQXJyYXkucHJvdG90eXBlOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lXG5cbk5vZGVMaXN0LnByb3RvdHlwZS5vbiA9IE5vZGVMaXN0LnByb3RvdHlwZS5hZGRFdmVudExpc3RlbmVyID0gZnVuY3Rpb24gKG5hbWUsIGZuKSB7XG4gIHRoaXMuZm9yRWFjaCgoZWxlbSkgPT4ge1xuICAgIGVsZW0ub24obmFtZSwgZm4pO1xuICB9KTtcbn07XG5cbmV4cG9ydCB7ICQsICQkIH07IiwiLy8gZXh0cmFjdGVkIGJ5IG1pbmktY3NzLWV4dHJhY3QtcGx1Z2luXG5leHBvcnQge307IiwiLy8gVGhlIG1vZHVsZSBjYWNoZVxudmFyIF9fd2VicGFja19tb2R1bGVfY2FjaGVfXyA9IHt9O1xuXG4vLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcblx0dmFyIGNhY2hlZE1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF07XG5cdGlmIChjYWNoZWRNb2R1bGUgIT09IHVuZGVmaW5lZCkge1xuXHRcdHJldHVybiBjYWNoZWRNb2R1bGUuZXhwb3J0cztcblx0fVxuXHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuXHR2YXIgbW9kdWxlID0gX193ZWJwYWNrX21vZHVsZV9jYWNoZV9fW21vZHVsZUlkXSA9IHtcblx0XHQvLyBubyBtb2R1bGUuaWQgbmVlZGVkXG5cdFx0Ly8gbm8gbW9kdWxlLmxvYWRlZCBuZWVkZWRcblx0XHRleHBvcnRzOiB7fVxuXHR9O1xuXG5cdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuXHRfX3dlYnBhY2tfbW9kdWxlc19fW21vZHVsZUlkXShtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuXHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuXHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG59XG5cbi8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG5fX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBfX3dlYnBhY2tfbW9kdWxlc19fO1xuXG4iLCJ2YXIgZGVmZXJyZWQgPSBbXTtcbl9fd2VicGFja19yZXF1aXJlX18uTyA9IChyZXN1bHQsIGNodW5rSWRzLCBmbiwgcHJpb3JpdHkpID0+IHtcblx0aWYoY2h1bmtJZHMpIHtcblx0XHRwcmlvcml0eSA9IHByaW9yaXR5IHx8IDA7XG5cdFx0Zm9yKHZhciBpID0gZGVmZXJyZWQubGVuZ3RoOyBpID4gMCAmJiBkZWZlcnJlZFtpIC0gMV1bMl0gPiBwcmlvcml0eTsgaS0tKSBkZWZlcnJlZFtpXSA9IGRlZmVycmVkW2kgLSAxXTtcblx0XHRkZWZlcnJlZFtpXSA9IFtjaHVua0lkcywgZm4sIHByaW9yaXR5XTtcblx0XHRyZXR1cm47XG5cdH1cblx0dmFyIG5vdEZ1bGZpbGxlZCA9IEluZmluaXR5O1xuXHRmb3IgKHZhciBpID0gMDsgaSA8IGRlZmVycmVkLmxlbmd0aDsgaSsrKSB7XG5cdFx0dmFyIFtjaHVua0lkcywgZm4sIHByaW9yaXR5XSA9IGRlZmVycmVkW2ldO1xuXHRcdHZhciBmdWxmaWxsZWQgPSB0cnVlO1xuXHRcdGZvciAodmFyIGogPSAwOyBqIDwgY2h1bmtJZHMubGVuZ3RoOyBqKyspIHtcblx0XHRcdGlmICgocHJpb3JpdHkgJiAxID09PSAwIHx8IG5vdEZ1bGZpbGxlZCA+PSBwcmlvcml0eSkgJiYgT2JqZWN0LmtleXMoX193ZWJwYWNrX3JlcXVpcmVfXy5PKS5ldmVyeSgoa2V5KSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXy5PW2tleV0oY2h1bmtJZHNbal0pKSkpIHtcblx0XHRcdFx0Y2h1bmtJZHMuc3BsaWNlKGotLSwgMSk7XG5cdFx0XHR9IGVsc2Uge1xuXHRcdFx0XHRmdWxmaWxsZWQgPSBmYWxzZTtcblx0XHRcdFx0aWYocHJpb3JpdHkgPCBub3RGdWxmaWxsZWQpIG5vdEZ1bGZpbGxlZCA9IHByaW9yaXR5O1xuXHRcdFx0fVxuXHRcdH1cblx0XHRpZihmdWxmaWxsZWQpIHtcblx0XHRcdGRlZmVycmVkLnNwbGljZShpLS0sIDEpXG5cdFx0XHR2YXIgciA9IGZuKCk7XG5cdFx0XHRpZiAociAhPT0gdW5kZWZpbmVkKSByZXN1bHQgPSByO1xuXHRcdH1cblx0fVxuXHRyZXR1cm4gcmVzdWx0O1xufTsiLCIvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9ucyBmb3IgaGFybW9ueSBleHBvcnRzXG5fX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSAoZXhwb3J0cywgZGVmaW5pdGlvbikgPT4ge1xuXHRmb3IodmFyIGtleSBpbiBkZWZpbml0aW9uKSB7XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGRlZmluaXRpb24sIGtleSkgJiYgIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBrZXkpKSB7XG5cdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywga2V5LCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZGVmaW5pdGlvbltrZXldIH0pO1xuXHRcdH1cblx0fVxufTsiLCJfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSAob2JqLCBwcm9wKSA9PiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iaiwgcHJvcCkpIiwiLy8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5yID0gKGV4cG9ydHMpID0+IHtcblx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG5cdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG5cdH1cblx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbn07IiwiLy8gbm8gYmFzZVVSSVxuXG4vLyBvYmplY3QgdG8gc3RvcmUgbG9hZGVkIGFuZCBsb2FkaW5nIGNodW5rc1xuLy8gdW5kZWZpbmVkID0gY2h1bmsgbm90IGxvYWRlZCwgbnVsbCA9IGNodW5rIHByZWxvYWRlZC9wcmVmZXRjaGVkXG4vLyBbcmVzb2x2ZSwgcmVqZWN0LCBQcm9taXNlXSA9IGNodW5rIGxvYWRpbmcsIDAgPSBjaHVuayBsb2FkZWRcbnZhciBpbnN0YWxsZWRDaHVua3MgPSB7XG5cdFwiL3N0YXRpY19maWxlcy9qcy9hcHBcIjogMCxcblx0XCJzdGF0aWNfZmlsZXMvY3NzL3N0eWxlc1wiOiAwXG59O1xuXG4vLyBubyBjaHVuayBvbiBkZW1hbmQgbG9hZGluZ1xuXG4vLyBubyBwcmVmZXRjaGluZ1xuXG4vLyBubyBwcmVsb2FkZWRcblxuLy8gbm8gSE1SXG5cbi8vIG5vIEhNUiBtYW5pZmVzdFxuXG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8uaiA9IChjaHVua0lkKSA9PiAoaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID09PSAwKTtcblxuLy8gaW5zdGFsbCBhIEpTT05QIGNhbGxiYWNrIGZvciBjaHVuayBsb2FkaW5nXG52YXIgd2VicGFja0pzb25wQ2FsbGJhY2sgPSAocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24sIGRhdGEpID0+IHtcblx0dmFyIFtjaHVua0lkcywgbW9yZU1vZHVsZXMsIHJ1bnRpbWVdID0gZGF0YTtcblx0Ly8gYWRkIFwibW9yZU1vZHVsZXNcIiB0byB0aGUgbW9kdWxlcyBvYmplY3QsXG5cdC8vIHRoZW4gZmxhZyBhbGwgXCJjaHVua0lkc1wiIGFzIGxvYWRlZCBhbmQgZmlyZSBjYWxsYmFja1xuXHR2YXIgbW9kdWxlSWQsIGNodW5rSWQsIGkgPSAwO1xuXHRpZihjaHVua0lkcy5zb21lKChpZCkgPT4gKGluc3RhbGxlZENodW5rc1tpZF0gIT09IDApKSkge1xuXHRcdGZvcihtb2R1bGVJZCBpbiBtb3JlTW9kdWxlcykge1xuXHRcdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKG1vcmVNb2R1bGVzLCBtb2R1bGVJZCkpIHtcblx0XHRcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tW21vZHVsZUlkXSA9IG1vcmVNb2R1bGVzW21vZHVsZUlkXTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYocnVudGltZSkgdmFyIHJlc3VsdCA9IHJ1bnRpbWUoX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cdH1cblx0aWYocGFyZW50Q2h1bmtMb2FkaW5nRnVuY3Rpb24pIHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKGRhdGEpO1xuXHRmb3IoO2kgPCBjaHVua0lkcy5sZW5ndGg7IGkrKykge1xuXHRcdGNodW5rSWQgPSBjaHVua0lkc1tpXTtcblx0XHRpZihfX3dlYnBhY2tfcmVxdWlyZV9fLm8oaW5zdGFsbGVkQ2h1bmtzLCBjaHVua0lkKSAmJiBpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0pIHtcblx0XHRcdGluc3RhbGxlZENodW5rc1tjaHVua0lkXVswXSgpO1xuXHRcdH1cblx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF0gPSAwO1xuXHR9XG5cdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fLk8ocmVzdWx0KTtcbn1cblxudmFyIGNodW5rTG9hZGluZ0dsb2JhbCA9IHNlbGZbXCJ3ZWJwYWNrQ2h1bmtkal9lY29tbWVyY2VcIl0gPSBzZWxmW1wid2VicGFja0NodW5rZGpfZWNvbW1lcmNlXCJdIHx8IFtdO1xuY2h1bmtMb2FkaW5nR2xvYmFsLmZvckVhY2god2VicGFja0pzb25wQ2FsbGJhY2suYmluZChudWxsLCAwKSk7XG5jaHVua0xvYWRpbmdHbG9iYWwucHVzaCA9IHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2guYmluZChjaHVua0xvYWRpbmdHbG9iYWwpKTsiLCIiLCIvLyBzdGFydHVwXG4vLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbi8vIFRoaXMgZW50cnkgbW9kdWxlIGRlcGVuZHMgb24gb3RoZXIgbG9hZGVkIGNodW5rcyBhbmQgZXhlY3V0aW9uIG5lZWQgdG8gYmUgZGVsYXllZFxuX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wic3RhdGljX2ZpbGVzL2Nzcy9zdHlsZXNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9yZXNvdXJjZXMvanMvYXBwLmpzXCIpKSlcbnZhciBfX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHVuZGVmaW5lZCwgW1wic3RhdGljX2ZpbGVzL2Nzcy9zdHlsZXNcIl0sICgpID0+IChfX3dlYnBhY2tfcmVxdWlyZV9fKFwiLi9yZXNvdXJjZXMvc2Nzcy9zdHlsZXMuc2Nzc1wiKSkpXG5fX3dlYnBhY2tfZXhwb3J0c19fID0gX193ZWJwYWNrX3JlcXVpcmVfXy5PKF9fd2VicGFja19leHBvcnRzX18pO1xuIiwiIl0sIm5hbWVzIjpbIiQiLCIkJCIsImxpc3RMYW5kc2NhcGUiLCJsaXN0aW1ncyIsImZvckVhY2giLCJsaXN0aW1nIiwid2lkdGgiLCJoZWlnaHQiLCJwYXJlbnROb2RlIiwiY2xhc3NMaXN0IiwiYWRkIiwibWFrZVNxdWFyZSIsInNxdWFyZXMiLCJzcXVhcmUiLCJzdHlsZSIsIm9mZnNldFdpZHRoIiwibmF2YmFyQ29sbGFwc2VGdW5jdGlvbiIsInRyaWdnZXJzIiwibmF2YmFycyIsIm5hdmJhclRvZ2dsZSIsImkiLCJlIiwidG9nZ2xlIiwidHJpZ2dlciIsIm9uIiwiYmluZCIsImV2ZW50IiwiZmlsZW5hbWUiLCJ2YWx1ZSIsInJlcGxhY2UiLCJpbm5lckhUTUwiLCJtdWx0aUZvcm1Db250cm9sIiwiaGlkZU90aGVycyIsImVsZW0iLCJlbCIsImRvY3VtZW50IiwicXVlcnlTZWxlY3RvckFsbCIsImxlbmd0aCIsInRvZ2dsZUZvcm1zIiwicHJldmVudERlZmF1bHQiLCJyZW1vdmUiLCJoaWRlRW1wdHlGb3JtczEiLCJsaW5rRm9ybXMiLCJmb3JtIiwidXJsaW5wdXQiLCJxdWVyeVNlbGVjdG9yIiwiaGlkZUVtcHR5Rm9ybXMyIiwiaW1nRm9ybXMiLCJnZXRFbGVtZW50c0J5VGFnTmFtZSIsImltYWdlRm9ybVRodW1icyIsIm1haW5JbWdMaW5rIiwibWFpbkltZ1RodW1iIiwiaW5zZXJ0QmVmb3JlIiwiZmlyc3RDaGlsZCIsIm90aGVySW1nTGlua3MiLCJvdGhlckltZ1RodW1icyIsImxpbmsiLCJjb250YWluRGl2IiwiY3JlYXRlRWxlbWVudCIsInNldEF0dHJpYnV0ZSIsImFwcGVuZENoaWxkIiwibW9kYWxDb250cm9sIiwibW9kYWxzIiwiZXhwYW5kTW9kYWwiLCJjbG9zZU1vZGFsIiwidGFyZ2V0IiwiY29udGFpbnMiLCJ0cmlnZXJzIiwidHJpZ2VyIiwibW9kYWwiLCJOb2RlIiwicHJvdG90eXBlIiwid2luZG93IiwibmFtZSIsImZuIiwiYWRkRXZlbnRMaXN0ZW5lciIsIk5vZGVMaXN0IiwiX19wcm90b19fIiwiQXJyYXkiXSwic291cmNlUm9vdCI6IiJ9