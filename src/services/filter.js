export default class Filter {
  static getNumberCaseCi(ci, number) {
    if (!ci?.one) return false;

    if (
      number % 10 === 5 ||
      number % 10 === 6 ||
      number % 10 === 7 ||
      number % 10 === 8 ||
      number % 10 === 9 ||
      number % 10 === 0 ||
      (number % 100 > 10 && number % 100 < 20)
    )
      return ci.five;

    if (number % 10 === 2 || number % 10 === 3 || number % 10 === 4) return ci.two;

    return ci.one;
  }
}
