var today = dayjs();
var notesList = [];
var notesArea = $('#notesArea');
var addNoteBtn = $('#addNoteBtn');
var listOfEmployees = {
    Jan_Levinson: {
      name: "Jan",
      status: "F.T.",
      daysAvail: "Su, M, Tu, W, Th, F, Sa"
    },

    Dwight_Schrute: {
      name: "Dwight",
      status: "F.T.",
      daysAvail: "Su, M, W, Th, F, Sa"
    },

    Toby_Flanderson: {
      name: "Toby",
      Status: "P.T.",
      daysAvail: "Th, F, Sa"
    },

    Phyllis_Lapin_Vance: {
      name: "Phyllis",
      status: "F.T.",
      daysAvail: "Su, T, Th, Sa"
    },

    Darryl_Philbin: {
      name: "Darryl",
      status: "P.T.",
      daysAvail: "F, Sa, Su",
    },

    Michael_Scott: {
      name: "Michael",
      status: "P.T.",
      daysAvail: "Tu, W, F, Sa",
    },
};


//Populates the notes area with the saved notes.
function renderNotes () {
    notesArea.innerHTML = '';  
    notesList = notesFromStorage();
    // notesList = [1, 2, 3]; 
    for (var i = 0; i<notesList.length; i++) {
        var entry = notesList[i];
        console.log(entry);
        var noteItem = $(`<p>${entry.noteTitle}: ${entry.noteDetails}</p>`);
        console.log(noteItem);
        notesArea.append(noteItem);
    }

  };

//Logic to run when the page initializes
function init() {
renderNotes();
};

console.log(today.format('MMM D, YYYY'));



// document.getElementById('newEmployee').addEventListener('click', function() {
//     localStorage.setItem('info',
//     JSON.stringify({ name: "name", status: "FT/PT", daysAvailable: "Su, M, T, W, Th, F, Sa"})
//     );
//     updateUI();
// })

//Event Listener for the add note button
addNoteBtn.on("click", addNote);
// addNoteBtn.addEventListener('click', addNote);

//Function for when a user adds a new note
function addNote (event) {
  event.preventDefault();
  var newNote = {
    noteTitle: $('#noteTitle').val(),
    noteDetails: $('#noteDetails').val()
  };
  console.log(newNote);
  var storedNotesList = notesFromStorage();
  console.log(storedNotesList);
  if (storedNotesList == null) {
    notesList[newNote]
  } else {
    notesList = storedNotesList;
    notesList.push(newNote)
  }
  console.log(storedNotesList);
  localStorage.setItem('notes', JSON.stringify(notesList));
  renderNotes();
}

function notesFromStorage () {
  return JSON.parse(localStorage.getItem("notes"));
}

//Displays the add note dialog box
$( function() {
  $( "#dialog" ).dialog({
    autoOpen: false,
    show: {
      effect: "blind",
      duration: 1000
    },
    hide: {
      effect: "explode",
      duration: 1000
    }
  });

  $( "#noteDialog" ).on( "click", function() {
    $( "#dialog" ).dialog( "open" );
  });
} );

init();