function encryptVizhener() {
    let stockText = document.getElementById("inputTextEncVizhener").value.toUpperCase();
    let textareaVizhener = document.getElementById("textareaVizhener");
    let vizhenerKey = document.getElementById("vizhenerKey").value.toUpperCase();

    let keyValue;

    {let tempStockText = ""; //формирование части ключа с пропуском всякой нечисти ( ,.! и тд)
    for (let i = 0; i < stockText.length; i++) {
        if (alphabet.includes(stockText[i])) {
            tempStockText += stockText[i]
        }
    }
    keyValue = vizhenerKey + tempStockText.slice(0, -1);} //конечный ключ


    let result = "";

    let k = 0;

    for (let j = 0; j < stockText.length; j++) { //создание шифртекста по таблице Тритемия
        if (alphabet.includes(stockText[j])) {
            result += alphabet[(alphabet.indexOf(stockText[j]) + alphabet.indexOf(keyValue[j - k])) % 32];
        } else {
            k += 1;
            result += stockText[j];
        }
        console.log(k);
    }
    
    textareaVizhener.value = result;
}

function decryptVizhener() {
    let stockText = document.getElementById("inputTextDeVizhener").value.toUpperCase();
    let textareaVizhener = document.getElementById("textareaVizhener");
    let vizhenerKey = document.getElementById("vizhenerKey").value.toUpperCase();

    let result = "";

    for (let i = 0; i < stockText.length; i++) {
        if (alphabet.includes(stockText[i])) { //поиск расшифровки в таблице тритемия
            let resultCol = -1;
            let resultRow = -1;
            for (let rowNum = 0; rowNum < 32; rowNum++) { //номер строки по символу ключа
                if (tritemiiTable[rowNum][0] == vizhenerKey) {
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

            result += tritemiiTable[0][resultCol];

            vizhenerKey = tritemiiTable[0][resultCol];

        
        } else {
            result += stockText[i];
        }
    }

    textareaVizhener.value = result;
}

window.addEventListener("load", () => {
    document.getElementById("encryptVizhener").onclick = encryptVizhener;
    document.getElementById("decryptVizhener").onclick = decryptVizhener;
})