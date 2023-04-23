// const charts = document.querySelectorAll('.chart');

// //Plot Options for chart 1
// let options_1 = {
//   chart: {
//     type: 'bar',
//   },
//   series: [
//     {
//       name: 'Population',
//       data: [10, 16, 37, 17, 38],
//     },
//     {
//       name: 'Second Population',
//       data: [50, 20, 39, 40, 49],
//     },
//   ],
//   xaxis: {
//     categories: ['h', 'e', 'l', 'l', 'o'],
//   },
// };

// //Add Changes for chart 1

// const chart = new ApexCharts(charts[0], options_1);

// //Render changes for chart 1

// chart.render();

// // Plot Options for chart-2

// let options_2 = {
//   chart: {
//     type: 'line',
//   },
//   series: [
//     {
//       name: 'Total Count',
//       data: [20, 30, 40, 50, 10],
//     },
//     {
//       name: 'Another Count',
//       data: [12, 45, 67, 8, 12],
//     },
//   ],
//   xaxis: {
//     categories: ['p', 'r', 'a', 'j', 'w'],
//   },
// };

// //Add Changes for chart-2

// const chart_1 = new ApexCharts(charts[1], options_2);

// //Render changes for chart-2
// chart_1.render();

// //Plot Options for chart-3

// let option_3 = {
//   chart: {
//     type: 'donut',
//   },
//   series: [12, 34, 56, 67, 54],
//   plotOptions: {
//     labels: ['Apple', 'Watermelon', 'Mango', 'Coconut', 'Banana'],
//     pie: {
//       customScale: 0.8,
//       donut: {
//         labels: {
//           show: true,
//         },
//       },
//     },
//   },
// };

// //Add changes for chart-3

// const chart_3 = new ApexCharts(charts[2], option_3);

// //Render changes for chart-3

// chart_3.render();

// //Plot Options for chart-4

// let option_4 = {
//   chart: {
//     type: 'area',
//   },
//   series: [
//     {
//       name: 'Area Chart',
//       data: [60, 40, 20, 60, 50],
//     },
//   ],
//   dataLabels: {
//     enabled: false,
//   },
//   colors: ['#00BA6C'],
//   fill: {
//     gradient: {
//       enabled: true,
//     },
//   },
//   xaxis: {
//     categories: ['D', 'U', 'J', 'A', 'L'],
//   },
// };

// //Add changes for chart-4

// const chart_4 = new ApexCharts(charts[3], option_4);

// //Render changes for chart-4
// chart_4.render();

/* DashBoard JS */

const SideBar = document.querySelectorAll('.sidebar-select');


for (let i = 0; i < SideBar.length; i++) {
  SideBar[i].addEventListener('click', () => {
    let j = 0;
    while (j < SideBar.length) {
      SideBar[j++].classList.remove('active');
    }
    SideBar[i].classList.add('active');
  });
}
