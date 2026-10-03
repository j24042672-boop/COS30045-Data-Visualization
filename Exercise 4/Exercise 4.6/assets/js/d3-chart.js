// 準備工作：把 viewBox 寬度改小 (500)，高度也稍微調小一點 (例如 800)，避免圖表太長
const svg = d3.select(".responsive-svg-container")
    .append("svg")
      .attr("viewBox", "0 0 500 800")
      .style("border", "1px solid black");

// ====== Exercise 4.5 & 4.6: 畫出具有比例尺的長條圖 ======
const drawBarChart = data => {

    // Step 1: 加入 X 軸的線性比例尺 (Linear Scale)
    // 告訴 D3：把資料中 0 到 1200 的數值，按比例縮小到畫面上的 0 到 400 像素內
    const xScale = d3.scaleLinear()
        .domain([0, 1200])
        .range([0, 400]);

    // Step 2: 加入 Y 軸的區段比例尺 (Band Scale)
    // 告訴 D3：把所有品牌的名稱，平均分配到 0 到 800 像素的高度中
    // .padding(0.1) 是用來自動產生長條圖之間的空隙
    const yScale = d3.scaleBand()
        .domain(data.map(d => d.brand))
        .range([0, 800]) 
        .padding(0.1);   

    // 綁定資料到 SVG 元素上，並畫出長方形
    svg.selectAll("rect")
        .data(data)
        .join("rect")
        .attr("class", d => "bar bar-" + d.count)
        
        // 使用 xScale 來計算寬度 (不再是直接用 d.count)
        .attr("width", d => xScale(d.count)) 
        
        // 使用 yScale 來計算高度 (自動分配的粗細，我們刪除了手動寫的 barHeight)
        .attr("height", yScale.bandwidth())
        .attr("fill", "steelblue")
        
        // X 起點依然從左邊開始
        .attr("x", 0) 
        // 使用 yScale 來決定 Y 的位置 (我們刪除了手動計算的 i * (barHeight + spacing))
        .attr("y", d => yScale(d.brand)); 
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

  // 呼叫畫圖函數
  drawBarChart(data);
});