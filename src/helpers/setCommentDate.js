export const setCommentDate = () => {
  const date = new Date();
  let hours = date.getHours();
  let min = date.getMinutes();

  return `${date.toDateString()} | ${addLeadingZero(hours)}:${addLeadingZero(
    min
  )}`;
};

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
