class ValidateCpf {
  constructor(cpf) {
    Object.defineProperty(this, "cleanCpf", {
      value: cpf.replace(/\D+/g, ""),
    });
  }

  isSequence() {
    return this.cleanCpf.charAt(0).repeat(11) === this.cleanCpf;
  }

  CreateNewCpf() {
    const cpfWithoutDigits = this.cleanCpf.slice(0, -2);
    const digitOne = this.newDigit(cpfWithoutDigits);
    const digitTwo = this.newDigit(cpfWithoutDigits + digitOne);
    this.newCpf = cpfWithoutDigits + digitOne + digitTwo;
  }

  newDigit(cpfWithoutDigits) {
    let total = 0;
    let reverse = cpfWithoutDigits.length + 1;
    
    for (let numericString of cpfWithoutDigits) {
      total += reverse * Number(numericString);
      reverse--;
    }
    const digit = 11 - (total % 11);
    return digit <= 9 ? String(digit) : "0";
  }

  verifyCpf() {
    if (!this.cleanCpf) return false;
    if (typeof this.cleanCpf !== "string") return false;
    if (this.cleanCpf.length !== 11) return false;
    if (this.isSequence()) return false;
    this.CreateNewCpf();

    return this.newCpf === this.cleanCpf;
  }
}
