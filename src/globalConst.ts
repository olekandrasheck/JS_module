export interface IGlobalStatus {
  arrForCompare: number[];
  score: number;
  round: number;
  time: number;
  isStarted: boolean;
}

export interface IEngArray {
  id: number;
  name: string;
  lang: string;
}

export const globalStatus: IGlobalStatus = {
  arrForCompare: [],
  score: 0,
  round: 1,
  time: 120,
  isStarted: false,
};
