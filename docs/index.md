---
layout: default
---

# Scenario

In an university management system, students can apply themselves for any courses and wait for the system respond to their application request. Each student record contains its student ID and the list of courses they’ve taken. Course need to be modelled into OOP design in a way that its admission requirements can be flexibly change with regard to its course subject. For example, to be admitted to _Cloud Computing_ course, applicants need to have finished at least other courses including 1 course of “Introduction to Programming”.

# Design

## UML Class Diagram, implementing Strategy Design Pattern

![UML Class Diagram](/assets/images/strategy-class-diagram.png)

_Strategy_ is a behavioural design pattern intending to solve problem in which different implementation strategies for a same method can be recognised and organised into separate classes._Strategy_ behavioural design pattern is a good fit for this scenario for the reason that implementation for each set of admission requirements can be modelled into a “strategy”. Each Course instance object can apply and discharge any strategy at its disposal, and strategies can be used interchangeably.

## Application Design Overview

- This application is designed as a full-stack web application, using NodeJS as server-side runtime environment.

- A front-end dynamic web page is designed for end-users to input applicants’ information. When end-users submit this information to server for processing, this information will be collected and converted them into JSON format.

- If the course to be established is “Cloud Computing”, the JSON will be sent to server endpoint of `/Cloud%20Computing` in body of a POST request (note that `Cloud%20Computing` is URI-encoded string of “Cloud Computing”). Similarly, the server endpoint of `/Advanced%20Programming` is reserved for resolving JSON data of students applying to “Advanced Programming” course.

- At server, the mentioned JSON data will be interpreted into array of Student class instances. Depend on which endpoint receives the request, a corresponding Course class instance will be initiated and its strategyForAdmission will be assigned with the respective concrete `AdmissionStrategy` implementation.

### Screenshots of front-end design

![Front-end screenshots](/assets/images/screenshots.gif)

# Code implementation

To view the source code on GitHub, follow [this link](https://github.com/mnhthng-thms/strategy-api-demo).

To read my walkthrough discussion on translating the above OOP class digram to code implementation on _NodeJS_, follow [this link](./discussion.html)

To try this application, clone [this repo](https://github.com/mnhthng-thms/strategy-api-demo) into your local machine. Then:

1. In cloned `strategy-api-demo` folder: Install NodeJS packages dependencies using command `yarn install` or `npm install` (I prefer Yarn).

2. `yarn run start` or `npm start` ( check `scripts` attribute in `package.json` to understand how execution of `start` behaves. Please note that production-ready version for this project is not implemented yet!)

3. Front-end GUI is now accessible at `http://localhost:3000/`.

4. _(Optional)_ You can test if server-side routing behaves as expected by (using Postman, Insomnia, CURL, etc.) sending POST request with request body containing below JSON data to 'http://localhost:3000/Cloud%20Computing'

```JS
[
  {
    "id": "GCH01",
    "taken_courses": [
      "Introduction to Programming",
      "Introduction to Security",
      "Data Structure & Algorithms",
      "Software Development Life Cycle",
      "Advanced Programming",
      "Business Skills",
      "Vovinam 1"
    ]
  },
  {
    "id": "GCH02",
    "taken_courses": [
      "Introduction to Programming",
      "Data Structure & Algorithms",
      "Web Design Fundamentals",
      "Internet of Things",
      "Business Applcation Design",
      "Business Skills"
    ]
  },
  {
    "id": "GCH03",
    "taken_courses": [
      "Introduction to Networking",
      "Introduction to Security",
      "Software Development Life Cycle",
      "Business Skills"
    ]
  },
  {
    "id": "GCH04",
    "taken_courses": [
      "Introduction to Programming",
      "Introduction to Networking",
      "Introduction to Security",
      "Data Structure & Algorithms"
    ]
  },
  {
    "id": "GCH05",
    "taken_courses": [
      "Internet of Things",
      "Advanced Programming",
      "Business Applcation Design",
      "Business Skills",
      "Vovinam 1"
    ]
  }
]
```

---
