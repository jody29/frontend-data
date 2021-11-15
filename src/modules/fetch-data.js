import removeArrow from './filters/remove-arrow.js'
import update from './render-barchart.js'

let regionValue = []

export default d3.json('https://data.rivm.nl/covid-19/COVID-19_vaccinatiegraad_per_gemeente_per_week_leeftijd.json')
.then(json => {
    json.map(obj => {
        Object.keys(obj).forEach(key => {
            obj[key] = removeArrow(obj[key])
        })
    })
    return json
})
.then(json => {
    json.map(obj => {
        obj.Age_group === '18+' ? regionValue.push({region: obj.Region_name, vaccination: obj.Vaccination_coverage_completed}) : false
    })
    update(regionValue.slice(30, 60))
})
.catch(err => console.log(err))
