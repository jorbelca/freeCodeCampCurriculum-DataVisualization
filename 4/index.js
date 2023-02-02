const apiEndPointEducation = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/for_user_education.json'

const apiEndPointCountyData = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/choropleth_map/counties.json'

let allData


let height = 800
let width = 1000
let padding = 20
let margin = { top: 20, bottom: 20, left: 20, right: 20 }





async function choroplethMap() {
  try {
    const educationData = await d3.json(apiEndPointEducation);
    const mapData = await d3.json(apiEndPointCountyData);

    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const color = d3.scaleSequential().interpolator(d3.interpolateViridis)
      .domain([d3.min(educationData, (d) => d.bachelorsOrHigher), d3.max(educationData, (d) => d.bachelorsOrHigher)])



    const path = d3.geoPath();


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



    svg.append("g")
      .selectAll("path")
      .data(topojson.feature(mapData, mapData.objects.counties).features)
      .enter().append("path").attr("d", path)
      .attr("class", "county")
      .attr("data-fips", d => d.id)
      .attr("data-education", d => (educationData.filter(e => e.fips == d.id))[0].bachelorsOrHigher)
      .attr("fill", d => color((educationData.filter(e => e.fips == d.id))[0].bachelorsOrHigher))
      .on("mouseover", (item, idx) => {
        Tooltip.transition()
          .style('visibility', 'visible')
        Tooltip.html(`
        <div>
       ${(educationData.filter(e => e.fips == idx.id))[0].area_name} : ${(educationData.filter(e => e.fips == idx.id))[0].bachelorsOrHigher} % 
        </div>  
      `)
        Tooltip.attr("data-education", () =>
          (educationData.filter(e => e.fips == idx.id))[0].bachelorsOrHigher)

      })
      .on("mouseout", () => Tooltip.transition().style('visibility', 'hidden'))


    let percents = Array.from(new Set(educationData.map(d => d.bachelorsOrHigher))).sort((a, b) => a - b)

    const legendAxis = d3.scaleLinear()
      .domain([d3.min(educationData, (d) => d.bachelorsOrHigher), d3.max(educationData, (d) => d.bachelorsOrHigher)])

    svg.selectAll('#legend')
      .data(percents)
      .enter()
      .append('rect')
      .attr('x', (d, i) => i / 2)
      .attr('y', 0)
      .attr('width', 4)
      .attr('height', 20)
      .style("fill", d => color(d))
      .attr("transform", (d, i) => `translate(${width / 2.5}, ${height * 0.9})`)
      .append('g')
      .call(d3.axisBottom(legendAxis).ticks(4))
      .attr('font-size', '20px')
      .attr('color', 'black')



  } catch (error) { console.log(error.name, error.message, error) }

}

choroplethMap()


