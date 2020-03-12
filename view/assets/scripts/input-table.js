var LIST_OF_ALL_COURSES = [
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

var normalFormToSelector = function (courseName) {
  return courseName.split(' ').map(el => el.toLowerCase()).join('-');
}

var inputTableBody = document.querySelector('table.applcantsInfo');
var tblRow = document.createElement('tr');
var txtCellWrapper = document.createElement('td');
var txtStudentId = document.createElement('input');
txtStudentId.setAttribute('type', 'text');
txtStudentId.setAttribute('placeholder', 'Student ID');
txtCellWrapper.appendChild(txtStudentId);
tblRow.appendChild(txtCellWrapper);

var anOptionWrapper = document.createElement('div');
var labelForOptions = document.createElement('label');
var checkbox = document.createElement('input');
anOptionWrapper.classList.value = 'form-check';
checkbox.classList.value = 'form-check-input';
checkbox.setAttribute('type', 'checkbox');
labelForOptions.classList.value = 'form-check-label';

/*Render a couple of label and checkbox */
var renderAnOption = function (courseName) {
  let anOptionWrapperPrime = anOptionWrapper.cloneNode(true);
  let labelForOptionsPrime = labelForOptions.cloneNode(true);
  let checkboxPrime = checkbox.cloneNode(true);

  checkboxPrime.value = courseName;
  labelForOptionsPrime.innerHTML = courseName;
  anOptionWrapperPrime.classList.add(normalFormToSelector(courseName));

  anOptionWrapperPrime.appendChild(checkboxPrime);
  anOptionWrapperPrime.appendChild(labelForOptionsPrime);
  return anOptionWrapperPrime;
}

var renderOptionsCell = function (courseNameStrategy) {
  var optionsCellWrapper = document.createElement('td');

  var LIST_FOR_THIS_COURSE = LIST_OF_ALL_COURSES.filter(el => el !== courseNameStrategy);
  var options = LIST_FOR_THIS_COURSE.map(elCourse => renderAnOption(elCourse));
  options.forEach(el => optionsCellWrapper.appendChild(el));

  return optionsCellWrapper;
}

var renderARow = function (courseNameStrategy) {
  let tblRowPrime = tblRow.cloneNode(true);
  tblRowPrime.appendChild(renderOptionsCell(courseNameStrategy));

  return tblRowPrime;
}