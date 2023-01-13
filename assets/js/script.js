var today = dayjs();
var notesList = [];
var notesArea = $('#notesArea');

//Populates the notes area with the saved notes.
function renderNotes () {
    notesArea.innerHTML = '';  
    notesList = [1, 2, 3]; 
    for (var i = 0; i<notesList.length; i++) {
        var entry = notesList[i];
        console.log(entry);
        var noteItem = $('<p></p>');
        noteItem.text(entry);
        console.log(noteItem);
        notesArea.append(noteItem);
    }

  };

renderNotes();

console.log(today.format('MMM D, YYYY'));

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

  $( "#addNoteBtn" ).on( "click", function() {
    $( "#dialog" ).dialog( "open" );
  });
} );