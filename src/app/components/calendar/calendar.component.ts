import { Component, OnInit, ChangeDetectionStrategy, OnChanges, Input, Output, EventEmitter } from '@angular/core';
import { DateObject, WeekDays, MonthNames } from '../../utils/utils'
import { DateService } from 'src/app/services/date.service';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
})
export class CalendarComponent implements OnInit {

  dateShown: DateObject;
  month: number;
  weekDays = WeekDays;
  monthNames = MonthNames

  constructor(
    private dateService: DateService) { }

  ngOnInit(): void {
    this.dateShown = this.dateService.getDateObject();
  }

  changeMonth(direction: string): void {
    const currentDate = this.dateShown.date;
    this.dateShown = this.dateService.getDifferentMonth(direction, currentDate);
  }

}
