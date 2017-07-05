var width = 500,
    height = 250,
    margin = { left:50, top:30, right: 20, bottom: 20},
    g_width = width - margin.left - margin.right,
    g_height = height - margin.top - margin.bottom ;

//创建 svg 
var svg = d3.select("#container")
                    .append("svg") //等同于 .append("svg:svg")
                    .attr("width", width) //attribute
                    .attr("height", height);

var g = d3.select("svg")
                  .append("g")
                  .attr("transform","translate("+margin.left+","+margin.top+")"); //x轴偏移50,y轴偏移30



var data = [1,3,5,8,2,3,6,7,5];

//设定放大的范围
var scale_x = d3.scaleLinear()
                            .domain([0, data.length - 1])
                            .range([0, g_width]);

var scale_y = d3.scaleLinear()
                            .domain([0, d3.max(data)])
                            .range([g_height, 0]);


var line_generator = d3.line()
                            .x(function(d, i) {return scale_x(i);}) //0,1,2,3...
                            .y(function(d) {return scale_y(d);} ) //1,3,5...
                            .curve(d3.curveCardinal); //使线条变得光滑

d3.select("g")
           .append("path")
           .attr("d", line_generator(data));


//设定坐标轴

var x_axis = d3.axisBottom( scale_x ),
    y_axis = d3.axisLeft( scale_y );

g.append('g')
          .call( x_axis )
          .attr("transform", "translate(0,"+g_height+")");

g.append('g')
          .call( y_axis )
          .append("text")
          .text("Price($)")
          .attr("transform", "rotate(-90)")
          .attr("text-anchor","end")
          .attr("dy", "1em")
          .attr("fill", "black");