const apiEndPointKikstarterPledges = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'

const apiEndPointMovieSales = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'

const apiEndPointVideoGameSales = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'




let height = 800
let width = 1000
let padding = 20
let margin = { top: 20, bottom: 20, left: 20, right: 20 }

document.getElementById('video-game-btn').onclick = () => renderData(apiEndPointKikstarterPledges)

async function renderData(data) {
  try {
    const Data = await d3.json(data);
    console.log(Data.children);

    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    const color = d3.scaleOrdinal()
      .domain([Data.children.map(n => n.name)])
      .range(["#402D54", "#D18975", "#8FD175"])


    const root = d3.hierarchy(Data).sum(function (d) { return d.value })


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


    d3.treemap()
      .size([width, height])
      .paddingTop(28)
      .paddingRight(3)
      .paddingInner(2)
      (root)

    svg
      .selectAll("rect")
      .data(root.leaves())
      .join("rect")
      .attr('class', 'tile')
      .attr('x', function (d) { return d.x0; })
      .attr('y', function (d) { return d.y0; })
      .attr('width', function (d) { return d.x1 - d.x0; })
      .attr('height', function (d) { return d.y1 - d.y0; })
      .style("stroke", "black")
      .style("fill", function (d) { return color(d.parent.data.name) })
      .style("opacity", function (d) { return opacity(d.data.value) })



    // svg.append("g")
    //   .selectAll("path")
    //   .data(topojson.feature(mapData, mapData.objects.counties).features)
    //   .enter().append("path").attr("d", path)
    //   .attr("class", "county")
    //   .attr("data-fips", d => d.id)
    //   .attr("data-education", d => (educationData.filter(e => e.fips == d.id))[0].bachelorsOrHigher)
    //   .attr("fill", d => color((educationData.filter(e => e.fips == d.id))[0].bachelorsOrHigher))
    //   .on("mouseover", (item, idx) => {
    //     Tooltip.transition()
    //       .style('visibility', 'visible')
    //     Tooltip.html(`
    //     <div>
    //    ${(educationData.filter(e => e.fips == idx.id))[0].area_name} : ${(educationData.filter(e => e.fips == idx.id))[0].bachelorsOrHigher} % 
    //     </div>  
    //   `)
    //     Tooltip.attr("data-education", () =>
    //       (educationData.filter(e => e.fips == idx.id))[0].bachelorsOrHigher)

    //   })
    //   .on("mouseout", () => Tooltip.transition().style('visibility', 'hidden'))


    // let percents = Array.from(new Set(educationData.map(d => d.bachelorsOrHigher))).sort((a, b) => a - b)

    // const legendAxis = d3.scaleLinear()
    //   .domain([d3.min(educationData, (d) => d.bachelorsOrHigher), d3.max(educationData, (d) => d.bachelorsOrHigher)])
    //   .range([290, 700]);

    // svg.append('g')
    //   .selectAll('#legend')
    //   .attr('class', 'key')
    //   .attr('id', 'legend')
    //   .data(percents)
    //   .enter()
    //   .append('rect')
    //   .attr('x', (d, i) => i)
    //   .attr('y', 0)
    //   .attr('width', 4)
    //   .attr('height', 20)
    //   .style("fill", d => color(d))
    //   .attr("transform", (d, i) => `translate(${width / 2.5}, ${height * 0.9})`)
    // svg
    //   .append('g')
    //   .attr('class', 'tick')
    //   .call(d3.axisBottom(legendAxis))
    //   .attr('font-size', '20px')
    //   .attr('color', 'black')
    //   .attr("transform", (d, i) => `translate(${width / 8.5}, ${height * 0.93})`)



  } catch (error) { console.log(error.name, error.message, error) }

}




