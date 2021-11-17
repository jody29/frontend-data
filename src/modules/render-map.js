let width = 600, // define width and height
height = '89vh'

let canvas = d3.select('#canvas') // select the canvas where the map should be rendered
.attr('width', width) // give the canvas a width
.attr('height', height) // give the canvas a height

let svg = d3.select('#percentage') // select div with id #percentage
.append('svg') // append a svg to it
.attr('width', 300) // give it a width of 300
.attr('height', 100) // give it a height of 100

let bgRect = svg.append('rect') // append rectangle to svg
.attr('width', 300) // give it a default width
.attr('height', 50) // give it a default height
.style('opacity', 0) // opacity of the rect to 0
.attr('fill', 'dimgray') // fill of th rect to dimgray

let fillRect = svg.append('rect') // this is the progress rectangle

function drawMap(gemeentenData, vaccinData, colors) { // define function with gemeentenData, vaccinData & colors as parameters
    let scale = 7500 // define scale
    let projection = d3.geoMercator().scale(scale) // define the map projection with the scale

    let path = d3.geoPath().projection(projection) // define the path with geoMercator projection

    canvas.selectAll('path') // select all paths (municipalities of Holland)
    .data(gemeentenData) // geojson file of all municipalities as data
    .join('path') // create paths for every object from the data and delete if there are too many
    .attr('transform', `translate(-${scale/8.3}, ${scale+585})`) // due to the fact that te map was going up because of the scale, i had to transform the paths so it would fit inside the canvas
    .attr('d', path) // d element of path should contain the path coordinates
    .attr('class', 'gemeente') // assign class gemeente to the path element
    .attr('fill', (d) => {
        let id = d.properties.gemeentena // id is the name of the municipality
        let gemeente = vaccinData.find((item) => {
            return item['region'] === id // return all objects from vaccinData that contain the same region name as the id variabel
        })
        let percentage = gemeente.vaccination // assign the vaccination percentage of the municipality to percentage
        d.properties.percentage = percentage // create object property percentage in the geojson file with the vaccination percentage of the municipality as value
        
        // I could also use a switch statement for this. For this time i decided to use a if/else statement
        if (percentage <= 50) { // check the percentage and assign the right color to it
            return colors[0].color
        } else if (percentage <= 60) {
            return colors[1].color // colors are from the color parameter. These colors are assigned in fetch-map.js
        } else if (percentage <= 70) {
            return colors[2].color
        } else if (percentage <= 80) {
            return colors[3].color
        } else if (percentage <= 90) {
            return colors[4].color
        } else if (percentage <= 100) {
            return colors[5].color
        }
    })
    .attr('data-gemeente', (d) => d.properties.gemeentena) // custom attribute with the name of the municipality as value
    .attr('data-value', (d) => d.properties.percentage) // custom attribute with the vaccination percentage of the municipality as value
    .on('click', (e) => { // launch event when clicking on a path element

        let value = e.target.getAttribute('data-value') // get the vaccination percentage of the path the user clicked on
        let gemeente = e.target.getAttribute('data-gemeente') // get the municipality of the path the user clicked on

        d3.select('#percentage') // select the div with id percentage
        .style('padding', '2em') // give this div a padding of 2em
        .select('h2') // select the h2 in the div
        .text(gemeente) // give this h2 the municipality name as text

        d3.select('#percentage') // select div with id percentage
        .select('p') // select p element in the div
        .text(value + '%') // assign vaccination percentage as text to this p element

        bgRect.transition() // add a transition to the bgRect
        .style('opacity', 1) // opacity will go from 0 to 1 now

        fillRect.attr('height', 50) // give the progress rectangle a height of 50
        .transition() // add a transition
        .ease(d3.easeCircle)
        .duration(1000) // transition should take a second
        .attr('width', (value * 300) / 100) // width should go from 0 to the right percentage
        .attr('fill', () => {
            if (value <= 50) { // allready explained this on row 42 but now i use the value instead of percentage
                return colors[0].color
            } else if (value <= 60) {
                return colors[1].color
            } else if (value <= 70) {
                return colors[2].color
            } else if (value <= 80) {
                return colors[3].color
            } else if (value <= 90) {
                return colors[4].color
            } else if (value <= 100) {
                return colors[5].color
            }
        })  
    })
}



export default drawMap // export the drawmap function

