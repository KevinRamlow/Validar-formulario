class ValidadeUser {
  constructor(user) {
    Object.defineProperty(this, "userName", {
      value: user,
    });
  }

  verifyString() {
    const regex = /^[a-zA-Z0-9]+$/;
    return regex.test(this.userName);
  }

  verifyUserLength() {
    if (!(this.userName.length > 3 && this.userName.length < 12)) {
      return false;
    } else {
      return true;
    }
  }
}
