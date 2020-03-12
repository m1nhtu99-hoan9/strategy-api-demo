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
  this.name = (function () {
    if (LIST_OF_COURSES.indexOf(courseName) >= 0) {
      return courseName;
    }
    else {
      throw "Invalid course name";
    }
  })();

  this.applicants = students;
  this.strategyForAdmission = null;

  this.examineApplicants = function () {
    const studentsToBeProcessed = this.applicants;
    this.applicants = this.strategyForAdmission(studentsToBeProcessed);
  }
}



module.exports = Course;