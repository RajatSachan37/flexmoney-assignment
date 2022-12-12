# Flexmoney-Assignment

It is a web application which enrolls its users to Yoga classes.
Deployed Link: https://flexmoney-assignment.up.railway.app/

## Tools/Technologies Used

- HTML
- CSS
- Bootstrap
- JavaScript
- Node.js
- Express.js
- EJS
- Mongoose ODM
- MongoDB

## Installation and Usage

This application can easily be installed in following steps:

Step 1: Clone this repository.

Step 2: Open app.js file and replace <DB_CONNECTION_STRING> your mongoDB connection string.

Step 3: Install dependencies using following command:

```bash
  npm install
```

Step 4: Now, to run the app run this command in your console:

```bash
  node ./app.js
```

Step 5: Now, open a web browser and visit:

```bash
  http://localhost:3000/
```

## Working/Logic

- When the user hits the root route i.e.('/'), enrollment form is rendered, this form takes basic details from the user and validate these details. After validation this form sends a POST request to '/enroll' along with these details.
- The '/enroll' POST route takes these user details and first checks if the user is already enrolled, if not it stores the user details in the database.
- The user is then redirected to '/complete-payment/' form where a payment form is rendered through which payment for the classes can be made.
- The payment form then sends a PATCH request to '/complete-enrolment/:id' route this route consists of a 'CompletePayment' mock function which takes these user details and validates the payment.
- If the payment is successful the 'CompletePayment' returns true and the status of enrollment of the user is set as true in the database i.e. the user is now enrolled. The user is then redirected to payment-success page which lets the user know about his/her current enrollment status along with the details of the classes.
- If the payment is unsuccessful the 'CompletePayment returns false and the status of enrollment of the user remains unchanged i.e. false in the database. (By default the value of enrollment is false). The user is then redirected to payment-fail page which lets the user know that his/her payment and enrollment was unsuccessful.

- In addition to these routes there is another '/change-batch' route which lets the enrolled users to change their batch every month.

## Database Schema

The schema for this database consists of the following:

- 'username' stores the value of the user's name, It is unique for every user.

```bash
 username: { type: String, required: true, unique: true }
```

- 'age' stores the value of the age of the user, its minimum and maximum values are 18 and 65 respectively.

```bash
  age: {
    type: Number,
    required: true,
    range: {
      min: { type: Number, min: 18 },
      max: { type: Number, min: 65 },
    },
  }
```

- 'enrolled' tracks the enrollment status of the user, by default it is set to false. It is set to true when the course fee is paid by the user.

```bash
  enrolled: {
    type: Boolean,
    default: false,
  }
```

- 'batch' stores the batch details of the enrolled users. It can have 4 values namely "6-7AM", "7-8AM", "8-9AM", and "5-6PM" i.e. users can enroll to any of these four slots.

```bash
  batch: {
    type: String,
    enum: ["6-7AM", "7-8AM", "8-9AM", "5-6PM"],
    required: true,
    default: "6-7AM",
  }
```
