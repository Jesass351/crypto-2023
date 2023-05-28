const alphabet = "АБВГДЕЖЗИЙКЛМНОПРСТУФХЦЧШЩЪЫЬЭЮЯ"


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

function phi(n) { //функция Эйлера
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

function fracDivided(divisibleTop, divisibleBot, p) { //дроби по модулю
  let result =
    (BigInt(p) +
      ((BigInt(divisibleTop) * BigInt(divisibleBot) ** BigInt(phi(p) - 1)) % BigInt(p))) %
    BigInt(p);

  return Number(result);
}

function dotAdding(x1, y1, x2, y2, p) { //точка + точка
  if (x1 === x2) {
    return [0, 0];
  }

  const gamma = fracDivided(y2 - y1, x2 - x1, p);
  const x3 = (p + ((gamma ** 2 - x1 - x2) % p)) % p;
  const y3 = (p + ((gamma * (x1 - x3) - y1) % p)) % p;

  return [parseInt(x3), parseInt(y3)];
}

function dotDoubler(x1, y1, p, a = 1) { //точка * 2
  if (y1 == 0) return [0, 0];

  const gamma = fracDivided(3 * x1 ** 2 + a, 2 * y1, p);
  const x3 = (p + ((gamma ** 2 - 2 * x1) % p)) % p;
  const y3 = (p + ((gamma * (x1 - x3) - y1) % p)) % p;

  return [parseInt(x3), parseInt(y3)];
}

function findQ(dotX, dotY, p) { //поиск q
  let q = 0;
  let n = 50;
  const doubleDot = dotDoubler(dotX, dotY, p);
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
  }

  return q;
}

const decodeOnClick = (event) => {
  let text = document.getElementById("inputTextEnc2012").value;
  let Ydotx = parseInt(document.getElementById("paramYx2012").value);
  let Ydoty = parseInt(document.getElementById("paramYy2012").value);
  let r = parseInt(document.getElementById("paramR2012").value);
  let s = parseInt(document.getElementById("paramS2012").value);
  let dotX = parseInt(document.getElementById("paramX2012").value);
  let dotY = parseInt(document.getElementById("paramY2012").value);
  let p = parseInt(document.getElementById("paramP2012").value);
  let a = parseInt(document.getElementById("paramA2012").value)

  if (text) text = text.toUpperCase();
  let h = hash(text, p); //хэш

  const q = findQ(dotX, dotY, p);
  let u1 = 0;
  let u2 = 0;

  let textarea2012 = document.getElementById("textarea2012");


  if (!(0 < r || s < q)) {
    textarea2012.value = "0 < r, s < q, подпись не верна"
  }//проверка на q

  if (h == 0) {
    u1 = 0;
    u2 = 0;
  } else {
    u1 = fracDivided(s, h, q);
    u2 = fracDivided(-r, h, q);
  }

  let Y = [Ydotx, Ydoty];
  let P0 = [0, 0];
  if (u1 > 1) { //нахождение P0 P0 P0 P0
    const doubleDot = dotDoubler(dotX, dotY, p, a);
    let resX = doubleDot[0];
    let resY = doubleDot[1];
    for (let i = 0; i < u1 - 2; i++) {
      let addedDot = dotAdding(resX, resY, dotX, dotY, p);
      if (!(addedDot[0] == 0 && addedDot[1] == 0)) {
        resX = addedDot[0];
        resY = addedDot[1];
      } else {
        break;
      }
    }
    P0 = [resX, resY];
  } else if (u1 == 0) {
    P0 = [0, 0];
  } else {
    P0 = [dotX, dotY];
  }

  let P1 = [0, 0];
  if (u2 > 1) { //нахождение P1 P1 P1 P1
    const doubleDot = dotDoubler(Y[0], Y[1], p, a);
    let resX = doubleDot[0];
    let resY = doubleDot[1];
    for (let i = 0; i < u2 - 2; i++) {
      let addedDot = dotAdding(resX, resY, Y[0], Y[1], p);
      if (!(addedDot[0] == 0 && addedDot[1] == 0)) {
        resX = addedDot[0];
        resY = addedDot[1];
      } else {
        break;
      }
    }
    P1 = [resX, resY];
  } else if (u2 == 0) {
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


  if (P0[0] == P1[0]) { //нахождение PPPPPPPPPPPPPPPPPPPPPPPPPPPPP
    if (P0[1] == P1[1]) {
      P = dotDoubler(P0[0], P0[1], p, a);
    } else {
      textarea2012.value = "P = 0, Подпись не верна";
      return;
    }
  } else {
    P = dotAdding(P0[0], P0[1], P1[0], P1[1], p);
  }

  console.log(`P = ${P}`);
  if (P[0] % q == r) {
    textarea2012.value = "Подпись верна";
    return;
  } else {
    textarea2012.value = "Подпись не верна";
    return;
  }
};

const encodeOnClick = (event) => {

  let text = document.getElementById("inputTextEnc2012").value;
  let p = parseInt(document.getElementById("paramP2012").value);
  let a = parseInt(document.getElementById("paramA2012").value);
  let x = parseInt(document.getElementById("paramX12012").value);
  let dotX = parseInt(document.getElementById("paramX2012").value);
  let dotY = parseInt(document.getElementById("paramY2012").value);
  let k = parseInt(document.getElementById("paramK2012").value);


  if (text) text = text.toUpperCase();
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
  let h = hash(text, p); //вычисление хэша

  console.log(h);
  const q = findQ(dotX, dotY, p); //qqqqqqqqqqqqqq
  console.log(`q = ${q}`);

  let r = 0;
  let s = 0;

  let Y = [0, 0];
  if (x > 1) { //вычисление Y
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
  while (r == 0 || s == 0) { //вычисление r и s
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
    r = P[0] % q; //rrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrrr
    if (r==0){
      alert("r = 0, введите другое K");
      return;
    }
    s = (paramK * h + r * x) % q; //ssssssssssssssssssssssssssssssssssssss
    if (s==0){
      alert("s = 0, введите другое K");
      return;
    }
  }
  document.getElementById("textarea2012").value = `r = ${r}, s = ${s} Y = (${Y})`;
}


function hash(openText, n){ //хэш
  h = 0;
  for (let i = 0; i < openText.length; i++) {
    h = (alphabet.indexOf(openText[i]) + 1 + h) ** 2 % n;
  }
  return h;
}

window.onload = () => {
  document.querySelector("#encrypt2012").onclick = encodeOnClick;
  document.querySelector("#decrypt2012").onclick = decodeOnClick;
};
