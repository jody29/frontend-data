import removeSign from "./filters/remove_sign.js"
import removeArrow from "./filters/remove-arrow.js"
import removeSpace from "./filters/remove-space.js"
import removeCaps from "./filters/remove-caps.js"
import removeStripes from "./filters/remove-stripes.js"
import drawMap from "./render-map.js"
import renderLegend from './render-legend.js'

const gemeenten = './src/data/gemeenten.json'
const vaccinatie = './src/data/covid.json'

let gemeentenData
let vaccinData = []
let colors = [{ color:'#B7FFBF', value: 50 }, { color:'#95F985', value: 60}, { color:'#4DED30', value: 70}, { color:'#0A7136', value: 80}, { color:'#02491F', value: 90}, { color:'#0B2310', value: 100}]

d3.json(gemeenten).then(
    data => {
        data.features.map(obj => {
        Object.keys(obj).forEach(key => {
            obj.properties.gemeentena = removeArrow(obj.properties.gemeentena)
            obj.properties.gemeentena = removeSpace(obj.properties.gemeentena)
            obj.properties.gemeentena = removeSign(obj.properties.gemeentena)
            obj.properties.gemeentena = removeCaps(obj.properties.gemeentena)
            obj.properties.gemeentena = removeStripes(obj.properties.gemeentena)
        })
    })
    return data
})
.then(data => {
    gemeentenData = data.features
})
.then(
    d3.json(vaccinatie)
    .then(data => {
        data.map(obj => {
            Object.keys(obj).forEach(key => {
                obj[key] = removeArrow(obj[key])
                obj[key] = removeSpace(obj[key])
                obj[key] = removeSign(obj[key])
                obj[key] = removeCaps(obj[key])
                obj[key] = removeStripes(obj[key])
            })
        })
        return data
    })
    .then(data => {
        data.map(obj => {
            obj.Age_group === '18+' ? vaccinData.push({region: obj.Region_name, vaccination: obj.Vaccination_coverage_completed}) : false
        })
        drawMap(gemeentenData, vaccinData, colors)
        renderLegend(colors)
        
    })
)