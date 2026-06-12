/**
 * RSVP Party — Google Apps Script Web App
 *
 * SETUP:
 * 1. Go to https://sheets.google.com → New → Google Sheets → name it "Housewarming RSVP"
 * 2. In row 1, add headers: Timestamp | Name | Attending | RSVP'd At
 * 3. Extensions → Apps Script → paste this code
 * 4. Save (Ctrl+S), then Deploy → New deployment
 *    - Type: Web app
 *    - Execute as: Me
 *    - Who has access: Anyone
 * 5. Copy the Web app URL and paste it into the RSVP page's NEXT_PUBLIC_GAS_URL env var
 */

function doPost(e) {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

  try {
    var payload = JSON.parse(e.postData.contents);
    var name = (payload.name || "").trim();
    var attending = payload.attending;

    if (!name || name.length < 2) {
      return jsonResponse({ error: "Name must be at least 2 characters." }, 400);
    }

    var now = new Date();
    var timestamp = Utilities.formatDate(now, Session.getScriptTimeZone(), "MM/dd/yyyy HH:mm");
    var rsvpAt = now.toISOString();

    sheet.appendRow([timestamp, name, attending ? "Yes" : "No", rsvpAt]);

    return jsonResponse({ success: true }, 200);
  } catch (err) {
    return jsonResponse({ error: "Server error. Please try again." }, 500);
  }
}

function doGet() {
  // Allow checking status via GET
  return jsonResponse({ status: "ok" }, 200);
}

function jsonResponse(data, code) {
  return ContentService
    .createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON)
    .setStatusCode(code);
}
