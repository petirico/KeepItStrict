# Policy Shift — Executive Summary

## Overview

**"Strict" cancellation policy has been removed.** All listings now default to "Firm" cancellation policy unless hosts actively opt-out before October 1st.

## Firm Cancellation Policy Timeline

- **≥30 days before check-in** → 100% refund
- **30-7 days before check-in** → 50% refund  
- **<7 days before check-in** → 0% refund

## The Problem

Small-inventory hosts now face significant revenue risk when guests book dates months in advance and cancel ≥30 days before check-in, resulting in zero revenue despite blocked availability.

## The Solution: Calendar Window Strategy

**Defensive tactic:** Expose availability only within a rolling window (e.g., 30 days). Dates beyond this window remain blocked, ensuring any booking will fall within the 50% refund band at worst.

### Key Advantage

**Platform-Specific Protection:** This solution creates limitations specifically for Airbnb while preventing guests from blocking your calendar without impacting your availability on other booking platforms (Booking.com, VRBO, direct bookings, etc.). You maintain full flexibility across all other channels.

## Implementation: Google Apps Script Calendar Generator

### How It Works

| Component | Function |
|-----------|----------|
| **Sheet Cell B2** | Controls rolling-window length in days. Modify value and redeploy for new horizon. |
| **getBufferDays()** | Reads B2, validates range (1-364 days). Defaults to 30 days if invalid. |
| **refreshBlock()** | Calculates cut-off date (today + buffer). Generates all-day busy events from cut-off date through 5 years. |
| **ICS Output** | Returns as text/calendar format via public Web app URL. |
| **Airbnb Integration** | Imports URL via Calendar Sync. Each event blocks corresponding nights. |

### Quick Setup Steps

1. **Script Setup**
   - Paste code into Google Apps Script
   - Replace `SPREADSHEET_ID` with your sheet ID
   - Set cell B2 to desired buffer days (e.g., 30)

2. **Deployment**
   - Deploy → New deployment → Web app
   - Execute as: Me
   - Access: Anyone
   - Copy the resulting URL

3. **Airbnb Integration**
   - Airbnb → Availability → Connected calendars → Import calendar
   - Paste the Web app URL
   - **Important:** Add this URL to the calendar imports section of each of your Airbnb listings that you want to protect

### Result

Guests can only book within the next B2 days, effectively capping cancellation exposure at 50% maximum.

## Resources

- **Google Sheet Template:** [Access Here](https://docs.google.com/spreadsheets/d/1IUTRKD7PGOo0ssOyKqZp-0CsJpMGtjX3hPYlKr3SB8k/)
- **Live Test Calendar URL:** [Test Implementation](https://script.google.com/macros/s/AKfycbzHSojgtehBN9M9BeLVs8WGBzq3Gmco6XGg2DdJq9do6iBo893cazhekM9i4laqr-E6/exec?aribn=keepitstrict)
- **Calendar Viewer for Testing:** [Online ICS Feed Viewer](https://larrybolt.github.io/online-ics-feed-viewer/)

### Testing Your Setup

You can test the calendar blocking functionality using our live example:
1. **View the calendar feed:** Copy the [Live Test Calendar URL](https://script.google.com/macros/s/AKfycbzHSojgtehBN9M9BeLVs8WGBzq3Gmco6XGg2DdJq9do6iBo893cazhekM9i4laqr-E6/exec?aribn=keepitstrict) 
2. **Visualize the blocking:** Paste the URL into the [Online ICS Feed Viewer](https://larrybolt.github.io/online-ics-feed-viewer/) to see how the next 30 days remain open while future dates are blocked

## Advanced Setup with Automation

### Complete Deployment Workflow

1. **Open linked sheet** → Extensions → Apps Script → paste code
2. **Project Settings** → enable V8 runtime
3. **Deploy** → New deployment → Web app
   - Execute as: Me
   - Access: Anyone
   - Copy /exec URL, append `?airbn=keepitstrict`
4. **Airbnb Setup** → Calendar sync → Import calendar → paste full URL into each listing you want to protect
5. **Automation** → Apps Script dashboard → Triggers → Add trigger
   - Function: refreshNow
   - Event source: Time-driven
   - Frequency: Daily

### Final Outcome

Airbnb displays only the next B2 days as bookable, with all future dates automatically blocked, protecting hosts from long-term booking cancellations while maintaining booking flexibility within the safe window.

---

## Disclaimer

**Important Notice:** This calendar blocking solution is provided as-is for educational and informational purposes only. By using this script and methodology, you acknowledge and agree to the following:

### Use at Your Own Risk
- This solution involves automated calendar management that directly affects your property's booking availability
- Test thoroughly in a non-production environment before implementing on active listings
- Always maintain backup booking management procedures

### Responsibility and Liability
- **You are solely responsible** for monitoring and managing your calendar accuracy
- **You assume full liability** for any lost bookings, revenue impacts, or guest experience issues
- The authors and contributors are **not responsible** for any damages, losses, or issues arising from the use of this script

### Platform Compliance
- Ensure compliance with Airbnb's Terms of Service and calendar management policies
- Airbnb policies may change; verify current requirements before implementation
- This script may require updates if platform APIs or policies change

### Technical Considerations
- Regularly verify that the calendar sync is functioning correctly
- Monitor for any script errors or failures that could affect availability
- Understand that Google Apps Script has usage limits and quotas

### Professional Advice
- Consider consulting with legal and tax professionals regarding your hosting business
- Evaluate whether this approach aligns with your local regulations and business model
- This is not financial, legal, or business advice

**By implementing this solution, you acknowledge that you have read, understood, and accepted these terms and take full responsibility for its use in your hosting operations.**
