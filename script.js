 //Mobile navigation menu
 let burger = document.querySelector('#header__burger');
 let mobileNavbar = document.querySelector('#navbar__mobile');
 burger.addEventListener('click', function() {
     openCloseMobileMenu();
 })

 function openCloseMobileMenu() {
     if (mobileNavbar.classList.contains('hidden')) {
         mobileNavbar.classList.remove('hidden');
         burger.classList.add('active');
     } else {
         mobileNavbar.classList.add('hidden');
         burger.classList.remove('active');
     }
 }


 //Navigation
 let navigationContainer = document.querySelector('.header__navigation');
 let navigationLinks = document.querySelectorAll('.navigation');

 function addClassToOneElement(elementNode, classStyle, elementsContainer) {
     elementsContainer.forEach(element => element.classList.remove(classStyle));
     elementNode.classList.add(classStyle);
 }

 navigationContainer.addEventListener('click', function(event) {

     addClassToOneElement(event.target, 'active', navigationLinks);

     document
         .getElementById(event.target.getAttribute('scroll-to'))
         .scrollIntoView({ behavior: 'smooth' })
 });

 //Slider
 let sectionSlider = document.querySelector('#slider');
 let slides = document.querySelectorAll('.slide');
 let leftButton = document.querySelector('.left-button');
 let rightButton = document.querySelector('.right-button');
 let currentSlide = 0;
 let isEnabled = true;

 function changeCurrentSlide(n) {
     currentSlide = (n + slides.length) % slides.length
 }

 function hideSlide(direction) {
     isEnabled = false;
     slides[currentSlide].classList.add(direction);
     slides[currentSlide].addEventListener('animationend', function() {
         this.classList.remove('active', direction);
     })
 }

 function showSlide(direction) {
     slides[currentSlide].classList.add('next', direction)
     slides[currentSlide].addEventListener('animationend', function() {
         this.classList.remove('next', direction);
         this.classList.add('active');
         isEnabled = true
     })
 }

 function previousSlide(n) {
     hideSlide('to-right');
     changeCurrentSlide(n - 1);
     showSlide('from-left');
     changeSectionDesign();
 }

 function nextSlide(n) {
     hideSlide('to-left');
     changeCurrentSlide(n + 1);
     showSlide('from-right');
     changeSectionDesign();
 }

 function changeSectionDesign() {
     if (sectionSlider.classList.contains('colored')) {
         sectionSlider.classList.remove('colored');
         leftButton.classList.remove('blue');
         rightButton.classList.remove('blue');
     } else {
         sectionSlider.classList.add('colored');
         leftButton.classList.add('blue');
         rightButton.classList.add('blue');
     }
 }

 function hideDisabledScreen() {
     if (!verticalPhoneDisabled.classList.contains('disabled')) {
         verticalPhoneDisabled.classList.add('disabled');
     }
     if (!horizontalPhoneDisabled.classList.contains('disabled')) {
         horizontalPhoneDisabled.classList.add('disabled');
     }
 }

 leftButton.addEventListener('click', function() {
     if (isEnabled) {
         previousSlide(currentSlide);
         hideDisabledScreen();
     }

 });

 rightButton.addEventListener('click', function() {
     if (isEnabled) {
         nextSlide(currentSlide);
         hideDisabledScreen();
     }
 });

 const swipeDetect = (el) => {
     let surface = el;

     let startX = 0;
     let startY = 0;
     let distX = 0;
     let distY = 0;

     let startTime = 0;
     let elapsedTime = 0;

     let threshold = 150;
     let restraint = 100;
     let allowedTime = 300;

     surface.addEventListener('mousedown', function(e) {
         startX = e.pageX;
         startY = e.pageY;
         startTime = new Date().getTime();
         hideDisabledScreen();
         e.preventDefault();
     })
     surface.addEventListener('mouseup', function(e) {
         distX = e.pageX - startX;
         distY = e.pageY - startY;

         elapsedTime = new Date().getTime() - startTime;

         if (elapsedTime <= allowedTime) {
             if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                 if (distX > 0) {
                     if (isEnabled) {

                         previousSlide(currentSlide);
                     }
                 } else
                 if (isEnabled) {

                     nextSlide(currentSlide);
                 }
             }
         }
         e.preventDefault();
     })


     surface.addEventListener('touchstart', function(e) {
         if (e.target.classList.contains('left-button') || e.target.classList.contains('right-button')) {
             if (e.target.classList.contains('left-button')) {
                 previousSlide(currentSlide);
             } else if (e.target.classList.contains('right-button')) {
                 nextSlide(currentSlide);
             }
         }

         let touchObject = e.changedTouches[0];
         startX = touchObject.pageX;
         startY = touchObject.pageY;
         startTime = new Date().getTime();
         e.preventDefault();
     })

     surface.addEventListener('touchmove', function(e) {
         e.preventDefault();
     })

     surface.addEventListener('touchend', function(e) {
         let touchObject = e.changedTouches[0];
         distX = touchObject.pageX - startX;
         distY = touchObject.pageY - startY;

         elapsedTime = new Date().getTime() - startTime;


         if (elapsedTime <= allowedTime) {
             if (Math.abs(distX) >= threshold && Math.abs(distY) <= restraint) {
                 if (distX > 0) {
                     if (isEnabled) {
                         hideDisabledScreen();
                         previousSlide(currentSlide);
                     }
                 } else
                 if (isEnabled) {
                     hideDisabledScreen();
                     nextSlide(currentSlide);
                 }
             }
         }
         e.preventDefault();
     })
 }
 let swiper = document.querySelector('.slider__block');
 swipeDetect(swiper);

 //Disable phones
 let verticalPhoneDisabled = document.querySelector('.phone1');
 let horizontalPhoneDisabled = document.querySelector('.phone2');
 let verticalPhone = document.querySelector('.phone-one');
 let horizontalPhone = document.querySelector('.phone-two');


 verticalPhone.addEventListener('click', function() {
     disablePhone(verticalPhoneDisabled);
 });
 verticalPhoneDisabled.addEventListener('click', function() {
     disablePhone(verticalPhoneDisabled);
 });
 horizontalPhone.addEventListener('click', function() {
     disablePhone(horizontalPhoneDisabled);
 });
 horizontalPhoneDisabled.addEventListener('click', function() {
     disablePhone(horizontalPhoneDisabled);
 });

 verticalPhone.addEventListener('touchstart', function() {
     disablePhone(verticalPhoneDisabled);

 });
 horizontalPhone.addEventListener('touchstart', function() {
     disablePhone(horizontalPhoneDisabled);
 });
 horizontalPhoneDisabled.addEventListener('touchstart', function() {
     disablePhone(horizontalPhoneDisabled);
 });
 verticalPhoneDisabled.addEventListener('touchstart', function() {
     disablePhone(verticalPhoneDisabled);
 });


 function disablePhone(phoneType) {
     if (screen.width == 375 || screen.width == 768 || screen.width >= 1020) {
         if (phoneType.classList.contains('disabled')) {
             phoneType.classList.remove('disabled');
         } else {
             phoneType.classList.add('disabled');
         }
     }
 }



 //Select tag and mix images
 let tags = document.querySelectorAll('.portfolio__tag');
 let tagContainer = document.querySelector('.portfolio__tags');
 let portfolioImages = document.querySelectorAll('.portfolio__image');
 let imageContainer = document.querySelector('.portfolio__images');

 function mixImages(imagesArray) {
     let mixedArray = shuffleArray(imagesArray);
     mixedArray.forEach(element => imageContainer.append(element));
 }

 function shuffleArray(arr) {
     let j, temp;
     for (let i = arr.length - 1; i > 0; i--) {
         j = Math.floor(Math.random() * (i + 1));
         temp = arr[j];
         arr[j] = arr[i];
         arr[i] = temp;
     }
     return arr;
 }

 tagContainer.addEventListener('click', function(event) {
     if (event.target.classList.contains('portfolio__tag')) {
         portfolioImages.forEach(element => element.classList.remove('bordered'));
         addClassToOneElement(event.target, 'tag-active', tags);
         mixImages([...portfolioImages]);
     }
 })

 //Border image
 imageContainer.addEventListener('click', function(event) {
     addClassToOneElement(event.target.parentNode, 'bordered', portfolioImages);
 })

 //Form validation
 let name = document.querySelector('#name');
 let form = document.querySelector('#form');
 let email = document.querySelector('#email');
 let button = document.querySelector('#button-submit');
 let emailRegEx = /^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i;

 function validationRequired(input) {
     error.innerHTML = 'Пожалуйста, запоните обязательные поля'
     input.classList.add('required')
     event.preventDefault()
 }

 function validateEmptyInput(input) {
     if (input.value == '') {
         validationRequired(input);
     }
 }

 function validateEmailValue(input) {
     if (!input.value.match(emailRegEx) && input.value != '') {
         error.innerHTML = 'Неправильный формат электронной почты'
         event.preventDefault();
     }
 }

 function removeHighlighting(input) {
     if (input.classList.contains('required')) {
         input.classList.remove('required')
     }
 }

 function validateBothFields(...inputs) {
     inputs.forEach(element => {
         if (element.value == '')
             validationRequired(element);
     });
 }

 function validateInputLength(node, fieldLabel, max) {
     if (node.value.length > max) {
         error.innerHTML = `The length of ${fieldLabel} fields should be up to 255 symbols.`;
         event.preventDefault();
     }
 }
 form.addEventListener('submit', function() {
     validateBothFields(name, email);
     validateEmptyInput(name);
     validateEmptyInput(email);
     validateEmailValue(email);
     if (name.value != '' && email.value != '' && email.value.match(emailRegEx)) {
         event.preventDefault();
         error.innerHTML = '';
         appendOverlayModal(quote);
     }
 });

 email.addEventListener('input', function() {
     removeHighlighting(email);
 });

 name.addEventListener('input', function() {
     removeHighlighting(name);
 });

 //Modal
 let quote = document.querySelector('#quote');
 let subject = document.querySelector('#subject');
 let description = document.querySelector('#description');
 let overlay = createDomeNode('div', 'overlay_modal');
 let modalCloseBtn;

 function createModalContent() {
     let modal = createDomeNode('div', 'modal');
     let content = createDomeNode('div', 'modal__content');
     let contentHeader = createDomeNode('h3', 'modal__content-header');
     contentHeader.textContent = 'Письмо отправлено';

     let contentDescription = createDomeNode('p', 'modal__content-description');
     contentDescription.innerHTML = generateTextDescription(subject, description);

     modalCloseBtn = createButton('OK', 'modal__close', 'modal__close');

     const handleClose = () => {
         overlay.remove();
         form.reset();
         modalCloseBtn.removeEventListener('click', handleClose);
     }
     modalCloseBtn.addEventListener('click', handleClose);

     modal.append(content);
     modal.append(contentHeader);
     modal.append(contentDescription);
     modal.append(modalCloseBtn);
     return modal;
 }

 function generateTextDescription(fromInput1, fromInput2) {
     let description = '';
     description += retrieveValue(fromInput1, 'Без темы', 'Тема: ') + '<br><br>';
     description += retrieveValue(fromInput2, 'Без описания', 'Описание: ');
     return description;
 }

 function retrieveValue(fromInput, defaultMessage, label) {
     if (fromInput.value == '') {
         return defaultMessage;
     } else {
         return `<strong><em>${label}</em></strong>` + fromInput.value;
     }
 }

 function createButton(value, id, ...classes) {
     let button = createDomeNode('button', ...classes);
     button.textContent = value;
     button.id = id;
     return button;
 }

 function createModalBase() {
     let modal = createModalContent();
     overlay.append(modal);
     return overlay;
 }

 function appendOverlayModal(section) {
     section.prepend(createModalBase());
 }

 function createDomeNode(element, elementClass, baseElement = document) {
     let node = baseElement.createElement(element);
     node.classList.add(elementClass);
     return node;
 }