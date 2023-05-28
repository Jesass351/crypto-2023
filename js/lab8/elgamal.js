function gcd(a,b) { //наибольший общий делитель
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

function generateRandom(min = 0, max = 100) { //рандом для К
  let difference = max - min;
  let rand = Math.random();
  rand = Math.floor(rand * difference);
  rand = rand + min;
  return rand;
}

function is_coprime(k, f, random = false) { //взаимнопростые
  let check = 1;
  while (check != 0) {
    if (gcd(k, f) == 1) check = 0;
    else {
        alert("k[i] не взаимнопростой с Ф.Эйлера от числа P");
        return null;
    } 
  }
  return k;
}

function cryp_elm(pr, p, g = 5, y = 31, f = 46, kArr) {
  let n = pr.length;
  let cryp_text = "";
  for (let i = 0; i < n; i++) {
    let k = kArr[i];
    //проверки
    if (is_coprime(k, f) == null) {
        break
    } else {
        k = is_coprime(k, f);

    }
    let a = String(Number(BigInt(g) ** BigInt(k) % BigInt(p))); //a
    let b = String(
      Number((BigInt(y) ** BigInt(k) * BigInt(alphabet.indexOf(pr[i]))) % BigInt(p)), //b
    );
    //добавка
    if (a.length == 1) {
        a = "0" + a;
    }

    if (b.length == 1) {
        b = "0" + b;
    }
    cryp_text = cryp_text + a.toString() + b.toString() + " ";
  }
  cryp_text = "Y = " + y + " " + cryp_text;

  return cryp_text;
}

function encryptEl() {
    let paramP = parseInt(document.getElementById("paramPEl").value);
    //проверки
    if (paramP < alphabet.length) {
        alert("p > Mi");
        return;
    }
    let paramX = parseInt(document.getElementById("paramX").value);
    if (!(1 < paramX && paramX < paramP)) {
        alert("1 < x < p");
        return;
    }

    let paramG = parseInt(document.getElementById("paramG").value);

    if (!(1 < paramG && paramG < paramP)) {
        alert("1 < g < p");
        return;
    }

    let textareaEl = document.getElementById("textareaEl");

    let openText = document.getElementById("inputTextEncEl").value.toUpperCase();

    openText = openText.replaceAll(" ", "ПРБ");
    openText = openText.replaceAll(".", "ТЧК");
    openText = openText.replaceAll(",", "ЗПТ");
    openText = openText.replaceAll(";", "ЭКСТРА1");
    openText = openText.replaceAll(":", "ЭКСТРА2");
    openText = openText.replaceAll("-", "ТИРЕ");
    openText = openText.replaceAll("?", "ВОПРС");
    openText = openText.replaceAll("!", "ВОСКЛ");
    openText = openText.replaceAll("«", "ЕЛЛ");
    openText = openText.replaceAll("»", "ЕЛП");

    let paramK = document.getElementById("paramK").value.split(" ");
    for (let i = 0; i < paramK.length; i++) { //преобразование K
        if (paramK[i] == "") {kdecryp_text
            paramK.pop();
        } else {
            paramK[i] = parseInt(paramK[i]);

        }
    }
    if (paramK.length != openText.length) {
        alert("Длина K должна совпадать с длиной открытого текста");
        return;
    }

    let y = paramG ** paramX % paramP; //y
    let f = paramP - 1; //функция Эйлера

    textareaEl.value = cryp_elm(openText, paramP, paramG, y, f, paramK);

}

function dec_elm(enText, x, p) {
    let decryp_text = "";
  
    let enTextArray = enText.split(" ");
    for (let i = 0; i < enTextArray.length; i++) {
      enTextArray[i] = enTextArray[i].match(/.{1,2}/g); //делим на пары
    }
    console.log(enTextArray);

    for (let i = 0; i < enTextArray.length; i++) { //посимвольно шифруем
        let a = enTextArray[i][0];
        let b = enTextArray[i][1];      
        for (let j = 0; j < alphabet.length; j++) { //подбор буквы (плохо)
            if (BigInt(BigInt(BigInt(BigInt(a) ** BigInt(x)) * BigInt(j)) % BigInt(p)) == BigInt(BigInt(b) % BigInt(p))) {
                decryp_text += alphabet[j];
                break;
            }
        }
    }

    console.log(decryp_text);

    decryp_text = decryp_text.replaceAll("ТЧК", ".");
    decryp_text = decryp_text.replaceAll("ПРБ", " ");
    decryp_text = decryp_text.replaceAll("ЗПТ", ",");
    decryp_text = decryp_text.replaceAll("ЭКСТРА1", ";");
    decryp_text = decryp_text.replaceAll("ЭКСТРА2", ":");
    decryp_text = decryp_text.replaceAll("ТИРЕ", "-");
    decryp_text = decryp_text.replaceAll("ВОПРС", "?");
    decryp_text = decryp_text.replaceAll("ВОСКЛ", "!");
    decryp_text = decryp_text.replaceAll("ЕЛЛ", "«");
    decryp_text = decryp_text.replaceAll("ЕЛП", "»");
  
    return decryp_text;
  }

function decryptEl(){
    let paramP = parseInt(document.getElementById("paramPEl").value);
    let paramG = parseInt(document.getElementById("paramG").value);
    let paramY = parseInt(document.getElementById("paramY").value)

    let textareaEl = document.getElementById("textareaEl");

    let enText = document.getElementById("inputTextDeEl").value.toUpperCase();
    let paramX = 0;

    for (let i = 0; i < 10000; i++){ //находим X
        paramX = i;
        if (BigInt(paramY) == BigInt(BigInt(paramG) ** BigInt(i)) % BigInt(paramP)){
            break;
        }
    }

    textareaEl.value = dec_elm(enText, paramX, paramP);
}

function generateK() { //генерация рандомайзера
    let f = parseInt(document.getElementById("paramPEl").value) - 1;
    let paramK = document.getElementById("paramK");
    let k = "";
    let openText = document.getElementById("inputTextEncEl").value.toUpperCase();

    openText = openText.replaceAll(" ", "ПРБ");
    openText = openText.replaceAll(".", "ТЧК");
    openText = openText.replaceAll(",", "ЗПТ");
    openText = openText.replaceAll(";", "ЭКСТРА1");
    openText = openText.replaceAll(":", "ЭКСТРА2");
    openText = openText.replaceAll("-", "ТИРЕ");
    openText = openText.replaceAll("?", "ВОПРС");
    openText = openText.replaceAll("!", "ВОСКЛ");
    openText = openText.replaceAll("«", "ЕЛЛ");
    openText = openText.replaceAll("»", "ЕЛП");
    let temp = 0;

    for (let i = 0; i < openText.length; i++) {
        temp = generateRandom(0, f);
        while ((gcd(temp, f) != 1)){
            temp = generateRandom(0, f)
            console.log(temp + " " + f + "--" + gcd(temp, f) + "-gcd");
        }
        k += temp + " ";
        console.log(k + "-123422131");
    }
    k = k.substring(0, k.length - 1);
    paramK.value = k;
}

window.addEventListener("load", () => {
    document.getElementById("encryptEl").onclick = encryptEl;
    document.getElementById("decryptEl").onclick = decryptEl;
    document.getElementById("generateKBtn").onclick = generateK;
})
