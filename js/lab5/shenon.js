function mod32(number) {
    if (number < 0) {
        while (number < 0) {
            number += 32;
        }
        return number;
    } else if (number > 32) {
        while(number > 32) {
            number -= 32;
        }
        return number;
    } else return number
}

function encryptShennon() {
    let stockText = document.getElementById("inputTextEncShennon").value.toUpperCase();
    let paramA = parseInt(document.getElementById("paramA").value);
    let paramC = parseInt(document.getElementById("paramC").value);
    let paramT = parseInt(document.getElementById("paramT").value);
    
    if (paramA % 2 != 1) {
        alert("Параметр А должен быть нечётным числом");
        return;
    }
    if 	(!(paramC == 3 || paramC == 5 || paramC == 7 || paramC == 9 || paramC == 11 || paramC == 13 || paramC == 15 || paramC == 17 || paramC == 19 || paramC == 21 || paramC == 23 || paramC == 25 || paramC == 27 || paramC == 29 || paramC == 31)) {
        alert("Параметр С должен быть взаимнопростым с 32");
        return;
    }
    if (!((paramA - 1 )% 4 == 0)) {
        alert("a - 1 должен быть кратен 4");
        return;
    }
    if(stockText.includes(".")) {
    }
    stockText = stockText.replaceAll(" ", "ПРБ");
    stockText = stockText.replaceAll(".", "ТЧК");
    stockText = stockText.replaceAll(",", "ЗПТ");
    stockText = stockText.replaceAll(";", "ЭКСТРА1");
    stockText = stockText.replaceAll(":", "ЭКСТРА2");
    stockText = stockText.replaceAll("-", "ТИРЕ");
    stockText = stockText.replaceAll("?", "ВОПРС");
    stockText = stockText.replaceAll("!", "ВОСКЛ");
    stockText = stockText.replaceAll("«", "ЕЛЛ");
    stockText = stockText.replaceAll("»", "ЕЛП");
    
    console.log(stockText);
    let gamma = new Array(stockText.length);
    gamma[0] = mod32(paramA * paramT + paramC);
    for (let i = 1; i < gamma.length; i++) { //вычисляем гамму по формуле (A * g[i-1] + C) mod 32
        gamma[i] = mod32(paramA * gamma[i - 1] + paramC);
    }
    let alphaNumArray = new Array(stockText.length);
    for (let i = 0; i < alphaNumArray.length; i++) {
        alphaNumArray[i] = alphabet.indexOf(stockText[i]) + 1;
    }
    let result = "";
    for (let i = 0; i < alphaNumArray.length; i++) { //складываем букву и соответствующую гамму mod 32
        result += mod32(alphaNumArray[i] + gamma[i]) + " ";
    }
    document.getElementById("textareaShennon").value = result;
}

function decryptShennon() {
    let stockText = document.getElementById("inputTextDeShennon").value.toUpperCase();
    let paramA = parseInt(document.getElementById("paramA").value);
    let paramC = parseInt(document.getElementById("paramC").value);
    let paramT = parseInt(document.getElementById("paramT").value);
    
    if (paramA % 2 != 1) {
        alert("Параметр А должен быть нечётным числом");
        return;
    }
    if 	(!(paramC == 3 || paramC == 5 || paramC == 7 || paramC == 9 || paramC == 11 || paramC == 13 || paramC == 15 || paramC == 17 || paramC == 19 || paramC == 21 || paramC == 23 || paramC == 25 || paramC == 27 || paramC == 29 || paramC == 31)) {
        alert("Параметр С должен быть взаимнопростым с 32");
        return;
    }
    if (!((paramA - 1 )% 4 == 0)) {
        alert("a - 1 должен быть кратен 4");
        return;
    }

    let gamma = new Array(stockText.length);
    gamma[0] = mod32(paramA * paramT + paramC);
    for (let i = 1; i < gamma.length; i++) { //вычисляем гамму
        gamma[i] = mod32(paramA * gamma[i - 1] + paramC);
    }
    let alphaNumArray = stockText.split(" ");
    let result = "";
    for (let i = 0; i < alphaNumArray.length; i++) { //вычисляем текст как разность шифра и гаммы mod 32
        if (alphabet[mod32(alphaNumArray[i] - gamma[i]) - 1] == undefined) { //необработанные символы будут "Я"
            result += "Я";
        } else {
            result += alphabet[mod32(alphaNumArray[i] - gamma[i]) - 1];
        }
    }

    result = result.replaceAll("ТЧК", ".");
    result = result.replaceAll("ПРБ", " ");
    result = result.replaceAll("ЗПТ", ",");
    result = result.replaceAll("ЭКСТРА1", ";");
    result = result.replaceAll("ЭКСТРА2", ":");
    result = result.replaceAll("ТИРЕ", "-");
    result = result.replaceAll("ВОПРС", "?");
    result = result.replaceAll("ВОСКЛ", "!");
    result = result.replaceAll("ЕЛЛ", "«");
    result = result.replaceAll("ЕЛП", "»");
    
    document.getElementById("textareaShennon").value = result;
}

window.addEventListener("load", () => {
    document.getElementById("encryptShennon").onclick = encryptShennon;
    document.getElementById("decryptShennon").onclick = decryptShennon;
})