const apiEndPoint = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

let allData
let title

let height = 800
let width = 800
let padding = 20
let margin = { top: 20, bottom: 20, left: 20, right: 20 }


fetch(apiEndPoint)
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
          allData = data.monthlyVariance
          title = data.baseTemperature
          console.log(allData);

          const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



          // Tooltip
          var Tooltip = d3.select("body")
            .append("div")
            .attr('id', 'tooltip')
            .style("visibility", "hidden")
            .style('width', 'auto')
            .style('heigth', 'auto')
            .style("background-color", "white")
            .style("border", "solid")
            .style("border-width", "2px")
            .style("border-radius", "5px")
            .style("padding", "5px")


          // Title
          svg.append("text")
            .attr("x", (width / 1.5))
            .attr("y", 0 - (margin.top / 2))
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(` Monthly Global Land-Surface Temperature, base temperature ${title} `)
            .attr('id', 'title')


          // Add X axis
          var x = d3.scaleLinear()
            .domain([d3.min(allData, (d) => Number(d.year)), d3.max(allData, (d) => Number(d.year))])
            .range([padding, width - padding]);
          svg.append("g")
            .attr('transform', `translate(0,${height - padding})`)
            .call(d3.axisBottom(x).tickFormat(d3.format('d')))
            .attr('id', 'x-axis')

          // Add Y axis
          var y = d3.scaleLinear()
            .domain([d3.min(allData, (d) => Number(d.month)),
            d3.max(allData, (d) => Number(d.month))])
            .range([padding, width - padding]);
          svg.append("g")
            .attr('transform', `translate(${padding},0)`)
            .call(d3.axisLeft(y))
            .attr('id', 'y-axis')




          // Build color scale
          const myColor = d3.scaleLinear()
            .range(["red", "#69b3a2"])
            .domain([-10, 10])


          // Add squares
          svg.append('rect')
            .attr('class', 'cell')
            .data(allData)
            .enter()
            .attr("data-year", function (d) {
              console.log(d);
              return Number(d.year);
            })
            .attr("data-month", function (d) {
              return new Date().setMonth(d.month)
            })
            .attr("data-temp", function (d) {
              return Number(d.variance)
            })
            .attr("x", function (d) {
              return x(Number(d.Year));
            })
            .attr("y", function (d) {
              return y(new Date(d.Seconds * 1000))
            })
            .attr("width", x.bandwidth())
            .attr("height", y.bandwidth())
            .style("fill", function (d) { return myColor(d.variance) })
            .attr('transform', `translate(${margin.left},0)`)

            .on("mouseover", (item, idx) => {
              Tooltip.transition()
                .style('visibility', 'visible')
              Tooltip.html(`
                <div>
                ${idx.Name}, ${idx.Year} <br>
                <b>Time:</b> ${idx.Time} 
                <p>${idx.Doping}</p> 
                </div>  
`)
              document.querySelector('#tooltip').setAttribute('data-year', idx.Year)
            })
            .on("mouseout", () => Tooltip.transition().style('visibility', 'hidden'))



          // // Legend
          // svg.append("rect").attr("x", 700).attr("y", 620).attr("width", 20).attr("height", 20).style("fill", "red")
          //   .attr('id', 'legend')
          // svg.append("rect").attr("x", 700).attr("y", 590).attr("width", 20).attr("height", 20).style("fill", "blue")
          //   .attr('id', 'legend')
          // svg.append("text").attr("x", 690).attr("y", 630).text("Doping Allegations").style("font-size", "15px").attr("alignment-baseline", "middle")
          //   .attr('id', 'legend')
          // svg.append("text").attr("x", 690).attr("y", 600).text("No doping Allegations").style("font-size", "15px").attr("alignment-baseline", "middle")
          //   .attr('id', 'legend')



        });
    }
  )


  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });


