const apiEndPointEducation = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

const apiEndPointCountyData = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'

let allData


let height = 800
let width = 1000
let padding = 20
let margin = { top: 20, bottom: 20, left: 20, right: 20 }





async function choroplethMap() {
  try {

    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const color = d3.scaleSequential().interpolator(d3.interpolateViridis)
      .domain([2.6, 75.1])

    const educationData = await d3.json(apiEndPointEducation);

    const mapData = await d3.json(apiEndPointCountyData);
    console.log(mapData);

    const path = d3.geoPath();

    
    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(mapData, mapData.objects.counties).features)
      .enter().append("path").attr("d", path)
      .attr("class", "county")
      .attr("data-fips", d => d.id)
      .attr("data-education", d => (educationData.filter(e => e.fips == d.id))[0].bachelorsOrHigher)
      .attr("fill", d => color((educationData.filter(e => e.fips == d.id))[0].bachelorsOrHigher))


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










  } catch (error) { console.log(error.name, error.message, error) }

}

choroplethMap()


