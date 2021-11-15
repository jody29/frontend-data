import removeArrow from "./modules/filters/remove-arrow.js"

const gemeenten = 'https://cartomap.github.io/nl/rd/gemeente_2021.topojson'
const townShips = 'https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/townships.geojson'
const vaccinatie = 'https://data.rivm.nl/covid-19/COVID-19_vaccinatiegraad_per_gemeente_per_week_leeftijd.json'

let gemeentenData
let vaccinData = []

let width = 1000,
height = 900

let canvas = d3.select('#canvas')
.attr('width', width)
.attr('height', height)

let drawMap = () => {

    let center = d3.geoCentroid(gemeentenData)
    let scale = 150
    let offset = [width/2, height/2]
    let projection = d3.geoMercator().scale(10000)

    let path = d3.geoPath().projection(projection)

    canvas.selectAll('path')
    .data(gemeentenData)
    .enter().append('path')
    .attr('transform', 'translate(-900, 10910)')
    .attr('d', path)
    .attr('class', 'gemeente')

    console.log(gemeentenData)
}

d3.json(townShips).then(
    (data, error) => {
        if (error) {
            console.log(error) 
        } else {
            // gemeentenData = topojson.feature(data, data.objects.gemeente_2021).features
            gemeentenData = data.features
            console.log(gemeentenData)
            drawMap()

            d3.json(vaccinatie).then(json => {
                json.map(obj => {
                    Object.keys(obj).forEach(key => {
                        obj[key] = removeArrow(obj[key])
                    })
                })
                return json
            } 
            )
            .then(json => {
                json.map(obj => {
                    obj.Age_group === '18+' ? vaccinData.push({region: obj.Region_name, vaccination: obj.Vaccination_coverage_completed}) : false
                })
                console.log(vaccinData)
            }
            )
        }
})