var notesList = [];
var notesArea = $('#notesArea')

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