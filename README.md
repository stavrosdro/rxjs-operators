# RxJS Operators: Angular - KISS

This article's purpose is to provide the basic information to a beginner to use the most common RxJS operators and hopefully be the spark of embracing reactive programming in the future. The article's target is to provide not only real-world use cases for switchMap, mergeMap, exhaustMap, concatMap, but also a small project as a starting point.

During my journey on these operators, I hated the examples that look simple and easy but not reveal the operator's true purpose and potential. I will try my best to provide use-cases that are understandable, reproduceable in your applications and getting the basics right.

## Project Info & Structure

Today's project is an Admin Tool that manages employees' access into a company's shared folder. Let's welcome an all-time-classic paginated table with a small checkbox on the right so we are able to turn the employee's status 'Active' or 'Inactive'. We are also able to export a file with the employees and import a file with new employees.

We have a smart component that hosts the table of the company's employees. Specific users' actions trigger events from the smart component and fire some HTTP calls towards an API (in-memory-web-api in our specific case). Of course, anyone can invoke an API when the user is selecting another page or clicks a button and populate the view with the response but now it's time to face some challenges.

## Challenge #1: User clicks paginator **_rapidly_**

So, we have a user that clicks the next-page button so fast that a new request starts before the completion of the previous one. For sure we are able to disable the button until the first response arrives but this approach destroys the user experience and we also force the user to wait until the data arrival and then click the button again. Instead, we should be able to silently **cancel** the pending request and start a new one without interrupting the user.

The component emits an event when user clicks the paginator area and holds a subscription into the `users$` observable.

```
onPageChange(event) {
    this.loading = true;
    const newPaginator = {
        ...this.paginator,
        page: event.page,
        rowsPerPage: event.rowsPerPage,
    };
    this.paginator = newPaginator;
    this.service.onLoadUsers(this.paginator);
}
```

The service transforms the subject's event into an HTTP call. So, the component will be notified when the data arrive due to its subscription to the `users$` observable. The `switchMap` operator is used to unsubscribe from the current subscription (and as a result cancel the pending HTTP request if there are no other subscribers) and subscribe only to the new observable.

```
private loadUsers = new ReplaySubject(1);
private loadUsers$ = this.loadUsers.asObservable();
users$: Observable<any> = this.loadUsers$.pipe(
    switchMap((req) => this.api.fetchUsers(req))
);

onLoadUsers(userRequest) {
    this.loadUsers.next(userRequest);
}
```

This makes absolutely sense. When users change page rapidly, they really don't care for the results of the previous pages but only for the final page where they will land. That's a perfect analogy with the `switchMap` operator that unsubscribes from the previous inner observable and subscribes to the new one.

## Challenge #2: User clicks checkboxes **_rapidly_**

In this scenario user wants to click several checkboxes very fast. Once again, we are able to use a loader in the center of the screen, wait until the checkbox's HTTP request is completed, then fire another request to refresh the page's employees and only after the updated data arrive, hide the loader and allow user to continue. Let's focus on the user. User wants to click a couple of checkboxes to change employees' statuses and wait for the updated data without any interruption. So, we are in a situation that several events will be emitted, we will manage them in **parallel** and update the data after.

The component emits an event when user clicks the checkbox and holds a subscription into the `user$` observable. When an employee is updated successfully a new request is fired to update the data.

```
ngOnInit() {
    this.service.user$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe(() => this.onPageChange(this.paginator));
}

onStatusChange(user) {
    const updatedUser = {
        ...user,
        active: !user.active,
    };
    this.service.onEditUser(updatedUser);
}
```

The service follows the same pattern as before but the `mergeMap` operator is used this time. As a result, the component maintains the subscription in all active requests and it will be notified when any of them is completed.

```
private editUser = new Subject();
private editUser$ = this.editUser.asObservable();
user$: Observable<any> = this.editUser$.pipe(
    mergeMap((req) => this.api.editUser(req))
);

onEditUser(user) {
    this.editUser.next(user);
}
```

With this approach users are able to click many checkboxes very fast and the application is able to process the requests in parallel. Of course, sometimes firing multiple requests towards an API is not the optimal solution. Update a boolean value of an existing employee record is probably fine, but what will happen if we try to create many new users?

## Challenge #3: User imports a JSON file with new employees

For this use case, let's assume that the API can create only one employee each time, but we want to allow the user to provide a file with a list of employees for better experience. The application will read the file and fire an HTTP request for each employee in the list, but if we fire the requests in parallel, we will generate unnecessary load to the backend. The proper way to go is to maintain one active request each time and **start the next one only after the previous is completed**. When all new employees are created, we should refresh the data.

The component will parse the JSON and create a list of employees. We use the `take` operator to subscribe for a number of requests equal to the number of the employees we want to create. After that we will refresh the data.

```
onImportJSON(event) {
    const files = (event.target as HTMLInputElement).files;
    const reader = new FileReader();
    reader.readAsText(files[0], 'UTF-8');
    reader.onload = (evt) => {
        const users = JSON.parse(evt.target.result);
        this.service
            .onImportUsers(users)
            .pipe(take(users.length))
            .subscribe(
                (res) => console.log(res),
                (err) => console.log(err),
                () => this.onPageChange(this.paginator)
            );
    };
}
```

The service will create a new observable for each new employee record by using the `from` operator. The `concatMap` operator will keep a queue with the observables and subscribe in the new one **after the completion** of the previous one, so now we are able to process them in sequence.

```
onImportUsers(users) {
    return from(users).pipe(concatMap((user) => this.api.createUser(user)));
}
```

## Challenge #4: User clicks export CSV button **_rapidly_**

Now the user tries to download a file with all the available employees. For sure this action will take some time and is resource-hungry for the backend. We should protect the API, so we have to **ignore** further events until the active HTTP request is completed.

The component subscribes to `allUsers$` observable and emits one event for each button click.

```
ngOnInit() {
    this.service.allUsers$
        .pipe(takeUntil(this.unsubscribe$))
        .subscribe((res) => {
            helpers.downloadFile(
                res,
                'Users.csv',
                helpers.mapObjectListToCsv
            );
        });
}

onExportCsv() {
    console.log('Export CSV button clicked!');
    this.service.onExportUsers('csv');
}
```

The service will create a new observable when a CSV file is requested but will ignore all other events if there is one that is already active. So, all these massive clicks will have zero impact. The filter operator is used to skip events if another file type (e.g. json) is requested.

```
private exportUsers = new Subject();
private exportUsers$ = this.exportUsers.asObservable();
allUsers$: Observable<any> = this.exportUsers$.pipe(
    filter((file) => file === 'csv'),
    exhaustMap(() => this.api.exportUsers())
);

onExportUsers(type) {
    this.exportUsers.next(type);
}
```

## Bonus

-   Use the `concatMap` operator when users want to upload multiple files at once, but the API accepts only one file per request and you know that file process is resource hungry. You can use a correlation id in the requests and also include the index of the file as long as the total number of the files.
-   Use `async pipe` as much as possible so angular has to unsubscribe from the observables. For the cases that we have to manually subscribe we should make sure that we unsubscribe to avoid memory leaks. An easy way to do it, is by utilizing the `takeUntil` operator combined with a subject that emits a value when the component is destroyed.
