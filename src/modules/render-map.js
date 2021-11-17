let width = 600,
height = '89vh'

let canvas = d3.select('#canvas')
.attr('width', width)
.attr('height', height)

let svg = d3.select('#percentage')
.append('svg')
.attr('width', 300)
.attr('height', 100)

let bgRect = svg.append('rect')
.attr('width', 300)
.attr('height', 50)
.style('opacity', 0)
.attr('fill', 'dimgray')

let fillRect = svg.append('rect')

function drawMap(gemeentenData, vaccinData, colors) {
    let scale = 7500
    let projection = d3.geoMercator().scale(scale)

    let path = d3.geoPath().projection(projection)

    canvas.selectAll('path')
    .data(gemeentenData)
    .join('path')
    .attr('transform', `translate(-${scale/8.3}, ${scale+585})`)
    .attr('d', path)
    .attr('class', 'gemeente')
    .attr('fill', (d) => {
        let id = d.properties.gemeentena
        let gemeente = vaccinData.find((item) => {
            return item['region'] === id
        })
        let percentage = gemeente.vaccination
        d.properties.percentage = percentage
        
        if (percentage <= 50) {
            return colors[0].color
        } else if (percentage <= 60) {
            return colors[1].color
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
    .attr('data-gemeente', (d) => d.properties.gemeentena)
    .attr('data-value', (d) => d.properties.percentage)
    .on('click', (e) => {

        let value = e.target.getAttribute('data-value')
        let gemeente = e.target.getAttribute('data-gemeente')

        console.log(value)

        console.log((value * 300) / 100)

        d3.select('#percentage')
        .style('padding', '2em')
        .select('h2')
        .text(gemeente)

        bgRect.transition()
        .style('opacity', 1)

        fillRect.attr('height', 50)
        .transition()
        .duration(1000)
        .attr('width', (value * 300) / 100)
        .attr('fill', () => {
            if (value <= 50) {
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

        d3.select('#percentage')
        .select('p')
        .text(value + '%')
        
    })
}



export default drawMap

