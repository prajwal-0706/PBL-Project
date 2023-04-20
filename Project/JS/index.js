//Plot Options
let options = {
  chart: {
    type: 'line',
  },
  series: [
    {
      name: 'Population',
      data: [10, 16, 37, 17, 38],
    },
    {
      name: 'Prajwal',
      data: [50, 20, 39, 40, 49],
    },
  ],
  xaxis: {
    categories: ['h', 'e', 'l', 'l', 'o'],
  },
};

//Add Changes

const chart = new ApexCharts(document.querySelector('.chart'), options);

//Render changes

chart.render();
