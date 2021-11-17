
// Import modules & filters
import removeSign from "./filters/remove_sign.js" 
import removeArrow from "./filters/remove-arrow.js"
import removeSpace from "./filters/remove-space.js"
import drawMap from "./render-map.js"
import renderLegend from './render-legend.js'

const gemeenten = './src/data/gemeenten.json' // link to geojson of municipalities
const vaccinatie = './src/data/covid.json' // link to json of vaccination data

let gemeentenData // here i will save the municipalities in
let vaccinData = [] // here i will save the vaccination data in
let colors = [{ color:'#B7FFBF', value: 50 }, { color:'#95F985', value: 60}, { color:'#4DED30', value: 70}, { color:'#0A7136', value: 80}, { color:'#02491F', value: 90}, { color:'#0B2310', value: 100}]
// colors for the map with their value

export default d3.json(gemeenten).then( // fetch the municipalities
    data => {
        data.features.map(obj => { // mapping over the features in the data object
        Object.keys(obj).forEach(key => {
            obj.properties.gemeentena = removeArrow(obj.properties.gemeentena) // removing strange arrow symbol
            obj.properties.gemeentena = removeSpace(obj.properties.gemeentena) // removing spaces 
            obj.properties.gemeentena = removeSign(obj.properties.gemeentena) // removing strange sign
        })
    })
    return data
})
.then(data => {
    gemeentenData = data.features // assigning the featurelist to gemeentenData
})
.then(
    d3.json(vaccinatie) // fetching the vaccination data
    .then(data => {
        data.map(obj => { // looping over the data
            Object.keys(obj).forEach(key => {
                obj[key] = removeArrow(obj[key]) // removing strange arrow
                obj[key] = removeSpace(obj[key]) // removing spaces
                obj[key] = removeSign(obj[key]) // removing strange sign
            })
        })
        return data
    })
    .then(data => {
        data.map(obj => {
            obj.Age_group === '18+' ? vaccinData.push({region: obj.Region_name, vaccination: obj.Vaccination_coverage_completed}) : false
            // if the age is 18+, then assign the region name and vaccination percentage as object to the array
        })
        drawMap(gemeentenData, vaccinData, colors) // call drawMap function with gemeentenData, vaccinatieData & colors as arguments
        renderLegend(colors) // call renderLegend function with colors as argument
        
    })
)