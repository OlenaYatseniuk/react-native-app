export const setCommentDate = () => {
  const date = new Date();
  let hours = date.getHours();
  let min = date.getMinutes();

  if (hours.length === 1) {
    hours = "0" + hours;
  }

  if (min.length === 1) {
    min = "0" + min;
  }

  return `${date.toDateString()} | ${hours}:${min}`;
};
