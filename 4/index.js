const apiEndPointEducation = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

const apiEndPointCountyData = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'

let allData


let height = 800
let width = 1000
let padding = 20
let margin = { top: 20, bottom: 20, left: 20, right: 20 }




fetch(apiEndPointEducation)
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
          console.log(data);
          allData = data



          const svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height)



          // Map and projection
          const projection = d3.geoMercator()
            .center([-102, 37])                // GPS of location to zoom on
            .scale(700)                       // This is like the zoom
            .translate([width / 2, height / 2])

          // Load external data and boot
          d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/world.geojson").then(function (data) {

            // Filter data
            data.features = data.features.filter(d => { console.log(d.properties.name); return d.properties.name == "USA" })

            // Draw the map
            svg.append("g")
              .selectAll("path")
              .data(data.features)
              .join("path")
              .attr("fill", "grey")
              .attr("d", d3.geoPath()
                .projection(projection)
              )
              .style("stroke", "none")

            // // Tooltip
            // var Tooltip = d3.select("body")
            //   .append("div")
            //   .attr('id', 'tooltip')
            //   .style("visibility", "hidden")
            //   .style('width', 'auto')
            //   .style('heigth', 'auto')
            //   .style("background-color", "white")
            //   .style("border", "solid")
            //   .style("border-width", "2px")
            //   .style("border-radius", "5px")
            //   .style("padding", "5px")






            // .style("fill", function (d) {
            //   let variance = d.variance
            //   if (variance <= -1) {
            //     return 'Black'
            //   } else if (variance <= 0) {
            //     return 'Blue'
            //   }
            //   else if (variance <= 1) {
            //     return 'Orange'
            //   } else {
            //     return 'Red'
            //   }


            // })
            // .attr('transform', `translate(70,0)`)

            // .on("mouseover", (item, idx) => {
            //   Tooltip.transition()
            //     .style('visibility', 'visible')
            //   Tooltip.html(`
            //     <div>
            //     Year: ${idx.year} <br>
            //     <p>Average Temp: ${title + idx.variance}</p> 
            //     <p>Deviation: ${idx.variance}</p> 
            //     </div>  
            //   `)
            //   Tooltip.attr("data-year", () => idx.year)

            // })
            // .on("mouseout", () => Tooltip.transition().style('visibility', 'hidden'))




          }
          )
        })
    })


  .catch(function (err) {
    console.log('Fetch Error :-S', err);
  });


