export function getAgeFrom(birthDate) {
  if (!birthDate) {
    return '?';
  }
  const [birthYear, birthMonth, birthDay] = birthDate.split('-');

  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = today.getMonth() + 1;
  const todayDay = today.getDate();

  let age = todayYear - parseInt(birthYear, 10);
  if (birthMonth > todayMonth) {
    age--;
  } else if (
    parseInt(birthMonth) === todayMonth &&
    parseInt(birthDay) < todayDay
  ) {
    age--;
  }
  return age;
}
