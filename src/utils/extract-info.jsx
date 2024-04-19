const removeHTMLTags = (str) => {
  const arr = str.split('');

  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === '<') {
      let delCount = 0;
      let j = 0;
      while (true) {
        if (arr[i + j] !== '>') {
          delCount++;
          j++;
        } else {
          delCount++;
          break;
        }
      }
      arr.splice(i, delCount);
    }
  }

  return arr.join('');
}

const limitWords = (str, wordCount) => {
  const arr = str.split(' ');
  const newArr = [];

  if (wordCount >= arr.length) {
    return arr.join(' ');
  }

  for (let i = 0; i < wordCount; i++) {
    newArr.push(arr[i]);
  }

  return newArr.join(' ');
}

const extractIntro = (content) => {
  const firstP = content.split('</p>')[0].slice(3);
  const cleanP = removeHTMLTags(firstP);
  return limitWords(cleanP, 30) + '...';
}

export default extractIntro;
