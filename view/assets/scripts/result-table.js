var convertTableBodyToJSON = function (tableBody) {
  return [...tableBody.rows].map(elRow => {
    const resObj = Object();
    // elRow.cell
    resObj['id'] = elRow.cells[0].children[0].value;
    resObj['taken_courses'] = [...elRow.cells[1].children]
      .filter(elChkWrapper => elChkWrapper.children[0].checked)
      .map(elChkWrapper => elChkWrapper.innerText);

    return resObj;
  })
};




