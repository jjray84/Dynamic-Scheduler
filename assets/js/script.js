
var today = dayjs();
var notesList = [];
var notesArea = $('#notesArea');
var addNoteBtn = $('#addNoteBtn');
var weekOf = getCurrentWeek();
var listOfEmployees = JSON.parse(localStorage.getItem("employees"));
  if (listOfEmployees == null){
    listOfEmployees = [];
  }



function openForm() {
  document.getElementById("formContainer").style.display = "block";
}

function closeForm() {
  document.getElementById("formContainer").style.display = "none";
}

function submitForm() {
  let name = document.getElementById("name").value;
  let status = document.getElementById("status").value;
  let daysAvail = document.getElementById("daysAvail").value;

  let newEmployee = {
    name: name,
    status: status,
    daysAvail: daysAvail
  }

  listOfEmployees.push(newEmployee);
  localStorage.setItem("employees", JSON.stringify(listOfEmployees));
  console.log(listOfEmployees);
  closeForm();
  init();
}


// var listOfEmployees = {
//     Jan_Levinson: {
//       name: "Jan",
//       status: "F.T.",
//       daysAvail: "Su, M, Tu, W, Th, F, Sa"
//     },

//     Dwight_Schrute: {
//       name: "Dwight",
//       status: "F.T.",
//       daysAvail: "Su, M, W, Th, F, Sa"
//     },

//     Toby_Flanderson: {
//       name: "Toby",
//       Status: "P.T.",
//       daysAvail: "Th, F, Sa"
//     },

//     Phyllis_Lapin_Vance: {
//       name: "Phyllis",
//       status: "F.T.",
//       daysAvail: "Su, T, Th, Sa"
//     },

//     Darryl_Philbin: {
//       name: "Darryl",
//       status: "P.T.",
//       daysAvail: "F, Sa, Su",
//     },

//     Michael_Scott: {
//       name: "Michael",
//       status: "P.T.",
//       daysAvail: "Tu, W, F, Sa",
//     },
// };


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
        var noteItem = $(`<p>${entry.noteTitle}: ${entry.noteDetails}</p>`);
        console.log(noteItem);
        notesArea.append(noteItem);
    }
  }
}

function renderWeek(){
    var element = document.getElementById('dayjsrow');
    element.textContent = weekOf[0] + ' - ' + weekOf[6];

}

function getCurrentWeek() {

    var day = today.day();
    var monday = today.day(day === 0 ? -6 : 1);
    var days = [];
    for (var i = 0; i < 7; i++) {
        var d = monday.add(i, 'day');
        days.push(d.format('MMM D, YYYY'));
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

function generateSchedule(){

    var weekdays = ['M','Tu','W','Th','F','Sa','Su'];
    for(var i = 0; i< weekdays.length; i++){
        var futs = weekdays[i];
        var tutu = matchDayAvail(futs);
        var element = document.getElementById('day' + i);
        var text = " ";
        for(var j=0; j< tutu.length; j++){
            text += tutu[j] + "<br>";
        }
        element.innerHTML = text;
    }

    var checkHolidays = function(){
        var day = today.day();
        var monday = today.day(day === 0 ? -6 : 1);
        var days = [];
        for (var i = 0; i < 7; i++) {
            var d = monday.add(i, 'day');
            days.push(d.format('YYYY-MM-DD'));
        }

        // //fetch holiday data 
        var requestURL = 'https://date.nager.at/api/v3/publicholidays/2023/US';

        fetch(requestURL)
            .then(function (response) {
              return response.json();
            })
            .then(function (data) {
              for(var i=0; i<data.length; i++){
                for(var k=0; k<days.length; k++){
                    if(data[i].date == days[k]){
                       console.log(data[i].name);
                       var element = document.getElementById('day' + k);
                       element.innerHTML = data[i].name;
                       element.style.backgroundColor = 'yellow';
                    }
                }
              }
            });
    }

    checkHolidays();

}

//Logic to run when the page initializes
function init() {
renderNotes();
//sets the date of the current week in the box above calendar
renderWeek();

//populates the date boxes based on daysAvail in listOfEmployees, using matchDayAvail function. 
//Doesn't execute if there is nothing saved in local storage
  if(listOfEmployees !== null){
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


function saveEmployeesToStorage(){
  if(listOfEmployees !== null){
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

$('#nav').click(function() {
    location.reload();
});




init();
//this is gonna be our save button
saveEmployeesToStorage();
