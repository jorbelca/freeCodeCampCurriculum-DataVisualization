const apiEndPointKikstarterPledges = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/kickstarter-funding-data.json'

const apiEndPointMovieSales = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/movie-data.json'

const apiEndPointVideoGameSales = 'https://cdn.freecodecamp.org/testable-projects-fcc/data/tree_map/video-game-sales-data.json'




let height = 800
let width = 1000
let padding = 20
let margin = { top: 20, bottom: 20, left: 20, right: 20 }


document.addEventListener('DOMContentLoaded', () => renderData(apiEndPointVideoGameSales), false);
document.getElementById('video-game-btn').onclick = () => renderData(apiEndPointVideoGameSales)
document.getElementById('movies-btn').onclick = () => renderData(apiEndPointMovieSales)
document.getElementById('kikstarter-btn').onclick = () => renderData(apiEndPointKikstarterPledges)

async function renderData(api) {
  try {
    const Data = await d3.json(api);


    d3.select('svg').remove()
    d3.select('#tooltip').remove()
    d3.select('#legend').remove()


    const svg = d3.select("body")
      .append("svg")
      .attr("width", width)
      .attr("height", height)

    d3.select("#title")
      .html(`<h1>${Data.name == "Video Game Sales Data Top 100" ? 'Video Games' : Data.name}<h1>`)

    d3.select("#description")
      .html(`<h4>Top 100 ${Data.name == "Video Game Sales Data Top 100" ? 'Video Games' : Data.name} by Sales <h4>`)

    const color = d3.scaleOrdinal()
      .domain([Data.children.map(n => n.name)])
      .range(d3.schemeCategory10
        .map(function (c) { c = d3.rgb(c); c.opacity = 0.6; return c; }));


    const opacity = d3.scaleLinear()
      .domain([10, 30])
      .range([.5, 1])


    const root = d3.hierarchy(Data).sum(function (d) {
      return d.value
    })


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
      .paddingTop(3)
      .paddingRight(3)
      .paddingInner(3)
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
      .attr('data-name', (d) => d.data.name)
      .attr('data-category', (d) => d.data.category)
      .attr('data-value', (d) => +d.data.value)
      .on("mouseover", (item, idx) => {
        Tooltip.transition()
          .style('visibility', 'visible')
        Tooltip.html(`
        <div>
        <p>Name: ${idx.data.name}</p>
        <p>Category: ${idx.data.category}</p>
        <p>Value: ${idx.data.value}</p>
        </div>  
      `)
        Tooltip.attr("data-value", () => idx.data.value)

      })
      .on("mouseout", () => Tooltip.transition().style('visibility', 'hidden'))




    svg
      .selectAll("text")
      .append('div')
      .data(root.leaves())
      .enter()
      .append("text")
      .text(function (d) { return d.data.name })
      .attr("x", function (d) { return d.x0 + 5 })
      .attr("y", function (d) { return d.y0 + 10 })
      .attr("font-size", "12px")
      .attr("font-family", "Verdana")



    let datas = Data.children

    let leg = d3.select('body')
      .attr('width', width / 10)
      .attr('height', height / 10)
      .append('div')
      .attr('id', 'legend')
      .attr('transform', 'translate(' + width / 10 + ', ' + 0 + ')');

    // legend title
    leg.append('div')
      .attr('class', 'legend')
      .append('text')
      .style('font-weight', 'bold')
      .attr('x', 10)
      .attr('y', -10)
      .text('Legend');


    // create g for each legend item
    let legendItem = leg.selectAll('.legend-item')
      .data(datas)
      .enter()
      .append('svg')
      .attr('class', 'legend-item')


    // legend rectangle
    legendItem.append('rect')
      .attr('class', 'legend-item')
      .attr('width', 20)
      .attr('height', 20)
      .style('fill', (d) => color(d.name))


    // legend text
    legendItem.append('text')
      .attr('x', 25)
      .attr('y', 15)
      .text(function (d) {
        return d.name;
      })

  } catch (error) { console.log(error.name, error.message, error) }

}




