var bardata = [];

for (var i=0; i < 100; i++) {
  bardata.push(Math.random()*30)
}

var height = 400,
    width = 600,
    barWidth = 50,
    barOffset = 5;

var colors = d3.scale.linear()
             .domain([0, bardata.length*.33, bardata.length*.66, bardata.length])
             .range(['#B58929', '#C61C6F', '#2688D2', '#85992C'])

var yScale = d3.scale.linear()
             .domain([0, d3.max(bardata)])
             .range([0, height])

var xScale = d3.scale.ordinal()
             .domain(d3.range(0, bardata.length))
             .rangeBands([0, width])

d3.select('#chart').append('svg')
  .attr('width', width)
  .attr('height', height)
  .selectAll('rect').data(bardata)
  .enter().append('rect')
    .style('fill', function (data, index) {
       return colors(index);
    })
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

  .on('mouseover', function (data) {
    tempColor = this.style.fill;
     d3.select(this)
        .style('opacity', .5)
        .style('fill', 'yellow')
  })
  .on('mouseout', function (data) {
     d3.select(this)
      .style('opacity', 1)
      .style('fill', tempColor)
  })
