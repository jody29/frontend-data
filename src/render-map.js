
import removeArrow from "./modules/filters/remove-arrow.js"

const gemeenten = 'https://cartomap.github.io/nl/rd/gemeente_2021.geojson'
const townShips = 'https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/townships.geojson'
const provinces = 'https://www.webuildinternet.com/articles/2015-07-19-geojson-data-of-the-netherlands/provinces.geojson'
const vaccinatie = 'https://data.rivm.nl/covid-19/COVID-19_vaccinatiegraad_per_gemeente_per_week_leeftijd.json'
const gemeentes = 'https://raw.githubusercontent.com/deldersveld/topojson/master/countries/netherlands/nl-gemeentegrenzen-2016.json'

let gemeentenData
let vaccinData = []



let width = 800,
height = '100vh'

let canvas = d3.select('#canvas')
.attr('width', width)
.attr('height', height)

let drawMap = () => {

    let center = d3.geoCentroid(gemeentenData)
    let scale = 8500
    let offset = [scale/10, scale+710]
    let projection = d3.geoMercator().scale(scale)

    let path = d3.geoPath().projection(projection)

    canvas.selectAll('path')
    .data(gemeentenData)
    .enter().append('path')
    .attr('transform', `translate(-${scale/10}, ${scale+710})`)
    .attr('d', path)
    .attr('class', 'gemeente')

    console.log(gemeentenData)
}

d3.json(gemeentes).then(
    (data, error) => {
        if (error) {
            console.log(error) 
        } else {

            // gemeentenData = data.features
            gemeentenData = topojson.feature(data, data.objects.Gemeentegrenzen).features
            
            // console.log(topojson.feature(data, data.objects))
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