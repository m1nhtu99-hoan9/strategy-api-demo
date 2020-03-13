const express = require('express');
const util = require('util');
const path = require('path');
const Student = require('./model/Student');
const Course = require('./model/Course');
const AdmissionStrategy = require('./model/AdmissionStrategy');

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'view')));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/view/index.html'))
})

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
})

app.listen(3000, () => {
  console.log('Server up and running on port 3000');
})