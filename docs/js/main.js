'use strict';

var cTable = [
  "#de9610", "#c93a40", "#fff001", "#d06d8c", "#65ace4", "#a0c238",
  "#56a764", "#d16b16", "#cc528b", "#9460a0", "#f2cf01", "#0074bf"
];
const area_array = ["横浜地域", "川崎地域", "横須賀三浦地域", "県央地域", "湘南地域", "県西地域"];

// 円（ドーナツ）グラフの描画
function draw_pie_chart(ctx, chart_title, pie_datasets) {
  var myPieChart = new Chart(ctx, {
    // type: 'pie',
    type: "doughnut",
    data: {
      labels: pie_datasets.data_labels,
      datasets: [
        {
          backgroundColor: pie_datasets.colors,
          data: pie_datasets.datasets,
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: chart_title,
        fontColor: 'rgb(255, 255, 255)',
      },
      legend: {
        display: true,
        labels: { fontColor: 'rgb(255, 255, 255)'  }
      },
    },
  });
}
// 合計値の追記
function show_target_total(target_total, datasets) {
  let total = 0;
  for (let i of datasets) { total += i; console.log(i) }
  target_total.textContent += total;
}

// 棒グラフの描画
function draw_bar_chart(ctx, chart_title, bar_datasets) {
  var stackedBar = new Chart(ctx, {
    type: "bar",
    data: {
      labels: bar_datasets.data_labels,
      datasets: [
        {
          label: bar_datasets.item_labels,
          data: bar_datasets.datasets,
          backgroundColor: bar_datasets.colors,
        }
      ],
    },
    options: {
      title: {
        display: true,
        text: chart_title,
        fontColor: 'rgb(255, 255, 255)',
      },
      legend: {
        display: false,
      },
    },
  });

}


// 人口割合の円グラフ
var pop_pichart_ctx = document.querySelector("#target-pop-pichart").getContext("2d");
const pop_datasets = {
  data_labels: area_array,
  colors: [ cTable[0], cTable[1], cTable[2], cTable[3], cTable[4], cTable[5]],
  datasets: [3760467, 1539284, 696443, 1579555, 1309961, 336908],
};
draw_pie_chart(pop_pichart_ctx, "地域人口[人]", pop_datasets);
// ラベル追記
var target_pop_total = document.querySelector("#target-pop-total");
show_target_total(target_pop_total, pop_datasets.datasets);


// 面積割合の円グラフ
var area_pichart_ctx = document.querySelector("#target-area-pichart").getContext("2d");
const area_datasets = {
  data_labels: area_array,
  colors: [cTable[0], cTable[1], cTable[2], cTable[3], cTable[4], cTable[5]],
  datasets: [437.56, 143.01, 206.86, 621.66, 372.18, 635.09],
};
draw_pie_chart(area_pichart_ctx, "行政区域面積[㎢]	", area_datasets);
// ラベル追記
var target_area_total = document.querySelector("#target-area-total");
show_target_total(target_area_total, area_datasets.datasets);


// 人口密度の棒グラフ
var density_barchart_ctx = document.querySelector("#target-density-barchart").getContext("2d");
const density_datasets = {
  data_labels: area_array,
  datasets: [ 8594, 10763, 3367, 2541, 3520, 530],
  colors: [cTable[0], cTable[1], cTable[2], cTable[3], cTable[4], cTable[5]],
};
draw_bar_chart(density_barchart_ctx, "人口密度[人/㎢]", density_datasets);
