function encrypCard() {
    let matrixCells = document.querySelectorAll(".matrix-cell");
    let tempArray = [];
    for (let i = 0; i < matrixCells.length; i++) {
        tempArray.push(parseInt(matrixCells[i].value))
    }
    let matrix  = new Array(6);
    let matrix2  = new Array(6);
    let matrix3  = new Array(6);
    let matrix4  = new Array(6);

    //формирование первой итерации трафарета (как в UI)
    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(10);
        matrix2[i] = new Array(10);
        matrix3[i] = new Array(10);
        matrix4[i] = new Array(10);
    }
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = tempArray[i * 10 + j];
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix2[i][j] = matrix[i][j];

        }
    }

    console.log(matrix);

    //формирование второй итерации трафарета (повёрнута направо/отражена по вертикали)
    for (i = 0; i < matrix2.length; i++) {
        matrix2[i] = matrix2[i].reverse();
    }

    //формирование третьей итерации трафарета (перевёрнута по горизонтали)
    //копирование
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix3[i][j] = matrix2[i][j];

        }
    }
    //переворот
    matrix3.reverse();

    //формирование четвёртой итерации трафарета (первернута налево/отражена по вертикали)
    //копирование
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix4[i][j] = matrix3[i][j];

        }
    }
    //переворот рядов
    for (let i = 0; i < matrix4.length; i++) {
        matrix4[i] = matrix4[i].reverse();
    }

    console.log("----");
    console.log(matrix);
    console.log(matrix2);
    console.log(matrix3);
    console.log(matrix4);

    console.log("----");

    
    let inputTextEncCard = document.getElementById("inputTextEncCard");
    let stockText = inputTextEncCard.value.toUpperCase();
    let alphasMatrix = new Array(matrix.length); //матрица 6 * 10 под буковки
    for (let i = 0; i < alphasMatrix.length; i++) {
        alphasMatrix[i] = new Array(matrix[i].length);
    }
    console.log(alphasMatrix);
    let oneCounter = 0; //считаем сколько не пустых клеток в таблице
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                oneCounter += 1;
            }
        }
    }
    console.log(oneCounter + "------");

    let allCombMatrix = new Array(4); //формирование массива со всеми итерациями трафарета
    allCombMatrix[0] = matrix;
    allCombMatrix[1] = matrix2;
    allCombMatrix[2] = matrix3;
    allCombMatrix[3] = matrix4;

    let matrix4D = new Array(Math.ceil(stockText.length / (4 * oneCounter))); //массив для понимания сколько раз будем прогонять трафарет
    for (let i = 0; i < matrix4D.length; i++) {                               //до 60 символов - 1 раз, 61 символ - 2 раза и тд
        matrix4D[i] = JSON.parse(JSON.stringify(allCombMatrix)) //копируем комбинации в новые масив
    }
    let alphasMatrixArray = new Array(matrix4D.length);
    for (let i = 0; i < alphasMatrixArray.length; i++) {
        alphasMatrixArray[i] = JSON.parse(JSON.stringify(alphasMatrix));
    }

    if (oneCounter != 15) {
        alert("В Вашей решётке ошибка (число единичных ячеек (отверстий) должно быть 60 / 4  = 15)")
    }

    oneCounter = 0;
    let nullCounter = 0;

    let resultMatrixArray = new Array(matrix4D.length);
    for (let i = 0; i < resultMatrixArray.length; i++) {
        let tempFL = new Array(matrix.length);
        for (let j = 0; j < tempFL.length; j++) {
            tempFL[j] = new Array(matrix[0].length);
        }
        resultMatrixArray[i] = tempFL;
    }

    console.log("-------");

    console.log(matrix4D);

    for (let i = 0; i < matrix4D.length; i++) { //заполняем каждую ячейку каждой итерации трафарета каждого кадра
        for (let j = 0; j < matrix4D[i].length; j++) {
            for(let k = 0; k < matrix4D[i][j].length; k++) {
                for (let l = 0; l < matrix4D[i][j][k].length; l++) {
                    if (matrix4D[i][j][k][l] == 1) {
                        if (stockText[oneCounter] == undefined) { //если текст кончился, то вставляем туда алфавит, тк нельзя оставлять пустые ячейки
                            matrix4D[i][j][k][l] = alphabet[nullCounter % 32];
                            resultMatrixArray[i][k][l] = alphabet[nullCounter % 32];
                            nullCounter += 1;
                        } else { //если текст ещё есть, то в ячейку ставим алфавит
                            matrix4D[i][j][k][l] = stockText[oneCounter];
                            resultMatrixArray[i][k][l] = stockText[oneCounter];
                            oneCounter += 1;
                            console.log(matrix4D[i][j][k][l]);
                        }
                    }
                }

            }
        }
    }

    console.log(resultMatrixArray);

    console.log(matrix4D);

    let result = "";

    //выводим зашифрованный текст из матрицы, отлавливая ошибки заполнения
    for (let i = 0; i < resultMatrixArray.length; i++) { //0,1,2,3,4
        for (let j = 0; j < resultMatrixArray[i].length; j++) { //6
            for (let k = 0; k < resultMatrixArray[i][j].length; k++) {
                if (resultMatrixArray[i][j][k] == undefined) {
                    alert("Ошибка при заполнении таблицы");
                }
                result += resultMatrixArray[i][j][k];
            } //10
        }
    }

    console.log(resultMatrixArray);


    document.getElementById("textareaCard").value = result;;

    console.log(matrix);

    //направо, вверх,влево
}

function decryptCard() {
    let matrixCells = document.querySelectorAll(".matrix-cell");
    let tempArray = [];
    for (let i = 0; i < matrixCells.length; i++) {
        tempArray.push(parseInt(matrixCells[i].value))
    }
    let matrix  = new Array(6);
    let matrix2  = new Array(6);
    let matrix3  = new Array(6);
    let matrix4  = new Array(6);

    for (let i = 0; i < matrix.length; i++) {
        matrix[i] = new Array(10);
        matrix2[i] = new Array(10);
        matrix3[i] = new Array(10);
        matrix4[i] = new Array(10);
    }
    //так же создаём все итерации трафарета
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix[i][j] = tempArray[i * 10 + j];
        }
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix2[i][j] = matrix[i][j];

        }
    }

    for (i = 0; i < matrix2.length; i++) {
        matrix2[i] = matrix2[i].reverse();
    }

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix3[i][j] = matrix2[i][j];

        }
    }

    matrix3.reverse();

    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            matrix4[i][j] = matrix3[i][j];

        }
    }
    for (let i = 0; i < matrix4.length; i++) {
        matrix4[i] = matrix4[i].reverse();
    }

    
    let inputTextEncCard = document.getElementById("inputTextDeCard");
    let stockText = inputTextEncCard.value.toUpperCase();
    let alphasMatrix = new Array(matrix.length);
    for (let i = 0; i < alphasMatrix.length; i++) {
        alphasMatrix[i] = new Array(matrix[i].length);
    }

    let oneCounter = 0;
    for (let i = 0; i < matrix.length; i++) {
        for (let j = 0; j < matrix[i].length; j++) {
            if (matrix[i][j] == 1) {
                oneCounter += 1;
            }
        }
    }

    let allCombMatrix = new Array(4);
    allCombMatrix[0] = matrix;
    allCombMatrix[1] = matrix2;
    allCombMatrix[2] = matrix3;
    allCombMatrix[3] = matrix4;

    let matrix4D = new Array(Math.ceil(stockText.length / (4 * oneCounter)));
    for (let i = 0; i < matrix4D.length; i++) {
        matrix4D[i] = JSON.parse(JSON.stringify(allCombMatrix))
    }
    let alphasMatrixArray = new Array(matrix4D.length);
    for (let i = 0; i < alphasMatrixArray.length; i++) {
        alphasMatrixArray[i] = JSON.parse(JSON.stringify(alphasMatrix));
    }

    //заполняем матрицу буквами
    for (let i = 0; i < alphasMatrixArray.length; i++) {
        for (let j = 0; j < alphasMatrixArray[i].length; j++) {
            for (let k = 0; k < alphasMatrixArray[i][j].length; k++) {
                alphasMatrixArray[i][j][k] = stockText[(i * 60) + (j * 10 + k)];
                console.log(stockText[(i * 60) + (j * 10 + k)]);
            }
        }
    }

    console.log(alphasMatrixArray);

    if (oneCounter != 15) {
        alert("В Вашей решётке ошибка (число единичных ячеек (отверстий) должно быть 60 / 4  = 15)")
    }

    oneCounter = 0;

    let result = "";

    for (let i = 0; i < matrix4D.length; i++) { //в каждом кадре выписываем только те буквы, у которых в ключе стоит 1
        for (let j = 0; j < matrix4D[i].length; j++) {
            for(let k = 0; k < matrix4D[i][j].length; k++) {
                for (let l = 0; l < matrix4D[i][j][k].length; l++) {
                    if (matrix4D[i][j][k][l] == 1) {
                        result += alphasMatrixArray[i][k][l];
                    }
                }
            }
        }
    }

    document.getElementById("textareaCard").value = result;
}


window.addEventListener("load", () => {
    document.getElementById("encrypCard").onclick = encrypCard;
    document.getElementById("decryptCard").onclick = decryptCard;
})