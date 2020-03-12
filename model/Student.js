function Student(idString, takenCourses) {
  this.id = idString.toUpperCase();
  this.takenCourses = takenCourses;
}

Student.prototype.isSame = function (that) {
  return (that.contructor == Student && that.id == this.id);
}

Student.prototype.addTakenCourses = function (toBeAddedCourses) {
  // filter out existed courses
  toBeAddedCourse = toBeAddedCourses.filter(el => this.takenCourses.indexOf(el) === -1);
  this.takenCourses.push(toBeAddedCourses);
}

module.exports = Student; 