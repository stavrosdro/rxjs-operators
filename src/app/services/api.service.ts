import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
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

    createUser(user: User) {
        return this.http.post(`${this.url}/users`, user);
    }

    editUser(user: User) {
        return this.http.put(`${this.url}/users`, user);
    }

    exportUsers(): Observable<User[]> {
        return this.http.get<User[]>(`${this.url}/users`);
    }
}
