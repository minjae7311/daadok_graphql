const getAge = (user) => {
  let rightNow = new Date();
  let birthday = new Date(user);

  let age = rightNow.getFullYear() - birthday.getFullYear();

  let birthMonth = birthday.getMonth();
  let thisMonth = rightNow.getMonth();
  let birthDate = birthday.getDate();
  let thisDate = rightNow.getDate();

  if (birthMonth < thisMonth) {
    return age;
  } else if (birthMonth > thisMonth) {
    return age - 1;
  } else {
    if (birthDate < thisDate) {
      return age;
    } else {
      return age - 1;
    }
  }
};

export default getAge;

