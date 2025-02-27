document.addEventListener("DOMContentLoaded", getAllStudents); 

const submitButtonElement = document.getElementById('submit');
submitButtonElement.addEventListener('click', addStudent);

async function getAllStudents(){

  const tBodyResultsTableElement = document.querySelector('table tbody');
  const baseUrl = 'http://localhost:3030/jsonstore/collections/students';

  tBodyResultsTableElement.innerHTML = '';

  try {
    await fetch(baseUrl)
      .then((res) => res.json())
      .then((students) => {

          Object.values(students).forEach(student => {
                  
              const trElement = document.createElement('tr');

              const tdFirstNameElement = document.createElement('td');
              tdFirstNameElement.textContent = student.firstName;

              const tdLastNameElement = document.createElement('td');
              tdLastNameElement.textContent = student.lastName;

              const tdFacultyNumberElement = document.createElement('td');
              tdFacultyNumberElement.textContent = student.facultyNumber;

              const tdGradeElement = document.createElement('td');
              tdGradeElement.textContent = student.grade;

              trElement.appendChild(tdFirstNameElement);
              trElement.appendChild(tdLastNameElement);
              trElement.appendChild(tdFacultyNumberElement);
              trElement.appendChild(tdGradeElement);
              
              tBodyResultsTableElement.appendChild(trElement);

          });
          
      })
  } catch (error) {
      console.error("Error fetching students:", error);
  }

  
}
async function addStudent(e) {
    e.preventDefault();

    const baseUrl = 'http://localhost:3030/jsonstore/collections/students';

    const firstNameInput = document.querySelector('input[name="firstName"]');
    const lastNameInput = document.querySelector('input[name="lastName"]');
    const facultyNumberInput = document.querySelector('input[name="facultyNumber"]');
    const gradeInput = document.querySelector('input[name="grade"]');

    const firstName = firstNameInput.value.trim();
    const lastName = lastNameInput.value.trim();
    const facultyNumber = facultyNumberInput.value.trim();
    const grade = gradeInput.value;


    if (isNaN(grade) || isNaN(facultyNumber)) {
      return alert('Grade and Faculty Number must be Number');
    }

    if (firstName == '' || lastName == '' || facultyNumber == '' || grade == '') {
        alert('All fields are required!');
    }

    
    await fetch(baseUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        firstName: firstName, 
        lastName: lastName,
        facultyNumber: facultyNumber,
        grade: grade }),
      }).then((res) => res.json())
        .then(() => {
          firstNameInput.value = '';
          lastNameInput.value = '';
          facultyNumberInput.value = '';
          gradeInput.value = '';
        })
      .catch((err) => console.error(err.message));

      getAllStudents();
}



