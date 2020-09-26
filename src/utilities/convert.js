export function convertDate(seconds) {
  let date = new Date(seconds * 1000);
  return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}