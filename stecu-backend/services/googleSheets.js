const { google } = require('googleapis');
const path = require('path');

const SPREADSHEET_ID = "1EzNw31a1gepyEr-9UBkci_AHupsNgEuxz4_DpxooSBc"; // We'll set this later

const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, '../credentials.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

exports.saveSubmission = async (data) => {
    try {
        const client = await auth.getClient();
        const sheets = google.sheets({ version: 'v4', auth: client });

        const values = [[
            new Date().toISOString(),
            data.fullName,
            data.email,
            data.phoneNumber,
            data.institution,
            data.projectDescription,
            data.selectedServices.join(', '),
            data.techStack,
            data.expectedDeadline,
            data.supportingDocuments,
            data.additionalInformation,
            data.keywords,
            data.priceEstimate
        ]];

        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Sheet1!A1',
            valueInputOption: 'USER_ENTERED',
            resource: { values }
        });

        console.log('✅ Successfully saved to Google Sheets');
    } catch (err) {
        console.error('❌ Failed to save to Google Sheets:', err.message);
        throw err; // Important so backend knows error happened
    }
};

