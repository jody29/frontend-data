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
    .attr('y', (d, i) => d.value + (i * innerPadding) - 15) // y is the value + index * 30 - 15 so each rect will be a bit lower
    .attr('fill', (d) => d.color) // fill should be the current color
    .attr('stroke', 'white') // stroke is white
    .style('opacity', '.5') // opacity is .5

    const text = g.append('text') // add text element
    .text((d) => 'onder ' + d.value + '%') // add text to the text element
    .attr('x', 60) // go 60px to the right
    .attr('y', (d, i) => d.value + (i * innerPadding)) // same as the rectangles
    .style('fill', 'white') // color of the text should be white
    .style('font-family', 'sans-serif') // font of the text is sans-serif
    
}

export default renderLegend