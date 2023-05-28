function encrypta51() {
    let a51key = document.getElementById("a51key").value.toUpperCase();
    let inputTextEnca51 = document.getElementById("inputTextEnca51").value.toUpperCase();
    let textareaa51 = document.getElementById("textareaa51");

    if ([...new Set(a51key)].join('') == "А") { //проверка ключа
        alert("Данный ключ недопустим");
        return;
    }
    let keyArray = a51key.split("");
    let bitKey = "";
    for (let i = 0; i < keyArray.length; i++) { //ключ в двоичный формат
        bitKey += keyToBits(keyArray[i]).toString();
    }


    inputTextEnca51 = inputTextEnca51.replaceAll(" ", "ПРБ");
    inputTextEnca51 = inputTextEnca51.replaceAll(".", "ТЧК");
    inputTextEnca51 = inputTextEnca51.replaceAll(",", "ЗПТ");
    inputTextEnca51 = inputTextEnca51.replaceAll(";", "ЭКСТРА1");
    inputTextEnca51 = inputTextEnca51.replaceAll(":", "ЭКСТРА2");
    inputTextEnca51 = inputTextEnca51.replaceAll("-", "ТИРЕ");
    inputTextEnca51 = inputTextEnca51.replaceAll("?", "ВОПРС");
    inputTextEnca51 = inputTextEnca51.replaceAll("!", "ВОСКЛ");
    inputTextEnca51 = inputTextEnca51.replaceAll("«", "ЕЛЛ");
    inputTextEnca51 = inputTextEnca51.replaceAll("»", "ЕЛП");

    let stockTextArray = inputTextEnca51.split("");
    let bitStockText = ""; //текст в двоичный формат
    for (let i = 0; i < stockTextArray.length; i++) {
        bitStockText += keyToBits(stockTextArray[i]);
    }

    let bitStockTextArray = bitStockText.match(/.{1,114}/g); //текст на кадры по 114 бит

    let result = "";

    for (let kadr = 0; kadr < bitStockTextArray.length; kadr++) { //проходимся по кадрам
        let registr1 = new Array(19).fill(0); //пустые регистры
        let registr2 = new Array(22).fill(0);
        let registr3 = new Array(23).fill(0);
        for (let i = 0; i < 64; i++) { //XOR ключа по кругу в начало
            registr1[0] = (registr1[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = (registr3[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr3.unshift(registr3.pop());
        }

        for (let i = 0; i < 22; i++) { //XOR кадра по кругу в начало
            registr1[0] = (registr1[0] + kadr) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + kadr) % 2;
            registr2.unshift(registr2.pop());


            registr3[0] = (registr3[0] + kadr) % 2;
            registr3.unshift(registr3.pop());
        }

        for (let i = 0; i < 100; i++) { //XOR над старшими битами всех трех регистров и мажоритарных функций F
            let F = registr1[8] && registr2[10] || registr1[8] && registr3[10] || registr2[10] && registr3[10];
            if (registr1[8] == F) { //сравнение с битами синхронизации
                registr1.unshift(registr1.pop());
            }
            if (registr2[10] == F) {
                registr2.unshift(registr2.pop());
            }
            if (registr3[10] == F) {
                registr3.unshift(registr3.pop());
            }
        }
        let tempResult = "";
        for (let i = 0; i < bitStockTextArray[kadr].length; i++) { //вынимаем результат регистры и крутим регистры дальше
            tempResult += (parseInt(bitStockTextArray[kadr][i]) + ((((registr1[18] + registr2[21]) % 2) + registr3[22]) % 2)) % 2;

            registr1[0] = (((((registr1[18] + registr1[17]) % 2) + registr1[16]) % 2) + registr1[13]) % 2; //вставляем в начало бит по формуле
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[21] + registr2[20]) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = ((((registr3[22] + registr3[21]) % 2 + registr3[20]) % 2) + registr3[7]) % 2;
            registr3.unshift(registr3.pop());
        }
        
        result += tempResult;
    }

    let alphaResult = "";
    let tempArray = result.match(/.{1,5}/g); //биты в текст
    for (let i = 0; i < tempArray.length; i++) {
        alphaResult += alphabet[parseInt(transformBitResult(tempArray[i]) , 2)];
        if (alphabet[parseInt(transformBitResult(tempArray[i]) , 2)] == undefined) {
        }
    }

    textareaa51.value = alphaResult;
}

function decrypta51() {
    let a51key = document.getElementById("a51key").value.toUpperCase();
    let inputTextEnca51 = document.getElementById("inputTextDea51").value.toUpperCase();
    let textareaa51 = document.getElementById("textareaa51");

    if ([...new Set(a51key)].join('') == "А") {
        alert("Данный ключ недопустим");
        return;
    }
    
    let keyArray = a51key.split("");
    let bitKey = "";
    for (let i = 0; i < keyArray.length; i++) {
        bitKey += keyToBits(keyArray[i]).toString();
    }


    let stockTextArray = inputTextEnca51.split("");
    let bitStockText = "";
    for (let i = 0; i < stockTextArray.length; i++) {
        bitStockText += keyToBits(stockTextArray[i]);
    }

    let bitStockTextArray = bitStockText.match(/.{1,114}/g); //кадры

    let result = "";

    for (let kadr = 0; kadr < bitStockTextArray.length; kadr++) {
        let registr1 = new Array(19).fill(0);
        let registr2 = new Array(22).fill(0);
        let registr3 = new Array(23).fill(0);
        for (let i = 0; i < 64; i++) {
            registr1[0] = (registr1[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = (registr3[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr3.unshift(registr3.pop());
        }

        for (let i = 0; i < 22; i++) {
            registr1[0] = (registr1[0] + kadr) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + kadr) % 2;
            registr2.unshift(registr2.pop());


            registr3[0] = (registr3[0] + kadr) % 2;
            registr3.unshift(registr3.pop());

        }

        for (let i = 0; i < 100; i++) {
            let F = registr1[8] && registr2[10] || registr1[8] && registr3[10] || registr2[10] && registr3[10];
            if (registr1[8] == F) {
                registr1.unshift(registr1.pop());
            }
            if (registr2[10] == F) {
                registr2.unshift(registr2.pop());
            }
            if (registr3[10] == F) {
                registr3.unshift(registr3.pop());
            }
        }
        let tempResult = "";
        for (let i = 0; i < bitStockTextArray[kadr].length; i++) {
            tempResult += (parseInt(bitStockTextArray[kadr][i]) + ((((registr1[18] + registr2[21]) % 2) + registr3[22]) % 2)) % 2;

            registr1[0] = (((((registr1[18] + registr1[17]) % 2) + registr1[16]) % 2) + registr1[13]) % 2; 
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[21] + registr2[20]) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = ((((registr3[22] + registr3[21]) % 2 + registr3[20]) % 2) + registr3[7]) % 2;
            registr3.unshift(registr3.pop());
        }
        
        result += tempResult;
    }

    let alphaResult = "";
    let tempArray = result.match(/.{1,5}/g);
    for (let i = 0; i < tempArray.length; i++) {
        alphaResult += alphabet[parseInt(transformBitResult(tempArray[i]) , 2)];
        if (alphabet[parseInt(transformBitResult(tempArray[i]) , 2)] == undefined) {
        }
    }
    alphaResult = alphaResult.replaceAll("ТЧК", ".");
    alphaResult = alphaResult.replaceAll("ПРБ", " ");
    alphaResult = alphaResult.replaceAll("ЗПТ", ",");
    alphaResult = alphaResult.replaceAll("ЭКСТРА1", ";");
    alphaResult = alphaResult.replaceAll("ЭКСТРА2", ":");
    alphaResult = alphaResult.replaceAll("ТИРЕ", "-");
    alphaResult = alphaResult.replaceAll("ВОПРС", "?");
    alphaResult = alphaResult.replaceAll("ВОСКЛ", "!");
    alphaResult = alphaResult.replaceAll("ЕЛЛ", "«");
    alphaResult = alphaResult.replaceAll("ЕЛП", "»");
    textareaa51.value = alphaResult;
}

function keyToBits(key) { //ключ в биты
    let keyArray = key.split("");
    let result = "";
    for (let i = 0; i < keyArray.length; i++) {
        result += transformBit((alphabet.indexOf(keyArray[i])).toString(2));
    }
    return result;
}

function transformBit(alpha) { //добавляем незнач 0 до длины 5
    let result = alpha.split("");
    while (result.length < 5) {
        result.unshift("0");
    }
    return result.join("");
}

function transformBitResult(bin) { //убираем незнач 0
    let result = bin.split("");
    while (result[0] == 0) {
        result.shift();
    }
    if (result.length == 0) {
        return 0;
    } else {
        return result.join("");

    }
}

window.addEventListener("load", () => {
    document.getElementById("encrypta51").onclick = encrypta51;
    document.getElementById("decrypta51").onclick = decrypta51;
})