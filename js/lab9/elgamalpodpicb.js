let openText = "КТОСЛИШКОМТОРОПИТСЯЗПТЗАСТРЕВАЕТПОДОРОГЕТЧК";
//let openText = "ПРИМЕРМАРШРУТНОЙПЕРЕСТАНОВКИ";
let alpha = "абвгдежзиклмнопрстуфхцчшщъыьэюя";
let alphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

function isPrime(n) {
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

function is_coprime(e, f) {
  let check = 1;
  while (check != 0) {
    if (gcd(e, f) == 1) {
      check = 0;
      //('Числа ', e, 'и', f, ' взаимно простые')
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

function cryp_elgamal(pr, p, g, x, k) {
  let y = 0;
  y = Number(BigInt(g) ** BigInt(x) % BigInt(p));
  console.log("Encrypt y = ", y);

  let m = hash(pr, p);

  console.log("Encrypt m = ", m);

  const a = Number(BigInt(g) ** BigInt(k) % BigInt(p));
  let b = 0;
  for (let i = 0; i < 100000; i++) {
    if ( m == (x * a + k * i) % (p-1) ) {
      b = i;
      break;
    }
  }
  document.getElementById("textareaEl").value = `a = ${a}, b = ${b}, y = ${y}`;
}

function dec_elgamal(pr, a, b, p, g, y) {
  
  let m = hash(pr, p);

  console.log("Decrypt m = ", m);
  const a1 = Number((BigInt(y) ** BigInt(a) * BigInt(a) ** BigInt(b)) % BigInt(p));
  const a2 = Number(BigInt(g) ** BigInt(m) % BigInt(p));
  console.log("Decrypt a1 = ", a1);
  console.log("Decrypt a2 = ", a2);
  let textareaEl = document.getElementById("textareaEl");
  if (a1 === a2) {
    textareaEl.value = "Подпись верна";
  } else {
    textareaEl.value = "Подпись ложна";
  }
}

function encryptEl(){
  let text = document.getElementById("inputTextEncEl").value.toUpperCase();
  let p = parseInt(document.getElementById("paramPEl").value);
  let g = parseInt(document.getElementById("paramG").value);
  let x = parseInt(document.getElementById("paramX").value);
  let k = parseInt(document.getElementById("paramK").value);
  const newP = isPrime(p);
  if (!newP){
    alert("Число P должно быть простым");
    return;
  }
  const newK = is_coprime(k, p - 1);
  if (x <= 1 || x > p - 1) {
    alert("Число X должно быть больше единицы и меньше или равно фукнции Эйлера от P");
    return;
  }
  if (k <= 1 || k >= p - 1){
    alert("Число K должно быть больше единицы и меньше фукнции Эйлера от P");
    return;
  }
  if (!newK){
    alert("Число K должно быть взаимно простым с функцией Эйлера от P");
    return;
  } 

  return cryp_elgamal(text, p, g, x, k);
}


const decode = () => {
  let text = document.getElementById("inputTextEncEl").value.toUpperCase();
  let p = parseInt(document.getElementById("paramPEl").value);
  let g = parseInt(document.getElementById("paramG").value);
  let y = parseInt(document.getElementById("paramY").value);

  let decryptEl = document.getElementById("inputTextDeEl").value;

  let ab = decryptEl.split(" ");
  let a = parseInt(ab[0]);
  let b = parseInt(ab[1]);
  console.log(b);


  const newP = isPrime(p);
  if (!newP) {
    alert("Число P должно быть простым");
    return;
  }
  return dec_elgamal(text, a, b, p, g, y);
};

window.addEventListener("load", () => {
  document.getElementById("encryptEl").onclick = encryptEl;
  document.getElementById("decryptEl").onclick = decode;
})
