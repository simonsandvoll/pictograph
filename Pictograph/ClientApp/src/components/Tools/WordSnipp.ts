const snippWord = (word: string) => {
  if (word.length <= 19) {
    return word;
  }
  return `${word.substr(0, 5)}...${word.substr(
    word.length - 10,
    word.length
  )}`;
};

export {snippWord};