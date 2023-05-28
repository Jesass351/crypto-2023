function encryptMatrix() {
    let stockText = document.getElementById("inputTextEncMatrix").value.toUpperCase();
    let matrixCells = document.querySelectorAll(".matrix-cell");
    let textareaMatrix = document.getElementById("textareaMatrix");

    let keyMatrix = [];
    let result = "";
    let resultMatrix = [];
    let counter = 0;
    for (let i = 0; i < 3; i++) { //формирование матрицы из введённых данных
        let tempArray = [];
        for (let j = 0; j < 3; j++) {
            tempArray.push(matrixCells[counter].value);
            counter++;
        }
        keyMatrix.push(tempArray);
    }

    if (Determinant(keyMatrix) == 0) {
        alert("Определитель матрицы равен 0. Требуется другой ключ");
        return;
    }

    while (stockText.length % 3 != 0) { //добираем нужную длину
        stockText += "А";
    }

    let stockTextArray = stockText.match(/.{1,3}/g); //делим текст по 3

    let stockTextArrayNumbers = [];

    for (let i = 0; i < stockTextArray.length; i++) { //делаем матрицу с числами вместо букв
        let tempArray = [];
        for (let j = 0; j < 3; j++) {
            tempArray.push(alphabetExtra.indexOf(stockTextArray[i][j]) + 1);
        }

        stockTextArrayNumbers.push(tempArray);
    }

    for (let i = 0; i < stockTextArrayNumbers.length; i++) { //перемножаем матрицу наших букв-чисел и ключ
        for (let j = 0; j < 3; j++) {
            resultMatrix.push(stockTextArrayNumbers[i][0] * keyMatrix[j][0] + stockTextArrayNumbers[i][1] * keyMatrix[j][1] + stockTextArrayNumbers[i][2] * keyMatrix[j][2])
        }
    }

    for (number of resultMatrix) { //переводим в читаемый формат
        result += number + " "
    }

    textareaMatrix.value = result;
}

function decryptMatrix() {
    let stockText = document.getElementById("inputTextDeMatrix").value.toUpperCase();
    let matrixCells = document.querySelectorAll(".matrix-cell");
    let textareaMatrix = document.getElementById("textareaMatrix");

    let keyMatrix = [];
    let result = "";
    let resultMatrix = [];
    let counter = 0;
    for (let i = 0; i < 3; i++) { //формирование матрицы из введённых данных
        let tempArray = [];
        for (let j = 0; j < 3; j++) {
            tempArray.push(matrixCells[counter].value);
            counter++;
        }
        keyMatrix.push(tempArray);
    }

    let stockTextArray = stockText.split(" "); //разделяем

    let stockTextArrayNumbers = [];

    for (let i = 0; i < stockTextArray.length / 3; i++) { //формируем матрицы 3*3
        let tempArray = [];
        for (let j = 0; j < 3; j++) {
            tempArray.push(stockTextArray[j + i * 3])
        }
        stockTextArrayNumbers.push(tempArray);
    }

    console.log(stockTextArrayNumbers);

    keyMatrix = InverseMatrix(keyMatrix); //создаём ключ для расшифрования

    for (let i = 0; i < stockTextArrayNumbers.length; i++) { //перемножаем матрицы из 76 на "обратный ключ"
        for (let j = 0; j < 3; j++) {
            resultMatrix.push(alphabetExtra[Math.round(stockTextArrayNumbers[i][0] * keyMatrix[j][0] + stockTextArrayNumbers[i][1] * keyMatrix[j][1] + stockTextArrayNumbers[i][2] * keyMatrix[j][2]) - 1]); 
        }
    }

    for (number of resultMatrix) { //переводим в читаемый формат
        result += number;
    }

    textareaMatrix.value = result;


}

function Determinant(A) //функция нахождения определителя по алгоритму Барейса
{
    var N = A.length, B = [], denom = 1, exchanges = 0;
    for (var i = 0; i < N; ++i)
     { B[ i ] = [];
       for (var j = 0; j < N; ++j) B[ i ][j] = A[ i ][j];
     }
    for (var i = 0; i < N-1; ++i)
     { var maxN = i, maxValue = Math.abs(B[ i ][ i ]);
       for (var j = i+1; j < N; ++j)
        { var value = Math.abs(B[j][ i ]);
          if (value > maxValue){ maxN = j; maxValue = value; }
        }
       if (maxN > i)
        { var temp = B[ i ]; B[ i ] = B[maxN]; B[maxN] = temp;
          ++exchanges;
        }
       else { if (maxValue == 0) return maxValue; }
       var value1 = B[ i ][ i ];
       for (var j = i+1; j < N; ++j)
        { var value2 = B[j][ i ];
          B[j][ i ] = 0;
          for (var k = i+1; k < N; ++k) B[j][k] = (B[j][k]*value1-B[ i ][k]*value2)/denom;
        }
       denom = value1;
     }
    if (exchanges%2) return -B[N-1][N-1];
    else return B[N-1][N-1];
}

function AdjugateMatrix(A) { //нахождение союзной матрицы                                
    var N = A.length, adjA = [];
    for (var i = 0; i < N; i++)
     { adjA[ i ] = [];
       for (var j = 0; j < N; j++)
        { var B = [], sign = ((i+j)%2==0) ? 1 : -1;
          for (var m = 0; m < j; m++)
           { B[m] = [];
             for (var n = 0; n < i; n++)   B[m][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m][n-1] = A[m][n];
           }
          for (var m = j+1; m < N; m++)
           { B[m-1] = [];
             for (var n = 0; n < i; n++)   B[m-1][n] = A[m][n];
             for (var n = i+1; n < N; n++) B[m-1][n-1] = A[m][n];
           }
          adjA[ i ][j] = sign*Determinant(B);
        }
     }
    return adjA;
}

function InverseMatrix(A) {   //обратная матрица
    var det = Determinant(A);
    if (det == 0) return false;
    var N = A.length, A = AdjugateMatrix(A);
    for (var i = 0; i < N; i++)
     { for (var j = 0; j < N; j++) A[ i ][j] /= det; }
    return A;
}

window.addEventListener("load", () => {
    document.getElementById("encryptMatrix").onclick = encryptMatrix;
    document.getElementById("decryptMatrix").onclick = decryptMatrix;
})