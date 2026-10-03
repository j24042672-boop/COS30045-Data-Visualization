// 找到剛剛在 HTML 裡面加的那個容器，並在裡面放一張帶邊框的畫布 (SVG)
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 1200 1600")
      .style("border", "1px solid black");

// ====== Exercise 4.5: 畫出真正的長條圖 ======
const drawBarChart = data => {
    // 定義長條圖的高度與間距常數
    const barHeight = 20; 
    const spacing = 5;

    // 綁定資料到 SVG 元素上，並畫出長方形
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => "bar bar-" + d.count)
        
        // 設定寬度 (資料的 count)、高度與顏色
        .attr("width", d => d.count) 
        .attr("height", barHeight)
        .attr("fill", "steelblue")
        
        // 分散長條圖的位置 (設定 X 和 Y 座標)
        .attr("x", 0) 
        .attr("y", (d, i) => i * (barHeight + spacing)); 
};

// ====== Exercise 4.4: 讀取與處理 CSV 資料 ======
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count 
  };
}).then(data => {
  console.log("剛載入的資料:", data);
  console.log("資料總筆數 (length):", data.length);
  console.log("最大值 (Max):", d3.max(data, d => d.count));
  console.log("最小值 (Min):", d3.min(data, d => d.count));
  console.log("範圍 (Extent):", d3.extent(data, d => d.count));

  // 將資料由大到小排序
  data.sort((a, b) => b.count - a.count);
  console.log("排序後的資料:", data);

  // 呼叫畫圖函數，把整理好的資料傳進去
  drawBarChart(data);
});