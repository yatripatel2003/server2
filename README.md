<b><h1>Automated Email Scheduling API<h1></b>
<br>
<b><h3>Overview</h3></b>
<br>
The Automated Email Scheduling API allows users to schedule emails for automatic delivery at specified times. This API supports both one-time and recurring email scheduling, providing flexibility in managing email communications. It includes features to handle various scheduling needs such as daily, weekly, monthly, and quarterly recurring emails.
<br>
<b><h4>Features</h4></b>
<br>
<b>Email Scheduling:</b> Schedule emails to be sent at a specific date and time.<br>
<b>Recurring Emails:</b> Set up emails to recur on a daily, weekly, monthly, or quarterly basis.<br>
<b>Daily Recurrence:</b> Choose specific times for the email to be sent (e.g., 2 PM, 4 PM).<br>
<b>Weekly Recurrence:</b> Select days of the week for the email to be sent (e.g., Monday, Tuesday) and specify the time.<br>
<b>Monthly Recurrence:</b> Choose specific days of the month (e.g., 28th, 23rd) and specify the time.<br>
<b>Quarterly Recurrence:</b> Select specific days of the quarter (e.g., 14th, 9th) and specify the time.<br>
<b>Email Details: Accept payloads that include:<br>
Recipient email address.<br>
Subject of the email.<br>
Body of the email.<br>
Schedule time for the email.<br>
Attachments (if any).<br>
API Endpoints
The API provides the following RESTful endpoints:

## Approach

### Design and Implementation

1. **Schema Design**:
   - Used Mongoose to define a schema for storing email scheduling details in MongoDB.
   - The schema includes fields for recipient, subject, body, schedule time, recurrence details, and attachments.
     ![image](https://github.com/user-attachments/assets/462723cd-90a4-4dc9-9351-ec65f9945c99)
  
     
     ![image](https://github.com/user-attachments/assets/cff8b9b7-f870-4f27-9b52-b3ab43db7961)

     ![image](https://github.com/user-attachments/assets/689cebe4-f5c7-42ba-b08e-0e8b35833631)


     

     
2. **Email Scheduling**:
   - Implemented a function to handle one-time email scheduling using the `node-cron` library.
   - Converted the specified schedule time into a cron format and set up a cron job to trigger the email-sending function at the appropriate time.
   - ![image](https://github.com/user-attachments/assets/25d7c048-6f68-44b4-bb0a-8e73c22ebd28)


3. **Recurring Emails**:
   - Developed functions to handle recurring email scheduling based on daily, weekly, monthly, and quarterly frequencies.
   - Each recurrence type is mapped to a specific cron pattern to ensure emails are sent according to the user's specified recurrence frequency.

4. **API Endpoints**:
   - **POST /schedule-email**: Allows users to schedule a new email, either for a one-time delivery or recurring delivery based on the provided details.
   - **GET /scheduled emails**: Retrieves a list of all scheduled emails.
   - **GET /scheduled-emails/{id}**: Retrieves details of a specific scheduled email using its ID.
   - **DELETE /scheduled-emails/{id}**: Cancels a scheduled email by its ID.

5. **Email Sending**:
   - Utilized `nodemailer` for sending emails, including handling attachments.
   - Configured `nodemailer` to work with Gmail for sending emails.

6. **Error Handling**:
   - Implemented error handling for invalid schedule times and other potential issues, ensuring robust and reliable API behavior.

## API Endpoints

### 1. **POST /schedule-email**
   - **Description**: Schedule an email to be sent at a specific date and time. Allows for both one-time and recurring email scheduling.
   - **Request Body**:
   - POST http://localhost:3018/schedule-email
     ![image](https://github.com/user-attachments/assets/d395f1af-848d-4884-a68b-0903e37fe06c)


### 2. **GET /scheduled-emails**
   - **Description**: Retrieve a list of all scheduled emails.
   - **Response**:
   - GET http://localhost:3018/schedule-email
     ![image](https://github.com/user-attachments/assets/bb5821d3-41d0-4f00-8477-00f5eb3ecde2)


### 3. **GET /scheduled-emails/{id}**
   - **Description**: Retrieve details of a specific scheduled email by its ID.
   - **Response**:
     GET http://localhost:3018/schedule-email/66acb5bbbac53f217dc40330
     ![image](https://github.com/user-attachments/assets/56e4bee9-1469-4b6d-bda5-c04a41a6829b)


### 4. **DELETE /scheduled-emails/{id}**
   - **Description**: Cancel a scheduled email by its ID.
   - **Response**:
   - DELETE http://localhost:3018/schedule-email/66acb5bbbac53f217dc40330
   - ![image](https://github.com/user-attachments/assets/eb3ff572-ad7e-4bf9-9aea-441f80b0ffca)

     

## Setup

To set up and run the project locally, follow https://github.com/yatripatel2003/server2 and then go to server2.js, copy the code, and write node server.js in the console.

Also deployed it on Vercel, but is giving an error.Below is the link

https://server2-zh4m-6q360tkja-yatris-projects.vercel.app/



