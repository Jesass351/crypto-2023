function encryptAtbash() {
    let textarea = document.getElementById("textareaAtbash"); 
    let inputTextEncAtbash = document.getElementById("inputTextEncAtbash");
    let stockText = inputTextEncAtbash.value.toUpperCase();
    let encryptedText = "";
    for (let i = 0; i < stockText.length; i++) { //получаем каждую букву сообщения
        if (alphabet.includes(stockText[i])) { //если буква есть в моём алфавите
            encryptedText += alphabet[32 - alphabet.indexOf(stockText[i]) + 1 - 2] //меняем букву по правилу Y[i] = X[n - i + 1], где n - мощность алфавита
        } else encryptedText += stockText[i];                    
    }
    console.log(stockText);
    textarea.value = encryptedText;
}


function decryptAtbash() {
    let textarea = document.getElementById("textareaAtbash");
    let inputTextDeAtbash = document.getElementById("inputTextDeAtbash");
    let stockText = inputTextDeAtbash.value.toUpperCase();
    let decryptedText = "";
    for (let i = 0; i < stockText.length; i++) { //получаем каждую букву сообщения
        if (alphabet.includes(stockText[i])) { //если буква есть в моём алфавите
        decryptedText += alphabet[32 - alphabet.indexOf(stockText[i]) + 1 - 2] //меняем букву по правилу Y[i] = X[n - i + 1], где n - мощность алфавита
        } else decryptedText += stockText[i];
    }
    console.log(stockText);
    textarea.value = decryptedText;
}

window.addEventListener("load", () => {
    document.getElementById("encryptAtbash").onclick = encryptAtbash;
    document.getElementById("decryptAtbash").onclick = decryptAtbash;
});