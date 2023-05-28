function encryptBelazo() {
    let stockText = document.getElementById("inputTextEncBelazo").value.toUpperCase();
    let belazoKey = document.getElementById("belazoKey").value.toUpperCase();
    let result = "";
    let textareaBelazo = document.getElementById("textareaBelazo");
    let k = 0; //счётчик не букв для корректного пропуска

    for (let i = 0; i < stockText.length; i++) {
        if (alphabet.includes(stockText[i])) {
            let resultCol = -1;
            let resultRow = -1;
            for (let colNum = 0; colNum < 32; colNum++) { //находим столбец новой буквы в таблице Тритемия
                if (tritemiiTable[0][colNum] == stockText[i]) {
                    resultCol = colNum;
                    break;
                }
            }
            for (let rowNum = 0; rowNum < 32; rowNum++) { //находим строку новой буквы в уже найденном ранее столбце
                if (tritemiiTable[rowNum][0] == belazoKey[(i - k) % belazoKey.length]) {
                    resultRow = rowNum;
                    break;
                }
            }
            result += tritemiiTable[resultRow][resultCol] //находим новую букву в найденном столбце и строке
        } else {
            result += stockText[i];
            k+=1;
        }
    }
    textareaBelazo.value = result;
}

function decryptBelazo() {
    let stockText = document.getElementById("inputTextDeBelazo").value.toUpperCase();
    let belazoKey = document.getElementById("belazoKey").value.toUpperCase();
    let result = "";
    let textareaBelazo = document.getElementById("textareaBelazo");
    let k = 0; //счётчик не букв для корректного пропуска

    for (let i = 0; i < stockText.length; i++) {
        if (alphabet.includes(stockText[i])) {
            let resultCol = -1;
            let resultRow = -1;
            for (let rowNum = 0; rowNum < 32; rowNum++) { //номер строки по символу ключа
                if (tritemiiTable[rowNum][0] == belazoKey[(i - k) % belazoKey.length]) {
                    resultRow = rowNum;
                    break;
                }
            }
            for (let colNum = 0; colNum < 32; colNum++) { //номер столбца по полученной строке и введённой букве (Б + П = О)
                if (tritemiiTable[resultRow][colNum] == stockText[i]) {
                    resultCol = colNum;
                    break;
                }
            }

            result += tritemiiTable[0][resultCol] //вы знаем, что нужна буква будет в первой строке (столбец уже нашли ранее)
        } else {
            result += stockText[i];
            k+=1;
        }
    }
    textareaBelazo.value = result;

}

window.addEventListener("load", () => {
    document.getElementById("encryptBelazo").onclick = encryptBelazo;
    document.getElementById("decryptBelazo").onclick = decryptBelazo;
})