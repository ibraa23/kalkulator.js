const readline = require("readline-sync");

let ulangi = true;
let hasilSebelumnya = null;
const riwayat = [];

while (ulangi) {
  let angkaPertama;
  
  if (hasilSebelumnya !== null) {
    const gunakanHasil = readline.question(
      `Apakah Anda ingin menggunakan hasil sebelumnya (${hasilSebelumnya})? (y/n) `
    );
    if (gunakanHasil === "y") {
      angkaPertama = hasilSebelumnya;
    } else {
      angkaPertama = parseFloat(readline.question("Masukkan Angka Pertama : "));
    }
  } else {
    angkaPertama = parseFloat(readline.question("Masukkan Angka Pertama : "));
  }

  const operator = readline.question("Pilih operator (+, -, *, /, %) : ");
  const angkaKedua = parseFloat(readline.question("Masukkan Angka Kedua : "));

  const requiredOperator = ["+", "-", "*", "/", "%"];

  if (isNaN(angkaPertama) || isNaN(angkaKedua)) {
    console.log("Inputan anda tidak valid");
  } else if (!requiredOperator.includes(operator)) {
    console.log("Pilih sesuai operator yang tersedia");
  } else {
    const hasil = processHasil(angkaPertama, operator, angkaKedua);
    if (hasil !== null) {
      console.log(`Hasil: ${hasil}`);
      hasilSebelumnya = hasil;
      riwayat.push(`${angkaPertama} ${operator} ${angkaKedua} = ${hasil}`);
    }
  }

  const ulang = readline.question("Apakah ingin mengulang? (y/n) ");
  if (ulang === "n") {
    ulangi = false;
  }
  
  // Menampilkan riwayat kalkulasi
  if (riwayat.length > 0) {
    console.log("Riwayat Kalkulasi:");
    riwayat.forEach((entry, index) => {
      console.log(`${index + 1}: ${entry}`);
    });
  }
}

function processHasil(angkaPertama, operator, angkaKedua) {
  switch (operator) {
    case "+":
      return angkaPertama + angkaKedua;
    case "-":
      return angkaPertama - angkaKedua;
    case "*":
      return angkaPertama * angkaKedua;
    case "/":
      if (angkaKedua === 0) {
        console.log("Kesalahan: Angka kedua tidak boleh bernilai 0");
        return null;
      }
      return angkaPertama / angkaKedua;
    case "%":
      return angkaPertama % angkaKedua;
    default:
      return null;
  }
}
