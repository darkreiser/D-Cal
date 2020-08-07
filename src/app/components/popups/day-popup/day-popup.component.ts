import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';

import { DateService } from 'src/app/services/date.service';

import { DayData, EventObj } from 'src/app/utils/utils';

import { EventPopupComponent } from '../event-popup/event-popup.component';

@Component({
  selector: 'app-day-popup',
  templateUrl: './day-popup.component.html',
  styleUrls: ['./day-popup.component.scss']
})
export class DayPopupComponent implements OnInit {

  dayData: DayData
  constructor(
    public dialogRef: MatDialogRef<DayPopupComponent>,
    public dialog: MatDialog,
    private dateService: DateService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  ngOnInit(): void {
    this.dayData = this.data;
  }

  openEvent(event: EventObj): void {
    const dialogRef = this.dialog.open(EventPopupComponent, {
      width: '450px',
      data: event
    });

    dialogRef.afterClosed().subscribe(data => {
      if (!data) {
        return;
      }
      const index = this.dayData.events.findIndex(e=> e.id === data.event.id);
      switch (data.action) {
        case 'remove':
          this.dayData.events.splice(index, 1);
          break;
        case 'edit':
          this.dayData.events.splice(index, 1, data.event);
          break;
        default:
          return
      }
    });
  }

  getFormattedMinutes(minutes: number): string {
    return this.dateService.getFormattedMinutes(minutes)
  }
}
