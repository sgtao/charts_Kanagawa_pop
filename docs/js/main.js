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

// 折れ線グラフの描画
function draw_3lines_chart(ctx, chart_title, line_datasets) {
  var lineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels: line_datasets.data_labels,
      datasets: [
        {
          label: line_datasets.item_labels[0],
          data: line_datasets.datasets[0],
          borderColor: line_datasets.colors[0]
        },
        {
          label: line_datasets.item_labels[1],
          data: line_datasets.datasets[1],
          borderColor: line_datasets.colors[1]
        },
        {
          label: line_datasets.item_labels[2],
          data: line_datasets.datasets[2],
          borderColor: line_datasets.colors[2]
        },
      ],
    },
    options: {
      title: {
        display: true,
        text: chart_title,
        fontColor: 'rgb(255, 255, 255)',
      },
      elements: {
        line: { tension: 0, } // ベジェ曲線を無効にする
      }
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


// 人口推移の折れ線グラフ
var totalpop_linechart_ctx = document.querySelector("#target-totalpop-linechart").getContext("2d");
const total_pop_datasets = {
  data_labels: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
  datasets: [
    [9163279, 9160412, 9157211, 9161113, 9177834, 9180700, 9181389, 9180457, 9179666, 9179835, 9183257, 9182071],
    [9181625, 9178503, 9175042, 9180510, 9197925, 9199871, 9199590, 9199389, 9199037, 9200166, 9203069, 9202523],
    [9201825, 9198646, 9196411, 9204965, 9222618, , , , , , , ],
  ],
  item_labels: ['2018年', '2019年', '2020年'],
  colors: ['green', 'red', 'blue'],
};
draw_3lines_chart(totalpop_linechart_ctx, "神奈川県総人口[人]", total_pop_datasets);
