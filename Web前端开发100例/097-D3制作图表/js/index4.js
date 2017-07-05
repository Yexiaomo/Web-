d3.csv("./data/data.csv", type, function(data) {
  console.log(data);

  bar_width = 50,
  bar_padding = 10,
    svg_width = (bar_width + bar_padding) * data.length; //svg 的高度和宽度调换一下
    svg_height = 500;

    var scale = d3.scaleLinear()
    .domain( [0, d3.max(data, function(d){ return d.population;})])
    .range( [svg_width, 0 ] );

    var svg = d3.select("#container")
    .append("svg")
    .attr("width", svg_width)
    .attr("height", svg_height);

    var bar = svg.selectAll('g')
    .data(data)
    .enter()
    .append("g")
    .attr("transform", function(d,i) { 
     return "translate("+i*(bar_width+bar_padding)+", 0)";
   }
   );

    bar.append("rect")
    .attr("y", function(d) { return scale(d.population);})
    .attr("height", function(d) { return svg_height-scale(d.population);})
    .attr("width", bar_width)
    .style("fill", "steelblue") ;

    bar.append("text")
    .text(function (d) {return d.year;} )
    .attr("y", function(d) {return scale(d.population);})
    .attr("x", bar_width-11)
    .attr("dy", 15)
    .attr("text-anchor", "end");

  });
//转换一下数据的格式
function type(d) {
  d.population = +d.population; // '+' 就是转化为数值形式
  return d;
}
