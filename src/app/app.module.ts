import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module'

import { AppComponent } from './app.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { CalendarGridComponent } from './components/calendar/calendar-grid/calendar-grid.component';
import { DayComponent } from './components/calendar/day/day.component';
import { EventPopupComponent } from './components/popups/event-popup/event-popup.component';
import { DayPopupComponent } from './components/popups/day-popup/day-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CalendarGridComponent,
    DayComponent,
    EventPopupComponent,
    DayPopupComponent
  ],
  imports: [
    BrowserModule,
    MaterialModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule
  ],
  entryComponents: [EventPopupComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
