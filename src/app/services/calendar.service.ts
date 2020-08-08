import { Injectable } from '@angular/core';
import { DateObject, DayData, WeekDays, MonthData, EventObj } from '../utils/utils';
import { EventService } from './event.service';

@Injectable({
  providedIn: 'root'
})
export class CalendarService {

  constructor(
    private eventService: EventService
  ) { }

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
    const newDate = new Date(shownDate.year, shownDate.month+1, dayNum);
    let day: DayData = {
      fullDate: newDate,
      dayName: WeekDays[dayNum],
      date: counter,
      inCurrentMonth: false,
      events: []
    }

    return day;
  }

  getCurrentMonthData(shownDate: DateObject): MonthData {
    const lastMonthLength = this.getMonthLength(shownDate.month, shownDate.year);
    const thisMonthLength = this.getMonthLength(shownDate.month+1, shownDate.year);
    const offset = this.getMonthOffset(shownDate.year, shownDate.month);
    const weeksNumber = Math.ceil((thisMonthLength + offset)/7);

    const monthData = {
      offset: offset,
      monthLength: this.getMonthLength(shownDate.month, shownDate.year),
      weeks: []
    }

    for(let weekIndex = 0 ; weekIndex < weeksNumber; weekIndex++) {
      let nextMonthCounter = 1;
      let nextMonthDayCounter = 1;
      
      for(let dayIndex = 0 ; dayIndex < 7; dayIndex++) {
        let day: DayData = null;
        let events: EventObj[] = null;
        const dayDate = this.getDateDay(weekIndex, dayIndex, monthData.offset);
        const newDate = new Date(shownDate.year, shownDate.month, dayDate);
        const isDayFromPrevMonth = (weekIndex === 0 && dayIndex < monthData.offset);
        const isDayFromNextMonth = (this.isDayFromNextMonth(weekIndex, dayIndex, monthData.offset, thisMonthLength));

        if (isDayFromPrevMonth) {
          day = this.getDayFromPrevMonth(dayIndex, monthData.offset, lastMonthLength, shownDate)
        } else if (isDayFromNextMonth) {
          day = this.getDayFromNextMonth(nextMonthCounter, nextMonthDayCounter, monthData.offset, shownDate)
          nextMonthCounter++;
          nextMonthDayCounter++;
        } else {
          day = {
            fullDate: newDate,
            dayName: WeekDays[dayIndex],
            date: this.getDateDay(weekIndex, dayIndex, monthData.offset),
            inCurrentMonth: true,
            events: []
          }
        }

        events = this.eventService.getTodaysEvents(day.fullDate);
        day.events = events;
        
        if (!monthData.weeks[weekIndex]) {
          monthData.weeks[weekIndex] = {
            days: [day]
          };
        } else {
          monthData.weeks[weekIndex].days.push(day);
        }
      } 
    }

    return monthData
  }
}