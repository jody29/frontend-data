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
            return '#B7FFBF'
        } else if (percentage <= 60) {
            return '#95F985'
        } else if (percentage <= 70) {
            return '#4DED30'
        } else if (percentage <= 80) {
            return '#26D701'
        } else if (percentage <= 90) {
            return '#00C301'
        } else if (percentage <= 100) {
            return '#00AB08'
        }
    })

    console.log(gemeentenData)
}

export default drawMap

