import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';

@Injectable({
    providedIn: 'root',
})
export class DataService implements InMemoryDbService {
    constructor() {}

    createDb() {
        return {
            users: [
                {
                    id: 1,
                    firstName: 'Amy-Louise',
                    lastName: 'Christie',
                    domain: 'Software Engineer',
                    active: true,
                },
                {
                    id: 2,
                    firstName: 'Ibrahim',
                    lastName: 'Ortiz',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 3,
                    firstName: 'Maximilian',
                    lastName: 'Collier',
                    domain: 'HR',
                    active: false,
                },
                {
                    id: 4,
                    firstName: 'Kristin',
                    lastName: 'Nolan',
                    domain: 'HR',
                    active: false,
                },
                {
                    id: 5,
                    firstName: 'Aleena',
                    lastName: 'Sampson',
                    domain: 'HR',
                    active: true,
                },
                {
                    id: 6,
                    firstName: 'Charmaine',
                    lastName: 'Macias',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 7,
                    firstName: 'Delores',
                    lastName: 'Villanueva',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 8,
                    firstName: 'Zac',
                    lastName: 'Deacon',
                    domain: 'Backoffice',
                    active: false,
                },
                {
                    id: 9,
                    firstName: 'Mariana',
                    lastName: 'Carty',
                    domain: 'Backoffice',
                    active: false,
                },
                {
                    id: 10,
                    firstName: 'Eoghan',
                    lastName: 'Silva',
                    domain: 'Sales',
                    active: false,
                },
                {
                    id: 11,
                    firstName: 'Daanyaal',
                    lastName: 'Hogg',
                    domain: 'Sales',
                    active: false,
                },
                {
                    id: 12,
                    firstName: 'Salim',
                    lastName: 'Macgregor',
                    domain: 'Sales',
                    active: false,
                },
                {
                    id: 13,
                    firstName: 'Zayden',
                    lastName: 'Gale',
                    domain: 'HR',
                    active: false,
                },
                {
                    id: 14,
                    firstName: 'Ptolemy',
                    lastName: 'Kavanagh',
                    domain: 'HR',
                    active: false,
                },
                {
                    id: 15,
                    firstName: 'Siana',
                    lastName: 'Marin',
                    domain: 'HR',
                    active: false,
                },
                {
                    id: 16,
                    firstName: 'Sumayya',
                    lastName: 'Villa',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 17,
                    firstName: 'Kurt',
                    lastName: 'Moreno',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 18,
                    firstName: 'Anand',
                    lastName: 'Kirkland',
                    domain: 'IT',
                    active: false,
                },
                {
                    id: 19,
                    firstName: 'Sumayyah',
                    lastName: 'Mcguire',
                    domain: 'IT',
                    active: false,
                },
                {
                    id: 20,
                    firstName: 'Maisie',
                    lastName: 'Cortez',
                    domain: 'Finance',
                    active: false,
                },
            ],
        };
    }
}
