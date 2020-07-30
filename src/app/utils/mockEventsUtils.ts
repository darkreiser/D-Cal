import { Injectable } from '@angular/core';
import { EventObj } from './utils';

@Injectable({
    providedIn: 'root'
  })
  
export class MockEventsUtils {
    MockEvents: EventObj[] = [
        {
            id: 'id_1',
            startDate: new Date(2020, 6, 15, 15, 0, 0, 0),
            endDate: new Date(2020, 6, 15, 15, 30, 0, 0),
            title: 'Dentist appointment',
            location: 'Maccabi 2 st, Tel Aviv',
            description: 'annual checkup',
            participants: [{email: 'darkreiser86@gmail.com'}]
        },
        {
            id: 'id_2',
            startDate: new Date(2020, 6, 15, 16, 0, 0, 0),
            endDate: new Date(2020, 6, 15, 16, 30, 0, 0),
            title: 'Eating pizza after the dentist',
            location: 'Maccabi 4 st, Tel Aviv',
            description: 'Shiroko pizza',
            participants: [{email: 'darkreiser86@gmail.com'}]
        },
        {
            id: 'id_11',
            startDate: new Date(2020, 6, 15, 17, 0, 0, 0),
            endDate: new Date(2020, 6, 15, 17, 30, 0, 0),
            title: 'Homework',
            location: 'home',
            description: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
            participants: [{email: 'darkreiser86@gmail.com'}]
        },
        {
            id: 'id_22',
            startDate: new Date(2020, 6, 15, 21, 0, 0, 0),
            endDate: new Date(2020, 6, 15, 23, 30, 0, 0),
            title: 'Drink a beer',
            location: 'HaCarmel Market, Tel Aviv',
            description: 'Beer Bazar',
            participants: [{email: 'darkreiser86@gmail.com'}, {email: 'shani@gmail.com'}]
        },
        {
            id: 'id_3',
            startDate: new Date(2020, 6, 22, 15, 30, 0, 0),
            endDate: new Date(2020, 6, 22, 16, 0, 0, 0),
            title: 'Transmit job interview',
            location: 'Zoom, - corona times',
            description: 'job interview with Adi',
            participants: [{email: 'darkreiser86@gmail.com'}, {email: 'adi@transmitsecurity.com'}]
        },
        {
            id: 'id_4',
            startDate: new Date(2020, 6, 23, 15, 30, 0, 0),
            endDate: new Date(2020, 6, 23, 17, 0, 0, 0),
            title: 'Transmit job interview 2nd meeting',
            location: 'Zoom, - corona times',
            description: 'job interview with Dan',
            participants: [
                {email: 'darkreiser86@gmail.com'}, {email: 'danc@transmitsecurity.com'}]
            }
    ];
}