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