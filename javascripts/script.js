var myStyles = [
  '#A57706',
  '#BD3613',
  '#D11C24',
  '#C61C6F',
  '#595AB7',
  '#2176C7'
]


d3.selectAll('.item')
  .data(myStyles)
  .style({
    'color': 'white',
    'background': function (d) {
      return d;
    }
  });
