var removePunctuation = (word) => {
  return word.replace(/[,;.?!#@():/]+/, "");
};

module.exports = {
  removePunctuation
}
