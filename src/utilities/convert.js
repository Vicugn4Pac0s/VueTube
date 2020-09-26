export function convertDate(seconds) {
  var date = new Date(seconds * 1000);
  return date.getFullYear() + '/' + date.getMonth() + '/' + date.getDate() + ' ' + date.getHours() + ':' + date.getMinutes();
}