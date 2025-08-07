```js
/**
 * Gatekeeper ICS – Airbnb buffer window
 * Sheet B2 sets buffer length (days)
 * Sheet ID fixed: 1IUTRKD7PGOo0ssOyKqZp-0CsJpMGtjX3hPYlKr3SB8k
 */

const TITLE  = 'Not available';
const UTC    = (d,f)=>Utilities.formatDate(d,'UTC',f);
const DAY_MS = 864e5;

/* ===== util ===== */
function getBufferDays(){
  const v = +SpreadsheetApp.openById('1IUTRKD7PGOo0ssOyKqZp-0CsJpMGtjX3hPYlKr3SB8k')
               .getSheetByName('airbnb')
               .getRange('B2').getValue();
  Logger.log('Buffer days: '+v);
  return (v>0&&v<365)?v:30;
}

/* ===== core ===== */
function refreshBlock(days=30){
  const DAYS  = (days>0&&days<365)?days:30;
  const now   = new Date(); now.setUTCHours(0,0,0,0);
  const start = new Date(now.getTime()+(DAYS+1)*DAY_MS);
  const end   = new Date(start.getTime()+365*DAY_MS);
  const stamp = UTC(new Date(),"yyyyMMdd'T'HHmmss'Z'");

  return [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Gatekeeper//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    'UID:block-'+Utilities.getUuid(),
    'DTSTAMP:'+stamp,
    'SUMMARY:'+TITLE,
    'DTSTART;VALUE=DATE:'+UTC(start,'yyyyMMdd'),
    'DTEND;VALUE=DATE:'+UTC(end,'yyyyMMdd'),
    'END:VEVENT',
    'END:VCALENDAR'
  ].join('\r\n');
}

/* ===== web endpoint ===== */
function doGet(){
  return ContentService.createTextOutput(refreshBlock(getBufferDays()))
                       .setMimeType(ContentService.MimeType.ICAL);
}

/* ===== trigger management ===== */
function createHourlyTrigger(){
  const fn='refreshBlockHourly';
  ScriptApp.getProjectTriggers()
           .filter(t=>t.getHandlerFunction()===fn)
           .forEach(t=>ScriptApp.deleteTrigger(t));
  ScriptApp.newTrigger(fn).timeBased().everyHours(1).create();
}
function refreshBlockHourly(){refreshBlock(getBufferDays());}

/* ===== custom menu ===== */
function onOpen(){
  SpreadsheetApp.getUi()
    .createMenu('AirBnb')
    .addItem('Launch Daily Update - Airbnb Calendar','createHourlyTrigger')
    .addItem('Show Web-app URL','showWebAppUrl')
    .addToUi();
}
function showWebAppUrl(){
  SpreadsheetApp.getUi()
    .alert('Calendar link: '+(ScriptApp.getService().getUrl()||''));
}
function my_calendar(){
  return ScriptApp.getService().getUrl()+'?airbnb=live';
}
```
