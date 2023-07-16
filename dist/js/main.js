"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }
function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
document.addEventListener('DOMContentLoaded', function () {
  var vars = {
    html: {
      catalog: {
        root: document.querySelector('.catalog').innerHTML,
        row: document.querySelector('.catalog__row').innerHTML
      }
    }
  };
  applyAll();

  // Применение всех настраивающих функций
  function applyAll() {
    setCorrectCatalog();
    setCorrectProductsOnClick();
    setCorrectLiveSeach();
    setCorrectMask();
    setCorrectCatalogMenu();
    setCorrectRange();
    setCorrectFilters();
    setCorrectMoreProducts();
    setCorrectFiltersPosition();
    setCorrectMobileFiltersSidebar();
    setCorrectLogin();
    setCorrectRegister();
    setCorrectVisiblePassword();
    setCorrectSelects();
    setCorrectCalendar();
    setCorrectCardInput();
    setCorrectPopups();
    setCorrectFavourite();
    setCorrectProductSlider();
    setCorrectNotification();
    setCorrectPanzoom();
    setCorrectBasketFill();
    ymaps.ready(setCorrectMap);
    window.addEventListener('resize', function () {
      setCorrectCatalogMenu();
      setCorrectMoreProducts();
      setCorrectFiltersPosition();
    });
  }

  // Настройка появления каталога при наведении на кнопку
  function setCorrectCatalog() {
    var header = document.querySelector('.header');
    var catalogActivate = header.querySelector('.catalog-activate');
    var catalogSection = header.querySelector('.catalog');
    catalogActivate.addEventListener('mouseenter', function () {
      catalogSection.classList.add('active');
    });
    catalogSection.addEventListener('mouseleave', function () {
      catalogSection.classList.remove('active');
    });
    document.addEventListener('click', function (event) {
      if (event.target.closest('.catalog') || event.target.closest('.catalog-activate')) return;
      catalogSection.classList.remove('active');
    });
  }

  // Обработка кликов на "Добавить в корзину на карточках товаров"
  function setCorrectProductsOnClick() {
    var basketButtons = document.querySelectorAll('.to-basket-btn');
    var basketCountGlobal = document.querySelectorAll('.basket-count');
    var setGlobalCount = function setGlobalCount(count) {
      basketCountGlobal.forEach(function (elem) {
        var elemCountText = elem.querySelector('.basket-count__counter-text');
        if (elemCountText) {
          elem = elemCountText;
        }
        elem.textContent = count;
      });
    };
    var basket = document.querySelector('.basket');
    var globalCount = 0;
    if (basket) {
      var allBasketCounters = document.querySelectorAll('.basket-product .manipulate-with-basket__count');
      globalCount = _toConsumableArray(allBasketCounters).reduce(function (total, next) {
        return total + +next.textContent;
      }, 0);
      setGlobalCount(globalCount);
    }
    basketButtons.forEach(function (button) {
      var fl = false;
      button.addEventListener('click', function (event) {
        var shopCard = button.closest('.shop-item');
        if (shopCard) shopCard.classList.add('in-basket');
        if (!globalCount) setGlobalCount(++globalCount);
        if (fl) return;
        var updateCount = shopCard.querySelector('.manipulate-with-basket__update');
        var decreaseCount = shopCard.querySelector('.manipulate-with-basket__decrease');
        var countElem = shopCard.querySelector('.manipulate-with-basket__count');
        var isValidCount = function isValidCount(count) {
          return count > 0 && count < 51 ? true : false;
        };
        var addCount = function addCount() {
          if (isValidCount(count + 1)) {
            countElem.textContent = ++count;
            setGlobalCount(++globalCount);
          }
        };
        var removeCount = function removeCount() {
          if (isValidCount(count - 1)) {
            countElem.textContent = --count;
            setGlobalCount(--globalCount);
          } else if (count - 1 === 0) {
            if (globalCount - 1 === 0) {
              --globalCount;
              setGlobalCount('');
            } else {
              setGlobalCount(--globalCount);
            }
            shopCard.classList.remove('in-basket');
          }
        };
        var count = +countElem.textContent || 1;
        countElem.textContent = count;

        // Эти две строчки отработают только в первый клик, они нужны для счётчиков в корзине
        if (event.target.closest('.basket-update') === updateCount) addCount();else if (event.target.closest('.basket-decrease') === decreaseCount) removeCount();
        updateCount.addEventListener('click', addCount);
        decreaseCount.addEventListener('click', removeCount);
        fl = true;
      });
    });
  }

  // Настройка карты
  function setCorrectMap() {
    var mapTabsBtns = document.querySelectorAll('.map-tabs__btn');
    var coords = new Map([[mapTabsBtns[0], {
      center: [61.66854376888902, 50.836547597778186],
      zoom: 14,
      balloonDesc: 'Республика Коми, г. Сыктывкар'
    }], [mapTabsBtns[1], {
      center: [65.29856921472931, 53.205173578048736],
      zoom: 14,
      balloonDesc: 'Республика Коми, д. Вертеп'
    }], [mapTabsBtns[2], {
      center: [65.29479765772048, 53.28752112704468],
      zoom: 14,
      balloonDesc: 'Республика Коми, с. Краснобор'
    }], [mapTabsBtns[3], {
      center: [65.27638791620612, 53.36212767066955],
      zoom: 14,
      balloonDesc: 'Республика Коми, с. Диюр'
    }]]);
    var map = new ymaps.Map('map-block', coords.get(mapTabsBtns[0]));
    map.behaviors.disable('scrollZoom');
    // map.controls.remove('zoomControl');
    map.controls.remove('geolocationControl');
    map.controls.remove('rulerControl');
    map.controls.remove('searchControl');
    map.controls.remove('fullscreenControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');
    var geoObjects = [];
    var _loop = function _loop(i) {
      mapTabsBtns[i].onclick = function () {
        mapTabsBtns.forEach(function (btn) {
          return btn.classList.remove('active');
        });
        mapTabsBtns[i].classList.add('active');
        map.setCenter(coords.get(mapTabsBtns[i]).center, coords.get(mapTabsBtns[i]).zoom, {
          checkZoomRange: true
        });
      };
      var placemark = new ymaps.Placemark(coords.get(mapTabsBtns[i]).center, {
        balloonContentHeader: coords.get(mapTabsBtns[i]).balloonDesc
      }, {
        preset: 'islands#redLeisureIcon'
      });
      // map.geoObjects.add(placemark);
      geoObjects.push(placemark);
    };
    for (var i = 0; i < coords.size; i++) {
      _loop(i);
    }
    var clusterer = new ymaps.Clusterer({
      preset: 'islands#invertedRedClusterIcons'
    });
    clusterer.add(geoObjects);
    map.geoObjects.add(clusterer);
  }

  // Настройка живого поиска
  function setCorrectLiveSeach() {
    var searchBlock = document.querySelector('.search');
    var searchInput = searchBlock.querySelector('.search__input');
    var liveList = searchBlock.querySelector('.live-list');
    var items = ['Молоко, сыр, яйцо', 'Молоко', 'Коктейль Молочный', 'Йогурт Молочный'];
    var makeMatchBold = function makeMatchBold(str) {
      var inputValue = searchInput.value.toLowerCase();
      var matchValue = str.toLowerCase();
      var start = matchValue.indexOf(inputValue);
      var end = start + inputValue.length - 1;
      var res = str.split('');
      res[start] = '<b>' + res[start];
      res[end] = res[end] + '</b>';
      return res.join('');
    };
    var inputHandler = function inputHandler() {
      if (!searchInput.value) {
        searchBlock.classList.remove('active');
        liveList.innerHTML = '';
        return;
      }
      var searchedItems = items.map(function (value) {
        return value.toLowerCase().includes(searchInput.value.toLowerCase()) ? value : {};
      }).filter(function (value) {
        return _typeof(value) !== 'object';
      });
      var liveListHtml = "\n          ".concat(searchedItems.map(function (value) {
        return "<li class=\"live-list__item\">\n               <a class=\"live-list__link\" href=\"./searched.html\">".concat(makeMatchBold(value), "</a>\n             </li>");
      }).join(''));
      if (!searchBlock.classList.contains('active')) searchBlock.classList.add('active');
      liveList.innerHTML = liveListHtml;
    };
    searchInput.addEventListener('input', inputHandler);
    searchInput.addEventListener('focus', inputHandler);
    document.addEventListener('click', function (event) {
      if (event.target.closest('.search')) return;
      if (searchBlock.classList.contains('active')) searchBlock.classList.remove('active');
    });
    // searchInput.addEventListener('blur', () => {
    //   setTimeout(() => searchBlock.classList.remove('active'), 0);
    //   inputHandler();
    // });
  }

  // Настройка масок на инпутах
  function setCorrectMask() {
    var maskTel = new Inputmask('+7(999)-999-99-99');
    var inputsTel = document.querySelectorAll('input[type="tel"]');
    inputsTel.forEach(function (input) {
      return maskTel.mask(input);
    });
  }

  // Выстраивание меню-каталога в два ряда при малом устройстве
  function setCorrectCatalogMenu() {
    if (window.matchMedia('(min-width: 861px)').matches) {
      document.querySelector('.catalog__row').innerHTML = vars.html.catalog.row;
      return;
    }
    var lists = document.querySelectorAll('.catalog-list');
    for (var i = 2; i < lists.length; i++) {
      if ((i + 1) % 2) _toConsumableArray(lists[i].children).forEach(function (child) {
        return lists[0].append(child);
      });else _toConsumableArray(lists[i].children).forEach(function (child) {
        return lists[1].append(child);
      });
    }
    _toConsumableArray(lists).slice(2).forEach(function (list) {
      return list.remove();
    });
  }

  // Настройка range для фильтра цены
  function setCorrectRange() {
    var range = document.querySelector('.price-filter__range');
    if (!range) return;
    var start = document.querySelector('.price-filter__start');
    var end = document.querySelector('.price-filter__end');
    var reset = document.querySelector('.price-filter__reset');
    var priceFilterAccepted = document.querySelector('.filter-price');
    var priceFilterAcceptedText = document.querySelector('.filter-price .accepted-filter__text');
    noUiSlider.create(range, {
      start: [99, 9999],
      connect: true,
      range: {
        'min': 0,
        'max': 9999
      }
    });
    range.noUiSlider.on('update', function (values, changedIndex) {
      values = values.map(Math.round);
      [start, end][changedIndex].value = values[changedIndex];
      priceFilterAcceptedText.innerHTML = "\u0426\u0435\u043D\u0430 \u043E\u0442 ".concat(values[0], " \u0434\u043E ").concat(values[1]);
    });
    reset.addEventListener('click', function () {
      return range.noUiSlider.reset();
    });
    priceFilterAccepted.addEventListener('click', function () {
      range.noUiSlider.reset();
    });
  }

  // Настройка добавления фильтров на странице с категорией товаров
  function setCorrectFilters() {
    var inStock = document.querySelector('.category-section input[type="checkbox"]');
    if (!inStock) return;
    var resetPrice = document.querySelector('.price-filter__reset');

    // Обновление "в наличии"
    var stockUpdate = function stockUpdate() {
      var acceptedFilters = document.querySelector('.accepted-filters');
      var addListenerToStockFilter = function addListenerToStockFilter() {
        var acceptedFilter = document.querySelector('.filter-in-stock');
        acceptedFilter.addEventListener('click', function () {
          acceptedFilter.remove();
          inStock.checked = false;
        });
      };
      addListenerToStockFilter();
      // При изменении чекбокса "в наличии" - будем добавлять / удалять фильтр
      inStock.addEventListener('change', function () {
        var html = '';
        if (inStock.checked) {
          html = "<li class=\"accepted-filters__item filter-in-stock\">\n            <button class=\"accepted-filters__filter accepted-filter active\">\n              <span class=\"accepted-filter__text\">\u0412 \u043D\u0430\u043B\u0438\u0447\u0438\u0438</span>\n              <svg class=\"accepted-filter__close-icon\" width=\"24\" height=\"24\" viewBox=\"0 0 24 24\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M18.3536 5.64645C18.5488 5.84171 18.5488 6.15829 18.3536 6.35355L6.35355 18.3536C6.15829 18.5488 5.84171 18.5488 5.64645 18.3536C5.45118 18.1583 5.45118 17.8417 5.64645 17.6464L17.6464 5.64645C17.8417 5.45118 18.1583 5.45118 18.3536 5.64645Z\" fill=\"#414141\"/>\n                <path fill-rule=\"evenodd\" clip-rule=\"evenodd\" d=\"M5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L18.3536 17.6464C18.5488 17.8417 18.5488 18.1583 18.3536 18.3536C18.1583 18.5488 17.8417 18.5488 17.6464 18.3536L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645Z\" fill=\"#414141\"/>\n              </svg>\n            </button>\n          </li>";
          acceptedFilters.insertAdjacentHTML('afterbegin', html);
          addListenerToStockFilter();
        } else {
          document.querySelector('.filter-in-stock').remove();
        }
      });
    };

    // Обновление по клику на удаление всех фильтров
    var resetUpdate = function resetUpdate() {
      var resetAllFiltersBtn = document.querySelector('.reset-filters__btn');
      resetAllFiltersBtn.addEventListener('click', function () {
        resetPrice.click();
        if (inStock.checked) inStock.click();
      });
    };
    stockUpdate();
    resetUpdate();
  }

  // Настройка показа большего количества товаров при клике на "Показать ещё"
  function setCorrectMoreProducts() {
    var moreBtn = document.querySelector('.category-line__more');
    if (!moreBtn) return;
    var products = document.querySelectorAll('.shop-card');
    _toConsumableArray(products).slice(6).forEach(function (productCard) {
      return productCard.classList.add('hidden');
    });
    var hiddenProducts = document.querySelectorAll('.shop-card.hidden');
    var maxValue = window.matchMedia('(max-width: 680px)').matches ? 2 : 3;
    moreBtn.onclick = function () {
      _toConsumableArray(hiddenProducts).splice(0, maxValue).forEach(function (elem) {
        return elem.classList.remove('hidden');
      });
      hiddenProducts = document.querySelectorAll('.shop-card.hidden');
      if (hiddenProducts.length === 0) moreBtn.disabled = true;
    };
  }

  // Подстановка фильтров в отдельное меню при малом устройстве
  function setCorrectFiltersPosition() {
    var acceptedFilters = document.querySelector('.accepted-filters');
    if (!acceptedFilters) return;
    var categoryMainRow = document.querySelector('.category-main-content__row');
    var priceFilterHead = document.querySelector('.price-filter__head');
    if (window.matchMedia('(max-width: 860px)').matches) {
      priceFilterHead.insertAdjacentElement('beforebegin', acceptedFilters);
    } else {
      categoryMainRow.insertAdjacentElement('afterbegin', acceptedFilters);
    }
  }

  // Выдвижение мобильного сайдбара с настройками фильтров по клику на кнопку
  function setCorrectMobileFiltersSidebar() {
    var activateSidebar = document.querySelector('.activate-mobile-filters');
    if (!activateSidebar) return;
    var sidebar = document.querySelector('.options');
    var setToActiveSidebar = function setToActiveSidebar(event) {
      event.stopPropagation();
      sidebar.classList.add('active');
    };
    var disableSidebar = function disableSidebar(event) {
      if (!event.target.closest('.options') && sidebar.classList.contains('active')) sidebar.classList.remove('active');
    };
    var startX = 0,
      endX = 0;
    activateSidebar.addEventListener('click', setToActiveSidebar);
    document.addEventListener('click', disableSidebar);
    document.addEventListener('touchstart', function (event) {
      return startX = event.touches[0].pageX;
    });
    document.addEventListener('touchend', function (event) {
      if (!sidebar.classList.contains('active')) return;
      endX = event.changedTouches[0].pageX;
      if (startX > endX + 70) sidebar.classList.remove('active');else sidebar.classList.add('active');
    });
  }

  // Логика входа в аккаунт
  function setCorrectLogin() {
    var loginPopup = document.querySelector('.popup-login');
    var loginPopupTitle = loginPopup.querySelector('.popup__title');
    var loginForm = document.forms.login;
    var codeInput = loginPopup.querySelector('.code-input');
    var submitBtn = loginForm.querySelector('button[type="submit"]');
    var goBackBtn = loginPopup.querySelector('.step-back');
    var resetPasswordBtn = loginPopup.querySelector('.reset-password-btn');
    var utilsClasses = ['write-code-again-send'];
    var removeAllUtilsClasses = function removeAllUtilsClasses() {
      return utilsClasses.forEach(function (_class) {
        return loginPopup.classList.remove(_class);
      });
    };
    var moveUserByStep = function moveUserByStep(step) {
      Object.values(stepsElems).forEach(function (infoObj) {
        return loginPopup.classList.remove(infoObj.popupClass);
      });
      removeAllUtilsClasses();
      loginPopupTitle.textContent = stepsElems[step].popupTitle || loginPopupTitle.textContent;
      loginPopup.classList.add(stepsElems[step].popupClass);
      submitBtn.textContent = stepsElems[step].submitText;
    };
    var stepsElems = {
      1: {
        popupTitle: 'Вход',
        popupClass: 'enter-telephone',
        submitText: 'Войти'
      },
      2: {
        popupTitle: 'Вход',
        popupClass: 'enter-password',
        submitText: 'Подтвердить'
      },
      resetPassword: {
        popupTitle: 'Вход',
        popupClass: 'reset-password',
        submitText: 'Отправить СМС'
      },
      writeCode: {
        popupTitle: 'Вход',
        popupClass: 'write-code',
        submitText: 'Подтвердить'
      },
      3: {
        popupTitle: 'Новый пароль',
        popupClass: 'write-new-password',
        submitText: 'Подтвердить'
      }
    };
    var flTimer = false;
    var step = 1;
    moveUserByStep(step);
    loginForm.addEventListener('submit', function (event) {
      event.preventDefault();
      if (stepsElems[step + 1]) moveUserByStep(++step);
    });
    goBackBtn.addEventListener('click', function () {
      removeAllUtilsClasses();
      if (stepsElems[step - 1]) moveUserByStep(--step);
    });
    resetPasswordBtn.addEventListener('click', function () {
      step = 2;
      moveUserByStep('resetPassword');
    });
    submitBtn.addEventListener('click', function () {
      // Если идёт сброс пароля и пользователь ввёл код
      if (loginPopup.classList.contains(stepsElems.resetPassword.popupClass)) {
        var sendAgainBtn = loginPopup.querySelector('.popup-login__again-send-code-link');
        if (sendAgainBtn.classList.contains('hidden')) sendAgainBtn.classList.remove('hidden');
        step = 3;
        moveUserByStep('writeCode');
        if (flTimer) return;
        flTimer = true;
        var notification = loginPopup.querySelector('.popup__notification');
        var notificationSeconds = notification.querySelector('.seconds');
        var awaitMax = 46;
        var awaitSeconds = awaitMax;
        var interval = setInterval(function () {
          return notificationSeconds.textContent = --awaitSeconds;
        }, 1 * 1000);
        var awaitPromise = new Promise(function (resolve, reject) {
          setTimeout(function () {
            return resolve(true);
          }, awaitMax * 1000);
        });
        awaitPromise.then(function () {
          clearInterval(interval);
          if (!loginPopup.classList.contains(stepsElems.writeCode.popupClass)) return;
          loginPopup.classList.add('write-code-again-send');
          sendAgainBtn.addEventListener('click', function () {
            return sendAgainBtn.classList.add('hidden');
          });
        }).then(function () {
          return flTimer = false;
        });
      } else if (loginPopup.classList.contains(stepsElems.writeCode.popupClass) && codeInput.value.length === 4) {
        moveUserByStep(step = 3);
      }
    });
  }

  // Логика регистрации аккаунта
  function setCorrectRegister() {
    var loginPopup = document.querySelector('.popup-login');
    var loginBtn = loginPopup.querySelector('.popup__form-submit');
    var registerPopup = document.querySelector('.popup-register');
    var registerBtn = registerPopup.querySelector('.popup__form .popup__form-submit');
    registerBtn.addEventListener('click', function (event) {
      event.preventDefault();
      registerPopup.classList.remove('active');
      setTimeout(function () {
        return loginPopup.classList.add('active');
      }, 0);
      loginPopup.classList.add('reset-password');
      loginBtn.click();
    });
  }

  // Настройка видимого пароля по нажатию на иконку рядом с инпутом пароля
  function setCorrectVisiblePassword() {
    var inputsBlock = document.querySelectorAll('.input-block');
    inputsBlock.forEach(function (block) {
      var inputPassword = null;
      block.addEventListener('click', function (event) {
        inputPassword = block.querySelector('.password-input');
        if (event.target.closest('.set-visible-password')) {
          if (inputPassword.getAttribute('type') === 'password') inputPassword.setAttribute('type', 'text');else inputPassword.setAttribute('type', 'password');
        }
      });
    });
  }

  // Настройка выпадающих списков
  function setCorrectSelects() {
    var selects = document.querySelectorAll('select');
    selects.forEach(function (select) {
      var choice = new Choices(select, {
        searchEnabled: false,
        itemSelectText: ''
      });
    });
  }

  // Настройка календаря
  function setCorrectCalendar() {
    var popupRegister = document.querySelector('.popup-register');
    var calendarInputs = document.querySelectorAll('.calendar-input');
    calendarInputs.forEach(function (calendarInput) {
      calendarInput.addEventListener('click', function () {
        xCal(calendarInput, {
          lang: "ru",
          now: false,
          x: false
        });
      });
    });
    popupRegister.addEventListener('scroll', function () {
      return xCal();
    });
  }

  // Настройка инпута для ввода карты
  function setCorrectCardInput() {
    var cardInput = document.querySelector('.label-card-number .card-input');
    var noCardCheckbox = document.querySelector('.no-card-checkbox');
    noCardCheckbox.addEventListener('change', function () {
      return cardInput.disabled = noCardCheckbox.checked;
    });
  }

  // Настройка появление попапов
  function setCorrectPopups() {
    var allPopups = document.querySelectorAll('.popup');
    var activators = document.querySelectorAll('.activate-popup');
    var closeAllPopups = function closeAllPopups() {
      return allPopups.forEach(function (popup) {
        return popup.classList.remove('active');
      });
    };
    var hideScrollOnBody = function hideScrollOnBody() {
      return document.body.style.overflowY = 'hidden';
    };
    var showScrollOnBody = function showScrollOnBody() {
      return document.body.style.overflowY = 'auto';
    };
    activators.forEach(function (activator) {
      activator.addEventListener('click', function (event) {
        event.stopPropagation();
        closeAllPopups();
        var popup = document.querySelector(activator.dataset.popupSelector);
        var popupRow = popup.querySelector('.popup__row');
        var popupRegisterRow = document.querySelector('.popup-register__row');
        var popupClose = popup.querySelector('.popup__close');
        var popupForm = popup.querySelector('.popup__form');
        hideScrollOnBody();
        popup.classList.add('active');
        popupClose.addEventListener('click', function () {
          return popup.classList.remove('active');
        });
        document.addEventListener('click', function (event) {
          var parentElem = event.target.closest('.popup__row');
          if (parentElem !== popupRow && parentElem !== popupRegisterRow && !event.target.closest('td')) {
            xCal();
            popupForm.reset();
            popup.classList.remove('active');
            showScrollOnBody();
          }
        });
      });
    });
  }

  // Настройка добавления в избранное
  function setCorrectFavourite() {
    var favouriteBtns = document.querySelectorAll('.to-favourite');
    var favouriteCounts = document.querySelectorAll('.favourite-link__count');
    var setGlobalCount = function setGlobalCount(count) {
      return favouriteCounts.forEach(function (elem) {
        return elem.textContent = count;
      });
    };
    var count = 0;
    favouriteBtns.forEach(function (btn) {
      btn.addEventListener('click', function () {
        btn.classList.toggle('active');
        if (btn.classList.contains('active')) setGlobalCount(++count);else setGlobalCount(--count);
        if (count === 0) setGlobalCount('');
      });
    });
  }

  // Настройка слайдера на странице товара
  function setCorrectProductSlider() {
    var productThumbsSlider = new Swiper('.preview-thumbs__slider', {
      direction: 'vertical',
      slidesPerGroup: 5,
      slidesPerView: 5,
      spaceBetween: 16
    });
    var productMainSlider = new Swiper('.preview-main__slider', {
      grabCursor: true,
      effect: 'fade',
      fadeEffect: {
        crossFade: true
      },
      speed: 500,
      loop: true,
      allowTouchMove: false,
      thumbs: {
        swiper: productThumbsSlider
      },
      followFinger: false
    });
  }

  // Настройка выдачи уведомлений при снижении цены
  function setCorrectNotification() {
    var getNotificationBtn = document.querySelector('.full-info__get-notification');
    if (!getNotificationBtn) return;
    getNotificationBtn.addEventListener('click', function () {
      return getNotificationBtn.classList.toggle('active');
    });
  }

  // Настройка приближения картинок
  function setCorrectPanzoom() {
    var zoomImages = document.querySelectorAll('.zoom');
    zoomImages.forEach(function (image) {
      return new Panzoom(image, {
        click: "toggleCover"
      });
    });
  }

  // Выделение карточек в корзине при клике на них
  function setCorrectBasketFill() {
    var fillAll = document.querySelector('.basket-actions .fill-all');
    if (!fillAll) return;
    var deleteSelected = document.querySelector('.basket-actions .delete-selected');
    var basketCards = document.querySelectorAll('.basket-product');
    var isAvailable = function isAvailable(card) {
      return !card.classList.contains('not-available');
    };
    var manipulateCard = function manipulateCard(card, _ref) {
      var add = _ref.add,
        toggle = _ref.toggle;
      if (isAvailable(card)) {
        if (add) card.classList.add('active');else if (toggle) card.classList.toggle('active');
      }
    };
    basketCards.forEach(function (card) {
      card.addEventListener('click', function (event) {
        if (event.target.closest('.manipulate-with-basket')) return;
        manipulateCard(card, {
          toggle: true
        });
      });
    });
    fillAll.onclick = function () {
      return basketCards.forEach(function (card) {
        return manipulateCard(card, {
          add: true
        });
      });
    };
    deleteSelected.onclick = function () {
      return basketCards.forEach(function (card) {
        return card.classList.remove('active');
      });
    };
  }
});