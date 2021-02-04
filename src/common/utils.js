// 防抖函数
export function debounce(fn, delay) {
  let timer = null;
  return function (...args) {
    clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay)
  }
}

// 根据时间戳计算时间
export function formatTimeByTimestamps(time, isSpecificTime) {
  console.log(time);
  let result = '';
  let date = new Date(time);
  let year = '' + date.getFullYear();
  let month = fillZero(date.getMonth() + 1);
  let day = fillZero(date.getDay());

  result = `${year}/${month}/${day}`;
  if (isSpecificTime) {
    let hours = fillZero(date.getHours());
    let minutes = fillZero(date.getMinutes());
    let seconds = fillZero(date.getSeconds());
    result = `${result} ${hours}:${minutes}:${seconds}`
  }
  return result;
}

function fillZero(time) {
  return time < 10 ? '0' + time : '' + time
}