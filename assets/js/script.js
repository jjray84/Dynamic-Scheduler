var today = dayjs();
var notesList = [];

var notesArea = document.querySelector('#notesArea');
var addNoteBtn = $('#addNoteBtn');
var weekOf = getCurrentWeek();
var listOfEmployees = JSON.parse(localStorage.getItem("employees"));
if (listOfEmployees == null) {
  listOfEmployees = [];
}
console.log(listOfEmployees);
function openForm() {
  if(document.getElementById("formContainer").style.display === "block"){
    document.getElementById("formContainer").style.display = "none";
  } else
  document.getElementById("formContainer").style.display = "block";
  
}

function closeForm() {
  document.getElementById("formContainer").style.display = "none";
}

function submitForm() {
    var status;
    var daysAvail = [];

  $("#status input:checkbox:checked").each(function () {
    status = $(this).val();
  });

  $("#days-of-week input:checkbox:checked").each(function () {
    daysAvail.push($(this).val());
  });


  let name = document.getElementById("name").value.trim();

  if(name === ""){
    $('#name').val('Enter a valid name');
    return;
  }

  let newEmployee = {
    name: name,
    status: status,
    daysAvail: daysAvail
  }



console.log(newEmployee);
listOfEmployees.push(newEmployee);
localStorage.setItem("employees", JSON.stringify(listOfEmployees));
console.log(listOfEmployees);
closeForm();
init();
}
  


//Populates the notes area with the saved notes.

function renderNotes () {
    notesArea.innerHTML = '';  
    notesList = notesFromStorage();
    if (notesList == null) {
      return
    } else {
    for (var i = 0; i<notesList.length; i++) {
        var entry = notesList[i];
        console.log(entry);
        var noteItem = document.createElement("p");
        noteItem.innerHTML = `${entry.noteTitle}: ${entry.noteDetails}`;
        console.log(noteItem);
        notesArea.append(noteItem);

    }
  }
}

function renderWeek() {
  var element = document.getElementById("dayjsrow");
  element.textContent = weekOf[0] + " - " + weekOf[6];
}

function getCurrentWeek() {
  var day = today.day();
  var monday = today.day(day === 0 ? -6 : 1);
  var days = [];
  for (var i = 0; i < 7; i++) {
    var d = monday.add(i, "day");
    days.push(d.format("MMM D, YYYY"));
  }
  console.log(days);
  return days;
}

function matchDayAvail(day) {
  var matchingEmployees = [];
  for (var key in listOfEmployees) {
    if (listOfEmployees[key].daysAvail.indexOf(day) !== -1) {
      matchingEmployees.push(listOfEmployees[key].name);
    }
  }
  return matchingEmployees;
}

function generateSchedule() {
  var weekdays = ["M", "Tu", "W", "Th", "F", "Sa", "Su"];
  for (var i = 0; i < weekdays.length; i++) {
    var futs = weekdays[i];
    var tutu = matchDayAvail(futs);
    var element = document.getElementById("day" + i);
    var text = " ";
    for (var j = 0; j < tutu.length; j++) {
      text += tutu[j] + "<br>";
    }
    element.innerHTML = text;
  }

  var checkHolidays = function () {
    var day = today.day();
    var monday = today.day(day === 0 ? -6 : 1);
    var days = [];
    for (var i = 0; i < 7; i++) {
      var d = monday.add(i, "day");
      days.push(d.format("YYYY-MM-DD"));
    }

    // //fetch holiday data
    var requestURL = "https://date.nager.at/api/v3/publicholidays/2023/US";

    fetch(requestURL)
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < data.length; i++) {
          for (var k = 0; k < days.length; k++) {
            if (data[i].date == days[k]) {
              console.log(data[i].name);
              var element = document.getElementById("day" + k);
              element.innerHTML = data[i].name;
              element.style.backgroundColor = "yellow";
            }
          }
        }
      });
  };

  checkHolidays();
}

//Logic to run when the page initializes
function init() {
  renderNotes();
  //sets the date of the current week in the box above calendar
  renderWeek();

  //populates the date boxes based on daysAvail in listOfEmployees, using matchDayAvail function.
  //Doesn't execute if there is nothing saved in local storage
  if (listOfEmployees !== null) {
    generateSchedule();
  }
}

//Event Listener for the add note button
addNoteBtn.on("click", addNote);
// addNoteBtn.addEventListener('click', addNote);

//Function for when a user adds a new note
function addNote(event) {
  event.preventDefault();
  var newNote = {
    noteTitle: $("#noteTitle").val(),
    noteDetails: $("#noteDetails").val(),
  };
  console.log(newNote);
  var storedNotesList = notesFromStorage();
  console.log(storedNotesList);
  if (storedNotesList == null) {
    notesList = [newNote];
  } else {
    notesList = storedNotesList;
    notesList.push(newNote);
  }
  console.log(storedNotesList);
  localStorage.setItem("notes", JSON.stringify(notesList));
  renderNotes();
}

function notesFromStorage() {
  return JSON.parse(localStorage.getItem("notes"));
}

function saveEmployeesToStorage() {
  if (listOfEmployees !== null) {
    localStorage.setItem("employees", JSON.stringify(listOfEmployees));
  }
}

//Displays the add note dialog box
$(function () {
  $("#dialog").dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000,
    },
    hide: {
      effect: "explode",
      duration: 1000,
    },
  });

  $("#noteDialog").on("click", function () {
    $("#dialog").dialog("open");
  });
});

$("#nav").click(function () {
  location.reload();
});




let nuts = document.getElementById("display-employees-button");
nuts.addEventListener("click", displayEmployees);
var count = 0;
function displayEmployees() {
  
  if(count === 1){
    return;
  }
  let listOfEmployees = JSON.parse(localStorage.getItem("employees"));

  if(listOfEmployees.length === 0){
    return;
  }

  let select = document.createElement("select");
  select.id = "employee-select";
  for (var i=0; i<listOfEmployees.length; i++) {
    let option = document.createElement("option");
    option.value = listOfEmployees[i].name;
    console.log(option.value);
    option.text = listOfEmployees[i].name;
    select.appendChild(option);
  }
  nuts.appendChild(select);
  count ++;

  let submitBtn = document.createElement("button");
  submitBtn.innerText = "Submit";
  submitBtn.addEventListener("click", removeEmployee);
  let newDiv = document.createElement("div");
  document.getElementById('display-employees-button').appendChild(newDiv);
  document.getElementById('display-employees-button').appendChild(submitBtn);
}



function removeEmployee() {
  let select = document.getElementById("employee-select");
  let selectedEmployee = select.options[select.selectedIndex].value;


  for(var i =0; i<listOfEmployees.length; i++){
    if(listOfEmployees[i].name == selectedEmployee){
      listOfEmployees.splice(i,1);
    }
  }
  localStorage.setItem("employees", JSON.stringify(listOfEmployees));
  location.reload();

}



init();

