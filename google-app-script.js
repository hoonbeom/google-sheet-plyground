function doGet(e) {
    const parameter = e.parameter;
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName(parameter.sheet);
    const fields = sheet.getRange(1, 2, 1, sheet.getLastColumn()).getValues()[0].filter(Boolean);

    if (parameter.method === 'POST') {
        const values = fields.map((field) => parameter[field]);
        const id = sheet.getLastRow();
        sheet.appendRow([id, ...values]);

        return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }

    if (parameter.method === 'GET') {
        const data = sheet.getDataRange().getValues();
        const headers = data[0];
        const rows = data.slice(1);
        const result = rows.map((row) =>
            headers.reduce((p, field, index) => {
                p[field] = row[index];
                return p;
            }, {})
        );

        return ContentService.createTextOutput(JSON.stringify(result)).setMimeType(ContentService.MimeType.JSON);
    }

    if (parameter.method === 'PATCH') {
        const id = Number(parameter.id);
        const lastRow = sheet.getLastRow();
        if (id + 1 > lastRow) {
            return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid ID: data does not exist' })).setMimeType(ContentService.MimeType.JSON);
        }

        fields.forEach((field, j) => {
            if (typeof parameter[field] !== 'undefined') {
                sheet.getRange(id + 1, j + 2).setValue(parameter[field]);
            }
        });

        return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }

    if (parameter.method === 'PUT') {
        const id = Number(parameter.id);
        const lastRow = sheet.getLastRow();
        if (id + 1 > lastRow) {
            return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid ID: data does not exist' })).setMimeType(ContentService.MimeType.JSON);
        }

        const values = fields.map((field) => parameter[field]);
        sheet.getRange(id + 1, 1, 1, values.length + 1).setValues([[id, ...values]]);

        return ContentService.createTextOutput(JSON.stringify({ success: true })).setMimeType(ContentService.MimeType.JSON);
    }

    return ContentService.createTextOutput(JSON.stringify({ error: 'Invalid method' })).setMimeType(ContentService.MimeType.JSON);
}
