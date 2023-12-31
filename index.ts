// import readline from "readline-sync";

// console.log("Alfabeyi giriniz : ");
// const alphabet = readline
//   .question()
//   .split(",")
//   .map((x) => x.trim());

// console.log("CFG'yi giriniz : ");
// const cfg = readline
//   .question()
//   .split(",")
//   .map((x) => x.trim());

// const mainCFG = cfg[0]
//   .split("- - >")[1]
//   .split("|")
//   .map((x) => x.trim());
// const rules: { [key: string]: Array<string> } = {};

// for (let i = 1; i < cfg.length; i++) {
//   const parts = cfg[i].split("- - >").map((x) => x.trim());
//   const letter = parts[0];
//   const possibilites = parts[1].split("|");

//   rules[letter] = possibilites;
// }

const alphabet = ["a", "b", "X"];
const mainCFG = ["aaY", "bX", "aXXY"];
const rules = { X: ["ab", "b"], Y: ["bb", "ba"] };

let result: string[] = [];

// her kelime icin for don
for (let i = 0; i < mainCFG.length; i++) {
  let word = mainCFG[i];

  // Kelimedeki kurali olan ilk harfi bul ve kuraldaki tum ihtimalleri kelimeye uygula, sonucu dizi olarak cevir
  function proccessWord(word: string) {
    let _words: string[] = [word];
    const _word = word.split("");

    for (let j = 0; j < _word.length; j++) {
      const letter = word[j];

      if (letter in rules) {
        const rule = (rules as any)[letter];
        // kuraldaki her ihtimal icin for don
        rule.forEach((x: string) => {
          // degistir ve kelimelere ekle
          _words.push(_word.join("").replace(letter, x));
        });

        // ilk kelimeyi sil ki tekrar islemesin
        _words.shift();
        // sadece kurala uyan ilk harfi isleyip donguyu kir
        break;
      }
    }

    // sonucu dondur
    return _words;
  }

  // Kelimeyi baslangic icin 1 kere isle
  let _words = proccessWord(word);
  while (true) {
    let breakIt = true;

    // Kelimeyi kurala uyan harf kalmayana kadar isle
    for (let j = 0; j < _words.length; j++) {
      const word = _words[j];

      // Eger kurala uyan bir harf varsa islemi devam ettir
      const ruleLetter = word.split("").find((x) => x in rules);
      if (ruleLetter) {
        // Dongunun kirilmasini engelle
        breakIt = false;
        const __words = proccessWord(word);
        _words = [..._words, ...__words].filter((x) => x !== word);
      }
    }

    // Hicbir harf kalmadiysa donguyu kir
    if (breakIt) break;
  }

  console.log(`${word} Icin Sonuc : `);
  console.log(_words);
  console.log("");
  result.push(..._words);
}

result = [...new Set(result)];
console.log("Unique Sonuc : ");
console.log(result);
