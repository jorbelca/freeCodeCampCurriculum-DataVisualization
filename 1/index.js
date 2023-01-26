let allData
let title

let height = 700
let width = 1000
let barHeight = 20
let margin = { top: 50, bottom: 50, left: 10, right: 10 }


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

          const x = d3.scaleBand()
            .domain(d3.range(allData.length))
            .range([margin.left, width - margin.right])
            .padding(0.1)

          const y = d3.scaleLinear()
            .domain([d3.min(allData, (d) => d[1]), d3.max(allData, (d) => d[1])])
            .range([height - margin.bottom, margin.top]);


          const svg = d3.select("body")
            .append('h1')
            .attr('id', 'title')
            .text(title)
            .append("svg")
            .attr("width", width - margin.left - margin.right)
            .attr("height", height - margin.top - margin.bottom)
            .attr('viewbox', [0, 0, width, height])

          svg
            .append('g')
            .selectAll('rect')
            .data(allData)
            .join('rect')
            .attr('x', (d, i) => x(i))
            .attr('y', (d) => y(d[1]))
            .attr('height', d => y(0) - y(d[1]))
            .attr('width', x.bandwidth())

          svg.node()
        });
    }
  )


  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });


