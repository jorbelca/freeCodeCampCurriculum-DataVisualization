const apiEndPoint = 'https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/global-temperature.json'

let allData
let title

let height = 800
let width = 1000
let padding = 20
let margin = { top: 20, bottom: 20, left: 20, right: 20 }


const getMonth = (d) => new Date(0, d.month - 1, 0, 0, 0, 0, 0)

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
            .attr("x", (width / 1.2))
            .attr("y", 0 - (margin.top / 2))
            .style("font-size", "16px")
            .style("text-decoration", "underline")
            .text(` Monthly Global Land-Surface Temperature, base temperature ${title} `)
            .attr('id', 'title')


          // Add X axis
          var x = d3.scaleLinear()
            .domain([d3.min(allData, (d) => Number(d.year)), d3.max(allData, (d) => Number(d.year))])
            .range([padding, width - 100]);

          svg.append("g")
            .attr('transform', `translate(70,${height - padding})`)
            .call(d3.axisBottom(x).tickFormat(d3.format('d')))
            .attr('id', 'x-axis')

          // Add Y axis
          var y = d3.scaleTime()
            .domain([d3.min(allData, (d) => new Date(0, d.month - 1, 0, 0, 0, 0, 0)),
            d3.max(allData, (d) => new Date(0, d.month, 0, 0, 0, 0, 0))])
            .range([padding, height - padding]);
          svg.append("g")
            .attr('transform', `translate(90 ,0)`)
            .call(d3.axisLeft(y).tickFormat(d3.timeFormat('%B')))
            .attr('id', 'y-axis')



          // Add squares
          svg.selectAll()
            .data(allData)
            .join('rect')
            .attr('class', 'cell')
            .attr("data-year", function (d) {
              return Number(d.year);
            })
            .attr("data-month", function (d) {
              return Number(d.month) - 1
            })
            .attr("data-temp", function (d) {
              return title + d.variance
            })
            .attr("x", function (d) {
              return x(Number(d.year));
            })
            .attr("y", function (d) {
              return y(new Date(0, d.month - 1, 0, 0, 0, 0, 0))
            })
            .attr("rx", 2)
            .attr("ry", 2)
            .attr("width", (d) => {
              let numYears = d3.max(allData, (d) => Number(d.year)) - d3.min(allData, (d) => Number(d.year))
              return (width - (2 * padding)) / numYears
            }

            )
            .attr("height", (height - (2 * padding)) / 12)
            .style("fill", function (d) {
              let variance = d.variance
              if (variance <= -1) {
                return 'Black'
              } else if (variance <= 0) {
                return 'Blue'
              }
              else if (variance <= 1) {
                return 'Orange'
              } else {
                return 'Red'
              }


            })
            .attr('transform', `translate(70,0)`)

            .on("mouseover", (item, idx) => {
              Tooltip.transition()
                .style('visibility', 'visible')
              Tooltip.html(`
                <div>
                Year: ${idx.year} <br>
                <p>Average Temp: ${title + idx.variance}</p> 
                <p>Deviation: ${idx.variance}</p> 
                </div>  
              `)
              Tooltip.attr("data-year", () => idx.year)

            })
            .on("mouseout", () => Tooltip.transition().style('visibility', 'hidden'))



        });
    }
  )


  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });


