function encryptTritemii() {
    let inputTextEncTritemii = document.getElementById("inputTextEncTritemii");
    let textareaTritemii = document.getElementById("textareaTritemii");

    let stockText = inputTextEncTritemii.value.toUpperCase();

    let encText = "";
    let j = 0; //счётчик не букв

    for (let i = 0; i < stockText.length; i++) {
        if (!alphabet.includes(stockText[i])) { //данный фрагмент позволяет правильно пропускать символы, которых нет в алфавите
            encText += stockText[i];
            j += 1;
        } else {
            encText += alphabet[(32 + (alphabet.indexOf(stockText[i]) + (i - j))) % 32]; //заменяем символы по правилу Y[j] = X[i + j - 1] mod n, где n=32
        }
    }

    textareaTritemii.value = encText;
}

function decryptTritemii() {
    let inputTextDeTritemii = document.getElementById("inputTextDeTritemii");
    let textareaTritemii = document.getElementById("textareaTritemii");

    let stockText = inputTextDeTritemii.value.toUpperCase();

    let encText = "";
    let k = 0; //счётчик не букв

    let numberOfLetter = 0;

    for (let i = 0; i < stockText.length; i++) {
        if (!alphabet.includes(stockText[i])) { //данный фрагмент позволяет правильно пропускать символы, которых нет в алфавите
            encText += stockText[i];
            k += 1;
        } else {
            numberOfLetter = alphabet.indexOf(stockText[i]) - (i - k); //находим алфавитный номер полученного символа
            while (numberOfLetter < 0) { //приведение к модулю 32 [0!!, 32]
                numberOfLetter += 32;
            }
            encText += alphabet[numberOfLetter];
        }
    }
    textareaTritemii.value = encText;
}


window.addEventListener("load", () => {
    document.getElementById("encryptTritemii").onclick = encryptTritemii;
    document.getElementById("decryptTritemii").onclick = decryptTritemii;
})