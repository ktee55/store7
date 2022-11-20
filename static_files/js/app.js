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
  // リストページ横長の画像のみ縦方向真ん中寄せ（盾長のに入れるとなぜかmax-heightが効かなくなるため）
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiL3N0YXRpY19maWxlcy9qcy9hcHAuanMiLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBQThDO0FBRTlDLENBQUMsVUFBVUEsQ0FBQyxFQUFFQyxFQUFFLEVBQUU7RUFFaEI7RUFDQSxJQUFNQyxhQUFhLEdBQUcsU0FBaEJBLGFBQWEsR0FBUztJQUMxQixJQUFJQyxRQUFRLEdBQUdGLEVBQUUsQ0FBQyx3QkFBd0IsQ0FBQztJQUMzQ0UsUUFBUSxDQUFDQyxPQUFPLENBQUMsVUFBQ0MsT0FBTyxFQUFLO01BQzVCLElBQUlBLE9BQU8sQ0FBQ0MsS0FBSyxHQUFHRCxPQUFPLENBQUNFLE1BQU0sRUFBRTtRQUNsQ0YsT0FBTyxDQUFDRyxVQUFVLENBQUNBLFVBQVUsQ0FBQ0MsU0FBUyxDQUFDQyxHQUFHLENBQUMsV0FBVyxDQUFDO01BQzFEO0lBQ0YsQ0FBQyxDQUFDO0VBQ0osQ0FBQztFQUNEUixhQUFhLEVBQUU7RUFFZixJQUFNUyxVQUFVLEdBQUcsU0FBYkEsVUFBVSxHQUFTO0lBRXZCLElBQUlDLE9BQU8sR0FBR1gsRUFBRSxDQUFDLFNBQVMsQ0FBQztJQUUzQlcsT0FBTyxDQUFDUixPQUFPLENBQUMsVUFBQ1MsTUFBTSxFQUFLO01BQzFCO01BQ0FBLE1BQU0sQ0FBQ0MsS0FBSyxDQUFDUCxNQUFNLEdBQUdNLE1BQU0sQ0FBQ0UsV0FBVyxHQUFHLElBQUk7SUFDakQsQ0FBQyxDQUFDO0VBRUosQ0FBQztFQUVELElBQUlmLENBQUMsQ0FBQyxTQUFTLENBQUMsRUFBRTtJQUNoQlcsVUFBVSxFQUFFO0VBQ2Q7RUFFQSxJQUFNSyxzQkFBc0IsR0FBRyxTQUF6QkEsc0JBQXNCLEdBQVM7SUFFbkMsSUFBSUMsUUFBUSxHQUFHaEIsRUFBRSxDQUFDLHNCQUFzQixDQUFDO0lBQ3pDLElBQUlpQixPQUFPLEdBQUdqQixFQUFFLENBQUMsa0JBQWtCLENBQUM7SUFFcEMsU0FBU2tCLFlBQVksQ0FBQ0MsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFDMUJILE9BQU8sQ0FBQ0UsQ0FBQyxDQUFDLENBQUNYLFNBQVMsQ0FBQ2EsTUFBTSxDQUFDLFVBQVUsQ0FBQztJQUN6QztJQUNBTCxRQUFRLENBQUNiLE9BQU8sQ0FBQyxVQUFDbUIsT0FBTyxFQUFFSCxDQUFDO01BQUEsT0FBS0csT0FBTyxDQUFDQyxFQUFFLENBQUMsT0FBTyxFQUFFTCxZQUFZLENBQUNNLElBQUksQ0FBQ0MsS0FBSyxFQUFFTixDQUFDLENBQUMsQ0FBQztJQUFBLEVBQUM7O0lBRWxGO0lBQ0E7SUFDQTs7SUFFQTtJQUNBO0lBQ0E7SUFDQTtJQUNBO0lBQ0E7RUFFRixDQUFDLEVBQUM7O0VBRUZKLHNCQUFzQixFQUFFO0VBR3hCLElBQUloQixDQUFDLENBQUMsb0JBQW9CLENBQUMsRUFBRTtJQUMzQkEsQ0FBQyxDQUFDLG9CQUFvQixDQUFDLENBQUN3QixFQUFFLENBQUMsUUFBUSxFQUFFLFlBQVk7TUFDL0MsSUFBSUcsUUFBUSxHQUFHLElBQUksQ0FBQ0MsS0FBSyxDQUFDQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQztNQUNsRDdCLENBQUMsQ0FBQywyQkFBMkIsQ0FBQyxDQUFDOEIsU0FBUyxHQUFHSCxRQUFRO0lBQ3JELENBQUMsQ0FBQztFQUNKO0VBR0EsSUFBTUksZ0JBQWdCLEdBQUcsU0FBbkJBLGdCQUFnQixHQUFTO0lBRTdCO0lBQ0EsSUFBTUMsVUFBVSxHQUFHLFNBQWJBLFVBQVUsQ0FBSUMsSUFBSSxFQUFLO01BQzNCLElBQUlDLEVBQUUsR0FBR0MsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQ0gsSUFBSSxDQUFDO01BQ3hDLEtBQUssSUFBSWIsQ0FBQyxHQUFHLENBQUMsRUFBRUEsQ0FBQyxHQUFHYyxFQUFFLENBQUNHLE1BQU0sRUFBRWpCLENBQUMsRUFBRSxFQUFFO1FBQ2xDYyxFQUFFLENBQUNkLENBQUMsQ0FBQyxDQUFDWCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDM0J3QixFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUN6QixTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7TUFDN0I7SUFDRixDQUFDLEVBQUM7O0lBRUY7SUFDQXNCLFVBQVUsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7SUFDdkM7O0lBR0E7SUFDQSxJQUFNTSxXQUFXLEdBQUcsU0FBZEEsV0FBVyxDQUFJTCxJQUFJLEVBQUs7TUFDNUIsSUFBSUMsRUFBRSxHQUFHQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDSCxJQUFJLENBQUM7TUFDeEMsSUFBSWIsQ0FBQyxHQUFHLENBQUM7TUFDVCxJQUFJcEIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxFQUFFO1FBQ2xCQSxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUN3QixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVVILENBQUMsRUFBRTtVQUN0Q0EsQ0FBQyxDQUFDa0IsY0FBYyxFQUFFO1VBQ2xCTCxFQUFFLENBQUNkLENBQUMsQ0FBQyxDQUFDWCxTQUFTLENBQUMrQixNQUFNLENBQUMsTUFBTSxDQUFDO1VBQzlCcEIsQ0FBQyxFQUFFO1FBQ0wsQ0FBQyxDQUFDO01BQ0o7TUFFQSxJQUFJcEIsQ0FBQyxDQUFDLGNBQWMsQ0FBQyxFQUFFO1FBQ3JCQSxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUN3QixFQUFFLENBQUMsT0FBTyxFQUFFLFVBQVVILENBQUMsRUFBRTtVQUN6Q0QsQ0FBQyxHQUFHLENBQUMsR0FBR0EsQ0FBQyxFQUFFLEdBQUdBLENBQUM7VUFDZkMsQ0FBQyxDQUFDa0IsY0FBYyxFQUFFO1VBQ2xCTCxFQUFFLENBQUNkLENBQUMsQ0FBQyxDQUFDWCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLENBQUM7UUFDN0IsQ0FBQyxDQUFDO01BQ0o7SUFDRixDQUFDLEVBQUM7O0lBRUY7SUFDQTRCLFdBQVcsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLENBQUM7SUFDeEM7O0lBR0E7SUFDQSxTQUFTRyxlQUFlLENBQUNSLElBQUksRUFBRTtNQUM3QixJQUFJUyxTQUFTLEdBQUdQLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUNILElBQUksQ0FBQztNQUMvQ1MsU0FBUyxDQUFDdEMsT0FBTyxDQUFDLFVBQUF1QyxJQUFJLEVBQUk7UUFDeEIsSUFBSUMsUUFBUSxHQUFHRCxJQUFJLENBQUNFLGFBQWEsQ0FBQyxXQUFXLENBQUM7UUFDOUMsSUFBSUQsUUFBUSxDQUFDaEIsS0FBSyxJQUFJLEVBQUUsSUFBSWdCLFFBQVEsQ0FBQ2hCLEtBQUssSUFBSSxJQUFJLEVBQUU7VUFDbEQ7VUFDQWUsSUFBSSxDQUFDbEMsU0FBUyxDQUFDQyxHQUFHLENBQUMsTUFBTSxFQUFFLFdBQVcsRUFBRSxXQUFXLENBQUM7UUFDdEQ7TUFDRixDQUFDLENBQUM7TUFDRjtNQUNBLElBQUl3QixFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDNUQsSUFBSUYsRUFBRSxFQUFFO1FBQ05BLEVBQUUsQ0FBQ3pCLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyxNQUFNLENBQUM7TUFDN0I7TUFFQUYsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUMzQixDQUFDLENBQUM7O0lBRUZHLGVBQWUsQ0FBQyxZQUFZLENBQUM7SUFHN0IsU0FBU0ssZUFBZSxDQUFDYixJQUFJLEVBQUU7TUFDN0IsSUFBSWMsUUFBUSxHQUFHWixRQUFRLENBQUNDLGdCQUFnQixDQUFDSCxJQUFJLENBQUM7TUFDOUNjLFFBQVEsQ0FBQzNDLE9BQU8sQ0FBQyxVQUFBdUMsSUFBSSxFQUFJO1FBQ3ZCLElBQUksQ0FBQ0EsSUFBSSxDQUFDSyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsQ0FBQ1gsTUFBTSxFQUFFO1VBQzFDTSxJQUFJLENBQUNsQyxTQUFTLENBQUNDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxFQUFFLFdBQVcsQ0FBQztRQUN0RDtNQUNGLENBQUMsQ0FBQztNQUNGO01BQ0E7TUFDQTtNQUNBLElBQUl3QixFQUFFLEdBQUdDLFFBQVEsQ0FBQ0MsZ0JBQWdCLENBQUMscUJBQXFCLENBQUMsQ0FBQyxDQUFDLENBQUM7TUFDNUQsSUFBSUYsRUFBRSxFQUFFO1FBQ05BLEVBQUUsQ0FBQ3pCLFNBQVMsQ0FBQytCLE1BQU0sQ0FBQyxNQUFNLENBQUM7TUFDN0I7TUFFQUYsV0FBVyxDQUFDLFlBQVksQ0FBQztJQUMzQjtJQUNBUSxlQUFlLENBQUMsd0JBQXdCLENBQUM7RUFFM0MsQ0FBQyxFQUFDOztFQUdGZixnQkFBZ0IsRUFBRTtFQUdsQixJQUFNa0IsZUFBZSxHQUFHLFNBQWxCQSxlQUFlLEdBQVM7SUFFNUIsSUFBSUMsV0FBVyxHQUFHZixRQUFRLENBQUNVLGFBQWEsQ0FBQyxpQkFBaUIsQ0FBQzs7SUFFM0Q7SUFDQTtJQUNBO0lBQ0E7SUFDQTs7SUFFQSxJQUFJTSxZQUFZLEdBQUdoQixRQUFRLENBQUNVLGFBQWEsQ0FBQyxhQUFhLENBQUM7SUFDeERLLFdBQVcsQ0FBQzFDLFVBQVUsQ0FBQzRDLFlBQVksQ0FBQ0QsWUFBWSxFQUFFRCxXQUFXLENBQUMxQyxVQUFVLENBQUM2QyxVQUFVLENBQUM7SUFHcEYsSUFBSUMsYUFBYSxHQUFHbkIsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyw4QkFBOEIsQ0FBQztJQUM3RSxJQUFJbUIsY0FBYyxHQUFHcEIsUUFBUSxDQUFDQyxnQkFBZ0IsQ0FBQyxzQkFBc0IsQ0FBQztJQUV0RWtCLGFBQWEsQ0FBQ2xELE9BQU8sQ0FBQyxVQUFDb0QsSUFBSSxFQUFFcEMsQ0FBQyxFQUFLO01BQ2pDO01BQ0EsSUFBSXFDLFVBQVUsR0FBR3RCLFFBQVEsQ0FBQ3VCLGFBQWEsQ0FBQyxLQUFLLENBQUM7TUFDOUNELFVBQVUsQ0FBQ0UsWUFBWSxDQUFDLE9BQU8sRUFBRSxZQUFZLENBQUM7TUFDOUM7TUFDQTtNQUNBO01BQ0E7TUFDQUYsVUFBVSxDQUFDRyxXQUFXLENBQUNMLGNBQWMsQ0FBQ25DLENBQUMsQ0FBQyxDQUFDO01BQ3pDb0MsSUFBSSxDQUFDaEQsVUFBVSxDQUFDNEMsWUFBWSxDQUFDSyxVQUFVLEVBQUVELElBQUksQ0FBQ2hELFVBQVUsQ0FBQzZDLFVBQVUsQ0FBQztJQUN0RSxDQUFDLENBQUM7RUFFSixDQUFDO0VBRUQsSUFBSXJELENBQUMsQ0FBQyxpQkFBaUIsQ0FBQyxFQUFFO0lBQ3hCaUQsZUFBZSxFQUFFO0VBQ25CO0VBR0EsSUFBTVksWUFBWSxHQUFHLFNBQWZBLFlBQVksR0FBUztJQUV6QixJQUFJQyxNQUFNLEdBQUc3RCxFQUFFLENBQUMsUUFBUSxDQUFDO0lBRXpCLFNBQVM4RCxXQUFXLENBQUMzQyxDQUFDLEVBQUVDLENBQUMsRUFBRTtNQUN6QnlDLE1BQU0sQ0FBQzFDLENBQUMsQ0FBQyxDQUFDWCxTQUFTLENBQUNDLEdBQUcsQ0FBQyxZQUFZLENBQUM7SUFDdkM7SUFFQSxTQUFTc0QsVUFBVSxDQUFDNUMsQ0FBQyxFQUFFQyxDQUFDLEVBQUU7TUFDeEIsSUFBSSxDQUFDQSxDQUFDLENBQUM0QyxNQUFNLENBQUN4RCxTQUFTLENBQUN5RCxRQUFRLENBQUMsWUFBWSxDQUFDLEVBQUU7UUFDOUNKLE1BQU0sQ0FBQzFDLENBQUMsQ0FBQyxDQUFDWCxTQUFTLENBQUMrQixNQUFNLENBQUMsWUFBWSxDQUFDO1FBQ3hDO1FBQ0E7UUFDQTtNQUNGO0lBQ0Y7O0lBRUEsSUFBSTJCLE9BQU8sR0FBR2xFLEVBQUUsQ0FBQyxlQUFlLENBQUM7SUFDakMsSUFBSUQsQ0FBQyxDQUFDLGVBQWUsQ0FBQyxFQUFFO01BQ3RCbUUsT0FBTyxDQUFDL0QsT0FBTyxDQUFDLFVBQUNnRSxNQUFNLEVBQUVoRCxDQUFDO1FBQUEsT0FBS2dELE1BQU0sQ0FBQzVDLEVBQUUsQ0FBQyxPQUFPLEVBQUV1QyxXQUFXLENBQUN0QyxJQUFJLENBQUNDLEtBQUssRUFBRU4sQ0FBQyxDQUFDLENBQUM7TUFBQSxFQUFDO01BQzlFO0lBQ0Y7O0lBRUE7SUFDQTBDLE1BQU0sQ0FBQzFELE9BQU8sQ0FBQyxVQUFDaUUsS0FBSyxFQUFFakQsQ0FBQztNQUFBLE9BQUtpRCxLQUFLLENBQUM3QyxFQUFFLENBQUMsT0FBTyxFQUFFd0MsVUFBVSxDQUFDdkMsSUFBSSxDQUFDQyxLQUFLLEVBQUVOLENBQUMsQ0FBQyxDQUFDO0lBQUEsRUFBQztFQUc1RSxDQUFDLEVBQUM7O0VBRUYsSUFBSXBCLENBQUMsQ0FBQyxRQUFRLENBQUMsRUFBRTtJQUNmNkQsWUFBWSxFQUFFO0VBQ2hCOztFQU1BO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTtFQUNBO0VBQ0E7O0VBRUE7RUFDQTtFQUNBO0VBQ0E7RUFDQTs7RUFFQTs7RUFFQTs7RUFFQTtBQUVGLENBQUMsRUFBRTdELG1EQUFDLEVBQUVDLG9EQUFFLENBQUM7Ozs7Ozs7Ozs7Ozs7OztBQzNQVDs7QUFFQSxJQUFNRCxDQUFDLEdBQUdtQyxRQUFRLENBQUNVLGFBQWEsQ0FBQ3BCLElBQUksQ0FBQ1UsUUFBUSxDQUFDO0FBQy9DLElBQU1sQyxFQUFFLEdBQUdrQyxRQUFRLENBQUNDLGdCQUFnQixDQUFDWCxJQUFJLENBQUNVLFFBQVEsQ0FBQztBQUVuRG1DLElBQUksQ0FBQ0MsU0FBUyxDQUFDL0MsRUFBRSxHQUFHZ0QsTUFBTSxDQUFDaEQsRUFBRSxHQUFHLFVBQVVpRCxJQUFJLEVBQUVDLEVBQUUsRUFBRTtFQUNsRCxJQUFJLENBQUNDLGdCQUFnQixDQUFDRixJQUFJLEVBQUVDLEVBQUUsQ0FBQztBQUNqQyxDQUFDO0FBRURFLFFBQVEsQ0FBQ0wsU0FBUyxDQUFDTSxTQUFTLEdBQUdDLEtBQUssQ0FBQ1AsU0FBUyxDQUFDLENBQUM7O0FBRWhESyxRQUFRLENBQUNMLFNBQVMsQ0FBQy9DLEVBQUUsR0FBR29ELFFBQVEsQ0FBQ0wsU0FBUyxDQUFDSSxnQkFBZ0IsR0FBRyxVQUFVRixJQUFJLEVBQUVDLEVBQUUsRUFBRTtFQUNoRixJQUFJLENBQUN0RSxPQUFPLENBQUMsVUFBQzZCLElBQUksRUFBSztJQUNyQkEsSUFBSSxDQUFDVCxFQUFFLENBQUNpRCxJQUFJLEVBQUVDLEVBQUUsQ0FBQztFQUNuQixDQUFDLENBQUM7QUFDSixDQUFDOzs7Ozs7Ozs7Ozs7QUNmRDs7Ozs7OztVQ0FBO1VBQ0E7O1VBRUE7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7VUFFQTtVQUNBO1VBQ0E7O1VBRUE7VUFDQTs7Ozs7V0N6QkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSwrQkFBK0Isd0NBQXdDO1dBQ3ZFO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsaUJBQWlCLHFCQUFxQjtXQUN0QztXQUNBO1dBQ0Esa0JBQWtCLHFCQUFxQjtXQUN2QztXQUNBO1dBQ0EsS0FBSztXQUNMO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7Ozs7V0MzQkE7V0FDQTtXQUNBO1dBQ0E7V0FDQSx5Q0FBeUMsd0NBQXdDO1dBQ2pGO1dBQ0E7V0FDQTs7Ozs7V0NQQTs7Ozs7V0NBQTtXQUNBO1dBQ0E7V0FDQSx1REFBdUQsaUJBQWlCO1dBQ3hFO1dBQ0EsZ0RBQWdELGFBQWE7V0FDN0Q7Ozs7O1dDTkE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7O1dBRUE7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0EsTUFBTSxxQkFBcUI7V0FDM0I7V0FDQTtXQUNBO1dBQ0E7V0FDQTtXQUNBO1dBQ0E7V0FDQTs7V0FFQTtXQUNBO1dBQ0E7Ozs7O1VFakRBO1VBQ0E7VUFDQTtVQUNBO1VBQ0E7VUFDQSIsInNvdXJjZXMiOlsid2VicGFjazovL2RqLWVjb21tZXJjZS8uL3Jlc291cmNlcy9qcy9hcHAuanMiLCJ3ZWJwYWNrOi8vZGotZWNvbW1lcmNlLy4vcmVzb3VyY2VzL2pzL2NvbXBvbmVudHMvYmxpbmcuanMiLCJ3ZWJwYWNrOi8vZGotZWNvbW1lcmNlLy4vcmVzb3VyY2VzL3Njc3Mvc3R5bGVzLnNjc3MiLCJ3ZWJwYWNrOi8vZGotZWNvbW1lcmNlL3dlYnBhY2svYm9vdHN0cmFwIiwid2VicGFjazovL2RqLWVjb21tZXJjZS93ZWJwYWNrL3J1bnRpbWUvY2h1bmsgbG9hZGVkIiwid2VicGFjazovL2RqLWVjb21tZXJjZS93ZWJwYWNrL3J1bnRpbWUvZGVmaW5lIHByb3BlcnR5IGdldHRlcnMiLCJ3ZWJwYWNrOi8vZGotZWNvbW1lcmNlL3dlYnBhY2svcnVudGltZS9oYXNPd25Qcm9wZXJ0eSBzaG9ydGhhbmQiLCJ3ZWJwYWNrOi8vZGotZWNvbW1lcmNlL3dlYnBhY2svcnVudGltZS9tYWtlIG5hbWVzcGFjZSBvYmplY3QiLCJ3ZWJwYWNrOi8vZGotZWNvbW1lcmNlL3dlYnBhY2svcnVudGltZS9qc29ucCBjaHVuayBsb2FkaW5nIiwid2VicGFjazovL2RqLWVjb21tZXJjZS93ZWJwYWNrL2JlZm9yZS1zdGFydHVwIiwid2VicGFjazovL2RqLWVjb21tZXJjZS93ZWJwYWNrL3N0YXJ0dXAiLCJ3ZWJwYWNrOi8vZGotZWNvbW1lcmNlL3dlYnBhY2svYWZ0ZXItc3RhcnR1cCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyAkLCAkJCB9IGZyb20gJy4vY29tcG9uZW50cy9ibGluZy5qcyc7XG5cbihmdW5jdGlvbiAoJCwgJCQpIHtcblxuICAvLyDjg6rjgrnjg4jjg5rjg7zjgrjmqKrplbfjga7nlLvlg4/jga7jgb/nuKbmlrnlkJHnnJ/jgpPkuK3lr4TjgZvvvIjnm77plbfjga7jgavlhaXjgozjgovjgajjgarjgZzjgYttYXgtaGVpZ2h044GM5Yq544GL44Gq44GP44Gq44KL44Gf44KB77yJXG4gIGNvbnN0IGxpc3RMYW5kc2NhcGUgPSAoKSA9PiB7XG4gICAgbGV0IGxpc3RpbWdzID0gJCQoJy5pdGVtLWxpc3QgLnNxdWFyZSBpbWcnKTtcbiAgICBsaXN0aW1ncy5mb3JFYWNoKChsaXN0aW1nKSA9PiB7XG4gICAgICBpZiAobGlzdGltZy53aWR0aCA+IGxpc3RpbWcuaGVpZ2h0KSB7XG4gICAgICAgIGxpc3RpbWcucGFyZW50Tm9kZS5wYXJlbnROb2RlLmNsYXNzTGlzdC5hZGQoJ2xhbmRzY2FwZScpXG4gICAgICB9XG4gICAgfSlcbiAgfVxuICBsaXN0TGFuZHNjYXBlKCk7XG5cbiAgY29uc3QgbWFrZVNxdWFyZSA9ICgpID0+IHtcblxuICAgIGxldCBzcXVhcmVzID0gJCQoJy5zcXVhcmUnKTtcblxuICAgIHNxdWFyZXMuZm9yRWFjaCgoc3F1YXJlKSA9PiB7XG4gICAgICAvLyBjb25zb2xlLmxvZyhzcXVhcmUub2Zmc2V0V2lkdGgpO1xuICAgICAgc3F1YXJlLnN0eWxlLmhlaWdodCA9IHNxdWFyZS5vZmZzZXRXaWR0aCArICdweCc7XG4gICAgfSk7XG5cbiAgfVxuXG4gIGlmICgkKCcuc3F1YXJlJykpIHtcbiAgICBtYWtlU3F1YXJlKCk7XG4gIH1cblxuICBjb25zdCBuYXZiYXJDb2xsYXBzZUZ1bmN0aW9uID0gKCkgPT4ge1xuXG4gICAgbGV0IHRyaWdnZXJzID0gJCQoJy5uYXZiYXItdG9nZ2xlci1pY29uJylcbiAgICBsZXQgbmF2YmFycyA9ICQkKCcubmF2YmFyLWNvbGxhcHNlJylcblxuICAgIGZ1bmN0aW9uIG5hdmJhclRvZ2dsZShpLCBlKSB7XG4gICAgICBuYXZiYXJzW2ldLmNsYXNzTGlzdC50b2dnbGUoJ2NvbGxhcHNlJyk7XG4gICAgfVxuICAgIHRyaWdnZXJzLmZvckVhY2goKHRyaWdnZXIsIGkpID0+IHRyaWdnZXIub24oJ2NsaWNrJywgbmF2YmFyVG9nZ2xlLmJpbmQoZXZlbnQsIGkpKSk7XG5cbiAgICAvLyBuYXZiYXJUb2dnbGVyLm9uKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAvLyAgIG5hdmJhckNvbGxhcHNlLmNsYXNzTGlzdC50b2dnbGUoJ2NvbGxhcHNlJyk7XG4gICAgLy8gfSlcblxuICAgIC8vIGRvY3VtZW50LmJvZHkub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAvLyAgIC8vIGlmKCFlLnRhcmdldC5jbGFzc0xpc3QuY29udGFpbnMoJ25hdmJhci10b2dnbGVyLWljb24nKSkge1xuICAgIC8vICAgaWYgKGUudGFyZ2V0ICE9PSBuYXZiYXJUb2dnbGVyKSB7XG4gICAgLy8gICAgIG5hdmJhckNvbGxhcHNlLmNsYXNzTGlzdC5hZGQoJ2NvbGxhcHNlJyk7XG4gICAgLy8gICB9XG4gICAgLy8gfSlcblxuICB9IC8vbmF2YmFyQ29sbGFwc2VGdW5jdGlvblxuXG4gIG5hdmJhckNvbGxhcHNlRnVuY3Rpb24oKTtcblxuXG4gIGlmICgkKCcjaWRfZmVhdHVyZWRfaW1hZ2UnKSkge1xuICAgICQoJyNpZF9mZWF0dXJlZF9pbWFnZScpLm9uKCdjaGFuZ2UnLCBmdW5jdGlvbiAoKSB7XG4gICAgICBsZXQgZmlsZW5hbWUgPSB0aGlzLnZhbHVlLnJlcGxhY2UoL14uKltcXFxcXFwvXS8sICcnKVxuICAgICAgJCgnI2xhYmVsX2Zvcl9mZWF0dXJlZF9pbWFnZScpLmlubmVySFRNTCA9IGZpbGVuYW1lO1xuICAgIH0pXG4gIH1cblxuXG4gIGNvbnN0IG11bHRpRm9ybUNvbnRyb2wgPSAoKSA9PiB7XG5cbiAgICAvLyDnlLvlg4/jgqLjg4Pjg5fjg63jg7zjg4njg5Xjgqnjg7zjg6DjgavjgabjgIEy55Wq55uu5Lul6ZmN44Gu44OV44Kp44O844Og44KS6Zqg44GZ77yI77yR5YCL44Gg44GR6KGo56S644GZ44KL77yJXG4gICAgY29uc3QgaGlkZU90aGVycyA9IChlbGVtKSA9PiB7XG4gICAgICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGVsZW0pO1xuICAgICAgZm9yIChsZXQgaSA9IDE7IGkgPCBlbC5sZW5ndGg7IGkrKykge1xuICAgICAgICBlbFtpXS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIGVsWzBdLmNsYXNzTGlzdC5hZGQoJ210LTAnKTtcbiAgICAgIH1cbiAgICB9IC8vIGhpZGVPdGhlcnNcblxuICAgIC8vIGhpZGVPdGhlcnMoJ2xpbmstZm9ybScpOyAvL1Bvc3TmlrDopo/mipXnqL/jg5rjg7zjgrggPT7kuIvoqJhmdW5jdGlvbuOBq+e1seS4gD0+XG4gICAgaGlkZU90aGVycygnLnBob3RvLWZvcm0gLm11bHRpRmllbGQnKTsgLy9QaG90byBVcGxvYWQgUGFnZVxuICAgIC8vIGhpZGVPdGhlcnMoJy5pdGVtLWZvcm0gLm11bHRpRmllbGQnKTsgLy9JdGVtIENyZWF0ZSBQYWdlXG5cblxuICAgIC8vIOOCr+ODquODg+OCr+OBp++8keWAi+OBmuOBpOODleOCqeODvOODoOOBruihqOekuuODu+mdnuihqOekulxuICAgIGNvbnN0IHRvZ2dsZUZvcm1zID0gKGVsZW0pID0+IHtcbiAgICAgIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoZWxlbSk7XG4gICAgICBsZXQgaSA9IDE7XG4gICAgICBpZiAoJCgnI2FkZC1mb3JtJykpIHtcbiAgICAgICAgJCgnI2FkZC1mb3JtJykub24oJ2NsaWNrJywgZnVuY3Rpb24gKGUpIHtcbiAgICAgICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICAgICAgZWxbaV0uY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgICAgIGkrKztcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgaWYgKCQoJyNyZW1vdmUtZm9ybScpKSB7XG4gICAgICAgICQoJyNyZW1vdmUtZm9ybScpLm9uKCdjbGljaycsIGZ1bmN0aW9uIChlKSB7XG4gICAgICAgICAgaSA+IDEgPyBpLS0gOiBpO1xuICAgICAgICAgIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICBlbFtpXS5jbGFzc0xpc3QuYWRkKCdoaWRlJyk7XG4gICAgICAgIH0pXG4gICAgICB9XG4gICAgfSAvLyB0b2dnbGVGb3Jtc1xuXG4gICAgLy8gdG9nZ2xlRm9ybXMoJ2xpbmstZm9ybScpOyAvL1Bvc3TmlrDopo/mipXnqL/jg5rjg7zjgrggPT7kuIvoqJhmdW5jdGlvbuOBq+e1seS4gD0+XG4gICAgdG9nZ2xlRm9ybXMoJy5waG90by1mb3JtIC5tdWx0aUZpZWxkJyk7IC8vUGhvdG8gVXBsb2FkIFBhZ2VcbiAgICAvLyB0b2dnbGVGb3JtcygnLml0ZW0tZm9ybSAubXVsdGlGaWVsZCcpOyAgLy9JdGVtIENyZWF0ZSBQYWdlXG5cblxuICAgIC8vIOaXouOBq+ODh+ODvOOCv+OBjOWFpeOBo+OBpuOCi+ODleOCqeODvOODoOOBruOBv+ihqOekulxuICAgIGZ1bmN0aW9uIGhpZGVFbXB0eUZvcm1zMShlbGVtKSB7XG4gICAgICBsZXQgbGlua0Zvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtKTtcbiAgICAgIGxpbmtGb3Jtcy5mb3JFYWNoKGZvcm0gPT4ge1xuICAgICAgICBsZXQgdXJsaW5wdXQgPSBmb3JtLnF1ZXJ5U2VsZWN0b3IoJy51cmxpbnB1dCcpO1xuICAgICAgICBpZiAodXJsaW5wdXQudmFsdWUgPT0gXCJcIiB8fCB1cmxpbnB1dC52YWx1ZSA9PSBudWxsKSB7XG4gICAgICAgICAgLy/nqbrjga7jg5Xjgqnjg7zjg6DjgpLpnZ7ooajnpLrjgIHooajnpLov6Z2e6KGo56S644KS44Kz44Oz44OI44Ot44O844Or44CBXCLliYrpmaTjgZnjgotcIuODgeOCp+ODg+OCr+ODnOODg+OCr+OCueOCkumdnuihqOekuuOBq+OBmeOCiy0+U0NTU1xuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScsICd0b2dnbGFibGUnLCAndXJsLWVtcHR5Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pO1xuICAgICAgLy8gUG9zdOOBq1VSTOOBjOOBsuOBqOOBpOOCguOBquOBhOWgtOWQiCjmlrDopo/mipXnqL/lkKvjgoAp44CB44Gy44Go44Gk44Gg44GR56m644Gu44OV44Kp44O844Og44KS6KGo56S6XG4gICAgICBsZXQgZWwgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcubm8tdXJscyAudG9nZ2xhYmxlJylbMF07XG4gICAgICBpZiAoZWwpIHtcbiAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnaGlkZScpO1xuICAgICAgfVxuXG4gICAgICB0b2dnbGVGb3JtcygnLnRvZ2dsYWJsZScpO1xuICAgIH0gLy9oaWRlRW1wdHlGb3JtYXNcblxuICAgIGhpZGVFbXB0eUZvcm1zMSgnLmxpbmstZm9ybScpO1xuXG5cbiAgICBmdW5jdGlvbiBoaWRlRW1wdHlGb3JtczIoZWxlbSkge1xuICAgICAgbGV0IGltZ0Zvcm1zID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChlbGVtKTtcbiAgICAgIGltZ0Zvcm1zLmZvckVhY2goZm9ybSA9PiB7XG4gICAgICAgIGlmICghZm9ybS5nZXRFbGVtZW50c0J5VGFnTmFtZSgnYScpLmxlbmd0aCkge1xuICAgICAgICAgIGZvcm0uY2xhc3NMaXN0LmFkZCgnaGlkZScsICd0b2dnbGFibGUnLCAnaW1nLWVtcHR5Jyk7XG4gICAgICAgIH1cbiAgICAgIH0pXG4gICAgICAvLyAvLyDjgbLjgajjgaTjgaDjgZHnqbrjga7jg5Xjgqnjg7zjg6DjgpLooajnpLpcbiAgICAgIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy50b2dnbGFibGUnKVswXS5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICAvLyBJdGVt44Gr44Gd44Gu5LuW55S75YOP44GM44Gy44Go44Gk44KC44Gq44GE5aC05ZCIKOaWsOimj+aKleeov+WQq+OCgCnjga7jgb/jgIHjgbLjgajjgaTjgaDjgZHnqbrjga7jg5Xjgqnjg7zjg6DjgpLooajnpLpcbiAgICAgIGxldCBlbCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5uby1kYXRhIC50b2dnbGFibGUnKVswXTtcbiAgICAgIGlmIChlbCkge1xuICAgICAgICBlbC5jbGFzc0xpc3QucmVtb3ZlKCdoaWRlJyk7XG4gICAgICB9XG5cbiAgICAgIHRvZ2dsZUZvcm1zKCcudG9nZ2xhYmxlJyk7XG4gICAgfVxuICAgIGhpZGVFbXB0eUZvcm1zMignLml0ZW0tZm9ybSAubXVsdGlGaWVsZCcpO1xuXG4gIH0gLy9tdWx0aV9mb3JtX2NvbnRyb2xcblxuXG4gIG11bHRpRm9ybUNvbnRyb2woKVxuXG5cbiAgY29uc3QgaW1hZ2VGb3JtVGh1bWJzID0gKCkgPT4ge1xuXG4gICAgbGV0IG1haW5JbWdMaW5rID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignI2Rpdl9pZF9pbWFnZSBhJyk7XG5cbiAgICAvLyBsZXQgaW1nU3JjID0gbWFpbkltZ0xpbmsuZ2V0QXR0cmlidXRlKCdocmVmJyk7XG4gICAgLy8gbGV0IGNvbnRhaW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAvLyBjb250YWluRGl2LnNldEF0dHJpYnV0ZSgnY2xhc3MnLCAndGh1bWItd3JhcCcpO1xuICAgIC8vIGNvbnRhaW5EaXYuaW5uZXJIVE1MID0gYDxpbWcgc3JjPVwiJHtpbWdTcmN9XCI+YDtcbiAgICAvLyBtYWluSW1nTGluay5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjb250YWluRGl2LCBtYWluSW1nTGluay5wYXJlbnROb2RlLmZpcnN0Q2hpbGQpO1xuXG4gICAgbGV0IG1haW5JbWdUaHVtYiA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNtYWluLXRodW1iJyk7XG4gICAgbWFpbkltZ0xpbmsucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUobWFpbkltZ1RodW1iLCBtYWluSW1nTGluay5wYXJlbnROb2RlLmZpcnN0Q2hpbGQpO1xuXG5cbiAgICBsZXQgb3RoZXJJbWdMaW5rcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJy5waG90by1mb3Jtc2V0IC5tdWx0aUZpZWxkIGEnKTtcbiAgICBsZXQgb3RoZXJJbWdUaHVtYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcudGh1bWItY29udGFpbmVyIGltZycpXG5cbiAgICBvdGhlckltZ0xpbmtzLmZvckVhY2goKGxpbmssIGkpID0+IHtcbiAgICAgIC8vIGxldCBpbWdTcmMgPSBsaW5rLmdldEF0dHJpYnV0ZSgnaHJlZicpO1xuICAgICAgbGV0IGNvbnRhaW5EaXYgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICAgIGNvbnRhaW5EaXYuc2V0QXR0cmlidXRlKCdjbGFzcycsICd0aHVtYi13cmFwJyk7XG4gICAgICAvLyAvLyBsZXQgaW1nVGh1bWIgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdpbWcnKTtcbiAgICAgIC8vIC8vIGltZ1RodW1iLnNldEF0dHJpYnV0ZSgnc3JjJywgYCR7aW1nU3JjfWApO1xuICAgICAgLy8gY29udGFpbkRpdi5pbm5lckhUTUwgPSBgPGltZyBzcmM9XCIke2ltZ1NyY31cIj5gO1xuICAgICAgLy8gbGluay5wYXJlbnROb2RlLmluc2VydEJlZm9yZShjb250YWluRGl2LCBsaW5rLnBhcmVudE5vZGUuZmlyc3RDaGlsZCk7XG4gICAgICBjb250YWluRGl2LmFwcGVuZENoaWxkKG90aGVySW1nVGh1bWJzW2ldKTtcbiAgICAgIGxpbmsucGFyZW50Tm9kZS5pbnNlcnRCZWZvcmUoY29udGFpbkRpdiwgbGluay5wYXJlbnROb2RlLmZpcnN0Q2hpbGQpO1xuICAgIH0pXG5cbiAgfVxuXG4gIGlmICgkKCcjZGl2X2lkX2ltYWdlIGEnKSkge1xuICAgIGltYWdlRm9ybVRodW1icygpO1xuICB9XG5cblxuICBjb25zdCBtb2RhbENvbnRyb2wgPSAoKSA9PiB7XG5cbiAgICBsZXQgbW9kYWxzID0gJCQoJy5tb2RhbCcpO1xuXG4gICAgZnVuY3Rpb24gZXhwYW5kTW9kYWwoaSwgZSkge1xuICAgICAgbW9kYWxzW2ldLmNsYXNzTGlzdC5hZGQoJ3Nob3ctbW9kYWwnKTtcbiAgICB9XG5cbiAgICBmdW5jdGlvbiBjbG9zZU1vZGFsKGksIGUpIHtcbiAgICAgIGlmICghZS50YXJnZXQuY2xhc3NMaXN0LmNvbnRhaW5zKCdrZWVwLW1vZGFsJykpIHtcbiAgICAgICAgbW9kYWxzW2ldLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctbW9kYWwnKTtcbiAgICAgICAgLy8gbW9kYWxzLmZvckVhY2gobW9kYWwgPT4gKCkgPT4ge1xuICAgICAgICAvLyAgIG1vZGFsLmNsYXNzTGlzdC5yZW1vdmUoJ3Nob3ctbW9kYWwnKTtcbiAgICAgICAgLy8gfSlcbiAgICAgIH1cbiAgICB9XG5cbiAgICBsZXQgdHJpZ2VycyA9ICQkKCcuZXhwYW5kLW1vZGFsJyk7XG4gICAgaWYgKCQoJy5leHBhbmQtbW9kYWwnKSkge1xuICAgICAgdHJpZ2Vycy5mb3JFYWNoKCh0cmlnZXIsIGkpID0+IHRyaWdlci5vbignY2xpY2snLCBleHBhbmRNb2RhbC5iaW5kKGV2ZW50LCBpKSkpO1xuICAgICAgLy8gJCgnLmV4cGFuZC1tb2RhbCcpLm9uKCdjbGljaycsIGV4cGFuZE1vZGFsKTtcbiAgICB9XG5cbiAgICAvLyBtb2RhbC5vbignY2xpY2snLCBjbG9zZU1vZGFsKTtcbiAgICBtb2RhbHMuZm9yRWFjaCgobW9kYWwsIGkpID0+IG1vZGFsLm9uKCdjbGljaycsIGNsb3NlTW9kYWwuYmluZChldmVudCwgaSkpKTtcblxuXG4gIH0gLy8gbW9kYWxfY29udHJvbFxuXG4gIGlmICgkKCcubW9kYWwnKSkge1xuICAgIG1vZGFsQ29udHJvbCgpO1xuICB9XG5cblxuXG5cblxuICAvLyAvLyBXaXRob3V0IGJpbmcuanNcbiAgLy8gbGV0IG1vZGFsID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLm1vZGFsJyk7XG4gIC8vIGxldCBwaG90b3MgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCcjcGhvdG9zIGltZycpO1xuXG4gIC8vIGZ1bmN0aW9uIGluc2VydEltYWdlKCkge1xuICAvLyAgIGxldCBpbWFnZSA9ICc8YSBocmVmPVwiJyArIHRoaXMuZGF0YXNldC5vcmlnaW4gKyAnXCI+PGltZyBzcmM9XCInICsgdGhpcy5kYXRhc2V0Lm1lZGl1bSArICdcIj48L2E+JztcbiAgLy8gICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcjaWRfY29udGVudCcpLnZhbHVlICs9IGltYWdlO1xuICAvLyB9XG5cbiAgLy8gZnVuY3Rpb24gZXhwYW5kTW9kYWwoKSB7XG4gIC8vICAgbW9kYWwuY2xhc3NMaXN0LmFkZCgnc2hvdycpO1xuICAvLyB9XG5cbiAgLy8gZnVuY3Rpb24gY2xvc2VNb2RhbChlKSB7XG4gIC8vICAgLy8gY29uc29sZS5sb2coZSk7XG4gIC8vICAgLy8gaWYoZS50YXJnZXQ9PT0nZm9ybScpIHJldHVybjtcbiAgLy8gICBtb2RhbC5jbGFzc0xpc3QucmVtb3ZlKCdzaG93Jyk7XG4gIC8vIH1cblxuICAvLyBwaG90b3MuZm9yRWFjaCggcGhvdG8gPT4gcGhvdG8uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBpbnNlcnRJbWFnZSkpO1xuXG4gIC8vIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoJyNleHBhbmQtbW9kYWwnKS5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGV4cGFuZE1vZGFsKTtcblxuICAvLyBtb2RhbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGNsb3NlTW9kYWwpO1xuXG59KSgkLCAkJCk7IiwiLy8gYmFzZWQgb24gaHR0cHM6Ly9naXN0LmdpdGh1Yi5jb20vcGF1bGlyaXNoLzEyZmI5NTFhOGI4OTNhNDU0YjMyXG5cbmNvbnN0ICQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yLmJpbmQoZG9jdW1lbnQpO1xuY29uc3QgJCQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsLmJpbmQoZG9jdW1lbnQpO1xuXG5Ob2RlLnByb3RvdHlwZS5vbiA9IHdpbmRvdy5vbiA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICB0aGlzLmFkZEV2ZW50TGlzdGVuZXIobmFtZSwgZm4pO1xufTtcblxuTm9kZUxpc3QucHJvdG90eXBlLl9fcHJvdG9fXyA9IEFycmF5LnByb3RvdHlwZTsgLy8gZXNsaW50LWRpc2FibGUtbGluZVxuXG5Ob2RlTGlzdC5wcm90b3R5cGUub24gPSBOb2RlTGlzdC5wcm90b3R5cGUuYWRkRXZlbnRMaXN0ZW5lciA9IGZ1bmN0aW9uIChuYW1lLCBmbikge1xuICB0aGlzLmZvckVhY2goKGVsZW0pID0+IHtcbiAgICBlbGVtLm9uKG5hbWUsIGZuKTtcbiAgfSk7XG59O1xuXG5leHBvcnQgeyAkLCAkJCB9OyIsIi8vIGV4dHJhY3RlZCBieSBtaW5pLWNzcy1leHRyYWN0LXBsdWdpblxuZXhwb3J0IHt9OyIsIi8vIFRoZSBtb2R1bGUgY2FjaGVcbnZhciBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX18gPSB7fTtcblxuLy8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbmZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG5cdHZhciBjYWNoZWRNb2R1bGUgPSBfX3dlYnBhY2tfbW9kdWxlX2NhY2hlX19bbW9kdWxlSWRdO1xuXHRpZiAoY2FjaGVkTW9kdWxlICE9PSB1bmRlZmluZWQpIHtcblx0XHRyZXR1cm4gY2FjaGVkTW9kdWxlLmV4cG9ydHM7XG5cdH1cblx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcblx0dmFyIG1vZHVsZSA9IF9fd2VicGFja19tb2R1bGVfY2FjaGVfX1ttb2R1bGVJZF0gPSB7XG5cdFx0Ly8gbm8gbW9kdWxlLmlkIG5lZWRlZFxuXHRcdC8vIG5vIG1vZHVsZS5sb2FkZWQgbmVlZGVkXG5cdFx0ZXhwb3J0czoge31cblx0fTtcblxuXHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cblx0X193ZWJwYWNrX21vZHVsZXNfX1ttb2R1bGVJZF0obW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cblx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcblx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xufVxuXG4vLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuX193ZWJwYWNrX3JlcXVpcmVfXy5tID0gX193ZWJwYWNrX21vZHVsZXNfXztcblxuIiwidmFyIGRlZmVycmVkID0gW107XG5fX3dlYnBhY2tfcmVxdWlyZV9fLk8gPSAocmVzdWx0LCBjaHVua0lkcywgZm4sIHByaW9yaXR5KSA9PiB7XG5cdGlmKGNodW5rSWRzKSB7XG5cdFx0cHJpb3JpdHkgPSBwcmlvcml0eSB8fCAwO1xuXHRcdGZvcih2YXIgaSA9IGRlZmVycmVkLmxlbmd0aDsgaSA+IDAgJiYgZGVmZXJyZWRbaSAtIDFdWzJdID4gcHJpb3JpdHk7IGktLSkgZGVmZXJyZWRbaV0gPSBkZWZlcnJlZFtpIC0gMV07XG5cdFx0ZGVmZXJyZWRbaV0gPSBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV07XG5cdFx0cmV0dXJuO1xuXHR9XG5cdHZhciBub3RGdWxmaWxsZWQgPSBJbmZpbml0eTtcblx0Zm9yICh2YXIgaSA9IDA7IGkgPCBkZWZlcnJlZC5sZW5ndGg7IGkrKykge1xuXHRcdHZhciBbY2h1bmtJZHMsIGZuLCBwcmlvcml0eV0gPSBkZWZlcnJlZFtpXTtcblx0XHR2YXIgZnVsZmlsbGVkID0gdHJ1ZTtcblx0XHRmb3IgKHZhciBqID0gMDsgaiA8IGNodW5rSWRzLmxlbmd0aDsgaisrKSB7XG5cdFx0XHRpZiAoKHByaW9yaXR5ICYgMSA9PT0gMCB8fCBub3RGdWxmaWxsZWQgPj0gcHJpb3JpdHkpICYmIE9iamVjdC5rZXlzKF9fd2VicGFja19yZXF1aXJlX18uTykuZXZlcnkoKGtleSkgPT4gKF9fd2VicGFja19yZXF1aXJlX18uT1trZXldKGNodW5rSWRzW2pdKSkpKSB7XG5cdFx0XHRcdGNodW5rSWRzLnNwbGljZShqLS0sIDEpO1xuXHRcdFx0fSBlbHNlIHtcblx0XHRcdFx0ZnVsZmlsbGVkID0gZmFsc2U7XG5cdFx0XHRcdGlmKHByaW9yaXR5IDwgbm90RnVsZmlsbGVkKSBub3RGdWxmaWxsZWQgPSBwcmlvcml0eTtcblx0XHRcdH1cblx0XHR9XG5cdFx0aWYoZnVsZmlsbGVkKSB7XG5cdFx0XHRkZWZlcnJlZC5zcGxpY2UoaS0tLCAxKVxuXHRcdFx0dmFyIHIgPSBmbigpO1xuXHRcdFx0aWYgKHIgIT09IHVuZGVmaW5lZCkgcmVzdWx0ID0gcjtcblx0XHR9XG5cdH1cblx0cmV0dXJuIHJlc3VsdDtcbn07IiwiLy8gZGVmaW5lIGdldHRlciBmdW5jdGlvbnMgZm9yIGhhcm1vbnkgZXhwb3J0c1xuX193ZWJwYWNrX3JlcXVpcmVfXy5kID0gKGV4cG9ydHMsIGRlZmluaXRpb24pID0+IHtcblx0Zm9yKHZhciBrZXkgaW4gZGVmaW5pdGlvbikge1xuXHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhkZWZpbml0aW9uLCBrZXkpICYmICFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywga2V5KSkge1xuXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIGtleSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGRlZmluaXRpb25ba2V5XSB9KTtcblx0XHR9XG5cdH1cbn07IiwiX193ZWJwYWNrX3JlcXVpcmVfXy5vID0gKG9iaiwgcHJvcCkgPT4gKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIHByb3ApKSIsIi8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbl9fd2VicGFja19yZXF1aXJlX18uciA9IChleHBvcnRzKSA9PiB7XG5cdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuXHR9XG5cdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG59OyIsIi8vIG5vIGJhc2VVUklcblxuLy8gb2JqZWN0IHRvIHN0b3JlIGxvYWRlZCBhbmQgbG9hZGluZyBjaHVua3Ncbi8vIHVuZGVmaW5lZCA9IGNodW5rIG5vdCBsb2FkZWQsIG51bGwgPSBjaHVuayBwcmVsb2FkZWQvcHJlZmV0Y2hlZFxuLy8gW3Jlc29sdmUsIHJlamVjdCwgUHJvbWlzZV0gPSBjaHVuayBsb2FkaW5nLCAwID0gY2h1bmsgbG9hZGVkXG52YXIgaW5zdGFsbGVkQ2h1bmtzID0ge1xuXHRcIi9zdGF0aWNfZmlsZXMvanMvYXBwXCI6IDAsXG5cdFwic3RhdGljX2ZpbGVzL2Nzcy9zdHlsZXNcIjogMFxufTtcblxuLy8gbm8gY2h1bmsgb24gZGVtYW5kIGxvYWRpbmdcblxuLy8gbm8gcHJlZmV0Y2hpbmdcblxuLy8gbm8gcHJlbG9hZGVkXG5cbi8vIG5vIEhNUlxuXG4vLyBubyBITVIgbWFuaWZlc3RcblxuX193ZWJwYWNrX3JlcXVpcmVfXy5PLmogPSAoY2h1bmtJZCkgPT4gKGluc3RhbGxlZENodW5rc1tjaHVua0lkXSA9PT0gMCk7XG5cbi8vIGluc3RhbGwgYSBKU09OUCBjYWxsYmFjayBmb3IgY2h1bmsgbG9hZGluZ1xudmFyIHdlYnBhY2tKc29ucENhbGxiYWNrID0gKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uLCBkYXRhKSA9PiB7XG5cdHZhciBbY2h1bmtJZHMsIG1vcmVNb2R1bGVzLCBydW50aW1lXSA9IGRhdGE7XG5cdC8vIGFkZCBcIm1vcmVNb2R1bGVzXCIgdG8gdGhlIG1vZHVsZXMgb2JqZWN0LFxuXHQvLyB0aGVuIGZsYWcgYWxsIFwiY2h1bmtJZHNcIiBhcyBsb2FkZWQgYW5kIGZpcmUgY2FsbGJhY2tcblx0dmFyIG1vZHVsZUlkLCBjaHVua0lkLCBpID0gMDtcblx0aWYoY2h1bmtJZHMuc29tZSgoaWQpID0+IChpbnN0YWxsZWRDaHVua3NbaWRdICE9PSAwKSkpIHtcblx0XHRmb3IobW9kdWxlSWQgaW4gbW9yZU1vZHVsZXMpIHtcblx0XHRcdGlmKF9fd2VicGFja19yZXF1aXJlX18ubyhtb3JlTW9kdWxlcywgbW9kdWxlSWQpKSB7XG5cdFx0XHRcdF9fd2VicGFja19yZXF1aXJlX18ubVttb2R1bGVJZF0gPSBtb3JlTW9kdWxlc1ttb2R1bGVJZF07XG5cdFx0XHR9XG5cdFx0fVxuXHRcdGlmKHJ1bnRpbWUpIHZhciByZXN1bHQgPSBydW50aW1lKF9fd2VicGFja19yZXF1aXJlX18pO1xuXHR9XG5cdGlmKHBhcmVudENodW5rTG9hZGluZ0Z1bmN0aW9uKSBwYXJlbnRDaHVua0xvYWRpbmdGdW5jdGlvbihkYXRhKTtcblx0Zm9yKDtpIDwgY2h1bmtJZHMubGVuZ3RoOyBpKyspIHtcblx0XHRjaHVua0lkID0gY2h1bmtJZHNbaV07XG5cdFx0aWYoX193ZWJwYWNrX3JlcXVpcmVfXy5vKGluc3RhbGxlZENodW5rcywgY2h1bmtJZCkgJiYgaW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdKSB7XG5cdFx0XHRpbnN0YWxsZWRDaHVua3NbY2h1bmtJZF1bMF0oKTtcblx0XHR9XG5cdFx0aW5zdGFsbGVkQ2h1bmtzW2NodW5rSWRdID0gMDtcblx0fVxuXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXy5PKHJlc3VsdCk7XG59XG5cbnZhciBjaHVua0xvYWRpbmdHbG9iYWwgPSBzZWxmW1wid2VicGFja0NodW5rZGpfZWNvbW1lcmNlXCJdID0gc2VsZltcIndlYnBhY2tDaHVua2RqX2Vjb21tZXJjZVwiXSB8fCBbXTtcbmNodW5rTG9hZGluZ0dsb2JhbC5mb3JFYWNoKHdlYnBhY2tKc29ucENhbGxiYWNrLmJpbmQobnVsbCwgMCkpO1xuY2h1bmtMb2FkaW5nR2xvYmFsLnB1c2ggPSB3ZWJwYWNrSnNvbnBDYWxsYmFjay5iaW5kKG51bGwsIGNodW5rTG9hZGluZ0dsb2JhbC5wdXNoLmJpbmQoY2h1bmtMb2FkaW5nR2xvYmFsKSk7IiwiIiwiLy8gc3RhcnR1cFxuLy8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4vLyBUaGlzIGVudHJ5IG1vZHVsZSBkZXBlbmRzIG9uIG90aGVyIGxvYWRlZCBjaHVua3MgYW5kIGV4ZWN1dGlvbiBuZWVkIHRvIGJlIGRlbGF5ZWRcbl9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInN0YXRpY19maWxlcy9jc3Mvc3R5bGVzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vcmVzb3VyY2VzL2pzL2FwcC5qc1wiKSkpXG52YXIgX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyh1bmRlZmluZWQsIFtcInN0YXRpY19maWxlcy9jc3Mvc3R5bGVzXCJdLCAoKSA9PiAoX193ZWJwYWNrX3JlcXVpcmVfXyhcIi4vcmVzb3VyY2VzL3Njc3Mvc3R5bGVzLnNjc3NcIikpKVxuX193ZWJwYWNrX2V4cG9ydHNfXyA9IF9fd2VicGFja19yZXF1aXJlX18uTyhfX3dlYnBhY2tfZXhwb3J0c19fKTtcbiIsIiJdLCJuYW1lcyI6WyIkIiwiJCQiLCJsaXN0TGFuZHNjYXBlIiwibGlzdGltZ3MiLCJmb3JFYWNoIiwibGlzdGltZyIsIndpZHRoIiwiaGVpZ2h0IiwicGFyZW50Tm9kZSIsImNsYXNzTGlzdCIsImFkZCIsIm1ha2VTcXVhcmUiLCJzcXVhcmVzIiwic3F1YXJlIiwic3R5bGUiLCJvZmZzZXRXaWR0aCIsIm5hdmJhckNvbGxhcHNlRnVuY3Rpb24iLCJ0cmlnZ2VycyIsIm5hdmJhcnMiLCJuYXZiYXJUb2dnbGUiLCJpIiwiZSIsInRvZ2dsZSIsInRyaWdnZXIiLCJvbiIsImJpbmQiLCJldmVudCIsImZpbGVuYW1lIiwidmFsdWUiLCJyZXBsYWNlIiwiaW5uZXJIVE1MIiwibXVsdGlGb3JtQ29udHJvbCIsImhpZGVPdGhlcnMiLCJlbGVtIiwiZWwiLCJkb2N1bWVudCIsInF1ZXJ5U2VsZWN0b3JBbGwiLCJsZW5ndGgiLCJ0b2dnbGVGb3JtcyIsInByZXZlbnREZWZhdWx0IiwicmVtb3ZlIiwiaGlkZUVtcHR5Rm9ybXMxIiwibGlua0Zvcm1zIiwiZm9ybSIsInVybGlucHV0IiwicXVlcnlTZWxlY3RvciIsImhpZGVFbXB0eUZvcm1zMiIsImltZ0Zvcm1zIiwiZ2V0RWxlbWVudHNCeVRhZ05hbWUiLCJpbWFnZUZvcm1UaHVtYnMiLCJtYWluSW1nTGluayIsIm1haW5JbWdUaHVtYiIsImluc2VydEJlZm9yZSIsImZpcnN0Q2hpbGQiLCJvdGhlckltZ0xpbmtzIiwib3RoZXJJbWdUaHVtYnMiLCJsaW5rIiwiY29udGFpbkRpdiIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJhcHBlbmRDaGlsZCIsIm1vZGFsQ29udHJvbCIsIm1vZGFscyIsImV4cGFuZE1vZGFsIiwiY2xvc2VNb2RhbCIsInRhcmdldCIsImNvbnRhaW5zIiwidHJpZ2VycyIsInRyaWdlciIsIm1vZGFsIiwiTm9kZSIsInByb3RvdHlwZSIsIndpbmRvdyIsIm5hbWUiLCJmbiIsImFkZEV2ZW50TGlzdGVuZXIiLCJOb2RlTGlzdCIsIl9fcHJvdG9fXyIsIkFycmF5Il0sInNvdXJjZVJvb3QiOiIifQ==