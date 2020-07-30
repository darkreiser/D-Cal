import { Component, OnInit, Input } from '@angular/core';
import { DayData, EventObj } from 'src/app/utils/utils';
import { DateService } from 'src/app/services/date.service';
import { EventService } from 'src/app/services/event.service';

import { EventPopupComponent } from '../../popups/event-popup/event-popup.component'
import { MatDialog } from '@angular/material/dialog';
import { DayPopupComponent } from '../../popups/day-popup/day-popup.component';

@Component({
  selector: 'day',
  templateUrl: './day.component.html',
  styleUrls: ['./day.component.scss'],
})
export class DayComponent implements OnInit {

  @Input() dayData: DayData;
  @Input() index: number;

  constructor(
    public dialog: MatDialog,
    private dateService: DateService,
    private eventService: EventService) { }

  ngOnInit(): void {
  }

  openDay() {
    this.dialog.open(DayPopupComponent, {
      width: '450px',
      data: this.dayData
    });
  }

  isWeekend(day: number): boolean {
    return (day > 4) ? true : false
  }

  getFormattedMinutes(minutes: number): string {
    return this.dateService.getFormattedMinutes(minutes)
  }

  isToday(day: Date): boolean {
    let calendarDay = new Date(day);
    let today = new Date();
    
    return this.eventService.areDaysEqual(calendarDay, today)
  }

}
