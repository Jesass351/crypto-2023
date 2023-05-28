function isPrime(n) { //простое число или нет
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

const diffi = (n, a, x, y) => { //основная функция
  if (!isPrime(n)){ //ПРОВЕРКИ 
    alert("Число N должно быть простым");
    return ;
  }
  if (a <= 1 || a >= n) {
    alert("Число А должно быть 1 < a < n");
    return;
  }
  if (n <= 2){
alert("Число N должно быть больше A");
return;
  } ;
  if (x < 2 || x > n - 1) {
    alert("Число X 1 пользователя должно быть 1 < X < n");
    return;
  }
  if (y < 2 || y > n - 1) {
    alert("Число Y 2 пользователя должно быть 1 < Y < n");
    return ;
  }

  const Yx = Number(BigInt(a) ** BigInt(x) % BigInt(n)); //нахождение открытых ключей
  const Yy = Number(BigInt(a) ** BigInt(y) % BigInt(n));

  if (Yx === 1){
    alert("Ключ 1 пользователя не должен равняться 1");
    return ;
  } 
  if (Yy === 1) {
    alert("Ключ 2 пользователя не должен равняться 1");
    return ;
  } 
  console.log("Ключ 2 пользователя = ", Yy);

  const Kx = Number(BigInt(Yy) ** BigInt(x) % BigInt(n)); //нахождение закрытых ключей
  const Ky = Number(BigInt(Yx) ** BigInt(y) % BigInt(n));

  if (Kx === 1 || Ky === 1){
    alert("Секретный ключ не должен быть равен 1, введите новые значения");
    return;
  }

  console.log("Секретный ключ 1 пользователя = ", Kx);
  console.log("Секретный ключ 2 пользователя = ", Ky);
  let textarea94 = document.getElementById("textarea94");
  if (Kx === Ky){ //сравнение и вывод
    textarea94.value = "Задача решена верно\n" + `Ключ 1 пользователя =  ${Yx}; Ключ 2 пользователя =  ${Yy} \n`;
    textarea94.value += "Секретный ключ 1 пользователя = " + Kx + "; Секретный ключ 2 пользователя = " + Ky;

  } 
};

function encrypt94(){
  let a = parseInt(document.getElementById("paramA").value);
  let n = parseInt(document.getElementById("paramN").value);
  let x = parseInt(document.getElementById("paramX").value);
  let y = parseInt(document.getElementById("paramY").value);
diffi(n, a, x, y);
}

window.addEventListener("load", () => {
  document.getElementById("encrypt94").onclick = encrypt94;
})
