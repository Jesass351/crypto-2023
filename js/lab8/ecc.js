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

function fracDivided(divisibleTop, divisibleBot, p) { //дроби по модулю (ужасно)
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

function findQ(dotX, dotY, p) {
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
    const resX = addedDot[0];
    const resY = addedDot[1];
    tempX = resX;
    tempY = resY;
  }

  return q;
}

function encode(text, p = 41, a = 1, dotX, dotY, paramC) {
  let q = findQ(dotX, dotY, p); //нахождение q для проверки K
  let resr = [0, 0];
  let resd = [0, 0];
  let resp = [0, 0];
  console.log(q);

  let paramK = [];
  let result = [];
  for (let i = 0; i < text.length; i++) { //формирование K
    paramK.push(4);
  }

  for (let j = 0; j < paramK.length; j++) {
    let R = [0, 0]; //нахождение R
    if (paramK[j] > 1) {
      const doubleDot = dotDoubler(dotX, dotY, p, a);
      let resX = doubleDot[0];
      let resY = doubleDot[1];
      for (let i = 0; i < paramK[j] - 2; i++) {
        const addedDot = dotAdding(resX, resY, dotX, dotY, p);
        if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
          resX = addedDot[0];
          resY = addedDot[1];
        } else {
          break;
        }
      }
      R = [resX, resY];
    } else {
      R = [dotX, dotY];
    }

    let D = [0, 0]; //нахождение D
    if (paramC > 1) {
      const doubleDot = dotDoubler(dotX, dotY, p, a);
      console.log(doubleDot);
      let resX = doubleDot[0];
      let resY = doubleDot[1];
      for (let i = 0; i < paramC - 2; i++) {
        const addedDot = dotAdding(resX, resY, dotX, dotY, p);
        console.log(addedDot);
        if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
          resX = addedDot[0];
          resY = addedDot[1];
        } else {
          break;
        }
      }
      D = [resX, resY];
    } else {
      D = [dotX, dotY];
    }

    let P = [0, 0]; //нахождение P
    if (paramK[j] > 1) {
      const doubleDot = dotDoubler(D[0], D[1], p, a);
      let resX = doubleDot[0];
      let resY = doubleDot[1];
      for (let i = 0; i < paramK[j] - 2; i++) {
        const addedDot = dotAdding(resX, resY, D[0], D[1], p);
        if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
          resX = addedDot[0];
          resY = addedDot[1];
        } else {
          break;
        }
      }
      P = [resX, resY];
    } else {
      P = [D[0], D[1]];
    }
    resr = R;
    resd = D;
    resp = P;
    console.log("R = ", R);
    console.log("D = ", D);
    console.log("P = ", P);

    const alphaNumber = alphabet.indexOf(text[j]);
    const e = (alphaNumber * P[0]) % p; //вычисление е
    result.push([R, e]);
  }
  let cypherText = "";
  for (let res of result) {
    cypherText += String(res[1]) + " ";
  }
  return [`R = ${resr}`, `Зашифрованный текст: ${cypherText}`];
}

function decode(text, p, a, paramC, dotRx, dotRy) {
  const arrE = text.split(" ");
  let crypted_array = [];
  for (let i = 0; i < arrE.length; i++) {
    let R = [dotRx, dotRy];
    const e = parseInt(arrE[i]);
    crypted_array.push([R, e]);
  }
  let result = "";
  let resQ = [0, 0];
  console.log(crypted_array);
  for (let j = 0; j < arrE.length; j++) {
    let Q = [0, 0];
    if (paramC > 1) { //нахождение Q
      const doubleDot = dotDoubler(crypted_array[j][0][0], crypted_array[j][0][1], p, a);
      let resultX = doubleDot[0];
      let resultY = doubleDot[1];
      for (let i = 0; i < paramC - 2; i++) {
        const addedDot = dotAdding(
          resultX,
          resultY,
          crypted_array[j][0][0],
          crypted_array[j][0][1],
          p,
        );
        if (!(addedDot[0] === 0 && addedDot[1] === 0)) {
          resultX = addedDot[0];
          resultY = addedDot[1];
        } else {
          break;
        }
      }
      Q = [resultX, resultY];
    } else {
      Q = [crypted_array[j][0][0], crypted_array[j][0][1]];
    }
    resQ = Q;
    result += alphabet[fracDivided(crypted_array[j][1], Q[0], p) % p]; //(e * x ** -1 mod p)
  }
  console.log(`Q = ${resQ}`);
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
  return result;
}

const decodeOnClick = (event) => {
  let text = document.getElementById("inputTextDeECC").value;
  let key1 = document.getElementById("paramPEcc").value;
  let key2 = document.getElementById("paramAEcc").value;
  let key5 = document.getElementById("paramCEcc").value;
  let key6 = document.getElementById("paramXREcc").value;
  let key7 = document.getElementById("paramYREcc").value;

  if (text) text = text.toUpperCase();

  const answer = decode(
    text,
    parseInt(key1),
    parseInt(key2),
    parseInt(key5),
    parseInt(key6),
    parseInt(key7),
  );
  document.getElementById("textareaECC").value = answer;
};

const encodeOnClick = (event) => {
  let text = document.getElementById("inputTextEncECC").value;
  let key1 = document.getElementById("paramPEcc").value;
  let key2 = document.getElementById("paramAEcc").value;
  let key3 = document.getElementById("paramXEcc").value;
  let key4 = document.getElementById("paramYEcc").value;
  let key5 = document.getElementById("paramCEcc").value;

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
  const answer = encode( //вызываем функцию шифрования
    text,
    parseInt(key1),
    parseInt(key2),
    parseInt(key3),
    parseInt(key4),
    parseInt(key5),
  );
  document.getElementById("textareaECC").value = answer.join("; ");
};

window.onload = () => {
  document.getElementById("decryptECC").onclick = decodeOnClick;
  document.getElementById("encryptECC").onclick = encodeOnClick;
};
