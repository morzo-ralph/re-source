import { Injectable } from '@angular/core';
import { DatePipe, Time } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LibraryService {

  constructor(private datepipe: DatePipe) { }

  isMobile!: boolean

  setIsMobile(status: boolean) {
    this.isMobile = status
  }

  getIsMobile() {
    return this.isMobile
  }

  getDate(format: string) {
    var date
    date = new Date()
    date = this.datepipe.transform(date, format)
    /*console.log(date + ': From Library Service: Method getDate')*/
    return <string>(date)
  }

  getLastDayofMonth(month: number) {
    var date
    date = new Date()
    date.setMonth(month + 1)
    date.setDate(0)
    date = date.getDate()
    /*console.log(date + ' From Library Service: Method getLastDayofMonth');*/
    return <number>(date)
  }

  generateDaysArray(month: number) {

    var daysArray: any[] = [];
    var day;
    var daysinMonth;
    daysinMonth = this.getLastDayofMonth(month);
    for (let i = 1, j = daysinMonth; i <= j; i++) {
      day = new Date()
      day.setMonth(month)
      day.setDate(i)
      day = this.datepipe.transform(day, 'yyyy-MM-dd');
      daysArray.push(day)
      /*console.log(daysArray + ' From Data Service: Method generateDaysArray');*/
    }
    /*console.log(daysArray + ' From Library: Method generateDaysArray');*/
    return (daysArray)
  }

  generateMonthsArray() {

    var monthsArray: any[] = [];
    var month;
    for (let i = 0, j = 11; i <= j; i++) {
      month = new Date()
      month.setDate(1)
      month.setMonth(i)
      month = this.datepipe.transform(month, 'MMMM');
      monthsArray.push(month)
      /*console.log(daysArray + ' From Data Service: Method generateDaysArray');*/
    }
    /*console.log(daysArray + ' From Library: Method generateDaysArray');*/
    return (monthsArray)
  }

  getMonth(date: any) {
    var month;
    month = this.datepipe.transform(date, 'MM');
    return (month);
  }

  decodeDate(date: any) {
    var decode;
    decode = this.datepipe.transform(date, 'mm-dd-yyyy');
    return (decode);
  }


}
