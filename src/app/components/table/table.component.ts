import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import { User } from 'src/app/interfaces/users';

@Component({
    selector: 'app-table',
    templateUrl: './table.component.html',
    styleUrls: ['./table.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TableComponent {
    @Input() data: User[] | null = [];
    @Input() page: number = 0;
    @Input() rowsPerPage: number = 0;
    @Input() rowsPerPageOptions: number[] = [5, 10, 20];
    @Input() total: number = 0;
    @Input() loading: boolean = false;
    @Output() pageChange = new EventEmitter();
    @Output() statusChange = new EventEmitter();

    constructor() {}

    onPageChange() {
        const paginator = { page: this.page, rowsPerPage: this.rowsPerPage };
        this.pageChange.emit(paginator);
    }

    onStatusChange(id: number, newStatus: boolean) {
        this.statusChange.emit({ id, newStatus });
    }
}
