let openText = "КТОСЛИШКОМТОРОПИТСЯЗПТЗАСТРЕВАЕТПОДОРОГЕТЧК";
//let openText = "ПРИМЕРМАРШРУТНОЙПЕРЕСТАНОВКИ";
let alpha = "абвгдежзиклмнопрстуфхцчшщъыьэюя";
//let bigalpha = "АБВГДЕЁЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";
let bigalpha = "АБВГДЕЖЗИКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ";

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

function generateKBtn(paramQ) {
  //let paramK = document.getElementById("paramK");
  //let paramQ = parseInt(document.getElementById("paramQ").value);
  //let openText = document.getElementById("inputTextEnc94").value.toUpperCase();

  // openText = openText.replaceAll(" ", "ПРБ");

  // openText = openText.replaceAll(".", "ТЧК");

  // openText = openText.replaceAll(",", "ЗПТ");

  // openText = openText.replaceAll(";", "ЭКСТРА1");

  // openText = openText.replaceAll(":", "ЭКСТРА2");

  // openText = openText.replaceAll("-", "ТИРЕ");

  // openText = openText.replaceAll("?", "ВОПРС");

  // openText = openText.replaceAll("!", "ВОСКЛ");

  // openText = openText.replaceAll("«", "ЕЛЛ");

  // openText = openText.replaceAll("»", "ЕЛП");

  let temp = generateRandom(0, paramQ);
  while (temp > paramQ) {
    temp = generateRandom(0, paramQ);
  }
  return temp;
}

function phi(n) {
  let result = n;
  for (let i = 2; i * i <= n; ++i)
    if (n % i == 0) {
      while (n % i == 0) {
        n /= i;
      }
      result -= result / i;
    }
  if (n > 1) {
    result -= result / n;
  }
  return result;
}

function fracDivided(divisibleTop, divisibleBot, p) {
  // let result = new Fraction(divisibleTop, divisibleBot);
  //  result = 0;
  //let result = Math.mod(divisibleTop * divisibleBot ** (phi(p) - 1), p);
  let result =
    (BigInt(p) +
      ((BigInt(divisibleTop) * BigInt(divisibleBot) ** BigInt(phi(p) - 1)) % BigInt(p))) %
    BigInt(p);
  //let result = (BigInt(divisibleTop) * BigInt(divisibleBot) ** BigInt(phi(p) - 1)) % BigInt(p);
  //console.log(result);
  //console.log("AAA = ", result);

  return Number(result);
}

function dotAdding(x1, y1, x2, y2, p) {
  if (x1 === x2) {
    return [0, 0];
  }

  const gamma = fracDivided(y2 - y1, x2 - x1, p);
  const x3 = (p + ((gamma ** 2 - x1 - x2) % p)) % p;
  const y3 = (p + ((gamma * (x1 - x3) - y1) % p)) % p;

  return [parseInt(x3), parseInt(y3)];
}

function dotDoubler(x1, y1, p, a = 1) {
  if (y1 == 0) return [0, 0];

  const gamma = fracDivided(3 * x1 ** 2 + a, 2 * y1, p);
  const x3 = (p + ((gamma ** 2 - 2 * x1) % p)) % p;
  const y3 = (p + ((gamma * (x1 - x3) - y1) % p)) % p;

  return [parseInt(x3), parseInt(y3)];
}

function findQ(dotX, dotY, p) {
  let q = 0;
  let n = 50;
  const doubleDot = dotDoubler(dotX, dotY, p);
  //console.log(doubleDot);
  const doublX = doubleDot[0];
  const doublY = doubleDot[1];
  let tempX = doublX;
  let tempY = doublY;
  for (let i = 2; i < n; i++) {
    if (
      dotAdding(tempX, tempY, dotX, dotY, p)[0] === 0 &&
      dotAdding(tempX, tempY, dotX, dotY, p)[1] === 0
    ) {
      q = i + 1;
      break;
    }
    const addedDot = dotAdding(tempX, tempY, dotX, dotY, p);
    if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
      let resX = addedDot[0];
      let resY = addedDot[1];
      tempX = resX;
      tempY = resY;
    } else {
      break;
    }
    // const addedDot = dotAdding(tempX, tempY, dotX, dotY, p);
    // const resX = addedDot[0];
    // const resY = addedDot[1];
    // tempX = resX;
    // tempY = resY;
  }

  return q;
}
console.log(encrypt12("ВИКА", 11, 4, 5, 10, 3, 4, 7));
//console.log(encrypt12("БАБА", 11, 1, 5, 3, 8, 2));

function encrypt12(openText, p, a, x, dotX, dotY, k = 0, q1 = 0) {
  let h = 0;
  for (char of openText) {
    h = (bigalpha.indexOf(char) + 1 + h) ** 2 % p;
  }

  console.log(h);

  //const q = findQ(dotX, dotY, p);
  const q = q1 > 0 ? q1 : findQ(dotX, dotY, p);
  console.log(`q = ${q}`);

  let r = 0;
  let s = 0;

  let Y = [0, 0];
  if (x > 1) {
    const doubleDot = dotDoubler(dotX, dotY, p, a);
    let resX = doubleDot[0];
    let resY = doubleDot[1];
    for (let i = 0; i < x - 2; i++) {
      const addedDot = dotAdding(resX, resY, dotX, dotY, p);
      if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
        resX = addedDot[0];
        resY = addedDot[1];
      } else {
        break;
      }
    }
    Y = [resX, resY];
  } else {
    Y = [dotX, dotY];
  }
  console.log(`Y = ${Y}`);
  // r = P[0] % q;
  // s = (paramK * h + r * x) % q;

  while (r == 0 || s == 0) {
    //const paramK = generateKBtn(q);
    const paramK = k;
    let P = [0, 0];
    if (paramK > 1) {
      const doubleDot = dotDoubler(dotX, dotY, p, a);
      let resX = doubleDot[0];
      let resY = doubleDot[1];
      for (let i = 0; i < paramK - 2; i++) {
        const addedDot = dotAdding(resX, resY, dotX, dotY, p);
        if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
          resX = addedDot[0];
          resY = addedDot[1];
        } else {
          break;
        }
      }
      P = [resX, resY];
    } else {
      P = [dotX, dotY];
    }
    console.log(`P = ${P}`);
    r = P[0] % q;
    s = (paramK * h + r * x) % q;
  }
  return `r = ${r}, s = ${s} Y = (${Y})`;
}

function decrypt12(openText, p, x, a, dotX, dotY, r, s, Ydotx, Ydoty, q1 = 0) {
  let h = 0;
  for (char of openText) {
    h = (bigalpha.indexOf(char) + 1 + h) ** 2 % p;
  }

  const q = q1 > 0 ? q1 : findQ(dotX, dotY, p);
  //const q = 4;
  let u1 = 0;
  let u2 = 0;

  if (!(0 < r || s < q)) console.log("0 < r, s < q, подпись не верна");

  if (h == 0) {
    u1 = 0;
    u2 = 0;
  } else {
    u1 = (q + (fracDivided(s, h, q) % q)) % q;
    u2 = (q + (fracDivided(-r, h, q) % q)) % q;
  }

  let Y = [Ydotx, Ydoty];

  // let Y = [0, 0];
  // if (x > 1) {
  //   const doubleDot = dotDoubler(dotX, dotY, p, a);
  //   let resX = doubleDot[0];
  //   let resY = doubleDot[1];
  //   for (let i = 0; i < x - 2; i++) {
  //     const addedDot = dotAdding(resX, resY, dotX, dotY, p);
  //     if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
  //       resX = addedDot[0];
  //       resY = addedDot[1];
  //     } else {
  //       break;
  //     }
  //   }
  //   Y = [resX, resY];
  // } else {
  //   Y = [dotX, dotY];
  // }

  let P0 = [0, 0];
  if (u1 > 1) {
    const doubleDot = dotDoubler(dotX, dotY, p, a);
    let resX = doubleDot[0];
    let resY = doubleDot[1];
    for (let i = 0; i < u1 - 2; i++) {
      const addedDot = dotAdding(resX, resY, dotX, dotY, p);
      if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
        resX = addedDot[0];
        resY = addedDot[1];
      } else {
        break;
      }
    }
    P0 = [resX, resY];
  } else if (u1 === 0) {
    P0 = [0, 0];
  } else {
    P0 = [dotX, dotY];
  }

  let P1 = [0, 0];
  if (u2 > 1) {
    const doubleDot = dotDoubler(Y[0], Y[1], p, a);
    let resX = doubleDot[0];
    let resY = doubleDot[1];
    for (let i = 0; i < u2 - 2; i++) {
      const addedDot = dotAdding(resX, resY, Y[0], Y[1], p);
      if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
        resX = addedDot[0];
        resY = addedDot[1];
      } else {
        break;
      }
    }
    P1 = [resX, resY];
  } else if (u2 === 0) {
    P1 = [0, 0];
  } else {
    P1 = [Y[0], Y[1]];
  }

  let P = [0, 0];
  console.log(`h = ${h}, q = ${q}`);
  console.log(`u1 = ${u1}, u2 = ${u2}`);
  console.log(`P0 = ${P0}`);
  console.log(`P1 = ${P1}`);
  console.log(`Y = ${Y}`);

  if (P0[0] == P1[0]) {
    if (P0[1] == P1[1]) {
      P = dotDoubler(P0[0], P0[1], p, a);
    } else {
      return "P = 0, Подпись не верна";
    }
  } else {
    P = dotAdding(P0[0], P0[1], P1[0], P1[1], p);
  }

  console.log(`P = ${P}`);
  if (P[0] % q == r) {
    return "Подпись верна";
  } else {
    return "Подпись не верна";
  }
}

//console.log(encrypt12(openText, 11, 4, 5, 10, 3, 3, 7));
//console.log(decrypt12(openText, 11, 5, 4, 10, 3, 5, 6, 0, 6, 7));
//console.log(decrypt12("БАБА", 11, 5, 1, 3, 8, 6, 5, 6, 5));

console.log(decrypt12("ВИКА", 11, 5, 4, 10, 3, 5, 2, 0, 6, 7));

const decodeOnClick = (event) => {
  let text = document.querySelector(".inputArea").value;
  let key1 = document.querySelector("#option1").value;
  let key2 = document.querySelector("#option2").value;
  let key3 = document.querySelector("#option3").value;
  let key4 = document.querySelector("#option4").value;
  let key5 = document.querySelector("#option5").value;
  let key7 = document.querySelector("#option7").value;
  let key8 = document.querySelector("#option8").value;
  let key9 = document.querySelector("#option9").value;
  let key10 = document.querySelector("#option10").value;
  let key11 = document.querySelector("#option11").value;

  if (text) text = text.toUpperCase();
  //let shift = document.querySelector("#option1").value;
  //if (!shift) shift = 3;
  const answer = decrypt12(
    text,
    parseInt(key1),
    parseInt(key3),
    parseInt(key2),
    parseInt(key4),
    parseInt(key5),
    parseInt(key8),
    parseInt(key9),
    parseInt(key10),
    parseInt(key11),
    parseInt(key7),
  );
  //let answer = elgamal(text, parseInt(key1), parseInt(key2), parseInt(key3), "decode", key4);
  document.querySelector(".answer").value = answer;
};

const encodeOnClick = (event) => {
  let text = document.querySelector(".inputArea").value;
  let key1 = document.querySelector("#option1").value;
  let key2 = document.querySelector("#option2").value;
  let key3 = document.querySelector("#option3").value;
  let key4 = document.querySelector("#option4").value;
  let key5 = document.querySelector("#option5").value;
  let key6 = document.querySelector("#option6").value;
  let key7 = document.querySelector("#option7").value;

  if (text) text = text.toUpperCase();
  //let shift = document.querySelector("#option1").value;
  //if (!shift) shift = 3;
  const answer = encrypt12(
    text,
    parseInt(key1),
    parseInt(key2),
    parseInt(key3),
    parseInt(key4),
    parseInt(key5),
    parseInt(key6),
    parseInt(key7),
  );
  //let answer = elgamal(text, parseInt(key1), parseInt(key2), parseInt(key3), "encode");
  document.querySelector(".answer").value = answer;
};

window.onload = () => {
  document.querySelector(".decode").onclick = decodeOnClick;
  document.querySelector(".encode").onclick = encodeOnClick;
};
