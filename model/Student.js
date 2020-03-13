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