const settings = {
    formSelector: '.form',
    formFieldSelector: '.form-field',

};

let form = document.querySelector(settings.formSelector);
form.addEventListener('submit', (event) => {
    let fields = event.target.querySelectorAll(`${settings.formFieldSelector}[type=text]`);
    fields.forEach((el) => {
        console.log(el.name, isValid(el));
        if (!isValid(el)) {
            el.classList.add('alert');
            event.preventDefault();
        }
    })
});

function isValidName(name) {
    return name.match(/^[а-яА-ЯёЁa-zA-Z]+$/g) ? true : false
}

function isValidPhone(phone) {
    return phone.match(/^\+7\(\d{3}\)\d{3}-\d{4}$/g) ? true : false
}

function isValidEmail(email) {
    return email.match(/^(\w+\.?-?mail)@mail\.(ru|com)$/g) ? true : false
}

function isValidText(text) {
    return text ? true : false
}

function isValid(elem) {
    if (elem.name === 'name') {
        return isValidName(elem.value)
    } else if (elem.name === 'phone') {
        return isValidPhone(elem.value)
    } else if (elem.name === 'email') {
        return isValidEmail(elem.value)
    } else if (elem.name === 'text') {
        return isValidText(elem.value)
    } else return true
}