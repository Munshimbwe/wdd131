let aCourse = {
  code: "WDD131",
  title: "Dynamic Web Fundamentals",
  credits: 2,
  sections: [
    { section: "001", enrolled: 95, instructor: "Roberto Diaz Rodriguez" },
    { section: "002", enrolled: 80, instructor: "Sarah Gobble" }
  ]
};

function setCourseInformation(course) {
  document.querySelector("#courseName").innerHTML = `${course.code} - ${course.title}`;
}

function renderSections(course) {
  const tbody = document.querySelector("#sections tbody");
  let rows = "";
  for (const section of course.sections) {
    rows += `<tr>
      <td>${section.section}</td>
      <td>${section.enrolled}</td>
      <td>${section.instructor}</td>
    </tr>`;
  }
  tbody.innerHTML = rows;
}

function changeEnrollment(course, sectionNum, isEnrolling) {
  const targetSection = course.sections.find(s => s.section === sectionNum);
  if (targetSection) {
    if (isEnrolling) {
      targetSection.enrolled++;
    } else if (targetSection.enrolled > 0) {
      targetSection.enrolled--;
    }
    renderSections(course);
  }
}

document.querySelector("#enrollStudent").addEventListener("click", () => {
  const sectionNum = document.querySelector("#sectionNumber").value;
  changeEnrollment(aCourse, sectionNum, true);
});

document.querySelector("#dropStudent").addEventListener("click", () => {
  const sectionNum = document.querySelector("#sectionNumber").value;
  changeEnrollment(aCourse, sectionNum, false);
});

setCourseInformation(aCourse);
renderSections(aCourse);
