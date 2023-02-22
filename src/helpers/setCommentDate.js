export const setCommentDate = () => {
  const date = new Date();
  let hours = date.getHours();
  let min = date.getMinutes();
  console.log(min, hours);

  if (hours.length === 1) {
    hours = "0" + hours;
  }

  if (min.length === 1) {
    min = "0" + min;
  }
  console.log(min, hours);

  return `${date.toDateString()} | ${addLeadingZero(hours)}:${addLeadingZero(
    min
  )}`;
};

function addLeadingZero(value) {
  return value.toString().padStart(2, "0");
}
