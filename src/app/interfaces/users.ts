export interface User {
    id?: number;
    firstName: string;
    lastName: string;
    domain: string;
    active: boolean;
}

export interface UserRequest {
    page: number;
    rowsPerPage: number;
}

export interface UserResponse {
    data: User[];
    page: number;
    total: number;
}

export interface Paginator {
    page: number;
    rowsPerPage: number;
    rowsPerPageOptions: number[];
    total: number;
}
