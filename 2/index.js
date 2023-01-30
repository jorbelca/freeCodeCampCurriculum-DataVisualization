let allData
let title

let height = 700
let width = 800
let padding = 40
let margin = { top: 20, bottom: 20, left: 20, right: 20 }


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


          const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)




          // Title
          svg.append("text")
            .attr("x", (width / 1.6))
            .attr("y", 0 - (margin.top / 2))
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(` 35 Fastest times up Alpe d'Huez  `)
            .attr('id', 'title')


          // Add X axis
          var x = d3.scaleLinear()
            .domain([d3.min(allData, (d) => Number(d.Year - 1)), d3.max(allData, (d) => Number(d.Year + 1))])
            .range([padding, width - padding]);
          svg.append("g")
            .attr('transform', `translate(0,${height - padding})`)
            .call(d3.axisBottom(x).tickFormat(d3.format('d')))
            .attr('id', 'x-axis')

          // Add Y axis
          var y = d3.scaleTime()
            .domain([
              d3.max(allData, (d) =>
                new Date(d.Seconds) * 1000),
              d3.min(allData, (d) =>
                new Date(d.Seconds) * 1000)])
            .range([padding, width - padding]);
          svg.append("g")
            .attr('transform', `translate(${padding},0)`)
            .call(d3.axisLeft(y).tickFormat(d3.timeFormat('%M:%S')))
            .attr('id', 'y-axis')

          // Add dots
          svg.append('g')
            .selectAll("dot")
            .data(allData)
            .join("circle")
            .attr("data-xvalue", function (d) {
              return Number(d.Year);
            })
            .attr("data-yvalue", function (d) {
              return new Date(d.Seconds * 1000)
            })
            .attr("cx", function (d) {
              return x(Number(d.Year));
            })
            .attr("cy", function (d) {
              return y(new Date(d.Seconds * 1000))
            })
            .attr("r", 5)
            .style("fill", (d) => { return d.Doping == '' ? "blue" : "red" })
            .attr('transform', `translate(${margin.left},0)`)
            .attr('class', 'dot')



          // Legend
          svg.append("rect").attr("x", 700).attr("y", 620).attr("width", 20).attr("height", 20).style("fill", "red")
            .attr('id', 'legend')
          svg.append("rect").attr("x", 700).attr("y", 590).attr("width", 20).attr("height", 20).style("fill", "blue")
            .attr('id', 'legend')
          svg.append("text").attr("x", 690).attr("y", 630).text("Doping Allegations").style("font-size", "15px").attr("alignment-baseline", "middle")
            .attr('id', 'legend')
          svg.append("text").attr("x", 690).attr("y", 600).text("No doping Allegations").style("font-size", "15px").attr("alignment-baseline", "middle")
            .attr('id', 'legend')

        });
    }
  )


  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });


