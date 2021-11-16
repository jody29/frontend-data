let width = 600,
height = '89vh'

let canvas = d3.select('#canvas')
.attr('width', width)
.attr('height', height)

let drawMap = (gemeentenData, vaccinData) => {

    let scale = 7500
    let projection = d3.geoMercator().scale(scale)

    let path = d3.geoPath().projection(projection)

    canvas.selectAll('path')
    .data(gemeentenData)
    .join('path')
    .attr('aria-label', (d) => d.properties.gemeentena)
    .attr('transform', `translate(-${scale/8.3}, ${scale+600})`)
    .attr('d', path)
    .attr('class', 'gemeente')
    .attr('fill', (d) => {
        let id = d.properties.gemeentena
        let gemeente = vaccinData.find((item) => {
            return item['region'] === id
        })
        let percentage = gemeente.vaccination
        console.log(gemeente)
        
        if (percentage <= 50) {
            return '#0B2310'
        } else if (percentage <= 60) {
            return '#02491F'
        } else if (percentage <= 70) {
            return '#0A7136'
        } else if (percentage <= 80) {
            return '#4DED30'
        } else if (percentage <= 90) {
            return '#95F985'
        } else if (percentage <= 100) {
            return '#B7FFBF'
        }
    })

    console.log(gemeentenData)
}

export default drawMap

