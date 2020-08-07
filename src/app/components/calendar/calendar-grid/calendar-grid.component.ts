import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';

import { DateService } from 'src/app/services/date.service';
import { EventService } from 'src/app/services/event.service';
import { CalendarService } from 'src/app/services/calendar.service';
import { DateObject, WeekDays, MonthData, MonthNames, EventObj } from '../../../utils/utils'

@Component({
  selector: 'calendar-grid',
  templateUrl: './calendar-grid.component.html',
  styleUrls: ['./calendar-grid.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
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
    this.monthData = this.calendarService.getCurrentMonthData(this.shownDate);
  }
}