function shuffleArray(a) {
  let newArray = [...a];
  let j, x;
  for (let i = newArray.length; i; i -= 1) {
    j = Math.floor(Math.random() * i);
    x = newArray[i - 1];
    newArray[i - 1] = newArray[j];
    newArray[j] = x;
  }
  return newArray;
}

export default shuffleArray;
