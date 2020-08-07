import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';

import { DayData } from 'src/app/utils/utils';

import { DateService } from 'src/app/services/date.service';
import { EventService } from 'src/app/services/event.service';

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
    private eventService: EventService,
    private changeDetectorRef: ChangeDetectorRef) { }

  ngOnInit(): void {
  }

  openDay() {
    const dialogRef = this.dialog.open(DayPopupComponent, {
      width: '450px',
      data: this.dayData
    });

    dialogRef.afterClosed().subscribe(() => {
      this.changeDetectorRef.detectChanges();
    })
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
