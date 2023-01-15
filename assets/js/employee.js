var cardArea = document.getElementById("card-area");

var listOfEmployees = [
  {
    name: "Jan",
    status: "Full Time",
    daysAvail: "Su, M, Tu, W, Th, F, Sa",
  },

  {
    name: "Dwight",
    status: "Full Time",
    daysAvail: "Su, M, W, Th, F, Sa",
  },

  {
    name: "Toby",
    status: "Part Time",
    daysAvail: "Th, F, Sa",
  },

  {
    name: "Phyllis",
    status: "Full Time",
    daysAvail: "Su, T, Th, Sa",
  },

  {
    name: "Darryl",
    status: "Part Time",
    daysAvail: "F, Sa, Su",
  },

  {
    name: "Michael",
    status: "Part Time",
    daysAvail: "Tu, W, F, Sa",
  },
];

function createEmployeeCard() {
  for (var i = 0; i < listOfEmployees.length; i++) {
    var entry = listOfEmployees[i];
    console.log(entry);
    var pichu = "employName" + (i + 1);
    console.log(pichu);
    document.getElementById(pichu).textContent = entry.name;

    var pikachu = "status" + (i + 1);
    console.log(pikachu);
    document.getElementById(pikachu).textContent = entry.status;

    var raichu = "days" + (i + 1);
    console.log(raichu);
    document.getElementById(raichu).textContent = entry.daysAvail;
  }
}

createEmployeeCard();
