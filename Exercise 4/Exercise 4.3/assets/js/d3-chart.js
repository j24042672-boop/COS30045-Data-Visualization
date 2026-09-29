// 文件路径: assets/js/d3-chart.js

// 找到刚刚在 HTML 里面加的那个容器，并在里面放一张带边框的画布 (SVG)
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// 在画布上画一个蓝色的测试长方形
svg.append("rect")
    .attr("x", 10)
    .attr("y", 10)
    .attr("width", 414)
    .attr("height", 16)
    .attr("fill", "blue");