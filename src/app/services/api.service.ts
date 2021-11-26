import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { User, UserRequest, UserResponse } from '../interfaces/users';

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
        return this.http.get<User[]>(`${this.url}/users`).pipe(
            map((response: User[]) => ({
                data: response.slice(
                    (userRequest.page - 1) * userRequest.rowsPerPage,
                    userRequest.page * userRequest.rowsPerPage
                ),
                page: userRequest.page,
                total: response.length,
            }))
        );
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
