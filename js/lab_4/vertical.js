function encryptVert() {
    let inputTextEncVert = document.getElementById("inputTextEncVert");
    let waySelector = document.getElementById("waySelector");
    let textareaVert = document.getElementById("textareaVert");
    let result = "";
    let keyVert = document.getElementById("keyVert").value.toUpperCase();
    let stockText = inputTextEncVert.value.toUpperCase().replaceAll(" ", "");
    let matrix = new Array(Math.ceil(stockText.length / keyVert.length));
    for (let i = 0; i < matrix.length; i++) { //формирование пустой матрицы под текст
        matrix[i] = new Array(keyVert.length);
    }
    
    switch(waySelector.value) {
        case "default":
            return;
        case "DULR":
            console.log("Слева сверху вниз вправо змейкой");
            for (let col = 0; col < matrix.length; col++) { //заполнение матрицы текстом
                for (let row = 0; row < matrix[0].length; row++) {
                    matrix[col][row] = stockText[col * matrix[0].length + row]
                }           
            }
            let keyArray = []; 
            for (let i = 0; i < keyVert.length; i++) { //создание ключа, где элемент - число
                keyArray.push(alphabet.indexOf(keyVert[i]));
            }
            console.log(matrix);
            console.log(keyArray);
            let resultKeyArray = new Array(keyArray.length); //узнаём порядок букв в ключе (10,2,3 -> 2,0,1)
            for (let i = 0; i < keyArray.length; i++) {
                resultKeyArray[keyArray.indexOf(Math.min(...keyArray))] = i;
                keyArray[keyArray.indexOf(Math.min(...keyArray))] = 100;
            }
            console.log(resultKeyArray);
            console.log(matrix);
            for (let i = 0; i < resultKeyArray.length; i++) { //выписывание ответа по ключу
                let colNum = resultKeyArray.indexOf(Math.min(...resultKeyArray)); //номер столбца с минимальным числом ключа, то есть очередь записи
                for (let j = 0; j < matrix.length; j++) {
                    if (matrix[j][colNum] == undefined) {
                        result += "";
                    } else {
                        result += matrix[j][colNum];
                    }
                    console.log(colNum);
                }
                resultKeyArray[colNum] = 100
            }
            console.log(result);
            textareaVert.value = result;
    }

}

function decryptVert() {
    let inputTextDeVert = document.getElementById("inputTextDeVert");
    let waySelector = document.getElementById("waySelector");
    let textareaVert = document.getElementById("textareaVert");
    let result = "";
    let keyVert = document.getElementById("keyVert").value.toUpperCase();
    let stockText = inputTextDeVert.value.toUpperCase();

    switch(waySelector.value) {
        case "default":
            return;
        case "DULR":
            let matrix = new Array(Math.ceil(stockText.length / keyVert.length)); //формирование матрицы под текст
            console.log(matrix);
            for (let i = 0; i < matrix.length; i++) {
                matrix[i] = new Array(keyVert.length);
                console.log(matrix[i]);
            }
            console.log(matrix);
            let keyArray = []; //формирование ключа
            for (let i = 0; i < keyVert.length; i++) {
                keyArray.push(alphabet.indexOf(keyVert[i]) + 1);
            }

            let resultKeyArray = new Array(keyArray.length); //узнаём порядок букв в ключе (10,2,3 -> 2,0,1)
            for (let i = 0; i < keyArray.length; i++) {
                resultKeyArray[keyArray.indexOf(Math.min(...keyArray))] = i;
                keyArray[keyArray.indexOf(Math.min(...keyArray))] = 100;
            }
            let full = stockText.length % keyVert.length; //считаем сколько будет полных столбцов
            let notFull = keyVert.length - full; //сколько будет с пустой клеткой снизу
            console.log(full + "  " + notFull);
            console.log(resultKeyArray);
            console.log(matrix);
            for (let i = 0; i < resultKeyArray.length; i++) {
                if (resultKeyArray.indexOf(Math.min(...resultKeyArray)) > full - 1) { //если сейчас неполный столбик 
                    let tempString = stockText.slice(0, matrix.length - 1); //берём столбик
                    for (let j = 0; j < matrix.length - 1; j++) {
                        matrix[j][resultKeyArray.indexOf(Math.min(...resultKeyArray))] = tempString[j]; //записываем наш столбик на нужное место
                    }
                    console.log(tempString);
                    stockText = stockText.slice(matrix.length - 1, stockText.length); //убираем записанный столбик из текста
                    console.log(resultKeyArray.indexOf(Math.min(...resultKeyArray)));

                } else { //если полный столбик
                    let tempString = stockText.slice(0, matrix.length); //то же самое, но на 1 символ длинее
                    for (let j = 0; j < matrix.length; j++) {
                        matrix[j][resultKeyArray.indexOf(Math.min(...resultKeyArray))] = tempString[j];
                    }
                    stockText = stockText.slice(matrix.length, stockText.length);
                }
                resultKeyArray[resultKeyArray.indexOf(Math.min(...resultKeyArray))] = 100; //убираем из просчёта обработанный элмент ключа
            }
            for (let i = 0; i < matrix.length; i++) { //выводим нашу расшифровку из матрицы
                for (let j = 0; j < matrix[i].length; j++) {
                    if (matrix[i][j] == undefined) continue //если клетка в матрице пустая, то пропуск, чтобы не было "абвundefinedд"
                    result += matrix[i][j];
                }
            }
            console.log(matrix);
            textareaVert.value = result;
    }
}

window.addEventListener("load", () => {
    document.getElementById("encryptVert").onclick = encryptVert;
    document.getElementById("decryptVert").onclick = decryptVert;
})