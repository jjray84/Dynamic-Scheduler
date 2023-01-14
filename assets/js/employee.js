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
    var banana = "employName" + (i + 1);
    console.log(banana);
    document.getElementById(banana).textContent = entry.name;

    var apple = "status" + (i + 1);
    console.log(apple);
    document.getElementById(apple).textContent = entry.status;

    var kiwi = "days" + (i + 1);
    console.log(kiwi);
    document.getElementById(kiwi).textContent = entry.daysAvail;
  }
}

createEmployeeCard();
