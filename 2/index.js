let allData
let title

let height = 700
let width = 700
let padding = 20
let margin = { top: 20, bottom: 0, left: 20, right: -80 }


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
          allData = data

          console.log(allData);
          const svg = d3.select("body")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
              "translate(" + margin.left + "," + margin.top + ")");


          // Add X axis
          var x = d3.scaleLinear()
            .domain([d3.min(allData, (d) => d.Year), d3.max(allData, (d) => d.Year)])
            .range([0, width]);
          svg.append("g")
            .attr('transform', `translate(20,${height - padding})`)
            .call(d3.axisBottom(x));

          // Add Y axis
          var y = d3.scaleLinear()

            .domain([d3.max(allData, (d) => (d.Seconds / 60)), d3.min(allData, (d) => (d.Seconds / 60))])

            .range([height, 0]);
          svg.append("g")
            .attr('transform', `translate(${margin.left + 0},-20)`)
            .call(d3.axisLeft(y));

          // Add dots
          svg.append('g')
            .selectAll("dot")
            .data(allData)
            .join("circle")
            .attr("cx", function (d) {
              return x(d.Year);
            })
            .attr("cy", function (d) { return y(d.Seconds / 60); })
            .attr("r", 5)
            .style("fill", (d) => { return d.Doping == '' ? "blue" : "red" })
            .attr('transform', `translate(${margin.left + 20},-30)`)
        });
    }
  )


  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });


