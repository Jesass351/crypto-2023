const alphabetExtraPlei = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ -.,?!«»:;"

function encryptPlei() {
    let inputTextEncPlei = document.getElementById("inputTextEncPlei");
    let pleiferKey = document.getElementById("pleiferKey");
    let textareaPlei = document.getElementById("textareaPlei");
    let stockText = inputTextEncPlei.value.toUpperCase();


    // генерация "ключевой" матрицы

    let matrix = []; //
    for (let i = 0; i < 7; i++) {
        matrix[i] = [];
    }


    pleiferKey = pleiferKey.value.toUpperCase();
    let keyCheck = [...new Set(pleiferKey)].join(''); //убираем все повторяющиеся буквы
    if (keyCheck.length != pleiferKey.length) {
        alert("Требуется слово-ключ без повтояющихся букв");
        return;
    }
    let tempMatrix = pleiferKey;

    for (alpha of alphabetExtraPlei) { //формирование строки вида "МАРТБВГДЕЖЗИЙКЛНОПСУФХЦЧШЩЪЫЬЭЮЯ -.,?!«»:;"
        if (!tempMatrix.includes(alpha)) {
            tempMatrix += alpha;
        }
    }

    for (let i = 0; i < 7; i++) { //формирования матрицы
        for (let j = 0; j < 6; j++) {
            matrix[i][j] = tempMatrix[i * 6 + j]
        }
    }

    //алгоритм шифрования

    let stockFormatTextTemp = ""; //убираем все необрабатываемые символы/буквы
    for (alpha of stockText) {
        if (alphabetExtraPlei.includes(alpha)) {
            stockFormatTextTemp += alpha;
        }
    }

    let stockFormatText = "";

    for(let i = 0; i < stockFormatTextTemp.length; i += 2) { //если рядом 2 одинаковые буквы, то между ними Ф
        if (i < stockFormatTextTemp.length - 1) {
            if (stockFormatTextTemp[i] == stockFormatTextTemp[i + 1]) {
                stockFormatText += stockFormatTextTemp[i] + "Ф" + stockFormatTextTemp[i + 1];
            } else {
                stockFormatText += stockFormatTextTemp[i] + stockFormatTextTemp[i + 1];
            }
        } else {
            stockFormatText += stockFormatTextTemp[i];
        }

    }

    while (stockFormatTextTemp.length % 2 != 0) { //добавляем А, если нечётное
        stockFormatTextTemp += "А";
    }


    console.log(stockFormatText);

    let result = "";

    let stockTextArray = stockFormatText.match(/.{1,2}/g); //делим исходный текст на пары

    console.log(matrix);
    for (let pair of stockTextArray) { //ПЕРЕПУТАЛ ROW И COL(((
        let rowA = 0;
        let colA = 0;
        let rowB = 0;
        let colB = 0;
        for (let col = 0; col < 7; col++) { //находим "координаты" букв пары
            for (let row = 0; row < 6; row++) {
                if (matrix[col][row] == pair[0]) {
                    rowA = row;
                    colA = col;
                }

                if (matrix[col][row] == pair[1]) {
                    rowB = row;
                    colB = col;
                }
            }
        }
        
        if (rowA == rowB) { //если буквы в одном столбце , то смещаем вправо, следя за пределами
            if (colA == 6) {
                result += matrix[0][rowA];
            } else {
                result += matrix[colA + 1][rowA];
            }

            if (colB == 6) {
                result += matrix[0][rowB];
            } else {
                result += matrix[colB + 1][rowB];
            }
        } else if (colA == colB) { //если в одноЙ строке, то идём вниз
            if (rowA == 5) {
                result += matrix[colA][0];
            } else {
                result += matrix[colA][rowA + 1];
            }

            if (rowB == 5) {
                result += matrix[colB][0];
            } else {
                result += matrix[colB][rowB + 1];
            }
        } else { //если в разных всём, то 
            
            result += matrix[colA][rowB]; //та же строка, но столбец второй буквы
            result += matrix[colB][rowA]; //та же строка, но столбце первой буквы
        }
    }
    
    textareaPlei.value = result;
}

function decryptPlei() {
    let inputTextEncPlei = document.getElementById("inputTextDePlei");
    let pleiferKey = document.getElementById("pleiferKey");
    let textareaPlei = document.getElementById("textareaPlei");
    let stockText = inputTextEncPlei.value.toUpperCase();

    // генерация "ключевой" матрицы

    let matrix = []; //
    for (let i = 0; i < 7; i++) {
        matrix[i] = [];
    }

    pleiferKey = pleiferKey.value.toUpperCase();

    let tempMatrix = pleiferKey;

    for (alpha of alphabetExtraPlei) {
        if (!tempMatrix.includes(alpha)) {
            tempMatrix += alpha;
        }
    }

    for (let i = 0; i < 7; i++) {
        for (let j = 0; j < 6; j++) {
            matrix[i][j] = tempMatrix[i * 6 + j]
        }
    }

    //алгоритм шифрования
    let stockFormatText = "";
    for (alpha of stockText) {
        if (alphabetExtraPlei.includes(alpha)) {
            stockFormatText += alpha;
        }
    }

    let result = "";

    let stockTextArray = stockFormatText.match(/.{1,2}/g);


    console.log(matrix);
    for (let pair of stockTextArray) { //та же шифровка, но не +, а -, если строки равны/столбцы равны
        let rowA = 0;
        let colA = 0;
        let rowB = 0;
        let colB = 0;
        for (let col = 0; col < 7; col++) {
            for (let row = 0; row < 6; row++) {
                if (matrix[col][row] == pair[0]) {
                    rowA = row;
                    colA = col;
                }

                if (matrix[col][row] == pair[1]) {
                    rowB = row;
                    colB = col;
                }
            }
        }
        
        if (rowA == rowB) {
            if (colA == 0) {
                result += matrix[6][rowA];
            } else {
                result += matrix[colA - 1][rowA];
            }

            if (colB == 0) {
                result += matrix[6][rowB];
            } else {
                result += matrix[colB - 1][rowB];
            }
        } else if (colA == colB) {
            if (rowA == 0) {
                result += matrix[colA][5];
            } else {
                result += matrix[colA][rowA - 1];
            }

            if (rowB == 0) {
                result += matrix[colB][5];
            } else {
                result += matrix[colB][rowB - 1];
            }
        } else {
            result += matrix[colA][rowB];

            result += matrix[colB][rowA];
        }
    }

    textareaPlei.value = result;
}

window.addEventListener("load", () => {
    document.getElementById("encryptPlei").onclick = encryptPlei;
    document.getElementById("decryptPlei").onclick = decryptPlei;
})