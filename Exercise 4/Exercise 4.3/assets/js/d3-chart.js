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

// ====== Exercise 4.4: 讀取與處理 CSV 資料 ======

// Step 1 & 2: 讀取 CSV 檔案，並確保 count 變成數字
d3.csv("data/tvBrandCount.csv", d => {
  return {
    brand: d.brand,
    count: +d.count  // 這裡的 + 號非常重要，它會把文字轉換成真正的數字
  };
}).then(data => {
  
  // Step 3: 在 Console 印出作業要求的資料資訊
  console.log("剛載入的資料:", data);
  console.log("資料總筆數 (length):", data.length);
  console.log("最大值 (Max):", d3.max(data, d => d.count));
  console.log("最小值 (Min):", d3.min(data, d => d.count));
  console.log("範圍 (Extent):", d3.extent(data, d => d.count));

  // 將資料由大到小排序 (解決 unordered data 的問題)
  data.sort((a, b) => b.count - a.count);
  console.log("排序後的資料:", data);

  // 呼叫畫圖函數，把整理好的資料傳進去
  drawBarChart(data);
});

// 建立一個空的畫圖函數，為下一個練習做準備
function drawBarChart(data) {
  console.log("資料已經準備好，可以開始畫長條圖了！", data);
}