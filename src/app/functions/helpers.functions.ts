export function downloadFile(list: any[], fileName: string, mapper: Function) {
    const blob = new Blob([mapper(list)], {
        type: 'application/octet-stream',
    });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
    a.remove();
}

export function mapObjectListToCsv(
    items: any[],
    options = { delimiter: ';', eol: '\r\n' }
): string {
    if (items.length === 0) {
        return '';
    }
    const csvContent = [];
    const keys = Object.keys(items[0]);
    const headers = keys.map((key: string) => key.toUpperCase());
    csvContent.push(headers.join(options.delimiter));
    items.forEach((item) => {
        const row: string[] = [];
        keys.forEach((key) => {
            row.push(item[key]);
        });
        csvContent.push(row.join(options.delimiter));
    });

    return csvContent.join(options.eol);
}

export function removeKeyFromList(list: any[], key: string) {
    return list.map((item) => {
        delete item[key];
        return item;
    });
}
