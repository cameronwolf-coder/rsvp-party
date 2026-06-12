/**
 * Housewarming RSVP — Google Apps Script Web App
 * 
 * SETUP (one-time):
 * 1. Go to script.google.com → + New Project
 * 2. Paste this entire file's contents into Code.gs
 * 3. Hit Save (💾) — no project name needed
 * 4. Click Deploy → New deployment → ⚙️ Select type → Web app
 *    - Description: "Housewarming RSVP"
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Click Deploy → Authorize → pick your Google account → Allow
 * 6. Copy the Web app URL (ends in /exec) — paste it into Vercel
 *
 * SHEET SETUP:
 * 1. Make a Google Sheet named "Housewarming RSVP"
 * 2. Add headers in Row 1: Timestamp | Name | Attending | Plus Ones | Notes | RSVPd At
 * 3. Paste your Sheet ID (from the URL) into SPREADSHEET_ID below
 *    e.g. https://docs.google.com/spreadsheets/d/YOUR_SHEET_ID_HERE/edit
 */

const SPREADSHEET_ID = '1q5nEphl5oSvUknqiT1dO4EwI-9frqrFCQL3FFEukXpk';

/**
 * Handles POST requests from the RSVP form.
 * Reads: name, attending, plusOnes, notes
 * Writes a new row to the spreadsheet.
 */
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.openById(SPREADSHEET_ID).getActiveSheet();
    const params = e.parameter;
    const timestamp = new Date().toLocaleString('en-US', {
      timeZone: 'America/Chicago',
      dateStyle: 'medium',
      timeStyle: 'short'
    });

    const row = [
      timestamp,
      params.name || '',
      params.attending || 'yes',
      params.plusOnes || '0',
      params.notes || '',
      new Date().toISOString()
    ];

    sheet.appendRow(row);

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success', message: 'RSVP received!' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Handles GET requests — used by Vercel to verify the endpoint is live.
 * Returns a simple 200 OK with a label.
 */
function doGet(e) {
  return ContentService
    .createTextOutput(JSON.stringify({ status: 'ok', service: 'Housewarming RSVP' }))
    .setMimeType(ContentService.MimeType.JSON);
}
