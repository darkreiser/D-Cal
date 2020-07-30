import { Injectable } from '@angular/core';
import { DateObject } from '../utils/utils'

@Injectable({
  providedIn: 'root'
})
export class DateService {

  constructor() {}

  getDateObject(dateObj: Date = null): DateObject {
    const date = dateObj ? dateObj : new Date();
    
    const datesObject: DateObject = {
      date: date,
      year: date.getFullYear(),
      month: date.getMonth(),
      day: date.getDate(),
      weekDay: date.getDay(),
      hours: date.getHours(),
      minutes: this.getFormattedMinutes(date.getMinutes()),
    }
    return datesObject
  }

  getDifferentMonth(direction: string, currentDate: Date): DateObject {
    let date: Date;
    switch (direction) {
      case 'prev':
        date = this.getPrevMonth(currentDate);
        break;
      case 'next':
        date = this.getNextMonth(currentDate);
        break;
      case 'today':
        date = null;
        break;
      default:
        date = null;
    }

    return this.getDateObject(date);
  }

  getPrevMonth(currentDate: Date): Date {
    const prevMonthDateObj = new Date(currentDate);
    const currentMonth = currentDate.getMonth();
  
    if(currentMonth > 0) {
      prevMonthDateObj.setMonth(currentMonth - 1);
    } else {
      prevMonthDateObj.setFullYear(currentDate.getFullYear() - 1);
      prevMonthDateObj.setMonth(11);
    }
  
    return prevMonthDateObj
  };

  getNextMonth(currentDate: Date): Date {
    const NextMonthDateObj = new Date(currentDate);
    const currentMonth = currentDate.getMonth();
  
    if(currentMonth < 12) {
      NextMonthDateObj.setMonth(currentMonth + 1);
    } else {
      NextMonthDateObj.setFullYear(currentDate.getFullYear() + 1);
      NextMonthDateObj.setMonth(0);
    }
  
    return NextMonthDateObj
  };

  getFormattedMinutes(minutes: number): string {
    return (minutes < 10 ? '0' : '') + minutes
  }
}
