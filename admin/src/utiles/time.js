const timestampToDate = (timestamp) => {
  const date = new Date(timestamp);
  const Y = date.getFullYear() + '-';
  const M = supply0(date.getMonth() + 1) + '-';
  const D = supply0(date.getDate());
  return Y + M + D;
}

const supply0 = (num) => {
  return num < 10 ? `0${num}` : `${num}`
}

export default timestampToDate
