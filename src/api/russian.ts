type Stage = [string, string, string] | [string, string]

export const ruWords = (
  num: number,
  stage: Stage,
) => {
  const txt: string = `${num}`,
    firstChar: number = +txt[txt.length - 1],
    secondChar: number = +txt[txt.length - 2];

  if (num === 1 || (firstChar === 1 && secondChar != 1)) {
    return stage[0];
  }
  
  if (
    (firstChar === 1 && secondChar === 1) ||
    firstChar === 0 ||
    secondChar === 1
  ) {
    return stage[2] || stage[1];
  }
  
  if (firstChar < 5) {
    return stage[1];
  }
  
  return stage[2] || stage[1];
};
