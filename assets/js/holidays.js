var requestURL = 'https://date.nager.at/api/v3/publicholidays/2023/US';
fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });




