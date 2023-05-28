function encryptPolibii() {
    let stockText = document.getElementById("inputTextEncPolibii").value.toUpperCase();
    let encText = "";
    for (let letter of stockText) { //получаем символ сообщения
        encText += searchingLetter(letter); //находим его номер в "квадрате" Полибия
        encText += " "; //добавляем разделитель
    } 
    document.getElementById("textareaPolibii").value = encText;
}


function searchingLetter(letter) { // функция нахождения буквы в "квадрате"
    for (let i = 0; i < alphabetMatrix.length; i++) {
        for (let j = 0; j < alphabetMatrix[i].length; j++) {
            if (alphabetMatrix[i][j] == letter) {
                return ((i + 1) * 10 + (j + 1));
            }
        }
    }
}

function decryptPolibii() {
    let stockText = document.getElementById("inputTextDePolibii").value.split(" ");
    let result = "";
    for (let number of stockText) { //получаем одно число из сообщения
        result += searchingLetterByNum(number); //находим его буквенное значение в "квадрате" Полибия
    }

    document.getElementById("textareaPolibii").value = result;
}

function searchingLetterByNum(num) { //функция нахождения буквы по её номеру в "квадрате" Полибия
    let iIndex = Math.floor(num/10); //выполняем обратые действия, относительно функции searchingLetter()
    let jIndex = (num % 10);

    return alphabetMatrix[iIndex - 1][jIndex - 1];
}


window.addEventListener("load", () => {
    document.getElementById("encryptPolibii").onclick = encryptPolibii;
    document.getElementById("decryptPolibii").onclick = decryptPolibii;
});