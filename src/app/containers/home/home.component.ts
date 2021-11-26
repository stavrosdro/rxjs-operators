import { UsersService } from './../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { UserResponse } from 'src/app/interfaces/users';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

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
export class HomeComponent implements OnInit {
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
    }

    onPageChange(event: { page: number; rowsPerPage: number }) {
        this.loading = true;
        this.service.onLoadUsers({
            page: event.page,
            rowsPerPage: event.rowsPerPage,
        });
    }

    onStatusChange(event: { id: number; newStatus: boolean }) {
        console.log(event);
    }

    onImportCsv() {
        console.log('import');
    }

    onExportCsv() {
        console.log('export');
    }
}
