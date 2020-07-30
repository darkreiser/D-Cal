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
            id: 'id_3',
            startDate: new Date(2020, 6, 15, 17, 0, 0, 0),
            endDate: new Date(2020, 6, 15, 17, 30, 0, 0),
            title: 'Homework',
            location: 'home',
            description: 'bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla bla ',
            participants: [{email: 'darkreiser86@gmail.com'}]
        },
        {
            id: 'id_4',
            startDate: new Date(2020, 6, 15, 21, 0, 0, 0),
            endDate: new Date(2020, 6, 15, 23, 30, 0, 0),
            title: 'Drink a beer',
            location: 'HaCarmel Market, Tel Aviv',
            description: 'Beer Bazar',
            participants: [{email: 'darkreiser86@gmail.com'}, {email: 'shani@gmail.com'}]
        },
        {
            id: 'id_5',
            startDate: new Date(2020, 6, 22, 15, 30, 0, 0),
            endDate: new Date(2020, 6, 22, 16, 0, 0, 0),
            title: 'Transmit job interview',
            location: 'Zoom, - corona times',
            description: 'job interview with Adi',
            participants: [{email: 'darkreiser86@gmail.com'}, {email: 'adi@transmitsecurity.com'}]
        },
        {
            id: 'id_6',
            startDate: new Date(2020, 6, 23, 15, 30, 0, 0),
            endDate: new Date(2020, 6, 23, 17, 0, 0, 0),
            title: 'Transmit job interview 2nd meeting',
            location: 'Zoom, - corona times',
            description: 'job interview with Dan',
            participants: [
                {email: 'darkreiser86@gmail.com'}, {email: 'danc@transmitsecurity.com'}
            ]
        },
        {
            id: 'id_7',
            startDate: new Date(2020, 7, 4, 11, 0, 0, 0),
            endDate: new Date(2020, 7, 4, 12, 0, 0, 0),
            title: 'Mark Zuckerberg 1 on 1',
            location: '125 Fifth Ave, New York',
            description: 'we will talk about the weather',
            participants: [{email: 'darkreiser86@gmail.com'}, {email: 'mark@facebook.com'}]
        },
        {
            id: 'id_8',
            startDate: new Date(2020, 7, 14, 20, 0, 0, 0),
            endDate: new Date(2020, 7, 14, 22, 30, 0, 0),
            title: 'Beyonce Concert',
            location: 'Stad de france, Paris',
            description: 'the best concert ever',
            participants: [{email: 'darkreiser86@gmail.com'}, {email: 'shani@gmail.com'}]
        },
        {
            id: 'id_9',
            startDate: new Date(2020, 7, 17, 17, 0, 0, 0),
            endDate: new Date(2020, 7, 15, 17, 30, 0, 0),
            title: 'Shmulik <-> Dar',
            location: 'Office, Tel Aviv',
            description: 'we will discuss the new project in the new office',
            participants: [{email: 'darkreiser86@gmail.com'}, {email: 'shmulik@gmail.com'}]
        },
        {
            id: 'id_10',
            startDate: new Date(2020, 7, 17, 20, 0, 0, 0),
            endDate: new Date(2020, 7, 15, 21, 30, 0, 0),
            title: 'Prof. Yoram Yovel',
            location: 'Menora Mivtahim center, Tel Aviv',
            description: 'lecture name: what is happiness?',
            participants: [{email: 'darkreiser86@gmail.com'}, {email: 'adi@transmitsecurity.com'}]
        },
    ];
}