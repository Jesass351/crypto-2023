
function encryptPlei() {
    let inputTextEncPlei = document.getElementById("inputTextEncPlei");
    let pleiferKey = document.getElementById("pleiferKey");
    let textareaPlei = document.getElementById("textareaPlei");
    let stockText = inputTextEncPlei.value.toUpperCase().replaceAll("Й", "И").replaceAll("Ъ", "Ь");

    // генерация "ключевой" матрицы

    let matrix = []; //
    for (let i = 0; i < 5; i++) {
        matrix[i] = [];
    }

    pleiferKey = pleiferKey.value.toUpperCase();

    let tempMatrix = pleiferKey;

    for (alpha of alphabet) {
        if (!tempMatrix.includes(alpha) && alpha != "Й" && alpha != "Ъ") {
            tempMatrix += alpha;
        }
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            matrix[i][j] = tempMatrix[i * 6 + j]
        }
    }

    //алгоритм шифрования
    let stockFormatText = "";
    for (alpha of stockText) {
        if (alphabet.includes(alpha)) {
            stockFormatText += alpha;
        }
    }

    while (stockFormatText.length % 2 != 0) {
        stockFormatText += "А";
    }

    console.log(stockFormatText);

    let result = "";

    let stockTextArray = stockFormatText.match(/.{1,2}/g);
    console.log(matrix);
    for (let pair of stockTextArray) {
        let rowA = 0;
        let colA = 0;
        let rowB = 0;
        let colB = 0;
        for (let col = 0; col < 5; col++) {
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
        } else if (colA == colB) {
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
        } else {
            result += matrix[colA][rowB];
            result += matrix[colB][rowA];
        }
    }

    textareaPlei.value = result;
}

function decryptPlei() {
    let inputTextEncPlei = document.getElementById("inputTextDePlei");
    let pleiferKey = document.getElementById("pleiferKey");
    let textareaPlei = document.getElementById("textareaPlei");
    let stockText = inputTextEncPlei.value.toUpperCase().replaceAll("Й", "И").replaceAll("Ъ", "Ь");

    // генерация "ключевой" матрицы

    let matrix = []; //
    for (let i = 0; i < 5; i++) {
        matrix[i] = [];
    }

    pleiferKey = pleiferKey.value.toUpperCase();

    let tempMatrix = pleiferKey;

    for (alpha of alphabet) {
        if (!tempMatrix.includes(alpha) && alpha != "Й" && alpha != "Ъ") {
            tempMatrix += alpha;
        }
    }

    for (let i = 0; i < 5; i++) {
        for (let j = 0; j < 6; j++) {
            matrix[i][j] = tempMatrix[i * 6 + j]
        }
    }

    //алгоритм шифрования
    let stockFormatText = "";
    for (alpha of stockText) {
        if (alphabet.includes(alpha)) {
            stockFormatText += alpha;
        }
    }

    while (stockFormatText.length % 2 != 0) {
        stockFormatText += "А";
    }

    console.log(stockFormatText);

    let result = "";

    let stockTextArray = stockFormatText.match(/.{1,2}/g);
    console.log(matrix);
    for (let pair of stockTextArray) {
        let rowA = 0;
        let colA = 0;
        let rowB = 0;
        let colB = 0;
        for (let col = 0; col < 5; col++) {
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

    //заяц в кустах тире это еще не готовое мясо тчк о

    textareaPlei.value = result;
}

window.addEventListener("load", () => {
    document.getElementById("encryptPlei").onclick = encryptPlei;
    document.getElementById("decryptPlei").onclick = decryptPlei;
})