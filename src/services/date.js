import dayjs from 'dayjs';
import localizedFormat from 'dayjs/plugin/localizedFormat';
import isSameOrBefore from 'dayjs/plugin/isSameOrBefore';
import 'dayjs/locale/ru';
dayjs.extend(localizedFormat);
dayjs.extend(isSameOrBefore);
dayjs.locale('ru');

export default class Day {
  static getFullText(time) {
    return dayjs(time).format('ll');
  }

  static getFullTextWithTime(time) {
    return dayjs(time).format('ll') + ' ' + dayjs(time).format('LTS');
  }

  static getMonthText(time) {
    return dayjs(time).format('MMMM YYYY г.');
  }

  static addMonth(time) {
    return dayjs(time).date(1).add(1, 'month');
  }

  static subMonth(time) {
    return dayjs(time).date(1).subtract(1, 'month');
  }

  static getDaysInMonth(year, month) {
    return dayjs(`${year}-${month + 1}-1`).daysInMonth();
  }

  static getStartDate(time) {
    let startMonth = dayjs(time).date(1).format('YYYY-MM-DD');
    return startMonth;
  }

  static getEndDate(time) {
    let endMonth = dayjs(time).date(dayjs(time).daysInMonth()).format('YYYY-MM-DD');
    return endMonth;
  }

  static getDateForDB(date) {
    if (date === '') return `2000-01-01`;
    let dt = date.split('-');
    dt = `${dt[0]}-${+dt[1] + 1}-${dt[2]}`;
    return dt;
  }

  static getDateExpired() {
    const dateNow = Date.now();
    return dayjs(dateNow).add(localStorage.getItem('expired'), 'month');
  }

  static comparisonDateExpired(dateExpired, dateItem) {
    return dayjs(dateItem).isSameOrBefore(dayjs(dateExpired));
  }

  static comparisonStorageExpired(item) {
    if (!item.ITEMS.isLoss) return false;
    if (dayjs(item.loss).isSame('2000-01-01', 'day')) return false;
    const dateExpired = this.getDateExpired();
    return this.comparisonDateExpired(dateExpired, item.loss);
  }

  static isNotMissLoss(date) {
    if (dayjs(date).isSame('2000-01-01', 'day')) return false;
    return true;
  }
}
