<b><h2>Automated Email Scheduling API<h2></b>
<br>
<br>
<b><h3>Overview</h3></b>
<br>
The Automated Email Scheduling API allows users to schedule emails for automatic delivery at specified times. This API supports both one-time email scheduling and recurring email scheduling, providing flexibility in managing email communications. It includes features to handle various scheduling needs such as daily, weekly, monthly, and quarterly recurring emails.
<br>
<b><h3>Features</h3></b>
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

2. **Email Scheduling**:
   - Implemented a function to handle one-time email scheduling using the `node-cron` library.
   - Converted the specified schedule time into a cron format and set up a cron job to trigger the email sending function at the appropriate time.

3. **Recurring Emails**:
   - Developed functions to handle recurring email scheduling based on daily, weekly, monthly, and quarterly frequencies.
   - Each recurrence type is mapped to a specific cron pattern to ensure emails are sent according to the user's specified recurrence frequency.

4. **API Endpoints**:
   - **POST /schedule-email**: Allows users to schedule a new email, either for a one-time delivery or recurring delivery based on the provided details.
   - **GET /scheduled-emails**: Retrieves a list of all scheduled emails.
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
     ```json
     {
       "recipient": "recipient@example.com",
       "subject": "Email Subject",
       "body": "Email Body",
       "scheduleTime": "2024-08-03T10:00:00.000Z",
       "recurring": {
         "frequency": "daily", // Options: daily, weekly, monthly, quarterly
         "time": "15:17", // Optional: Time of the day in HH:MM format
         "day": "Monday" // Optional: Day of the week or month
       },
       "attachments": ["path/to/attachment1", "path/to/attachment2"]
     }
     ```

### 2. **GET /scheduled-emails**
   - **Description**: Retrieve a list of all scheduled emails.
   - **Response**:
     ```json
     [
       {
         "id": "email_id",
         "recipient": "recipient@example.com",
         "subject": "Email Subject",
         "body": "Email Body",
         "scheduleTime": "2024-08-03T10:00:00.000Z",
         "recurring": {
           "frequency": "daily",
           "time": "15:17"
         },
         "attachments": ["path/to/attachment1", "path/to/attachment2"]
       }
     ]
     ```

### 3. **GET /scheduled-emails/{id}**
   - **Description**: Retrieve details of a specific scheduled email by its ID.
   - **Response**:
     ```json
     {
       "id": "email_id",
       "recipient": "recipient@example.com",
       "subject": "Email Subject",
       "body": "Email Body",
       "scheduleTime": "2024-08-03T10:00:00.000Z"
     }
     ```

### 4. **DELETE /scheduled-emails/{id}**
   - **Description**: Cancel a scheduled email by its ID.
   - **Response**: Returns HTTP status 204 if the email was successfully deleted.

## Installation and Setup

To set up and run the project locally, follow these steps:

1. **Clone the repository**:
   ```sh
   git clone https://github.com/your-username/your-repository.git
