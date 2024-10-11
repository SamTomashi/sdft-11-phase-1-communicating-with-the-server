/*** Business Logic */

// Fetch all students from the database
function getStudents() {
  fetch("http://localhost:3003/students", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
  })
    .then((response) => response.json())
    .then((students) => displayStudents(students)); // pass fetched data to the UI logic
}

//fetching student by id from the database
function getStudentById(id) {
  return fetch(`http://localhost:3003/students/${id}`, {
    method: "GET", // if you use POST, remember to pass the data to the body commented below
    headers: {
      "Content-Type": "application/json",
      accept: "application/json",
    },
    // body: JSON.stringify({})
  })
    .then((response) => response.json())
    .then((data) => data);
}

/*** UI Logic */
function displayStudents(students) {
  const cardsContainer = document.querySelector("#students-container");
  const cards = students.map((student) => {
    return `
    <div class="card view" id=${student.id}>
        <img
          src="http://via.placeholder.com/150x200"
          class="card-img-top"
          alt="${student.name}"
        />
        <div class="card-body">
          <h6 class="card-text">
            ${student.name}
          </h6>
          <div class="d-grid gap-2 col mx-auto">
              <button id=${student.id} class="btn-toggle btn btn-primary btn-sm">
              View
              </button>
          </div>
          <ul class="hidden">
            <li>${student.gender}</li>
            <li>${student.age}</li>
            <li>${student.cohort}</li>
          </ul>
        </div>
      </div>
    `;
  });

  cardsContainer.innerHTML += cards;

  cardsContainer.addEventListener("click", function (event) {
    if (event.target.classList.contains("btn-toggle")) {
      // event.target.parentElement.nextElementSibling.classList.toggle("hidden");
      getStudentById(event.target.id).then((response) =>
        viewStudentDetails(response)
      );
    }
  });
}

function viewStudentDetails(student) {
  document.querySelector("#current-student").innerHTML = `
  <tr>
    <td>${student.id}</td>
        <td>${student.name}</td>
        <td>${student.gender}</td>
        <td>${student.age}</td>
        <td>${student.cohort}</td>
  </tr>
  `;
}
window.addEventListener("DOMContentLoaded", function () {
  getStudents();
});
