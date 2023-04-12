import { myWords, ImyWords } from "./myWords";
import { globalStatus, IEngArray } from "./globalConst";
import { writeResult, deleteResult } from "./resultMessage";

const random = (arr: Array<ImyWords>) => {
  const randomArray: Array<ImyWords> = [];
  while (randomArray.length < 4) {
    const randomElementIndex = Math.floor(Math.random() * arr.length);
    const randElement = arr[randomElementIndex];
    if (!randomArray.some((item) => item.id === randElement.id)) {
      randomArray.push(randElement);
    }
  }
  return randomArray;
};

const splitArrays = (arr: Array<ImyWords>) => {
  const engArray = arr
    .map((item) => ({ id: item.id, name: item.eng, lang: "eng" }))
    .sort((x, y) => x.id - y.id);
  const espArray = arr.map((item) => ({
    id: item.id,
    name: item.esp,
    lang: "esp",
  }));
  return { engArray, espArray };
};

const toCheck = (evt: Event) => {
  const elem = evt.target as HTMLInputElement;
  elem?.getAttribute("lang") && deselectAll(String(elem.getAttribute("lang")));
  elem.classList.toggle("selected");

  if (elem.getAttribute("lang") === "eng") {
    globalStatus.arrForCompare[0] = Number(elem.getAttribute("idOfWord"));
  }
  if (elem.getAttribute("lang") === "esp") {
    globalStatus.arrForCompare[1] = Number(elem.getAttribute("idOfWord"));
  }
  if (globalStatus.arrForCompare[0] && globalStatus.arrForCompare[1]) {
    if (globalStatus.arrForCompare[0] === globalStatus.arrForCompare[1]) {
      const elements = document.querySelectorAll(
        `div[idOfWord ="${elem.getAttribute("idOfWord")}"]`
      );
      elements.forEach((item) => item.classList.add("matched"));
      globalStatus.score += 2;
      globalStatus.arrForCompare = [];
      setScore();
      const arrWord = document.querySelectorAll(".word");
      const arrMatch = document.querySelectorAll(".matched");
      console.log(arrWord, arrMatch);
      if (arrWord.length === arrMatch.length) {
        arrWord.forEach((item) => item.remove());
        nextRound();
        globalStatus.round += 1;
        setRound();
      }
    } else {
      globalStatus.arrForCompare = [];
      globalStatus.score -= 1;
      deselectAll("esp");
      deselectAll("eng");
      setScore();
    }
  }
};

const deselectAll = (lang: string) => {
  const allElems = document.querySelectorAll(`div[lang =${lang}]`);
  allElems.forEach((item) => {
    item.classList.remove("selected");
  });
};

const setScore = () => {
  const scoreElem = document.getElementById("score-counter");
  if (scoreElem) scoreElem.innerHTML = String(globalStatus.score);
};
const setRound = () => {
  const roundElem = document.getElementById("round-counter");
  if (roundElem) roundElem.innerHTML = String(globalStatus.round);
};

const writeToDiv = (arr: IEngArray[], elemParent: HTMLElement) => {
  for (let i = 0; i < arr.length; i++) {
    const divForWord = document.createElement("div");
    divForWord.classList.add("word");
    divForWord.setAttribute("idOfWord", String(arr[i].id));
    divForWord.setAttribute("lang", arr[i].lang);
    divForWord.innerHTML = arr[i].name;
    elemParent.appendChild(divForWord);
    divForWord.addEventListener("click", toCheck);
  }
};
const timer = () => {
  const intervalId = setInterval(() => {
    const timeElem = document.getElementById("time-counter");
    if (timeElem) timeElem.innerHTML = String(globalStatus.time);
    globalStatus.time -= 1;

    if (globalStatus.time < 0) {
      clearInterval(intervalId);
      writeResult();
      const arrWord = document.querySelectorAll(".word");
      arrWord.forEach((item) => item.remove());
      button?.removeAttribute("disabled");
      globalStatus.isStarted = false;
    }
  }, 1000);
};

const parentElemEng = document.getElementById("eng-container");
const parentElemEsp = document.getElementById("esp-container");
const button = document.getElementById("btn");
const startGame = () => {
  globalStatus.score = 0;
  globalStatus.time = 120;
  globalStatus.round = 1;
  setScore();
  nextRound();
  setRound();
  deleteResult();
  if (globalStatus.isStarted === false) {
    timer();
    globalStatus.isStarted = true;
    button?.setAttribute("disabled", "disabled");
  }
};

const nextRound = () => {
  const fourRandomElementsArray = random(myWords);

  interface ISplitArr {
    engArray: IEngArray[];
    espArray: IEngArray[];
  }

  const { engArray, espArray }: ISplitArr = splitArrays(
    fourRandomElementsArray
  );

  if (parentElemEng && parentElemEsp) {
    writeToDiv(engArray, parentElemEng);
    writeToDiv(espArray, parentElemEsp);
  }
};

button?.addEventListener("click", startGame);
