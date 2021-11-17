function renderLegend(colors) {
    const width = 150
    const height = 280
    const innerPadding = 30

    const svg = d3.select('#legend')
    .attr('width', width)
    .attr('height', height)
    .attr('transform', 'translate(350, -290)')

    const g = svg.selectAll('g')
    .data(colors, (d) => d.colors)
    .join('g')
    .attr('class', 'legend')

    const rect = g.append('rect')
    .attr('width', 20)
    .attr('height', 20)
    .attr('x', 20)
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