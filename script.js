const navigation = document.querySelector('.header__navigation');
const navigationLinks = document.querySelectorAll('.navigation');

function addClass(elementNode, classStyle, elementsContainer) {
    elementsContainer.forEach(element => element.classList.remove(classStyle));
    elementNode.classList.add(classStyle);
}

navigation.addEventListener('click', function (event) {

    addClass(event.target, 'active', navigationLinks);

    document
        .getElementById(event.target.getAttribute('scroll-to'))
        .scrollIntoView({ behavior: 'smooth' })
});

const slides = document.querySelectorAll('.slide');
let currentSlide = 0;
let isEnabled = true;
const verticalPhoneDisabled = document.getElementById('phone1');
const horizontalPhoneDisabled = document.getElementById('phone2');

function hideDisabledScreen() {
    if (!verticalPhoneDisabled.classList.contains('disabled')) {
        verticalPhoneDisabled.classList.add('disabled');
    }
    if (!horizontalPhoneDisabled.classList.contains('disabled')) {
        horizontalPhoneDisabled.classList.add('disabled');
    }
}

function changeCurrentSlide(n) {
    currentSlide = (n + slides.length) % slides.length
}

function hideSlide(direction) {
    isEnabled = false;
    slides[currentSlide].classList.add(direction);
    slides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('active', direction);
    })
}

function showSlide(direction) {
    slides[currentSlide].classList.add('next', direction)
    slides[currentSlide].addEventListener('animationend', function () {
        this.classList.remove('next', direction);
        this.classList.add('active');
        isEnabled = true
    })
}

function previousSlide(n) {
    hideSlide('to-right')
    changeCurrentSlide(n - 1)
    showSlide('from-left')
}

function nextSlide(n) {
    hideSlide('to-left')
    changeCurrentSlide(n + 1)
    showSlide('from-right')
}

document.querySelector('.left-button').addEventListener('click', function () {
    if (isEnabled) {
        previousSlide(currentSlide);
        hideDisabledScreen();
    }

});

document.querySelector('.right-button').addEventListener('click', function () {
    if (isEnabled) {
        nextSlide(currentSlide);
        hideDisabledScreen();
    }
});

const verticalPhone = document.querySelector('.phone-one');
const horizontalPhone = document.querySelector('.phone-two');

verticalPhone.addEventListener('click', function () {
    disablePhone(verticalPhoneDisabled);
});
verticalPhoneDisabled.addEventListener('click', function () {
    disablePhone(verticalPhoneDisabled);
})
horizontalPhone.addEventListener('click', function () {
    disablePhone(horizontalPhoneDisabled);
});

horizontalPhoneDisabled.addEventListener('click', function () {
    disablePhone(horizontalPhoneDisabled);
});

function disablePhone(phoneType) {
    if (phoneType.classList.contains('disabled')) {
        phoneType.classList.remove('disabled');
    } else {
        phoneType.classList.add('disabled');
    }
}

let tags = document.querySelectorAll('.portfolio__tag');
let portfolioImages = document.querySelectorAll('.portfolio__image');
let imageContainer = document.querySelector('.portfolio__images');
const tagContainer = document.querySelector('.portfolio__tags');

tagContainer.addEventListener('click', function (event) {
    if (event.target.classList.contains('portfolio__tag')) {
        portfolioImages.forEach(element => element.classList.remove('bordered'));
        addClass(event.target, 'tag-active', tags);
        mixImages([...portfolioImages]);
    }
})


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

imageContainer.addEventListener('click', function (event) {
    addClass(event.target.parentNode, 'bordered', portfolioImages);
})

const name = document.getElementById('name');
const form = document.getElementById('form');
const email = document.getElementById('email');

function validationRequired(input) {
    error.innerHTML = 'Please provide values to all fields highlighted above'
    input.classList.add('required')
    event.preventDefault()
}
form.addEventListener(
    'submit',
    function (event) {
        if (name.value == '' && email.value == '') {
            validationRequired(name)
            validationRequired(email)
        }
        if (name.value == '') {
            validationRequired(name)
        }
        if (email.value == '') {
            validationRequired(email)
        }
        if (!email.value.match(/^[0-9a-z-\.]+\@[0-9a-z-]{2,}\.[a-z]{2,}$/i) &&
            email.value != ''
        ) {
            error.innerHTML = 'Provided e-mail address is incorrect.'
            event.preventDefault()
        }
    },
    false
);
email.addEventListener(
    'input',
    function (event) {
        if (email.classList.contains('required')) {
            email.classList.remove('required')
        }
    },
    false
);
name.addEventListener(
    'input',
    function (event) {
        if (name.classList.contains('required')) {
            name.classList.remove('required')
        }
    },
    false
);
