const URL = 'texttoreplace.txt';

// можно как-то из функции получить не промис, а результат?
async function getText(url) {
    const text = await fetch(url);
    return await text.text()
}

function replacer(someString, pattern = /\B'/g, sub = '"') {
    return someString.replace(pattern, sub);
}

let text = getText(URL);
text.then(text => console.log(replacer(text)));
