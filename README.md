# 📆 DateLock

**DateLock** is a smart Gmail scheduling web app that lets you pre-write emails and have them automatically sent to the recipient either at a specific date, time or when you reach a specific location.

It's designed for moments like sending an application email at the right time or location — without needing to open Gmail or remember to hit send.

---

##  Key Features

-  **Auto-sends Emails to Any Recipient**  
  Pre-compose an email and choose who to send it to — DateLock will handle the sending automatically.

- 📅 **Date & Time-Based Scheduling**  
  The email is sent in the background exactly when scheduled — no need to open the app.

- 📍 **Location-Based Triggers**  
  Emails can also be triggered based on your location — they get sent when you open the app near a defined place.
---

##  Tech Stack

- **Frontend:** React  
- **Backend:** Node.js + Express.js  
- **Email Service:** Gmail API (for sending real emails)  
- **Location:** Browser Geolocation API  
- **Scheduler:** Node-cron / custom background logic  
- **Database :** MongoDB to store scheduled email data  

---

## 🧠 How It Works

1. The user fills in:
   - Email recipient
   - Subject and message
   - Trigger method: Date , time or location

2. If it's **Date-time-based**, the backend schedules it using a cron job and sends it automatically at the exact time.

3. If it's **location-based**, the app checks the user's current location when opened. If the target location is reached, it sends the email right away.

---






