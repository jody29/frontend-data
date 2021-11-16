import removeSign from "./filters/remove_sign.js"
import removeArrow from "./filters/remove-arrow.js"
import removeSpace from "./filters/remove-space.js"
import removeCaps from "./filters/remove-caps.js"
import removeStripes from "./filters/remove-stripes.js"
import drawMap from "./render-map.js"

const test = './src/data/gemeenten.json'
const vaccinatie = './src/data/covid.json'
const gemeente = './src/data/2021.json'

let gemeentenData
let vaccinData = []

d3.json(test).then(
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
    console.log(gemeentenData)
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
            obj.Age_group === '18+' ? vaccinData.push({region: obj.Region_name, vaccination: obj.Vaccination_coverage_completed, code: obj.Region_code.split('gm').join('')}) : false
            // vaccinData.push({zkh: obj.Hospital_admission, gemeente: obj.Municipality_name})
        })
        console.log(vaccinData)
        drawMap(gemeentenData, vaccinData)
    })
)