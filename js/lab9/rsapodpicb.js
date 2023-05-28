function isPrime(n) { //простое
  if (n < 2) {
    return "Число должно быть больше 1";
  } else if (n === 2) {
    return true;
  }

  let i = 2;
  const limit = Math.sqrt(n);
  while (i <= limit) {
    if (n % i === 0) {
      return false;
    }
    i += 1;
  }
  return true;
}

var gcd = function (a, b) {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
};

function is_coopenTextime(e, f) { //взаимнопростые
  let check = 1;
  while (check != 0) {
    if (gcd(e, f) == 1) {
      check = 0;
    } else {
      console.log("Числа ", e, "и", f, " НЕ взаимно простые");
      return;
    }
  }

  return e;
}

function hash(openText, n){ //хэш
  h = 0;
  for (let i = 0; i < openText.length; i++) {
    h = (alphabet.indexOf(openText[i]) + 1 + h) ** 2 % n;
  }
  return h;
}

function encryptRSA() {
  let openText = document.getElementById("inputTextEncRSA").value.toUpperCase();
  let p = parseInt(document.getElementById("paramP").value);
  let q = parseInt(document.getElementById("paramQ").value);
  let e = parseInt(document.getElementById("paramE").value);

  const newP = isPrime(p);
  const N = p * q;
  if (!newP) {
    alert("Число P должно быть простым");
    return;
  }
  const newQ = isPrime(q);
  if (!newQ) {
    alert("Число Q должно быть простым");
    return;
  }
  const F = (p - 1) * (q - 1);
  const newE = is_coopenTextime(e, F);
  if (e <= 1 || e >= F){
    alert("Число Е должно быть больше единицы и меньше фукнции Эйлера");
    return;
  }
  if (!newE) {
    alert("Число Е должно быть взаимно простым с функцией Эйлера");
    return;
  } 

  const n = p * q;
  const f = (p - 1) * (q - 1);
  let d = 0;
  for (let i = 0; i < 1000000; i++) {
    if ((i * e) % f == 1) {
      d = i;
      break;
    }
  }
  let h = hash(openText, n);
  let s = 0;
  s = Number(BigInt(h) ** BigInt(d) % BigInt(n));
  let textareaRSA = document.getElementById("textareaRSA");
  textareaRSA.value = s;
}

function decryptRSA() {
  let openText = document.getElementById("inputTextEncRSA").value.toUpperCase();
  let s = parseInt(document.getElementById("inputTextDeRSA").value);
  let p = parseInt(document.getElementById("paramP").value);
  let q = parseInt(document.getElementById("paramQ").value);
  let e = parseInt(document.getElementById("paramE").value);
  const newP = isPrime(p); //проверки
  const N = p * q;
  if (!newP) {
    alert("Число P должно быть простым");
    return;
  }
  const newQ = isPrime(q);
  if (!newQ) {
    alert("Число Q должно быть простым");
    return;
  }
  const n = p * q; //NNNNNNNNNNNNNNNNNNNN
  const F = (p - 1) * (q - 1);
  const newE = is_coopenTextime(e, F);
  if (e <= 1 || e >= F){
    alert("Число Е должно быть больше единицы и меньше фукнции Эйлера");
    return;
  }
  if (!newE) {
    alert("Число Е должно быть взаимно простым с функцией Эйлера");
    return;
  } 
  let h = hash(openText, n); //хэширование сообщения
  const m = Number(BigInt(s) ** BigInt(e) % BigInt(n)); //находим M
  console.log("Decrypt h = ", h);
  console.log("Decrypt m = ", m);
  let textareaRSA = document.getElementById("textareaRSA");
  if (m === h) {
    textareaRSA.value = "Подпись верна: m = " + m + " h = " + h;
  } else {
    textareaRSA.value = "Подпись неверна"
  }
}
window.addEventListener("load", () => {
  document.getElementById("encryptRSA").onclick = encryptRSA;
  document.getElementById("decryptRSA").onclick = decryptRSA;
})
