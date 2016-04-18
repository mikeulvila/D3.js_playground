var bardata = [];

d3.tsv('../data/data.tsv', function (data) {

  for (key in data) {
    bardata.push(data[key].value);
  }

  var tempColor;

  var margin = { top: 30, right: 30, bottom: 40, left: 50};


  var height = 400 - margin.top - margin.bottom,
      width = 600 - margin.left - margin.right,
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
               .rangeBands([0, width], .2)

  var tooltip = d3.select('body').append('div')
                .style('position', 'absolute')
                .style('width', '60px')
                .style('padding', '0 10px')
                .style('background', 'white')
                .style('opacity', 0)

  var myChart = d3.select('#chart').append('svg')
    .style('background', '#E7E0CB')
    .attr('width', width + margin.left + margin.right)
    .attr('height', height + margin.top + margin.bottom)
    .append('g')
    .attr('transform', 'translate(' + margin.left + ', ' + margin.top + ')')
    .selectAll('rect').data(bardata)
    .enter().append('rect')
      .style('fill', function (data, index) {
         return colors(index);
      })
      .attr('width', xScale.rangeBand())
      .attr('height', 0)
      .attr('x', function (data, index) {
         return xScale(index);
      })
      .attr('y', height)

    .on('mouseover', function (data) {

      tempColor = this.style.fill;
       d3.select(this)
          .style('opacity', .5)
          .style('fill', 'yellow')

      tooltip.transition()
        .style('opacity', .9);

      tooltip.html(data)
        .style("left", (d3.event.pageX) + "px")
        .style("top", (d3.event.pageY) + "px");

    })

    .on('mouseout', function (data) {

       d3.select(this)
        .style('opacity', 1)
        .style('fill', tempColor)
    })

  myChart.transition()
    .attr('height', function (data) {
       return yScale(data);
    })
    .attr('y', function (data) {
       return height - yScale(data);
    })
    .delay(function (d, i) {
       return i * 20;
    })
    .ease('elastic')

  var vGuideScale = d3.scale.linear()
    .domain([0, d3.max(bardata)])
    .range([height, 0])

  var vAxis = d3.svg.axis()
              .scale(vGuideScale)
              .orient('left')
              .ticks(10)

  var vGuide = d3.select('svg').append('g')
      vAxis(vGuide)

      vGuide.attr('transform', 'translate(' + margin.left + ', ' + margin.top +')')
      vGuide.selectAll('path')
        .style({ fill: 'none', stroke: '#000' })
      vGuide.selectAll('path')
        .style({ stroke: '#000' })

  var hAxis = d3.svg.axis()
    .scale(xScale)
    .orient('bottom')
    .tickValues(xScale.domain().filter(function (d, i) {
       return !(i % (bardata.length/5));
    }))

  var hGuide = d3.select('svg').append('g')
      hAxis(hGuide)
      hGuide.attr('transform', 'translate(' + margin.left + ', ' + (height + margin.top) +')')

      hGuide.selectAll('path')
        .style({ fill: 'none', stroke: '#000' })
      hGuide.selectAll('path')
        .style({ stroke: '#000' })

});












