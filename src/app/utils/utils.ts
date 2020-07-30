import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class UtilsService {
    isObjectEmpty(obj): boolean {
        for(var prop in obj) {
            if(obj.hasOwnProperty(prop))
                return false;
        }

        return true;
    }
}

export interface DateObject {
    date: Date;
    year: number;
    month: number;
    day: number;
    weekDay: number;
    hours: number;
    minutes: string;
}

export const WeekDays = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
]

export const MonthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
]

export interface MonthData {
    weeks: WeekData[]
    offset: number;
    monthLength: number;
}

export interface WeekData {
    days: DayData[];
}

export interface DayData {
    fullDate: Date;
    dayName: string;
    date: number;
    inCurrentMonth: boolean;
    events: EventObj[];
}

export interface EventObj {
    id: string;
    startDate: Date;
    endDate: Date;
    title: string;
    location?: string;
    description?: string;
    participants?: Participant[];
}

export interface Participant {
    email: string;
}