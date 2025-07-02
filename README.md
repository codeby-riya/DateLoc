# 📆 DateLock

**DateLock** is a smart Gmail scheduling web app that lets you pre-write emails and have them automatically sent to the recipient  at a specific date and time predefined by the user .

It's designed for moments like sending an application email at the right time  — without needing to open Gmail or remember to hit send.

---

##  Key Features

-  **Auto-sends Emails to Any Recipient**  
  Pre-compose an email and choose who to send it to — DateLock will handle the sending automatically.

- 📅 **Date & Time-Based Scheduling**  
  The email is sent in the background exactly when scheduled — no need to open the app.
---

##  Tech Stack

- **Frontend:** React  
- **Backend:** Node.js + Express.js  
- **Email Service:** Gmail API (for sending real emails)    
- **Scheduler:** Node-cron / custom background logic  
- **Database :** MongoDB to store scheduled email data  

---

## 🧠 How It Works

1. The user fills in:
   - Email recipient
   - Subject and message
   - Trigger method: Date and time 

2.  **Date-time-based**, the backend schedules it using a cron job and sends it automatically at the exact time.


---






