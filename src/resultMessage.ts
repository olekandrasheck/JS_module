import { globalStatus } from "./globalConst";

export const container = document.getElementById("container");
export const divForResult = document.createElement("div");
container?.appendChild(divForResult);

export const writeResult = () => {
  divForResult.classList.add("result");
  switch (true) {
    case globalStatus.score < 10:
      divForResult.innerHTML = "SO BAD";
      break;
    case globalStatus.score <= 20:
      divForResult.innerHTML = "NOT BAD";
      break;
    case globalStatus.score <= 40:
      divForResult.innerHTML = "GOD JOB";
      break;
    case globalStatus.score <= 60:
      divForResult.innerHTML = "YOU ARE THE BEST";
      break;
    case globalStatus.score <= 80:
      divForResult.innerHTML = "BEST OF THE BEST";
      break;
    case globalStatus.score <= 100:
      divForResult.innerHTML = "MEGAMIND";
      break;
    case globalStatus.score <= 120:
      divForResult.innerHTML = "SIMPLY THE BEST";
      break;
  }
};

export const deleteResult = () => {
  divForResult.classList.remove("result");
  divForResult.innerHTML = "";
};
