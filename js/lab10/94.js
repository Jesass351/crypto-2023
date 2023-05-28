function inputTextEnc94(){
    let paramP = parseInt(document.getElementById("paramP").value);
    let paramQ = parseInt(document.getElementById("paramQ").value);
    let paramA = parseInt(document.getElementById("paramA").value);
    let paramX = parseInt(document.getElementById("paramX").value);

    let paramK = parseInt(document.getElementById("paramK").value);
    let openText = document.getElementById("inputTextEnc94").value.toUpperCase();
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

    if(!isPrime(paramP)) { //проверки
        alert("P - простое");
        return;
    }
    if (!PrimeNumber(paramP - 1).includes(paramQ)) {
        alert("q - простой сомножитель числа (р -1)");
        return;
    }
    if (!(paramA > 1)){
        alert("A > 1");
        return;
    }
    if (!(paramA < (paramP - 1))){
        alert("A < (P-1)");
        return;
    }
    if (((BigInt(BigInt(paramA) ** BigInt(paramQ)) % BigInt(paramP)) == 1)){
        alert("A ** Q mod P = 1");
        return;
    }
    if (!(paramX < paramQ)) {
        alert("X < Q");
        return;
    }

    //нахождение R
    let r = Number((BigInt(BigInt(paramA) ** BigInt(paramK)) % BigInt(paramP)) % BigInt(paramQ));
    if (r == 0) {
        alert("r = 0, требуется выбрать другое K");
    }


    let h = hash(openText, paramP);//нахождение хэша

    if ((h % paramQ) == 0) { //доделки
        h += 1;
    }


    let s = (paramX * r + paramK * h) % paramQ; //нахождение S

    let textarea94 = document.getElementById("textarea94");
    textarea94.value = r + " " + s;
}

function decrypt94(){
    let paramP = parseInt(document.getElementById("paramP").value);
    let paramQ = parseInt(document.getElementById("paramQ").value);
    let paramA = parseInt(document.getElementById("paramA").value);
    let paramX = parseInt(document.getElementById("paramX").value);

    if(!isPrime(paramP)) { //проверки
        alert("P - простое");
        return;
    }
    if (!PrimeNumber(paramP - 1).includes(paramQ)) {
        alert("q - простой сомножитель числа (р -1)");
        return;
    }
    if (!(paramA > 1)){
        alert("A > 1");
        return;
    }
    if (!(paramA < (paramP - 1))){
        alert("A < (P-1)");
        return;
    }        
    if (((BigInt(BigInt(paramA) ** BigInt(paramQ)) % BigInt(paramP)) == 1)){
        alert("A ** Q mod P = 1");
        return;
    }
    if (!(paramX < paramQ)) {
        alert("X < Q");
        return;
    }
    let y = BigInt(BigInt(paramA) ** BigInt(paramX)) % BigInt(paramP); //нахождение Y
    let openText = document.getElementById("inputTextEnc94").value.toUpperCase();
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

    let key = document.getElementById("inputTextDe94").value;
    let temp = key.split(" ");
    let r = temp[0];
    let s = temp[1]


    let h = hash(openText, paramP); //хэш

    if ((h % paramQ) == 0) {
        h += 1;
    }



    let v = (BigInt(h) ** (BigInt(paramQ) - BigInt(2))) % BigInt(paramQ); //vvvvvvvvvv
    let z1 = (BigInt(s) * BigInt(v)) % BigInt(paramQ); //z1 z1 z1 z1 z1
    let z2 = (BigInt(BigInt(paramQ) - BigInt(r)) * BigInt(v)) % BigInt(paramQ); //z2 z2 z2 z2 z2
    let u = ((BigInt(BigInt(paramA) ** BigInt(z1)) * (BigInt(y) ** BigInt(z2))) % BigInt(paramP)) % BigInt(paramQ); //uuuuuuuuuuuuuuuuuuuuuuuuu
    let textarea94 = document.getElementById("textarea94");

    if (u == r) {   
        textarea94.value = "Подпись верна   " + u;
    } else {
        textarea94.value = "Подпись не верна";
    }
}

function PrimeNumber(InputNumber) { //делители
	// объявляем внутреннюю функцию — она проверяет, простое число ей передали или нет
    function isPrime(m) {
    	// переменная для цикла
        var i;
        // перебираем все числа от 2 до переданного числа
        for (i = 2; i < m; i++) {
        	// если число делится нацело на любое число из этого диапазона, значит, оно не простое
            if (m % i === 0) {
            	// возвращаем признак того, что это не простое число
                return false;
            }
        }
        // если мы дошли досюда, значит, ни один делитель не подошёл, поэтому перед нами простое число
        return true;
    }

    // переменная для цикла
    var j;
    // массив, где будем хранить все найденные простые множители
    var sequence = [];
    // точно так же проходим все числа от 2 до введённого числа
    for (j = 2; j < InputNumber; j++) {
    	// если введённое число делится нацело и делитель — простое число,
        if (InputNumber % j === 0 && isPrime(j)) {
        	// то добавляем это число в массив с простыми множителями
            sequence.push(j);
        }
    }
    // в конце основной функции возвращаем её значение — массив с простыми делителями
    console.log(sequence);
    return sequence;
};

function gcd(a,b) { //наибольший общий делитель
    if (!b) {
        return a;
    }
    return gcd(b, a % b);
}

const isPrime = num => { //простое ли
    for(let i = 2, s = Math.sqrt(num); i <= s; i++) {
        if(num % i === 0) return false;
    }
    return num > 1;
}

function generateKBtn(){
    let paramK = document.getElementById("paramK");
    let paramQ = parseInt(document.getElementById("paramQ").value);
    let openText = document.getElementById("inputTextEnc94").value.toUpperCase();

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
    let temp = generateRandom(0, paramQ);
    while (temp > paramQ){
        temp = generateRandom(0, paramQ);
    }

    paramK.value = temp;
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

function hash(openText, n){ //хэш
    h = 0;
    for (let i = 0; i < openText.length; i++) {
      h = (alphabet.indexOf(openText[i]) + 1 + h) ** 2 % n;
    }
    return h;
  }

window.addEventListener("load", () => {
    document.getElementById("generateKBtn").onclick = generateKBtn;
    document.getElementById("encrypt94").onclick = inputTextEnc94;
    document.getElementById("decrypt94").onclick = decrypt94;
})