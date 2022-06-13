console.log('原生项目')

const d3 = require('d3')
// import * as d3 from "d3";
let arr = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0]
let enters = d3.select('.enter').selectAll('p');

enters.text('D3-V5-TEST-dev')

let update = enters.data(arr); //表示绑定数据,并得到update部分，
let enter = update.enter(); //表示得到到enter部分

update.text(function (data, index) {
  return "index:" + index + " updata by:" + data
})

let pEnter = enter.append('p')
pEnter.text(function (data, index) { ////添加足够多的<p>
  return "index:" + index + " enter by:" + data
})

let litteArr = [11, 22, 33]
let exits = d3.select('.exit').selectAll('p')

let updataExits = exits.data(litteArr)

let exit = updataExits.exit();

updataExits.text(function (data, index) {
  return "index:" + index + " updata by:" + data
})
//对于exit的处理通常是删除 exit.remove();
// let pexit = exit.append('p')
exit.text(function (data, index) {
  return "EXIT"
})

let marge = { top: 60, bottom: 60, left: 60, right: 60 }//设置边距
let dataset = [250, 210, 170, 130, 90];  //数据（表示矩形的宽度）

let histogram = d3.select('.histogram'); // 获取svg画布

let allItem = histogram.append("g")//定义一个用来装整个图表的一个分组，并设置他的位置
  .attr("transform", "translate(" + marge.top + "," + marge.left + ")");

let rectHeight = 30; //设置元高度(包含间距)
let rects = allItem.selectAll("rect")
  .data(dataset)
  .enter()
  .append("rect")
  .attr('x', 60) // 设置统一的X轴点位
  .attr('y', function (data, index) {
    return index * rectHeight
  })
  rects.on("mouseover",function(){console.log(d3.event)})
  rects.attr('width', 0)
  .attr('fill', '#74b9ff')//填充颜色
  .transition()//添加过渡
  .duration(2000)//持续时间
  .delay(function (d, i) {//延迟
    return i * 400;
  })
  //.ease(d3.easeElasticInOut)//这里读者可以自己将注释去掉，看看效果（chrome浏览器会报错，但是不影响效果）
  .attr("width", data => data)
  .attr('fill', 'pink')//填充颜色
  .attr("height", rectHeight - 5)


// console.log("123");

allItem.selectAll("text")
  .data(dataset)
  .enter()
  .append("text")
  .attr('x', 5) // 设置统一的X轴点位
  .attr('y', function (data, index) {
    return (index + 1) * rectHeight - 10
  })
  .text((data, index) => `${index + 1}: ${data}`)
  .style('fill', '#74b9ff')//填充颜色

// 利用比例尺重新绘制
// var scaleLinear = d3.scaleLinear()
//   		.domain([0,d3.max(dataset)])
//   		.range([0,300]);
// selectAll()
//       .attr("width",function(d){
//   			return scaleLinear(d);//设置宽,并在这里使用比例尺
//   		})

let xScale = d3.scaleLinear()
  .domain([0, d3.max(dataset)])
  .range([0, 250]) // 上面没用比例尺,最长250
// 定义一个坐标轴
let xAxis = d3.axisBottom(xScale) // bottom:朝下
  .ticks(7)
/**
 * axis.ticks()的分段规则
之所以3不起作用了，是因为定义域domain中的[0, 100]无法计算得出对应的结果。
在这个回答里，mbostock指出，无论你怎么设定，ticks的参数实际上都是在2,5和10这三个中选。

The default ticks for quantitative scales are multiples of 2, 5 and 10. 
You appear to want multiples of 6; though unusual, 
this could make sense depending on the nature of the underlying data. So, 
while you can use axis.ticks to increase or decrease the tick count, 
it will always return multiples of 2, 5 and 10 — not 6.


 */
allItem.append('g')
  .attr("transform", `translate(60,${dataset.length * rectHeight})`)
  .call(xAxis)

let datasetXY = [10, 20, 30, 23, 13, 40, 27, 35, 20];

let histogramScale = d3.select('.histogram-scale')

let width = histogramScale.attr('width')
let height = histogramScale.attr('height')

let area = histogramScale.append('g')
  .attr("transform", `translate(${marge.top},${marge.left})`)
// 使用scaleBand为了使inde巡视柱状图对应(对齐)
let xScale1 = d3.scaleBand()
  .domain(d3.range(dataset.length)) //分成几段
  .rangeRound([0, width - marge.left - marge.right]);
var xAxis1 = d3.axisBottom(xScale1);
// linear  效果就是和上一个演示一样    		
var yScale1 = d3.scaleLinear()
  .domain([0, d3.max(datasetXY)])
  .range([height - marge.top - marge.bottom, 0]);
var yAxis1 = d3.axisLeft(yScale1);


import { drawTree } from './tree';
drawTree()
