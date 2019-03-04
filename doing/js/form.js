const settings = {
    formSelector: '.form',
    formFieldSelector: '.form-field',
    nonValidateClass: 'alert'

};

let form = document.querySelector(settings.formSelector);
form.addEventListener('submit', (event) => {
    if (!formIsValid(form)) {
        event.preventDefault();
    }
});

/**
 * проверяет что вся форма валидна
 * @param form
 * @return {boolean}
 */
function formIsValid(form) {
    let isValid = true;
    const fields = form.querySelectorAll('input');
    fields.forEach((el) => {
        console.log(el.name, fieldIsValid(el));
        if (!fieldIsValid(el)) {
            el.classList.add(settings.nonValidateClass);
            let alertMessage = form.querySelector(`div[name=${el.name}]`);
            alertMessage.classList.toggle('field-is-valid');
            isValid = false
        }
    });
    return isValid
}

/**
 * проверяет поле формы на валидность
 * @param elem
 * @return {*}
 */
function fieldIsValid(elem) {
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

// валидаторы
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

