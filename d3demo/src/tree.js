// import { sources } from "webpack";

export function drawTree() {
  let svg = d3.select("body")
    .append("svg")
    .attr("class", "tree")
    .attr("width", 960)
    .attr("height", 800)

  let marge = { top: 50, bottom: 0, left: 10, right: 0 };
  let width = svg.attr("width");
  let height = svg.attr("height")

  let g = svg.append('g')
    .attr("transform", `translate(${marge.top},${marge.left})`)

  // 数据
  let dataset = {
    name: "中国",
    children: [
      {
        name: "浙江",
        children: [
          { name: "杭州", value: 100 },
          { name: "宁波", value: 100 },
          { name: "温州", value: 100 },
          { name: "绍兴", value: 100 }
        ]
      },
      {
        name: "广西",
        children: [
          {
            name: "桂林",
            children: [
              { name: "秀峰区", value: 100 },
              { name: "叠彩区", value: 100 },
              { name: "象山区", value: 100 },
              { name: "七星区", value: 100 }
            ]
          },
          { name: "南宁", value: 100 },
          { name: "柳州", value: 100 },
          { name: "防城港", value: 100 }
        ]
      },
      {
        name: "黑龙江",
        children: [
          { name: "哈尔滨", value: 100 },
          { name: "齐齐哈尔", value: 100 },
          { name: "牡丹江", value: 100 },
          { name: "大庆", value: 100 }
        ]
      },
      {
        name: "新疆",
        children:
          [
            { name: "乌鲁木齐" },
            { name: "克拉玛依" },
            { name: "吐鲁番" },
            { name: "哈密" }
          ]
      }
    ]
  }

  // 创建一个层级布局
  let hierarchyData = d3.hierarchy(dataset)
    .sum((data) => data.value) //对value 进行层级求和
  // var obj = d3.hierarchy({
  //   name: "rootNode",
  //   children: [
  //     {
  //       name: "child1"
  //     },
  //     {
  //       name: "child2",
  //       children: [
  //         { name: "grandChild1" },
  //         { name: "grandChild2" },
  //         { name: "grandChild3" },
  //         { name: "grandChild4" }
  //       ]
  //     },
  //     {
  //       name: "child3",
  //       children: [
  //         { name: "grandChild5" },
  //         { name: "grandChild6" },
  //       ]
  //     }
  //   ]
  // });
  // console.log(obj);
  // console.log(hierarchyData);
  // console.log(d3.hierarchy(dataset));

  let tree = d3.tree()
    .size([width - 200, height - 100])
    .separation((a, b) => (a.parent == b.parent ? 1 : 2) / a.depth)
  // 一种间距控制，相同parents 的间距小，层级深得间距小

  let treeData = tree(hierarchyData); // 初始化传入数据，
  // 返回后代节点数组，第一个节点为自身，
  //然后依次为所有子节点的拓扑排序。
  let nodes = treeData.descendants(); // 可以理解为节点
  /**
   * 返回当前 node 的 links 数组, 其中每个 link 是一个定义了 source 和 target 属性的对象。
   * 每个 link 的 source 为父节点, target 为子节点。
   */

  let links = treeData.links() // 可以理解为边:为了配置path而生成的数据结构

  //输出节点和边
  console.log(nodes);
  console.log(links);

  let bezier = d3.linkHorizontal() //Horizontal横向
    .x((data) => data.y)
    .y((data) => data.x) // 因为是横向 ，所以交换，没写反
  // console.log({x = [],y = []} = {x:1,y:2});

  //开始绘制path
  g.append('g')
    .selectAll('path')
    .data(links)
    .enter()
    .append('path')
    .attr("d", (data) => {
      let start = { x: data.source.x, y: data.source.y }
      let end = { x: data.target.x, y: data.target.y }
      return bezier({ source: start, target: end })
    })
    .attr('fill', 'none')
    .attr("stroke", 'pink')
    .attr('storke-width', 2)
  /**
   * 分组操作 ，先分好组定好位
   */
  let group = g.append('g')
    .selectAll('g')
    .data(nodes)
    .enter()
    .append('g')
    .attr("transform", (data) => {
      let cx = data.x;
      let cy = data.y;
      return `translate(${cy},${cx})` //为什么反着来还没想到
    })
  /**
   * 绘制节点和文字
   * 
   */
  group.append('circle')
    .attr('r', 4)
    .attr('fill', 'white')
    .attr('stroke', '#74b9ff')
    .attr('stroke-width', 2)
  //文字
  group.append('text')
    .attr("x",(data) => data.children ? - data.data.name.length *19.5 : 8) //如果某节点有子节点，则对应的文字前移
    .attr('y',5)
    // .attr('dy',10) 多此一举 
    .text((data) => data.data.name)
}

//  下一步计划， 点击 删除数据结构对应子节点，做到自动收缩