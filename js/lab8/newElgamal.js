let openText = "КТОСЛИШКОМТОРОПИТСЯЗПТЗАСТРЕВАЕТПОДОРОГЕТЧК";
//let openText = "ПРИМЕРМАРШРУТНОЙПЕРЕСТАНОВКИ";
let alpha = "абвгдежзиклмнопрстуфхцчшщъыьэюя";
let bigalpha = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

function gcd(a, b) {
  if (!b) {
    return a;
  }
  return gcd(b, a % b);
}

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

function generateK(openText, f) {
  let k = "";
  let temp = 0;

  for (let i = 0; i < openText.length; i++) {
    temp = generateRandom(0, f);
    while (gcd(temp, f) != 1) {
      temp = generateRandom(0, f);
      //console.log(temp + " " + f + "--" + gcd(temp, f) + "-gcd");
    }
    k += temp + " ";
    //console.log(k + "-123422131");
    //console.log(k);
  }

  k = k.substring(0, k.length - 1);

  return k;
}

const encode = (openText, p, x, g) => {
  const y = Number(BigInt(g) ** BigInt(x) % BigInt(p));
  console.log("y = ", y);
  let res = "";
  const f = p - 1;
  const kArr = generateK(openText, f).split(" ");
  //const kArr = [3, 5, 7];
  console.log(kArr);
  for (let i = 0; i < openText.length; i++) {
    const k = parseInt(kArr[i]);
    //const k = kArr[i % 3];
    const a = String(Number(BigInt(g) ** BigInt(k) % BigInt(p)));
    const b = String(
      Number((BigInt(y) ** BigInt(k) * BigInt(bigalpha.indexOf(openText[i]))) % BigInt(p)),
    );
    res += a + "," + b + " ";
    //console.log(res);
  }
  return res;
};

const decode = (text, p, g, y, x) => {
  const cypherText = text.split(" ");
  let res = "";
  for (let i = 0; i < cypherText.length; i++) {
    const abText = cypherText[i].split(",");
    let a = abText[0];
    let b = abText[1];
    for (let j = 0; j < bigalpha.length; j++) {
      //console.log(((a ** x * i) % p) + " " + (b % p));
      if ((a ** x * j) % p === b % p) {
        res += bigalpha[j];
      }
    }
  }
  return res;
};

const elgamal = (openText, p, x, g, action, y = 31) => {
  if (p < 33) return "Число Р должно быть больше 33";
  if (!isPrime(p)) return "Число P должно быть простым";
  if (x <= 1 || x >= p) "Число X должно быть 1 < X < p";
  if (g <= 1 || g >= p) "Число G должно быть 1 < G < p";

  if (action === "encode") {
    return encode(openText, p, x, g);
  } else {
    return decode(openText, p, g, y, x);
  }
};

console.log(elgamal(openText, 47, 3, 5, "encode"));
console.log(
  elgamal(
    "20,16 29,18 39,28 15,26 40,20 26,29 44,30 41,21 26,17 45,37 5,25 44,18 44,11 20,9 43,10 43,35 15,17 15,26 43,20 10,10 10,20 15,17 19,23 38,0 38,38 15,17 20,29 13,34 10,26 40,0 39,25 5,25 13,43 29,34 35,44 26,17 11,20 30,1 13,11 43,9 40,16 11,31 26,25",
    47,
    3,
    5,
    "decode",
  ),
);

const decodeOnClick = (event) => {
  let text = document.querySelector(".inputArea").value;
  let key1 = document.querySelector("#option1").value;
  let key2 = document.querySelector("#option2").value;
  let key3 = document.querySelector("#option3").value;
  let key4 = document.querySelector("#option4").value;

  if (text) text = text.toUpperCase();
  //let shift = document.querySelector("#option1").value;
  //if (!shift) shift = 3;
  let answer = elgamal(text, parseInt(key1), parseInt(key2), parseInt(key3), "decode", key4);
  document.querySelector(".answer").value = answer;
};

const encodeOnClick = (event) => {
  let text = document.querySelector(".inputArea").value;
  let key1 = document.querySelector("#option1").value;
  let key2 = document.querySelector("#option2").value;
  let key3 = document.querySelector("#option3").value;
  if (text) text = text.toUpperCase();
  //let shift = document.querySelector("#option1").value;
  //if (!shift) shift = 3;
  let answer = elgamal(text, parseInt(key1), parseInt(key2), parseInt(key3), "encode");
  document.querySelector(".answer").value = answer;
};

window.onload = () => {
  document.querySelector(".decode").onclick = decodeOnClick;
  document.querySelector(".encode").onclick = encodeOnClick;
};
