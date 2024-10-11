/*** Business Logic */

function getStudents() {
  fetch("http://localhost:3000/students",{
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json"
    },
  })
    .then((response) => response.json())
    .then((students) => displayStudents(students));
}

/*** UI Logic */
function displayStudents(students) {
  const cards = students.map((student) => {
    return `
    <div class="card">
        <img
          src="http://via.placeholder.com/150x200"
          class="card-img-top"
          alt="${student.name}"
        />
        <div class="card-body">
          <h6 class="card-text">
            ${student.name}
          </h6>
          <button class="btn btn-primary btn-sm">View Student</button>
        </div>
      </div>
    `;
  });

  document.querySelector("#students-container").innerHTML += cards;
}
window.addEventListener("DOMContentLoaded", function () {
  getStudents();
});
