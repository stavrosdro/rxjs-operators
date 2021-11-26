import { ApiService } from './api.service';
import { Injectable } from '@angular/core';
import { Observable, ReplaySubject } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { UserRequest, UserResponse } from '../interfaces/users';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private loadUsers = new ReplaySubject<UserRequest>(1);
    private loadUsers$ = this.loadUsers.asObservable();
    users$: Observable<UserResponse> = this.loadUsers$.pipe(
        switchMap((req: UserRequest) => this.api.fetchUsers(req))
    );

    constructor(private api: ApiService) {}

    onLoadUsers(userRequest: UserRequest) {
        this.loadUsers.next(userRequest);
    }
}
