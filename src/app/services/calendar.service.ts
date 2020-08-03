import { Injectable } from '@angular/core';
import { DateObject, DayData, WeekDays } from '../utils/utils';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  
  constructor() { }

  getDateDay(week: number, day: number, offset: number) {
    return (week*7) + day - offset + 1
  }

  isDayFromNextMonth(week: number, day: number, offset: number, thisMonthLength: number): boolean {
    return (((week*7) + (day-offset+1)) > thisMonthLength)
  }

  getMonthOffset(year: number, month: number): number {
    const firstDayOfMonth = new Date(year, month, 1);

    return firstDayOfMonth.getDay();
  }

  getMonthLength (month: number, year: number) { 
    return new Date(year, month, 0).getDate(); 
  } 

  getDayFromPrevMonth(dayNum: number, offset: number, monthLength: number, shownDate: DateObject): DayData {
    const dayDate = monthLength - offset + dayNum + 1;
    const newDate = new Date(shownDate.year, shownDate.month-1, dayDate);
    let day: DayData = {
      fullDate: newDate,
      dayName: WeekDays[dayNum],
      date: dayDate,
      inCurrentMonth: false,
      events: []
    }

    return day;
  }

  getDayFromNextMonth(counter: number, dayNum: number, offset: number, shownDate: DateObject): DayData {
    const dayDate = dayNum;
    const newDate = new Date(shownDate.year, shownDate.month+1, dayDate);
    let day: DayData = {
      fullDate: newDate,
      dayName: WeekDays[dayNum],
      date: counter,
      inCurrentMonth: false,
      events: []
    }

    return day;
  }
}