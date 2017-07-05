d3.csv("./data/data2.csv", type, function(data) {
  console.log(data);
  var width = 400,
  height = 400;

  var svg = d3.select("#container")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

  var g = svg.append("g")
  .attr("transform", "translate(200,200)");

  var arc_generator = d3.arc()
  .innerRadius(100)
  .outerRadius(200);

  var angle_data = d3.pie()
  .value(function(d) { return d.population; });
  // console.log(angle_data(data))

  var colors = d3.schemeCategory10;
  // console.log(colors);

  g.selectAll("path")
  .data( angle_data(data) )
  .enter()
  .append("path")
  .attr("d", arc_generator)
  .style("fill", function(d, i) {
    return colors[i];
  })

  g.selectAll("text")
  .data( angle_data(data) )
  .enter()
  .append("text")
  .text( function(d) { return d.data.education; })
  .attr("transform", function(d) {return "translate("+arc_generator.centroid(d)+")";} )
  .attr("text-anchor", "middle");

});
//转换一下数据的格式
function type(d) {
  d.population = +d.population; // '+' 就是转化为数值形式
  return d;
}
