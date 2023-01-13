var requestURL =  "https://holidayapi.com/v1/holidays?pretty&key=b23e3aec-f674-49b8-a274-106b66386c78&country=US&year=2022";

fetch(requestURL)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    });