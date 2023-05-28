function encryptRSA() {
    let textareaRSA = document.getElementById("textareaRSA");
    let inputTextEncRSA = document.getElementById("inputTextEncRSA").value.toUpperCase();

    let paramP = parseInt(document.getElementById("paramP").value);
    let paramQ = parseInt(document.getElementById("paramQ").value);
    let paramE = parseInt(document.getElementById("paramE").value);
    inputTextEncRSA = inputTextEncRSA.replaceAll(" ", "ПРБ");
    inputTextEncRSA = inputTextEncRSA.replaceAll(".", "ТЧК");
    inputTextEncRSA = inputTextEncRSA.replaceAll(",", "ЗПТ");
    inputTextEncRSA = inputTextEncRSA.replaceAll(";", "ЭКСТРА1");
    inputTextEncRSA = inputTextEncRSA.replaceAll(":", "ЭКСТРА2");
    inputTextEncRSA = inputTextEncRSA.replaceAll("-", "ТИРЕ");
    inputTextEncRSA = inputTextEncRSA.replaceAll("?", "ВОПРС");
    inputTextEncRSA = inputTextEncRSA.replaceAll("!", "ВОСКЛ");
    inputTextEncRSA = inputTextEncRSA.replaceAll("«", "ЕЛЛ");
    inputTextEncRSA = inputTextEncRSA.replaceAll("»", "ЕЛП");
    
    let N = paramP * paramQ; //вычисляем N
    console.log(N);

    let F = (paramP - 1) * (paramQ - 1); //вычисляем F

    is_coprime(paramE, F); //проверка условий

    let crytedText = cryp_rsa(inputTextEncRSA, N, paramE); //шифруем
    console.log(crytedText);
    textareaRSA.value = crytedText;
} 

function decryptVert() {
    let textareaRSA = document.getElementById("textareaRSA");
    let inputTextDeRSA = document.getElementById("inputTextDeRSA").value.toUpperCase();
    let paramP = parseInt(document.getElementById("paramP").value);
    let paramQ = parseInt(document.getElementById("paramQ").value);
    let paramE = parseInt(document.getElementById("paramE").value);

    let N = paramP * paramQ;
    console.log(N);

    let F = (paramP - 1) * (paramQ - 1);

    is_coprime(paramE, F);

    let deCrytedText = dec_rsa(inputTextDeRSA, N, paramE, F);
    console.log(deCrytedText);

    deCrytedText = deCrytedText.replaceAll("ТЧК", ".");
    deCrytedText = deCrytedText.replaceAll("ПРБ", " ");
    deCrytedText = deCrytedText.replaceAll("ЗПТ", ",");
    deCrytedText = deCrytedText.replaceAll("ЭКСТРА1", ";");
    deCrytedText = deCrytedText.replaceAll("ЭКСТРА2", ":");
    deCrytedText = deCrytedText.replaceAll("ТИРЕ", "-");
    deCrytedText = deCrytedText.replaceAll("ВОПРС", "?");
    deCrytedText = deCrytedText.replaceAll("ВОСКЛ", "!");
    deCrytedText = deCrytedText.replaceAll("ЕЛЛ", "«");
    
    deCrytedText = deCrytedText.replaceAll("ЕЛП", "»");
    textareaRSA.value = deCrytedText;
}

function prime_num(num){
    let k = 0;
    let check = 1;
    while (check != 0) {
        for (let i = 2; i < (Math.floor(num, 2) + 1); i++) {
            if (num % i == 0) {
                k = k+1

            }
        }
        if (k <= 0){
            check = 0
        }
        else if(check!=0){
            alert("Число P не является простым")
            k = 0
            return;
        }
    }
    return num
}

var gcd = function(a, b) {
    if (!b) {
      return a;
    }
    return gcd(b, a % b);
}

function is_coprime(e, f){
    let check = 1;
    while (check!=0) {
        if(gcd(e,f) == 1) {
            check = 0
        }
        else {
            alert(`Числа ${e} и ${f} НЕ взаимно простые`);
            return;
        }
    }
    return e;
}

function cryp_rsa(pr, n, e){
    let cryp_text = "";
    for (let i of pr) { //шифруем по формулке
        cryp_text += ((alphabet.indexOf(i) ** e) % n + " ");
    }
    return cryp_text;
}

function dec_rsa(pr, n, e, f){
    pr = pr.split(" ");
    console.log(pr);
    let n_pr = pr.length;
    let decryp_text = "";
    let d = 0;
    for (let i = 0; i < 100000; i++) { //подбираем d
        if (i * e % f == 1) {
            d = i;
            break;
        }
    }
    for (let i = 0; i < n_pr; i++) {
        decryp_text += alphabet[BigInt((BigInt(parseInt(pr[i]))) ** BigInt(d)) % BigInt(n)]; //расшифровываем по формулке
    }

    return decryp_text
}

window.addEventListener("load", () => {
    document.getElementById("encryptRSA").onclick = encryptRSA;
    document.getElementById("decryptRSA").onclick = decryptVert;
})