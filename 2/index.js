let allData
let title

let height = 1000
let width = 1000
let padding = 20
let margin = { top: 0, bottom: 0, left: 20, right: -80 }


fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json')
  .then(
    function (response) {
      if (response.status !== 200) {
        console.log('Looks like there was a problem. Status Code: ' +
          response.status);
        return;
      }

      // response
      response.json()
        .then(function (data) {
          title = data.name
          allData = data.data

          
        });
    }
  )


  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });


