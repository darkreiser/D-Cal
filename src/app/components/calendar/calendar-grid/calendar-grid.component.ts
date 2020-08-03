import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import { DateService } from 'src/app/services/date.service';
import { EventService } from 'src/app/services/event.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { DateObject, WeekDays, MonthData, DayData, MonthNames, EventObj } from '../../../utils/utils'

@Component({
  selector: 'calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
})
export class CalendarGridComponent implements OnInit ,OnChanges {

  @Input() shownDate: DateObject;
  weekDays = WeekDays;
  monthNames = MonthNames;
  monthData: MonthData;
  eventsData: EventObj[];

  constructor(
    public dateService: DateService,
    public calendarService: CalendarService,
    public eventService: EventService) {
  }

  ngOnInit(): void {
    this.getEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes.shownDate && !changes.shownDate.firstChange) {
      this.initMonthData();
    }
  }

  getEvents(): void {
    this.eventService.events$.subscribe((events) => {
      this.eventsData = events;
      this.initMonthData();
    })
  }

  initMonthData(): void {
    const lastMonthLength = this.calendarService.getMonthLength(this.shownDate.month, this.shownDate.year);
    const thisMonthLength = this.calendarService.getMonthLength(this.shownDate.month+1, this.shownDate.year);
    const offset = this.calendarService.getMonthOffset(this.shownDate.year, this.shownDate.month);
    const weeksNumber = Math.ceil((thisMonthLength + offset)/7);

    this.monthData = {
      offset: offset,
      monthLength: this.calendarService.getMonthLength(this.shownDate.month, this.shownDate.year),
      weeks: []
    }

    for(let weekIndex = 0 ; weekIndex < weeksNumber; weekIndex++) {
      let nextMonthCounter = 1;
      let nextMonthDayCounter = 1;
      
      for(let dayIndex = 0 ; dayIndex < 7; dayIndex++) {
        let day: DayData = null;
        let events: EventObj[] = null;
        const dayDate = this.calendarService.getDateDay(weekIndex, dayIndex, this.monthData.offset);
        const newDate = new Date(this.shownDate.year, this.shownDate.month, dayDate);
        const isDayFromPrevMonth = (weekIndex === 0 && dayIndex < this.monthData.offset);
        const isDayFromNextMonth = (this.calendarService.isDayFromNextMonth(weekIndex, dayIndex, this.monthData.offset, thisMonthLength));

        if (isDayFromPrevMonth) {
          day = this.calendarService.getDayFromPrevMonth(dayIndex, this.monthData.offset, lastMonthLength, this.shownDate)
        } else if (isDayFromNextMonth) {
          day = this.calendarService.getDayFromNextMonth(nextMonthCounter, nextMonthDayCounter, this.monthData.offset, this.shownDate)
          nextMonthCounter++;
          nextMonthDayCounter++;
        } else {
          day = {
            fullDate: newDate,
            dayName: this.weekDays[dayIndex],
            date: this.calendarService.getDateDay(weekIndex, dayIndex, this.monthData.offset),
            inCurrentMonth: true,
            events: []
          }
        }

        events = this.eventService.getTodaysEvents(day.fullDate);
        day.events = events;
        
        if (!this.monthData.weeks[weekIndex]) {
          this.monthData.weeks[weekIndex] = {
            days: [day]
          };
        } else {
          this.monthData.weeks[weekIndex].days.push(day);
        }
      } 
    }
  }
}