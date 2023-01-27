let allData
let title

let height = 1000
let width = 1000
let padding = 20
let margin = { top: 0, bottom: 0, left: 20, right: -80 }


fetch('https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json')
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

          const heightScl = d3.scaleLinear()
            .domain([0, d3.max(allData, (d) => d[1])])
            .range([0, height - (2 * padding)])


          const xScl = d3.scaleLinear()
            .domain([0, allData.length - 1])
            .range([padding, width - padding])

          let dates = allData.map((i) => {
            return new Date(i[0])
          })

          const xAxisScl = d3.scaleTime()
            .domain([d3.min(dates), d3.max(dates)])
            .range([padding, width - padding])


          const yAxisScl = d3.scaleLinear()
            .domain([0, d3.max(allData, (d) => {
              return d[1]

            })])
            .range([height - padding, padding])



          d3.select("body")
            .append('h1')
            .attr('id', 'title')
            .text(title)




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




          const svg = d3.select("body")
            .append("svg")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .attr('viewbox', [0, 0, width, height])

          svg
            .append('g')
            .selectAll('rect')
            .data(allData)
            .join('rect')
            .attr('class', 'bar')
            .attr('width', (width - (2 * padding)) / allData.length)
            .attr('data-date', (item) => { return item[0] })
            .attr('data-gdp', (item) => { return item[1] })
            .attr('height', (d) => heightScl(d[1]))
            .attr('x', (d, i) => {
              return xScl(i)
            })
            .attr('transform', `translate(${margin.left + 20},0)`)
            .attr('y', (d) => {
              return (height - padding) - heightScl(d[1])
            })
            .on("mouseover", (item, idx) => {
              console.log(item, idx);
              Tooltip.transition()
                .style('visibility', 'visible')
              Tooltip.text(idx[0] + ' = ' + idx[1])
              document.querySelector('#tooltip').setAttribute('data-date', idx[0])
            })
            .on("mouseout", () => Tooltip.transition().style('visibility', 'hidden'))

          const xAxis = d3.axisBottom(xAxisScl)
          const yAxis = d3.axisLeft(yAxisScl)


          svg.append('g')
            .call(yAxis)
            .attr('transform', `translate(${margin.left + 40},0)`)
            .attr('property', 'data-gdp')
            .attr('id', 'y-axis')


          svg.append('g')
            .call(xAxis)
            .attr('transform', `translate(40,${height - padding})`)
            .attr('id', 'x-axis')
            .attr('font-size', '20px')
            .attr('color', 'black')
            .attr('property', 'data-date')

          svg.node()
        });
    }
  )


  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });


