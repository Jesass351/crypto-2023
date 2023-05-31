//сам блок
block = [12, 4, 6, 2, 10, 5, 11, 9, 14, 8, 13, 7, 0, 3, 15, 1, 6,
     8, 2, 3, 9, 10, 5, 12, 1, 14, 4, 7, 11, 13, 0, 15, 11, 3, 5, 
     8, 2, 15, 10, 13, 14, 1, 7, 4, 12, 9, 6, 0, 12, 8, 2, 1, 13, 
     4, 15, 6, 7, 0, 10, 5, 3, 14, 9, 11, 7, 15, 5, 10, 8, 1, 6, 
     13, 0, 9, 3, 14, 11, 4, 2, 12, 5, 13, 15, 6, 9, 2, 12, 10, 11,
      7, 8, 1, 4, 3, 14, 0, 8, 14, 2, 5, 6, 9, 1, 12, 15, 4, 11, 0,
       13, 10, 3, 7, 1, 7, 14, 13, 0, 5, 8, 3, 4, 15, 10, 6, 9, 12, 11, 2];


function encryptS(){ //шифрование
    let text = document.getElementById("inputTextEncS").value;
    let result = "";
    let n = 0;
    let m = 0;

    text = text.replaceAll(" ", "ПРБ");
    text = text.replaceAll(".", "ТЧК");
    text = text.replaceAll(",", "ЗПТ");
    text = text.replaceAll(";", "ЭКСТРА1");
    text = text.replaceAll(":", "ЭКСТРА2");
    text = text.replaceAll("-", "ТИРЕ");
    text = text.replaceAll("?", "ВОПРС");
    text = text.replaceAll("!", "ВОСКЛ");
    text = text.replaceAll("«", "ЕЛЛ");
    text = text.replaceAll("»", "ЕЛП");
    
    while (text.length % 16 !== 0) { //добиваем длину до кратной 16 случайными символами
        text = alphabet[generateRandom(0, alphabet.length)] + text;
    }
    text = text.toLowerCase();
    for (letter of text) {
        result += text[block[(n + m) % block.length] + m];
    
        if (n < 15) {
            n += 1;
        } else {
            n = 0;
            m += 16;
        }
      }
    document.getElementById("textareaS").value = result
}

function decryptS(){
    let text = document.getElementById("inputTextDeS").value;
    let result = "";
    let n = 0;
    let m = 0;
    let i = 0;
    
    while (text.length % 16 !== 0) {
        text = alphabet[generateRandom(0, alphabet.length)].toLowerCase() + text;
    }
    for (letter of text) {
        n = 0;
        while (block[(n + m) % block.length] != i) {
            n += 1;
        }
        result = result + text[n + m];

        if (i < 15) {
            i += 1;
        } else {
            i = 0;
            m += 16;
        }
    }
    result = result.toUpperCase();

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
    result = result.toLowerCase();
    document.getElementById("textareaS").value = result

}

function generateRandom(min = 0, max = 100) {
    // find diff
    let difference = max - min;
  
    // generate random number
    let rand = Math.random();
  
    // multiply with difference
    rand = Math.floor(rand * difference);
  
    // add with min value
    rand = rand + min;
  
    return rand;
  }

window.addEventListener("load", () => {
    document.getElementById("encryptS").onclick = encryptS;
    document.getElementById("decryptS").onclick = decryptS;
})