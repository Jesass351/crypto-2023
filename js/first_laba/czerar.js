function encryptCzerar() {
    let textarea = document.getElementById("textareaCzerar");
    let inputText = document.getElementById("inputTextEncCzerar");

    let key = parseInt(document.getElementById("key").value, 10); //получаем ключ

    let stockText = inputText.value.toUpperCase();
    let encryptedText = "";

    for (let i = 0; i < stockText.length; i++) {
        if (alphabet.includes(stockText[i])) { //если символ в алфавите
            encryptedText += alphabet[((alphabet.indexOf(stockText[i])) + key) % 32]; //меняем символ по правилу Y[i] = X[i + key]
        } else encryptedText += stockText[i];
    }
    console.log(stockText);
    textarea.value = encryptedText;
}

function decryptCzerar() {
    let textarea = document.getElementById("textareaCzerar");
    let inputText = document.getElementById("inputTextDeCzerar");

    let key = parseInt(document.getElementById("key").value, 10); // получаем ключ

    let alphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"
    let stockText = inputText.value.toUpperCase();
    let decryptedText = "";

    for (let i = 0; i < stockText.length; i++) {
        if (alphabet.includes(stockText[i])) { //усли символ в алфавите
            decryptedText += alphabet[(32 + alphabet.indexOf(stockText[i]) - key) % 32]; //меняем символ по правилу X[i] = Y[i - key]
        } else decryptedText += stockText[i];
    }
    textarea.value = decryptedText;
}


window.addEventListener("load", () => {
    console.log("12");
    document.getElementById("encryptCzerar").onclick = encryptCzerar;
    document.getElementById("decryptCzerar").onclick = decryptCzerar;
});