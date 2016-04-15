var bardata = [20, 200, 300, 30, 45, 15, 50, 20, 30, 45, 15, 50];

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

var yScale = d3.scale.linear()
             .domain([0, d3.max(bardata)])
             .range([0, height])

var xScale = d3.scale.ordinal()
             .domain(d3.range(0, bardata.length))
             .rangeBands([0, width])

d3.select('#chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .style('background', '#C9D7D6')
  .selectAll('rect').data(bardata)
  .enter().append('rect')
    .style('fill', '#C61C6F')
    .attr('width', xScale.rangeBand())
    .attr('height', function (data) {
       return yScale(data);
    })
    .attr('x', function (data, index) {
       return xScale(index);
    })
    .attr('y', function (data) {
       return height - yScale(data);
    })
