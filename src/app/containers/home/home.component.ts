import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { catchError, map, take, takeUntil, tap } from 'rxjs/operators';
import { User, UserResponse } from 'src/app/interfaces/users';
import * as helpers from '../../functions/helpers.functions';
import { UsersService } from './../../services/users.service';

export interface Paginator {
    page: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    total: number;
}

@Component({
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit, OnDestroy {
    private unsubscribe$ = new Subject<boolean>();
    private user$: Observable<any> = this.service.user$;
    private userResponse$: Observable<UserResponse> = this.service.users$;
    data$ = this.userResponse$.pipe(
        tap(
            (response) => {
                console.log('success reponse', response);

                const newPaginator: Paginator = {
                    ...this.paginator,
                    page: response.page,
                    total: response.total,
                };
                this.paginator = newPaginator;
                this.loading = false;
            },
            (error) => {
                console.error('error response', error);
                this.loading = false;
            }
        ),
        map((response) => response.data),
        catchError(() => {
            return of(null);
        })
    );
    paginator: Paginator = {
        page: 1,
        rowsPerPage: 5,
        rowsPerPageOptions: [5, 10, 20],
        total: 0,
    };
    loading = false;

    constructor(private service: UsersService) {}

    ngOnInit(): void {
        this.onPageChange(this.paginator);
        this.user$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe(() => this.onPageChange(this.paginator));
        this.service.allUsers$
            .pipe(takeUntil(this.unsubscribe$))
            .subscribe((res) => {
                const blob = new Blob([helpers.mapObjectListToCsv(res)], {
                    type: 'application/octet-stream',
                });
                const a = document.createElement('a');
                a.href = URL.createObjectURL(blob);
                a.download = 'Users.csv';
                a.click();
                a.remove();
            });
    }

    onPageChange(event: { page: number; rowsPerPage: number }) {
        this.loading = true;
        const newPaginator: Paginator = {
            ...this.paginator,
            page: event.page,
            rowsPerPage: event.rowsPerPage,
        };
        this.paginator = newPaginator;
        this.service.onLoadUsers({
            page: event.page,
            rowsPerPage: event.rowsPerPage,
        });
    }

    onStatusChange(user: User) {
        const updatedUser: User = {
            ...user,
            active: !user.active,
        };
        this.service.onEditUser(updatedUser);
    }

    onImportJSON(event: Event) {
        const files: FileList | null = (event.target as HTMLInputElement).files;
        if (files == null) {
            return;
        }
        if (files[0] == null) {
            return;
        }
        const reader = new FileReader();
        reader.readAsText(files[0], 'UTF-8');
        reader.onload = (evt: any) => {
            const users: any[] = JSON.parse(evt.target.result);
            this.service
                .onImportUsers(users)
                .pipe(take(users.length))
                .subscribe(
                    (res) => console.log(res),
                    (err) => console.log(err),
                    () => this.onPageChange(this.paginator)
                );
        };
        reader.onerror = () => {
            console.log('error reading file');
        };
    }

    onExportCsv() {
        console.log('Export button clicked!');
        this.service.onExportUsers();
    }

    ngOnDestroy(): void {
        this.unsubscribe$.next(true);
        this.unsubscribe$.unsubscribe();
    }
}
