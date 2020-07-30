import { Injectable } from '@angular/core';
import { EventObj } from '../utils/utils';
import { Observable, BehaviorSubject } from 'rxjs';
import { MockEventsUtils } from '../utils/mockEventsUtils'


@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventsSource = new BehaviorSubject<EventObj[]>([]);
  events$: Observable<EventObj[]> = this.eventsSource.asObservable();
  
  events: EventObj[];
  constructor(
    public eventsUtils: MockEventsUtils
  ) {
    this.generateMockEvents();
  }

  addEvent(eventForm: EventObj): void{
    eventForm['id'] = this.generateId();
    let newEvents = [...this.eventsSource.value, eventForm];
    this.updateEvents(newEvents);
  }

  removeEvent(eventId: string): void {
    const newEvents = this.eventsSource.value.filter((e: EventObj) => e.id !== eventId);
    this.updateEvents(newEvents);
  }

  editEvent(eventId: string, event: EventObj) {
    event['id'] = eventId;
    const filteredEvents = this.eventsSource.value.filter((e: EventObj) => e.id !== eventId);
    const newEvents = [...filteredEvents, event];
    this.updateEvents(newEvents);
  }

  getTodaysEvents(todaysDate: Date): EventObj[] {
    return this.eventsSource.value.filter(e => this.areDaysEqual(e.startDate, todaysDate))
  }

  isLessThan5EventsToday(todaysDate: Date): boolean {
    const todaysEvents = this.getTodaysEvents(todaysDate)
    return (todaysEvents.length < 5)
  }

  areDaysEqual(date1: Date, date2: Date): boolean {
    const cleanDate1 = new Date(date1).setHours(0,0,0,0);
    const cleanDate2 = new Date(date2).setHours(0,0,0,0);
    
    return (cleanDate2 === cleanDate1)
  }

  private generateMockEvents(): void {
    const events = this.eventsUtils.MockEvents;
    this.eventsSource.next(events);
  }

  private updateEvents(events: EventObj[]): void {
    events.sort(this.compareValues('startDate'));
    this.eventsSource.next(events);
  }

  private compareValues(key: string, order = 'asc') {
    return function innerSort(a, b) {
      if (!a.hasOwnProperty(key) || !b.hasOwnProperty(key)) {
        return 0;
      }
  
      const varA = (typeof a[key] === 'string')
        ? a[key].toUpperCase() : a[key];
      const varB = (typeof b[key] === 'string')
        ? b[key].toUpperCase() : b[key];
  
      let comparison = 0;
      if (varA > varB) {
        comparison = 1;
      } else if (varA < varB) {
        comparison = -1;
      }
      return (
        (order === 'desc') ? (comparison * -1) : comparison
      );
    };
  }

  private generateId(): string {
    return ('id_' + (new Date()).getTime())
  }
}