let allData
let title

let svgHeight= 2700, svgWidth = 1700, barSpacing = 5;
let totalBarWidth = 9
let barWidth = totalBarWidth-barSpacing
let barHeight =10 
let padding = 10
let w =1500
let h =500

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


          const xScale = d3.scaleLinear()
          .domain([0, d3.max(allData, (d) => d[1])])
          .range([padding, w - padding]);

          const yScale = d3.scaleLinear()
         .domain([0, d3.max(allData, (d) => d[1])])
         .range([h - padding, padding]);


          var graph = d3.select("body")
            .append('h1')
            .attr('id', 'title')
            .text(title)
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);

          var bar = graph.selectAll("rect")
            .data(allData)
            .enter()
            .append("rect")
            .attr('y',(d)=>(yScale(d[1])))

            .attr('height',d=>d[1])
            .attr('width',barWidth)
            .attr('transform', (d,i)=>{
            let translate = [totalBarWidth*i, 0];
                return `translate(${translate})`;
            });

          bar.append("text")
            .attr("x", function (d) { return (d[1]); })
            .attr("y", barHeight + 2)
            .attr("dy", ".35em")
            .text(function (d) { 
              console.log(d[1]);
              return d[1]; });
        });
    }
  )


  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });


