// 金額から硬貨の枚数を求める
function howManyCoins(wallet, N, value) {
  let c = new Array(N).fill(0);

  for (let i = 0; i < N; i++) {
    let num = Math.floor(wallet / value[i]);

    if (num < 0) {
      num = 0;
    }

    c[i] = num;
    wallet -= num * value[i];
  }

  return c;
}

// 支払いを最適化
function optimizePayment(wallet, total, value) {
  let t = total.toString();
  t = "0" + t;
  t = t.split("").map(Number);
  let n = t.length;
  let w = wallet.toString();
  w = w.split("").map(Number);
  pay = 0;
  let j = 0;
  for (let i = n - 1; i >= 0; i--) {
    mul = 10 ** j;
    if (w[i] >= t[i]) {
      // 手持ちの金額のi桁目が支払額のi桁目以上ある場合素直に支払う
      pay += Number(t[i]) * mul;
    } else {
      // ↑ができない場合、5*(i桁目)円のお釣りを貰うことを考える
      let diff = (Number(t[i]) - 5 + 10) % 10;
      if (w[i] >= diff) {
        // 5*(i桁目)円のお釣りを貰えそうなら支払う
        pay += diff * mul;
      } else {
        // 5*(i桁目)円のお釣りを貰えないならi桁目においては払わない
        pay += 0;
      }
      // 繰り上げを計算
      t[i - 1]++;
    }
    j++;
  }
  //   return wallet;
  return pay;
}

// 各硬貨の枚数を出力
function eachCoins(coins, value) {
  console.log("breakdown");
  for (let i = 0; i < coins.length; i++) {
    console.log(`${value[i]}: ${coins[i]}`);
  }
}

let wallet = 0;
let coins = new Array(6).fill(0);
const value = [500, 100, 50, 10, 5, 1];
const N = coins.length;

let total = Math.floor(Math.random() * 499) + 501;
console.log(`total is ${total} yen`);

for (let i = 0; i < coins.length; i++) {
  if (i === 0) {
    coins[i] = 2;
  } else {
    coins[i] = Math.floor(Math.random() * 5);
  }
  wallet += coins[i] * value[i];
}

console.log(`you have ${wallet} yen`);

eachCoins(coins, value);

// // お釣りのことを考えないできりのいい金額を雑に払う
// let bwallet = 0;
// let bcoins = [];
// [bwallet, bcoins, change] = zatsupay(wallet, total, coins, N, value);
// console.log(
//   `change is ${change} yen when you pay 1000 yen & have ${
//     change + bwallet
//   } yen in wallet`
// );
// eachCoins(bcoins, value);

// let before = bcoins.reduce((a, b) => a + b, 0);

// console.log(`& this is ${before} coins in sum`);

console.log("-------------------------");

change = wallet - total;
console.log(`change is ${change} yen when you pay all money you have`);

coins = howManyCoins(change, N, value);

eachCoins(coins, value);

let after = coins.reduce((a, b) => a + b, 0);

console.log(`& this is ${after} coins in sum`);

// console.log();
// if (after < before) {
//   console.log("now you have less coins than before pay!!");
// } else if (after === before) {
//   console.log("you have same num coins");
// } else {
//   console.log("why...?");
// }

console.log("-------------------------");

// お釣りと支払いが最小になるように最適化
payment = optimizePayment(wallet, total, value);
console.log(`payment is ${payment} yen after optimized`);

// 最適化されたお釣りをもらう
change = payment - total;

console.log(`optimized change is ${change} yen`);

// おつりの硬貨の枚数を求める
let ccoin = howManyCoins(change, N, value);
let optimized = ccoin.reduce((a, b) => a + b, 0);

eachCoins(ccoin, value);

console.log(`& this is ${optimized} coins in sum`);

// お釣りをもらう直前の財布の中身を求める
let remnant = wallet - payment;
console.log(
  `now you have ${remnant} yen in wallet before get optimized change`
);

// 財布の中に残った小銭の内訳を求める
let rcoin = howManyCoins(remnant, N, value);

eachCoins(rcoin, value);

// 最終的に財布の中にある合計金額
wallet = remnant + change;
// 最終的に財布の中にある小銭の枚数を求める
for (let i = 0; i < rcoin.length; i++) {
  coins[i] = rcoin[i] + ccoin[i];
}

console.log(`you have ${wallet} yen at last`);

eachCoins(coins, value);

// 最終的に財布に残った硬貨の枚数の合計を求める
let last = coins.reduce((a, b) => a + b, 0);

console.log(`& this is ${last} coins in sum`);

console.log();

if (last < after) {
  console.log("optimized change less than all pay");
} else if (last == after) {
  console.log("same");
} else {
  console.log("why...?");
}
