const emailRegexp = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegexp = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;

module.exports = {
  emailRegexp,
  passwordRegexp,
};
