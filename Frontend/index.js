/*----- Fetch -----*/

const url = "https://backendApiUrl/letters";

var array = [];
fetch("./dictionaries/fr.txt")
  .then((res) => res.text())
  .then((data) => {
    array = data.split(/\n|\r/g);
    array = array.filter((el) => el !== "");
  });


async function getLetters() {
  var letters;
  await fetch(url)
    .then((res) => res.json())
    .then((data) => {
      letters = data.letters;
    })
    .catch((err) => console.log("Error with GET : " + err));
  return letters;
}
/*----- Tools -----*/
function wordExist(word) {
  for (let i = 0; i < array.length; i++) {
    if (array[i] === word) { 
      return true;
    }
  }
  return false;
}

async function wordMax(letters){
  max = 0
  return new Promise( (res, err) => {
    for (let i = 0; i < array.length; i++) {
      if (array[i].length <= 12 && array[i].length > max && checkLetters(array[i], letters)){
        max = array[i].length
        if (max === 12){
          break
        }
      }
    }
    res(max)
  });
}

function checkLetters(word, letters){
  copyLetters = [...letters]
  for (let i = 0 ; i < word.length ; i++){
    if (copyLetters.includes(word[i])){
      let j = 0;
      while (copyLetters[j] !== word[i]){
        j++;
      }
      copyLetters[j] = ""
    }
    else {
      return false;
    }
  }
  return true
}


/*----- HTML & CSS -----*/

//App :
var currentWord = "";
var counterWord = 0;

const buttons = document.querySelectorAll("li button");
const submit = document.querySelector("#submit");
const erase = document.querySelector("#erase");
const clear = document.querySelector("#clear");
const message2 = document.querySelector("#message2");

const input = document.querySelector("#input");
const counter = document.querySelector("#counterLetter")
const wordScore = document.querySelector("#wordScore");
const displayScore = document.querySelector("#score");
const scoreMax = document.querySelector("#scoreMax")
const share = document.querySelector("#share");

function reinit() {
  buttons.forEach((button) => {
    button.disabled = false;
  });
  currentWord = "";
  counterWord = 0;
  input.textContent = null;
  counter.textContent = null;
  erase.disabled = true;
}

getLetters()
  .then((res) => {
    for (let i = 0; i < res.length; i++) {
      buttons[i].textContent = res[i];
    }
    wordMax(res)
    .then((resMax) => {
      scoreMax.textContent = resMax;
    })
    .catch((errMax) => console.log("Error calculing max score : " + errMax))
  })
  .catch((err) => console.log("Error passing letters in HTML : " + err));

buttons.forEach((button) => {
  button.addEventListener("click", () => {
    erase.disabled = false;
    button.disabled = true;
    currentWord += button.textContent;
    counterWord++;
    input.textContent = currentWord;
    counter.textContent = counterWord;
  });
});

submit.addEventListener("click", () => {
  message1.style.display = "none";
  message2.style.display = "none";
  if (wordExist(currentWord)) {
    if (currentWord.length >= wordScore.textContent.length) {
      wordScore.textContent = currentWord;
      displayScore.textContent = currentWord.length;
      setCookie("word", currentWord, 1);
      dateOfToday = new Date()
      setCookie("date", dateOfToday.toDateString(),1)
    } else {
      message2.style.display = "block";
    }
  } else {
    message1.style.display = "block";
  }
  reinit();
});

clear.addEventListener("click", () => {
  reinit();
});

erase.addEventListener("click", () => {
  let letter = currentWord[currentWord.length - 1];
  currentWord = currentWord.slice(0, -1);
  counterWord--;
  input.textContent = currentWord;
  counter.textContent = counterWord;
  buttons.forEach((button) => {
    if (button.disabled && button.textContent === letter) {
      button.disabled = false;
      letter = "";
    }
  });
  if (currentWord.length === 0) {
    erase.disabled = true;
  }
});
share.addEventListener("click", () => {
  var toCopy = "LONGEST : \n";
  if (wordScore.textContent.length === 0) {
    toCopy += "\n Trouve le mot le plus long d'aujourd'hui : https://longest-fr.netlify.app/";
  } else {
    toCopy += `\n ${wordScore.textContent.length} lettre(s) : `
    toCopy += wordScore.textContent[0].toUpperCase();
    for (let i = 0; i < wordScore.textContent.length - 1; i++) {
      toCopy += "🔵";
    }
    toCopy += "\n \n Viens trouver un mot plus long que moi : \n https://longest-fr.netlify.app/";
  }
  navigator.clipboard
    .writeText(toCopy)
    .then(alert("Copié !"))
    .catch((err) => "Error with copy : " + err);
});

//Rules :
const openRules = document.querySelector("#rulesButton")
const close = document.querySelector("#close");
const rules = document.querySelector("#rules #rulesText");

openRules.addEventListener("click", () => {
  rules.style.display = "block";
});

close.addEventListener("click", () => {
  rules.style.display = "none";
});

/*----- Cookies -----*/
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  let expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

function getCookie(cname) {
  let name = cname + "=";
  let decodedCookie = decodeURIComponent(document.cookie);
  let ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i++) {
    let c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}

function deleteCookie(cname) {
  document.cookie = `${cname}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
}

window.onload = () => {
  d = new Date();
  if (d.toDateString() !== getCookie("date")){
    deleteCookie("word");
    deleteCookie("date");
  }
  else{
    wordScore.textContent = getCookie("word");
    displayScore.textContent = getCookie("word").length;
  }
};
