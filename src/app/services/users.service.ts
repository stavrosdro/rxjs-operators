import { Injectable } from '@angular/core';
import { from, Observable, ReplaySubject, Subject } from 'rxjs';
import { concatMap, exhaustMap, mergeMap, switchMap } from 'rxjs/operators';
import { User, UserRequest, UserResponse } from '../interfaces/users';
import { ApiService } from './api.service';

@Injectable({
    providedIn: 'root',
})
export class UsersService {
    private loadUsers = new ReplaySubject<UserRequest>(1);
    private loadUsers$ = this.loadUsers.asObservable();
    users$: Observable<UserResponse> = this.loadUsers$.pipe(
        switchMap((req: UserRequest) => this.api.fetchUsers(req))
    );

    private editUser = new Subject<User>();
    private editUser$ = this.editUser.asObservable();
    user$: Observable<any> = this.editUser$.pipe(
        mergeMap((req: User) => this.api.editUser(req))
    );

    private exportUsers = new Subject<boolean>();
    private exportUsers$ = this.exportUsers.asObservable();
    allUsers$: Observable<any> = this.exportUsers$.pipe(
        exhaustMap(() => this.api.exportUsers())
    );

    constructor(private api: ApiService) {}

    onLoadUsers(userRequest: UserRequest) {
        this.loadUsers.next(userRequest);
    }

    onEditUser(user: User) {
        this.editUser.next(user);
    }

    onImportUsers(users: User[]) {
        return from(users).pipe(concatMap((user) => this.api.createUser(user)));
    }

    onExportUsers() {
        this.exportUsers.next(true);
    }
}
