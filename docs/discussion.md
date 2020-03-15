---
layout: default
---

Author: MinhTu Thomas Hoang
Last modified at March 15th 2020

# Discussion on Translating From Modelling Language of OOP Class Diagram To Code Implementation of JavaScript

![UML Class Diagram](/assets/images/strategy-class-diagram.png)

Because _JavaScript_ doesn’t provide support for defining classes natively, the alternative way of creating objects having the same properties & methods is by defining constructor functions. In [`model/Student.js`](https://github.com/mnhthng-thms/strategy-api-demo/blob/master/model/Student.js) code snippet below, constructor function `Student` ensures that objects created using this constructor will all have 4 properties: `id` (which is implicitly understood as of type `String`), `takenCourses` (which is implicitly understood as of type `Array`), `isSame` (which is implicitly understood as of type `Function`) and `addTakenCourses` (which is implicitly understood as of type `Function`). The significance of the `this` keyword is that it helps binding 4 variables of `id`, `takenCourses`, `isSame` & `addTakenCourses` into properties bound to objects constructed by `Student` constructor.

It’s also note-worthy that when translating object-oriented design of UML class diagram into implementation on JavaScript, both attributes and methods of `Student` class are understood as properties of `Student` object instances.

```JS
function Student(idString, takenCourses) {
  this.id = idString.toUpperCase();
  this.takenCourses = takenCourses;
  this.isSame = function (that) {
    return (that.constructor == Student && that.id == this.id);
  };
  this.addTakenCourses = function (...toBeAddedCourses) {
    // filter out existed courses
    toBeAddedCourse = toBeAddedCourses.filter(el => this.takenCourses.indexOf(el) === -1);
    this.takenCourses.push(toBeAddedCourses);
  };
};

module.exports = Student;
```

As observed in [`model/Course.js`](https://github.com/mnhthng-thms/strategy-api-demo/blob/master/model/Course.js) code snippet below, _access modifiers_ (keywords of `public`, `private`, `protected`, etc.) and _type definitions_ are among two of the design elements are lost in translation from modelling language of class diagram to programming language of JavaScript.

The absence of _access modifiers_ in [`model/Course.js`](<(https://github.com/mnhthng-thms/strategy-api-demo/blob/master/model/Course.js)>) code snippet doesn’t imply that property `strategyForAdmission` isn't encapsulated as designed in class diagram: `_strategyForAdmission` variable, which belongs to lexical scope of `Course` constructor function and can’t be accessed from outside the scope of this function, is defined to internally “hold” as-been-designed `strategyForAdmission` value; and `strategyForAdmission` property is defined to function as both setter and getter for `_strategyForAdmission` (if `strategyForAdmission` property function is called with no arguments passed in, it is called as a getter; otherwise if there is one argument passed in, it is called as a setter). Thus, `strategyForAdmission` property is called accessor property (Zakas, 2014).

Following the same logic, the as-been-designed read-only `Course.name` attribute is implemented in _JavaScript_ using _immediately-invoked function expression_ to validate to-be-constructed `Course` objects’ `name` property: if the input course name passed into Course constructor is invalid, not only there will be no `Course` object created but also a runtime error will be thrown.

Regarding the concern of type definitions: As _JavaScript_ is a _loosely-typed_ programming language, type of object properties is not explicitly defined. The lack of restraints on type definition for object properties can provide me, as a developer, with great deal of flexibility, which can be observed in declaration of `Course`’s method properties of `name` and `strategyForAdmission` as discussed above. However, this flexibility is double-edged as it can cause a lot of confusion as well. For example, just by observing [`model/Course.js`](https://github.com/mnhthng-thms/strategy-api-demo/blob/master/model/Course.js) code snippet below, it is hard to deduce which types `_strategyForAdmission` variable can be.

```JS
const LIST_OF_COURSES = [
  "Introduction to Programming",
  "Introduction to Networking",
  "Introduction to Security",
  "Data Structure & Algorithms",
  "Web Design Fundamentals",
  "Software Development Life Cycle",
  "Cloud Computing",
  "Internet of Things",
  "Advanced Programming",
  "Business Applcation Design",
  "Business Skills",
  "Vovinam 1"
];

function Course(courseName, students) {
  let _strategyForAdmission = null;

  this.name = (function () {
    if (LIST_OF_COURSES.indexOf(courseName) >= 0) {
    return courseName;
  }
  else {
    throw "Invalid course name";
  }
  })();

  this.applicants = students;
  this.strategyForAdmission = function (arg) {
    if (!arg) {
      return _strategyForAdmission;
    } else {
    _`strategyForAdmission` = arg;
  }
};

  this.examineApplicants = function () {
    const studentsToBeProcessed = this.applicants;
    this.applicants = _strategyForAdmission(studentsToBeProcessed);
  }
}

module.exports = Course;
```

Similar to the issue of class declaration, _JavaScript_ natively doesn’t provide support for interface declaration either. Hence, to translate `AdmissionStrategy` interface in the above class diagram to implementation in _JavaScript_, once again the abstraction of functions is used instead of the abstraction of classes & interfaces. As demonstrated in [`model/AdmissionStrategy.js`](https://github.com/mnhthng-thms/strategy-api-demo/blob/master/model/AdmissionStrategy.js) below, and `AdmissionStrategy` function takes a string as courseName argument and return a nested function. This nested function takes an array of `Student` objects. Inside the nested function, a checkAdmission object is declared to have pairs of _key_ and _value_ which semantically equals _as-been-designed `AdmissionStrategy` class name_ and _its concrete `checkAdmission` method implementation_. Then, this nested function is defined to return list of admitted students by invoking a `checkAdmission`’s property value (which is defined as of type `Function`) corresponding to the `courseName` argument of `AdmissionStrategy` function call.

```JS
const AdmissionStrategy = (courseName) => (students) => {
  const checkAdmission = new Object();

  checkAdmission["Cloud Computing"] = () =>
    students
    .filter(el => el.takenCourses.length > 3)
    .filter(el => {
      const hasCourse = (c) => (el.takenCourses.indexOf(c) >= 0);
      return (hasCourse("Introduction to Networking") && hasCourse("Introduction to Security"))
    });

  checkAdmission["Advanced Programming"] = () =>
    students
    .filter(el => el.takenCourses.length > 4)
    .filter(el => {
      const hasCourse = (c) => (el.takenCourses.indexOf(c) >= 0);
      return (hasCourse("Introduction to Programming") && hasCourse("Data Structure & Algorithms")
        && hasCourse("Software Development Life Cycle"))
    });

  return checkAdmission[courseName]();
}

module.exports = AdmissionStrategy;
```

Return to the discussion on type of `Course` function’s inner `_strategyForAdmission` variable in previous passage: To give a recap, in the above class diagram, private `strategyForAdmission` attribute is designed to be assigned with objects constructed by classes specialising `AdmissionStrategy` interface; and `examineApplicants` method is designed to execute the chosen strategy’s `checkAdmission` method and assign the returned result to `Course` object’s `applicants` attribute. This logic is translated into _JavaScript_ implementation so that `_strategyForAdmission` will be assigned with _partially-applied function call_ of `AdmissionStrategy` (which having `courseName` argument passed in); and `examineApplicants` method property is defined to apply the remaining argument (which is value of `applicants` property). The way this `examineApplicants` method handles the returned data is still as same as designed in the above class diagram. This whole process is illustrated in `AdmissionStrategy` & `examineApplicants` function call in [`server.js`](https://github.com/mnhthng-thms/strategy-api-demo/blob/master/server.js) code snippet below.

```JS
const express = require('express');
const path = require('path');
const Student = require('./model/Student');
const Course = require('./model/Course');
const AdmissionStrategy = require('./model/AdmissionStrategy');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(\_\_dirname, 'view')));

app.get('/', (req, res) => {
res.sendFile(path.join(\_\_dirname, '/view/index.html'))
});

app.post('/:courseName', (req, res) => {
  try {
    const givenStudents = req.body
      .map(el => {
        return new Student(el.id, el.taken_courses);
      });

    let thisCourse = new Course(decodeURI(req.params.courseName), givenStudents);
    thisCourse.strategyForAdmission = AdmissionStrategy(decodeURI(req.params.courseName));
    thisCourse.examineApplicants();

    const admittedApplicants = thisCourse.applicants;

    res.status(200).json(admittedApplicants);
  }
  catch (error) {
    res.status(400).json({ message: error.toString() });
  }
});

app.listen(3000, () => {
  console.log('Server up and running on port 3000');
});
```

![Front-end screenshots](/assets/images/screenshots.gif)

Given the use-case example in GIF screenshot above, the body JSON data of respectively POST request & response are:

```JSON
[
	{
		"id": "GCH01",
		"taken_courses": [
			"Introduction to Programming",
			"Introduction to Networking",
			"Introduction to Security",
			"Data Structure & Algorithms",
			"Web Design Fundamentals",
			"Software Development Life Cycle",
			"Cloud Computing",
			"Internet of Things",
			"Business Applcation Design",
			"Business Skills",
			"Vovinam 1"
		]
	},
	{
		"id": "GCH02",
		"taken_courses": [
			"Data Structure & Algorithms",
			"Web Design Fundamentals",
			"Internet of Things",
			"Business Skills",
			"Vovinam 1"
		]
	},
	{
		"id": "GCH03",
		"taken_courses": [
			"Introduction to Programming",
			"Data Structure & Algorithms",
			"Software Development Life Cycle",
			"Internet of Things",
			"Business Skills",
			"Vovinam 1"
		]
	},
	{
		"id": "GCH04",
		"taken_courses": [
			"Software Development Life Cycle",
			"Cloud Computing",
			"Internet of Things",
			"Business Applcation Design",
			"Business Skills",
			"Vovinam 1"
		]
	},
	{
		"id": "GCH05",
		"taken_courses": [
			"Introduction to Programming",
			"Introduction to Networking",
			"Introduction to Security",
			"Data Structure & Algorithms",
			"Web Design Fundamentals",
			"Software Development Life Cycle",
			"Cloud Computing"
		]
	},
	{
		"id": "GCH06",
		"taken_courses": [
			"Introduction to Programming",
			"Introduction to Security",
			"Web Design Fundamentals",
			"Cloud Computing",
			"Business Applcation Design",
			"Vovinam 1"
		]
	},
	{
		"id": "GCH07",
		"taken_courses": [
			"Introduction to Networking",
			"Data Structure & Algorithms",
			"Software Development Life Cycle",
			"Internet of Things",
			"Business Skills"
		]
	}
]
```

```JSON
[
	{
		"id": "GCH01",
		"takenCourses": [
			"Introduction to Programming",
			"Introduction to Networking",
			"Introduction to Security",
			"Data Structure & Algorithms",
			"Web Design Fundamentals",
			"Software Development Life Cycle",
			"Cloud Computing",
			"Internet of Things",
			"Business Applcation Design",
			"Business Skills",
			"Vovinam 1"
		]
	},
	{
		"id": "GCH03",
		"takenCourses": [
			"Introduction to Programming",
			"Data Structure & Algorithms",
			"Software Development Life Cycle",
			"Internet of Things",
			"Business Skills",
			"Vovinam 1"
		]
	},
	{
		"id": "GCH05",
		"takenCourses": [
			"Introduction to Programming",
			"Introduction to Networking",
			"Introduction to Security",
			"Data Structure & Algorithms",
			"Web Design Fundamentals",
			"Software Development Life Cycle",
			"Cloud Computing"
		]
	}
]
```
