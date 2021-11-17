function renderLegend(colors) { // define function renderLegend with colors as parameter
    const width = 150 // width for the svg
    const height = 280 // height for the svg
    const innerPadding = 30 // innerPadding for the svg

    const svg = d3.select('#legend') // select svg with id legend
    .attr('width', width) // assign width to the svg
    .attr('height', height) // assign height to the svg
    .attr('transform', 'translate(350, -290)') // svg should go up a bit, so it's visible

    const g = svg.selectAll('g') // select groups in the svg
    .data(colors, (d) => d.colors) // every color is a data object
    .join('g') // for every color make a color
    .attr('class', 'legend') // add class legend to group element

    const rect = g.append('rect') // add rectangle to g
    .attr('width', 20) // width is 20
    .attr('height', 20) // height is 20
    .attr('x', 20) // go 20px to the right on the x axis
    .attr('y', (d, i) => d.value + (i * innerPadding) - 15)
    .attr('fill', (d) => d.color)
    .attr('stroke', 'white')
    .style('opacity', '.5')

    const text = g.append('text')
    .text((d) => 'onder ' + d.value + '%')
    .attr('x', 60)
    .attr('y', (d, i) => d.value + (i * innerPadding))
    .style('fill', 'white')
    .style('font-family', 'sans-serif')
    
}

export default renderLegend