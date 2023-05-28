function encrypta52() {
    let a52key = document.getElementById("a52Key").value.toUpperCase();
    let inputTextEnca52 = document.getElementById("inputTextEnca52").value.toUpperCase();
    let textareaa51 = document.getElementById("textareaa52");

    if ([...new Set(a52key)].join('') == "А") {
        alert("Данный ключ недопустим");
        return;
    }
    let keyArray = a52key.split("");
    let bitKey = "";
    for (let i = 0; i < keyArray.length; i++) {
        bitKey += keyToBits(keyArray[i]).toString();
    }

    inputTextEnca52 = inputTextEnca52.replaceAll(" ", "ПРБ");
    inputTextEnca52 = inputTextEnca52.replaceAll(".", "ТЧК");
    inputTextEnca52 = inputTextEnca52.replaceAll(",", "ЗПТ");
    inputTextEnca52 = inputTextEnca52.replaceAll(";", "ЭКСТРА1");
    inputTextEnca52 = inputTextEnca52.replaceAll(":", "ЭКСТРА2");
    inputTextEnca52 = inputTextEnca52.replaceAll("-", "ТИРЕ");
    inputTextEnca52 = inputTextEnca52.replaceAll("?", "ВОПРС");
    inputTextEnca52 = inputTextEnca52.replaceAll("!", "ВОСКЛ");
    inputTextEnca52 = inputTextEnca52.replaceAll("«", "ЕЛЛ");
    inputTextEnca52 = inputTextEnca52.replaceAll("»", "ЕЛП");

    let stockTextArray = inputTextEnca52.split("");
    let bitStockText = "";
    for (let i = 0; i < stockTextArray.length; i++) {
        bitStockText += keyToBits(stockTextArray[i]);
    }

    let bitStockTextArray = bitStockText.match(/.{1,114}/g); //кадры
    console.log(bitStockTextArray.join(","));

    let result = "";

    for (let kadr = 0; kadr < bitStockTextArray.length; kadr++) {
        let registr1 = new Array(19).fill(0);
        let registr2 = new Array(22).fill(0);
        let registr3 = new Array(23).fill(0);
        let registr4 = new Array(17).fill(0);

        for (let i = 0; i < 64; i++) { //прокрутка ключа
            registr1[0] = (registr1[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = (registr3[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr3.unshift(registr3.pop());


            registr4[0] = (registr4[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr4.unshift(registr4.pop());
        }
        for (let i = 0; i < 22; i++) { //прокрутка с кадром
            registr1[0] = (registr1[0] + kadr) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + kadr) % 2;
            registr2.unshift(registr2.pop());


            registr3[0] = (registr3[0] + kadr) % 2;
            registr3.unshift(registr3.pop());

            registr4[0] = (registr4[0] + kadr) % 2;
            registr4.unshift(registr4.pop());
        }
        //значения по умолчанию в регистре 4
        registr4[3] = 1;
        registr4[7] = 1;
        registr4[10] = 1;

        for (let i = 0; i < 99; i++) { //тактирование 
            let F = (registr4[3] && registr4[7]) || (registr4[3] && registr4[10]) || (registr4[7] && registr4[10]);
            if (registr4[10] == F) {
                registr1.unshift(registr1.pop());
            }
0
            if (registr4[3] == F) {
                registr2.unshift(registr2.pop());
            }

            if (registr4[7] == F) {
                registr3.unshift(registr3.pop());
            }
            registr4[0] = (registr4[16] + registr4[11]) % 2;
            registr4.unshift(registr4.pop());
        }
        let tempResult = "";
        for (let i = 0; i < bitStockTextArray[kadr].length; i++) { //получение выходного бита
            let F1 = (registr1[12] && registr1[14]) || (registr1[12] && registr1[15]) || (registr1[14] && registr1[15]);
            let F2 = (registr2[9] && registr2[13]) || (registr2[9] && registr2[16]) || (registr2[13] && registr2[16]);
            let F3 = (registr3[13] && registr3[16]) || (registr3[13] && registr3[18]) || (registr3[16] && registr3[18]);
            let lastest = (((((registr1[18] + registr2[21]) % 2) + registr3[22]) % 2)) % 2;
            let outBit = (((((F1 + F2) % 2) + F3) % 2) + lastest) % 2;
            let resBit = (parseInt(bitStockTextArray[kadr][i]) + outBit) % 2;
            tempResult += resBit;
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
    let tempArray = result.match(/.{1,5}/g); //биты в текст
    for (let i = 0; i < tempArray.length; i++) {
        alphaResult += alphabet[parseInt(transformBitResult(tempArray[i]) , 2)];
        if (alphabet[parseInt(transformBitResult(tempArray[i]) , 2)] == undefined) {
        }
    }
    textareaa51.value = alphaResult;
}

function decrypta52() {
    let a52key = document.getElementById("a52Key").value.toUpperCase();
    let inputTextEnca52 = document.getElementById("inputTextDea52").value.toUpperCase();
    let textareaa51 = document.getElementById("textareaa52");
    if ([...new Set(a52key)].join('') == "А") {
        alert("Данный ключ недопустим");
        return;
    }

    let keyArray = a52key.split("");
    let bitKey = "";
    for (let i = 0; i < keyArray.length; i++) {
        bitKey += keyToBits(keyArray[i]).toString();
    }
    let stockTextArray = inputTextEnca52.split("");
    let bitStockText = "";
    for (let i = 0; i < stockTextArray.length; i++) {
        bitStockText += keyToBits(stockTextArray[i]);
    }

    let bitStockTextArray = bitStockText.match(/.{1,114}/g);

    let result = "";

    for (let kadr = 0; kadr < bitStockTextArray.length; kadr++) {
        let registr1 = new Array(19).fill(0);
        let registr2 = new Array(22).fill(0);
        let registr3 = new Array(23).fill(0);
        let registr4 = new Array(17).fill(0);

        for (let i = 0; i < 64; i++) {
            registr1[0] = (registr1[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr2.unshift(registr2.pop());

            registr3[0] = (registr3[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr3.unshift(registr3.pop());


            registr4[0] = (registr4[0] + parseInt(bitKey[i % bitKey.length])) % 2;
            registr4.unshift(registr4.pop());
        }

        for (let i = 0; i < 22; i++) {
            registr1[0] = (registr1[0] + kadr) % 2;
            registr1.unshift(registr1.pop());

            registr2[0] = (registr2[0] + kadr) % 2;
            registr2.unshift(registr2.pop());


            registr3[0] = (registr3[0] + kadr) % 2;
            registr3.unshift(registr3.pop());

            registr4[0] = (registr4[0] + kadr) % 2;
            registr4.unshift(registr4.pop());
        }

        //значения по умолчанию в регистре 4
        registr4[3] = 1;
        registr4[7] = 1;
        registr4[10] = 1;

        for (let i = 0; i < 99; i++) {
            let F = (registr4[3] && registr4[7]) || (registr4[3] && registr4[10]) || (registr4[7] && registr4[10]);
            if (registr4[10] == F) {
                registr1.unshift(registr1.pop());
            }

            if (registr4[3] == F) {
                registr2.unshift(registr2.pop());
            }

            if (registr4[7] == F) {
                registr3.unshift(registr3.pop());
            }
            registr4[0] = (registr4[16] + registr4[11]) % 2;
            registr4.unshift(registr4.pop());
        }
        let tempResult = "";
        for (let i = 0; i < bitStockTextArray[kadr].length; i++) {
            let F1 = (registr1[12] && registr1[14]) || (registr1[12] && registr1[15]) || (registr1[14] && registr1[15]);

            let F2 = (registr2[9] && registr2[13]) || (registr2[9] && registr2[16]) || (registr2[13] && registr2[16]);

            let F3 = (registr3[13] && registr3[16]) || (registr3[13] && registr3[18]) || (registr3[16] && registr3[18]);

            let lastest = (((((registr1[18] + registr2[21]) % 2) + registr3[22]) % 2)) % 2;

            let outBit = (((((F1 + F2) % 2) + F3) % 2) + lastest) % 2;

            let resBit = (parseInt(bitStockTextArray[kadr][i]) + outBit) % 2;

            tempResult += resBit;

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
            console.log(tempArray[i]);
            console.log(parseInt(transformBitResult(tempArray[i]) , 2));
        }
    }
    console.log(alphaResult);
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

window.addEventListener("load", () => {
    document.getElementById("encrypta52").onclick = encrypta52;
    document.getElementById("decrypta52").onclick = decrypta52;
})