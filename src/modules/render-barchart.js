const margin = {top: 40, bottom: 20, left: 120, right: 20}
const width = 800 - margin.left - margin.right
const height = 600 - margin.top - margin.bottom

const svg = d3.select('body')
.append('svg')
.attr('width', width + margin.left + margin.right)
.attr('height', height + margin.top + margin.bottom)

const g = svg.append('g')
.attr('transform', `translate(${margin.left},${margin.top})`)

const xscale = d3.scaleLinear().range([0, width])
const yscale = d3.scaleBand().rangeRound([0, height]).paddingInner(0.5)

const xaxis = d3.axisTop().scale(xscale)
const g_xaxis = g.append('g').attr('class', 'x axis')
const yaxis = d3.axisLeft().scale(yscale)
const g_yaxis = g.append('g').attr('class', 'y axis')

function update(new_data) {
    xscale.domain([0, 100]);
    yscale.domain(new_data.map((d) => d.region));

    g_xaxis.transition().call(xaxis);
    g_yaxis.transition().call(yaxis);
  
    const rect = g.selectAll('rect')
    .data(new_data, (d) => d.region)
    .join(
      (enter) => {
        const rect_enter = enter.append('rect').attr('x', 0);
        rect_enter.append('title');
        return rect_enter;
      },
      (update) => update,
      (exit) => exit.remove()
    );

    rect.transition()
      .attr('height', yscale.bandwidth())
      .attr('width', (d) => xscale(d.vaccination))
      .attr('y', (d) => yscale(d.region));
  
    rect.select('title').text((d) => d.region);
}

export default update