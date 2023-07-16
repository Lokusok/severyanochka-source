document.addEventListener('DOMContentLoaded', () => {
  const vars = {
    html: {
        catalog: {
          root: document.querySelector('.catalog').innerHTML,
          row: document.querySelector('.catalog__row').innerHTML
        },
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
    
    window.addEventListener('resize', () => {
      setCorrectCatalogMenu();
      setCorrectMoreProducts();
      setCorrectFiltersPosition();
    });
  }

  // Настройка появления каталога при наведении на кнопку
  function setCorrectCatalog() {
    const header = document.querySelector('.header');
    const catalogActivate = header.querySelector('.catalog-activate');
    const catalogSection = header.querySelector('.catalog');

    catalogActivate.addEventListener('mouseenter', () => {
      catalogSection.classList.add('active');
    });
    catalogSection.addEventListener('mouseleave', () => {
      catalogSection.classList.remove('active');
    });
    document.addEventListener('click', event => {
      if (event.target.closest('.catalog') || event.target.closest('.catalog-activate')) return;
      catalogSection.classList.remove('active');
    });
  }

  // Обработка кликов на "Добавить в корзину на карточках товаров"
  function setCorrectProductsOnClick() {
    const basketButtons = document.querySelectorAll('.to-basket-btn');
    const basketCountGlobal = document.querySelectorAll('.basket-count');
    const setGlobalCount = count => {
      basketCountGlobal.forEach(elem => {
        const elemCountText = elem.querySelector('.basket-count__counter-text');

        if (elemCountText) {
          elem = elemCountText;
        }

        elem.textContent = count
      });
    }
    const basket = document.querySelector('.basket');

    let globalCount = 0;
    if (basket) {
      const allBasketCounters = document.querySelectorAll('.basket-product .manipulate-with-basket__count');
      globalCount = [...allBasketCounters].reduce((total, next) => total + +next.textContent, 0);
      setGlobalCount(globalCount);
    }

    basketButtons.forEach(button => {
      let fl = false;

      button.addEventListener('click', event => {
        
        const shopCard = button.closest('.shop-item');
        if (shopCard) shopCard.classList.add('in-basket');
        if (!globalCount) setGlobalCount(++globalCount);
        
        if (fl) return;
        const updateCount = shopCard.querySelector('.manipulate-with-basket__update');
        const decreaseCount = shopCard.querySelector('.manipulate-with-basket__decrease');
        const countElem = shopCard.querySelector('.manipulate-with-basket__count');
        
        const isValidCount = count => count > 0 && count < 51 ? true : false;
        const addCount = () => {
          if (isValidCount(count+1)) {
            countElem.textContent = ++count;
            setGlobalCount(++globalCount);
          }
        };
        const removeCount = () => {
          if (isValidCount(count-1)) {
            countElem.textContent = --count;
            setGlobalCount(--globalCount);
          } else if (count-1 === 0) {
            if (globalCount-1 === 0) {
              --globalCount;
              setGlobalCount('');
            }
            else {
              setGlobalCount(--globalCount);
            }
            shopCard.classList.remove('in-basket');
          }
        };
        let count = +countElem.textContent || 1;

        countElem.textContent = count;
        
        // Эти две строчки отработают только в первый клик, они нужны для счётчиков в корзине
        if (event.target.closest('.basket-update') === updateCount) addCount();
        else if (event.target.closest('.basket-decrease') === decreaseCount) removeCount();

        updateCount.addEventListener('click', addCount);
        decreaseCount.addEventListener('click', removeCount);

        fl = true;
      });
    });
  }

  // Настройка карты
  function setCorrectMap() {
    const mapTabsBtns = document.querySelectorAll('.map-tabs__btn');
    const coords = new Map([
      [
        mapTabsBtns[0],
        {
          center: [61.66854376888902,50.836547597778186],
          zoom: 14,
          balloonDesc: 'Республика Коми, г. Сыктывкар',
        }
      ],
      [
        mapTabsBtns[1],
        {
          center: [65.29856921472931,53.205173578048736],
          zoom: 14,
          balloonDesc: 'Республика Коми, д. Вертеп',
        }
      ],
      [
        mapTabsBtns[2],
        {
          center: [65.29479765772048,53.28752112704468],
          zoom: 14,
          balloonDesc: 'Республика Коми, с. Краснобор',
        }
      ],
      [
        mapTabsBtns[3],
        {
          center: [65.27638791620612,53.36212767066955],
          zoom: 14,
          balloonDesc: 'Республика Коми, с. Диюр',
        }
      ]
    ]);
    const map = new ymaps.Map('map-block', coords.get(mapTabsBtns[0]));
    map.behaviors.disable('scrollZoom')
    // map.controls.remove('zoomControl');
    map.controls.remove('geolocationControl');
    map.controls.remove('rulerControl');
    map.controls.remove('searchControl');
    map.controls.remove('fullscreenControl');
    map.controls.remove('trafficControl');
    map.controls.remove('typeSelector');

    const geoObjects = [];
    for (let i = 0; i < coords.size; i++) {
      mapTabsBtns[i].onclick = () => {
        mapTabsBtns.forEach(btn => btn.classList.remove('active'));
        mapTabsBtns[i].classList.add('active');
        map.setCenter(coords.get(mapTabsBtns[i]).center, coords.get(mapTabsBtns[i]).zoom, {
          checkZoomRange: true
        });
      }

      const placemark = new ymaps.Placemark(coords.get(mapTabsBtns[i]).center, {
        balloonContentHeader: coords.get(mapTabsBtns[i]).balloonDesc
      }, { preset: 'islands#redLeisureIcon'});
      // map.geoObjects.add(placemark);
      geoObjects.push(placemark);
    }

    const clusterer = new ymaps.Clusterer({ preset: 'islands#invertedRedClusterIcons' });
    clusterer.add(geoObjects);
    map.geoObjects.add(clusterer);
  }

  // Настройка живого поиска
  function setCorrectLiveSeach() {
    const searchBlock = document.querySelector('.search');
    const searchInput = searchBlock.querySelector('.search__input');
    const liveList = searchBlock.querySelector('.live-list');
    const items = [
      'Молоко, сыр, яйцо', 'Молоко', 'Коктейль Молочный', 'Йогурт Молочный'
    ];
    const makeMatchBold = str => {
      const inputValue = searchInput.value.toLowerCase();
      const matchValue = str.toLowerCase();

      const start = matchValue.indexOf(inputValue);
      const end = start + inputValue.length - 1;

      const res = str.split('');
      res[start] = '<b>' + res[start];
      res[end] = res[end] + '</b>';
      return res.join('');
    };
    const inputHandler = () => {
      if (!searchInput.value) {
        searchBlock.classList.remove('active');
        liveList.innerHTML = '';
        return;
      }
      const searchedItems = items
                            .map(value => value.toLowerCase().includes(searchInput.value.toLowerCase()) ? value : {})
                            .filter(value => typeof value !== 'object');
      const liveListHtml = `
          ${searchedItems.map(value => 
            `<li class="live-list__item">
               <a class="live-list__link" href="./searched.html">${makeMatchBold(value)}</a>
             </li>`).join('')}`;
      if (!searchBlock.classList.contains('active')) searchBlock.classList.add('active');
      liveList.innerHTML = liveListHtml;
    };


    searchInput.addEventListener('input', inputHandler);
    searchInput.addEventListener('focus', inputHandler);
    document.addEventListener('click', event => {
      if (event.target.closest('.search')) return;
      if (searchBlock.classList.contains('active'))
        searchBlock.classList.remove('active');
    });
    // searchInput.addEventListener('blur', () => {
    //   setTimeout(() => searchBlock.classList.remove('active'), 0);
    //   inputHandler();
    // });
  }

  // Настройка масок на инпутах
  function setCorrectMask() {
    const maskTel = new Inputmask('+7(999)-999-99-99');
    const inputsTel = document.querySelectorAll('input[type="tel"]');

    inputsTel.forEach(input => maskTel.mask(input));
  }

  // Выстраивание меню-каталога в два ряда при малом устройстве
  function setCorrectCatalogMenu() {
    if (window.matchMedia('(min-width: 861px)').matches) {
      document.querySelector('.catalog__row').innerHTML = vars.html.catalog.row;
      return;
    }

    const lists = document.querySelectorAll('.catalog-list');

    for (let i = 2; i < lists.length; i++) {
      if ((i+1) % 2)
        [...lists[i].children].forEach(child => lists[0].append(child));
      else [...lists[i].children]
        .forEach(child => lists[1].append(child));
    }

    [...lists].slice(2).forEach(list => list.remove());
  }

  // Настройка range для фильтра цены
  function setCorrectRange() {
    const range = document.querySelector('.price-filter__range');
    if (!range) return;
    const start = document.querySelector('.price-filter__start');
    const end = document.querySelector('.price-filter__end');
    const reset = document.querySelector('.price-filter__reset');
    const priceFilterAccepted = document.querySelector('.filter-price');
    const priceFilterAcceptedText = document.querySelector('.filter-price .accepted-filter__text');
    noUiSlider.create(range, {
      start: [99, 9999],
      connect: true,
      range: {
          'min': 0,
          'max': 9999
      }
    });
    range.noUiSlider.on('update', (values, changedIndex) => {
      values = values.map(Math.round);
      [start, end][changedIndex].value = values[changedIndex];
      priceFilterAcceptedText.innerHTML = `Цена от ${values[0]} до ${values[1]}`;
    });
    reset.addEventListener('click', () => range.noUiSlider.reset());
    priceFilterAccepted.addEventListener('click', () => {
      range.noUiSlider.reset();
    });
  }

  // Настройка добавления фильтров на странице с категорией товаров
  function setCorrectFilters() {
    const inStock = document.querySelector('.category-section input[type="checkbox"]');
    if (!inStock) return;
    const resetPrice = document.querySelector('.price-filter__reset');

    // Обновление "в наличии"
    const stockUpdate = () => {
      const acceptedFilters = document.querySelector('.accepted-filters');
      const addListenerToStockFilter = () => {
        const acceptedFilter = document.querySelector('.filter-in-stock');
        acceptedFilter.addEventListener('click', () => {
          acceptedFilter.remove();
          inStock.checked = false;
        });
      };

      addListenerToStockFilter();
      // При изменении чекбокса "в наличии" - будем добавлять / удалять фильтр
      inStock.addEventListener('change', () => {
        let html = '';
        
        if (inStock.checked) {
          html = `<li class="accepted-filters__item filter-in-stock">
            <button class="accepted-filters__filter accepted-filter active">
              <span class="accepted-filter__text">В наличии</span>
              <svg class="accepted-filter__close-icon" width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fill-rule="evenodd" clip-rule="evenodd" d="M18.3536 5.64645C18.5488 5.84171 18.5488 6.15829 18.3536 6.35355L6.35355 18.3536C6.15829 18.5488 5.84171 18.5488 5.64645 18.3536C5.45118 18.1583 5.45118 17.8417 5.64645 17.6464L17.6464 5.64645C17.8417 5.45118 18.1583 5.45118 18.3536 5.64645Z" fill="#414141"/>
                <path fill-rule="evenodd" clip-rule="evenodd" d="M5.64645 5.64645C5.84171 5.45118 6.15829 5.45118 6.35355 5.64645L18.3536 17.6464C18.5488 17.8417 18.5488 18.1583 18.3536 18.3536C18.1583 18.5488 17.8417 18.5488 17.6464 18.3536L5.64645 6.35355C5.45118 6.15829 5.45118 5.84171 5.64645 5.64645Z" fill="#414141"/>
              </svg>
            </button>
          </li>`;
          acceptedFilters.insertAdjacentHTML('afterbegin', html);
          addListenerToStockFilter();
        } else {
          document.querySelector('.filter-in-stock').remove();
        }
      });
    };

    // Обновление по клику на удаление всех фильтров
    const resetUpdate = () => {
      const resetAllFiltersBtn = document.querySelector('.reset-filters__btn');
      resetAllFiltersBtn.addEventListener('click', () => {
        resetPrice.click();
        if (inStock.checked) inStock.click();
      });
    };

    stockUpdate();
    resetUpdate();
  }

  // Настройка показа большего количества товаров при клике на "Показать ещё"
  function setCorrectMoreProducts() {
    const moreBtn = document.querySelector('.category-line__more');
    if (!moreBtn) return;
    const products = document.querySelectorAll('.shop-card');
    [...products].slice(6).forEach(productCard => productCard.classList.add('hidden'));
    
    let hiddenProducts = document.querySelectorAll('.shop-card.hidden');
    let maxValue = window.matchMedia('(max-width: 680px)').matches ? 2 : 3;

    moreBtn.onclick = () => {
      [...hiddenProducts].splice(0, maxValue).forEach(elem => elem.classList.remove('hidden'));
      hiddenProducts = document.querySelectorAll('.shop-card.hidden');
      if (hiddenProducts.length === 0) moreBtn.disabled = true;
    }
  }

  // Подстановка фильтров в отдельное меню при малом устройстве
  function setCorrectFiltersPosition() {
    const acceptedFilters = document.querySelector('.accepted-filters');
    if (!acceptedFilters) return;
    const categoryMainRow = document.querySelector('.category-main-content__row');
    const priceFilterHead = document.querySelector('.price-filter__head');

    if (window.matchMedia('(max-width: 860px)').matches) {
      priceFilterHead.insertAdjacentElement('beforebegin', acceptedFilters);
    } else {
      categoryMainRow.insertAdjacentElement('afterbegin', acceptedFilters);
    }
  }

  // Выдвижение мобильного сайдбара с настройками фильтров по клику на кнопку
  function setCorrectMobileFiltersSidebar() {
    const activateSidebar = document.querySelector('.activate-mobile-filters');
    if (!activateSidebar) return;
    const sidebar = document.querySelector('.options');
    const setToActiveSidebar = event => {
      event.stopPropagation();
      sidebar.classList.add('active');
    };
    const disableSidebar = event => {
      if (!event.target.closest('.options') && sidebar.classList.contains('active'))
        sidebar.classList.remove('active');
    };

    let [startX, endX] = [0, 0];

    activateSidebar.addEventListener('click', setToActiveSidebar);
    document.addEventListener('click', disableSidebar);
    document.addEventListener('touchstart', event => startX = event.touches[0].pageX);
    document.addEventListener('touchend', event => {
      if (!sidebar.classList.contains('active')) return;

      endX = event.changedTouches[0].pageX;
      if (startX > endX+70) sidebar.classList.remove('active');
      else sidebar.classList.add('active');
    });
  }

  // Логика входа в аккаунт
  function setCorrectLogin() {
    const loginPopup = document.querySelector('.popup-login');
    const loginPopupTitle = loginPopup.querySelector('.popup__title');
    const loginForm = document.forms.login;
    const codeInput = loginPopup.querySelector('.code-input');
    const submitBtn = loginForm.querySelector('button[type="submit"]');
    const goBackBtn = loginPopup.querySelector('.step-back');
    const resetPasswordBtn = loginPopup.querySelector('.reset-password-btn');
    const utilsClasses = ['write-code-again-send'];
    const removeAllUtilsClasses = () => utilsClasses.forEach(_class => loginPopup.classList.remove(_class));
    const moveUserByStep = step => {
      Object.values(stepsElems)
        .forEach(infoObj => loginPopup.classList.remove(infoObj.popupClass));
      removeAllUtilsClasses();

      loginPopupTitle.textContent = stepsElems[step].popupTitle || loginPopupTitle.textContent;
      loginPopup.classList.add(stepsElems[step].popupClass);
      submitBtn.textContent = stepsElems[step].submitText;
    };
    const stepsElems = {
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
    let flTimer = false;
    let step = 1;
    moveUserByStep(step);
    
    loginForm.addEventListener('submit', event => {
      event.preventDefault();
      if (stepsElems[step+1]) moveUserByStep(++step);
    });
    goBackBtn.addEventListener('click', () => {
      removeAllUtilsClasses();
      if (stepsElems[step-1]) moveUserByStep(--step);
    });
    resetPasswordBtn.addEventListener('click', () => {
      step = 2;
      moveUserByStep('resetPassword');
    });
    submitBtn.addEventListener('click', () => {
      // Если идёт сброс пароля и пользователь ввёл код
      if (loginPopup.classList.contains(stepsElems.resetPassword.popupClass)) {
        const sendAgainBtn = loginPopup.querySelector('.popup-login__again-send-code-link');
        if (sendAgainBtn.classList.contains('hidden'))
        sendAgainBtn.classList.remove('hidden');
        
        step = 3;
        moveUserByStep('writeCode');
        if (flTimer) return;
        flTimer = true;
        const notification = loginPopup.querySelector('.popup__notification');
        const notificationSeconds = notification.querySelector('.seconds');
        const awaitMax = 46;
        let awaitSeconds = awaitMax;
        const interval = setInterval(() => notificationSeconds.textContent = --awaitSeconds, 1*1000);
        const awaitPromise = new Promise((resolve, reject) => {
          setTimeout(() => resolve(true), awaitMax*1000);
        });
        awaitPromise
          .then(() => {
            clearInterval(interval);
            if (!loginPopup.classList.contains(stepsElems.writeCode.popupClass)) return;
            loginPopup.classList.add('write-code-again-send');
            sendAgainBtn.addEventListener('click', () => sendAgainBtn.classList.add('hidden'));
          })
          .then(() => flTimer = false);
      } else if (loginPopup.classList.contains(stepsElems.writeCode.popupClass) && codeInput.value.length === 4) {
        moveUserByStep(step=3);
      }
    });
  }

  // Логика регистрации аккаунта
  function setCorrectRegister() {
    const loginPopup = document.querySelector('.popup-login');
    const loginBtn = loginPopup.querySelector('.popup__form-submit');
    const registerPopup = document.querySelector('.popup-register');
    const registerBtn = registerPopup.querySelector('.popup__form .popup__form-submit');
    
    registerBtn.addEventListener('click', event => {
      event.preventDefault();
      registerPopup.classList.remove('active');
      setTimeout(() => loginPopup.classList.add('active'), 0);
      loginPopup.classList.add('reset-password');
      loginBtn.click();
    });
  }

  // Настройка видимого пароля по нажатию на иконку рядом с инпутом пароля
  function setCorrectVisiblePassword() {
    const inputsBlock = document.querySelectorAll('.input-block');

    inputsBlock.forEach(block => {
      let inputPassword = null;
      block.addEventListener('click', event => {
        inputPassword = block.querySelector('.password-input');

        if (event.target.closest('.set-visible-password')) {
          if (inputPassword.getAttribute('type') === 'password') inputPassword.setAttribute('type', 'text');
          else inputPassword.setAttribute('type', 'password');
        }
      });
    });
  }

  // Настройка выпадающих списков
  function setCorrectSelects() {
    const selects = document.querySelectorAll('select');
    selects.forEach(select => {
      const choice = new Choices(select, {
        searchEnabled: false,
        itemSelectText: ''
      });
    });
  }

  // Настройка календаря
  function setCorrectCalendar() {
    const popupRegister = document.querySelector('.popup-register');
    const calendarInputs = document.querySelectorAll('.calendar-input');

    calendarInputs.forEach(calendarInput => {
      calendarInput.addEventListener('click', () => {
        xCal(calendarInput, { lang: "ru", now: false, x: false});
      });
    });

    popupRegister.addEventListener('scroll', () => xCal());
  }

  // Настройка инпута для ввода карты
  function setCorrectCardInput() {
    const cardInput = document.querySelector('.label-card-number .card-input');
    const noCardCheckbox = document.querySelector('.no-card-checkbox');

    noCardCheckbox.addEventListener('change', () => cardInput.disabled = noCardCheckbox.checked);
  }

  // Настройка появление попапов
  function setCorrectPopups() {
    const allPopups = document.querySelectorAll('.popup');
    const activators = document.querySelectorAll('.activate-popup');
    const closeAllPopups = () => allPopups.forEach(popup => popup.classList.remove('active'));
    const hideScrollOnBody = () => document.body.style.overflowY = 'hidden';
    const showScrollOnBody = () => document.body.style.overflowY = 'auto';

    activators.forEach(activator => {
      activator.addEventListener('click', event => {
        event.stopPropagation();
        closeAllPopups();
        const popup = document.querySelector(activator.dataset.popupSelector);
        const popupRow = popup.querySelector('.popup__row');
        const popupRegisterRow = document.querySelector('.popup-register__row');
        const popupClose = popup.querySelector('.popup__close');
        const popupForm = popup.querySelector('.popup__form');

        hideScrollOnBody();
        popup.classList.add('active');
        popupClose.addEventListener('click', () => popup.classList.remove('active'));
        document.addEventListener('click', event => {
          const parentElem = event.target.closest('.popup__row');
          if ((parentElem !== popupRow && parentElem !== popupRegisterRow) && !event.target.closest('td')) {
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
    const favouriteBtns = document.querySelectorAll('.to-favourite');
    const favouriteCounts = document.querySelectorAll('.favourite-link__count');
    const setGlobalCount = count => favouriteCounts.forEach(elem => elem.textContent = count);
    let count = 0;

    favouriteBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        btn.classList.toggle('active');

        if (btn.classList.contains('active')) setGlobalCount(++count);
        else setGlobalCount(--count);

        if (count === 0) setGlobalCount('');
      });
    });
  }

  // Настройка слайдера на странице товара
  function setCorrectProductSlider() {
    const productThumbsSlider = new Swiper('.preview-thumbs__slider', {
      direction: 'vertical',
      slidesPerGroup: 5,
      slidesPerView: 5,
      spaceBetween: 16,
    });
    const productMainSlider = new Swiper('.preview-main__slider', {
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
    const getNotificationBtn = document.querySelector('.full-info__get-notification');
    if (!getNotificationBtn) return;

    getNotificationBtn.addEventListener('click', () => getNotificationBtn.classList.toggle('active'));
  }

  // Настройка приближения картинок
  function setCorrectPanzoom() {
    const zoomImages = document.querySelectorAll('.zoom');
    zoomImages.forEach(image => new Panzoom(image, { click: "toggleCover" }));
  }

  // Выделение карточек в корзине при клике на них
  function setCorrectBasketFill() {
    const fillAll = document.querySelector('.basket-actions .fill-all');
    if (!fillAll) return;
    const deleteSelected = document.querySelector('.basket-actions .delete-selected');
    const basketCards = document.querySelectorAll('.basket-product');
    const isAvailable = card => !card.classList.contains('not-available');
    const manipulateCard = (card, { add, toggle }) => {
      if (isAvailable(card)) {
        if (add) card.classList.add('active');
        else if (toggle) card.classList.toggle('active');
      }
    };

    basketCards.forEach(card => {
      card.addEventListener('click', event => {
        if (event.target.closest('.manipulate-with-basket')) return;
        manipulateCard(card, { toggle: true });
      });
    });
    fillAll.onclick = () => basketCards.forEach(card => manipulateCard(card, { add: true }));
    deleteSelected.onclick = () => basketCards.forEach(card => card.classList.remove('active'));
  }
});
