export default function validateEmail(email) {
  if (!/[@.]/.test(email)) {
    return 'Invalid email Address';
  }
  return 'success';
}
