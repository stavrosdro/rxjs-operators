import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { User, UserRequest, UserResponse } from '../interfaces/users';

const users: User[] = [
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
];

@Injectable({
    providedIn: 'root',
})
export class ApiService {
    url = environment.url;
    constructor(private http: HttpClient) {}

    fetchUsers(userRequest: UserRequest): Observable<UserResponse> {
        const params = new HttpParams()
            .append('page', userRequest.page)
            .append('rowsPerPage', userRequest.rowsPerPage);
        return this.http.get<UserResponse>(`${this.url}/users`, { params });
        // return of({ data: users, page: 1, total: 5 });
    }

    importUsers(file: any) {
        const formData = new FormData().append('file', file);
        return this.http.post(`${this.url}/users`, formData, {
            reportProgress: true,
            observe: 'events',
        });
    }

    exportUsers() {
        return this.http.get(`${this.url}/users`);
    }

    // changeUserStatus(id: number, active: boolean) {
    //     const body = {
    //         id,
    //         active,
    //     };
    //     return this.http.put(`${this.url}/users`, body);
    // }

    enableUser(id: number) {
        return this.http.put(`${this.url}/users/${id}`, { active: true });
    }

    disableUser(id: number) {
        return this.http.delete(`${this.url}/users/${id}`);
    }
}
