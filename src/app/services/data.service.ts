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
                    firstName: 'Stavros',
                    lastName: 'Droutsas 1',
                    domain: 'Software Engineer',
                    active: true,
                },
                {
                    id: 2,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 2',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 3,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 3',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 4,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 4',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 5,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 5',
                    domain: 'Software Engineer',
                    active: true,
                },
                {
                    id: 6,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 6',
                    domain: 'Software Engineer',
                    active: true,
                },
                {
                    id: 7,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 7',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 8,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 8',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 9,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 9',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 10,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 10',
                    domain: 'Software Engineer',
                    active: true,
                },
                {
                    id: 11,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 11',
                    domain: 'Software Engineer',
                    active: true,
                },
                {
                    id: 12,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 12',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 13,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 13',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 14,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 14',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 15,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 15',
                    domain: 'Software Engineer',
                    active: true,
                },
                {
                    id: 16,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 16',
                    domain: 'Software Engineer',
                    active: true,
                },
                {
                    id: 17,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 17',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 18,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 18',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 19,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 19',
                    domain: 'Software Engineer',
                    active: false,
                },
                {
                    id: 20,
                    firstName: 'Stavros',
                    lastName: 'Droutsas 20',
                    domain: 'Software Engineer',
                    active: true,
                },
            ],
        };
    }
}
