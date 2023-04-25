// Chart Options

let chartOptions_1 = {
  chart: {
    type: 'area',
    zoom: {
      enabled: false,
    },
  },
  colors: ['#3A36DB', '#FF69B4'],
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 0.9,
      opacityFrom: 0.5,
      opacityTo: 1,
    },
  },
  stroke: {
    width: 0.3,
  },
  title: {
    text: 'Reports',
    align: 'left',
    offsetX: 14,
    style: {
      fontSize: '22px',
      fontFamily: "'Poppins', sans-serif",
    },
  },
  dataLabels: {
    enabled: false,
  },
  series: [
    {
      name: 'Events',
      data: [20, 50, 30, 10, 60, 23, 56, 78],
    },
    // {
    //   name: 'Respones',
    //   data: [32, 67, 78, 34, 20, 90, 54, 32],
    // },
  ],
  xaxis: {
    categories: ['1', '2', '3', '4', '5', '6', '7', '8'],
  },

  theme: {
    mode: 'light',
  },
};

// Selecting the chart Div

const chart_1 = new ApexCharts(
  document.querySelector('.admin-charts-1'),
  chartOptions_1
);

// Render the Changes
chart_1.render();

// Chart Options for chart-2

let chartOption_2 = {
  chart: {
    type: 'donut',
    height: '90%',
  },

  colors: ['#3A36DB', '#2FE5A7', '#FF69B4'],

  title: {
    text: 'Analytics',
    style: {
      fontSize: '22px',
    },
  },

  series: [23, 43, 56],

  dataLabels: {
    enabled: false,
  },

  chartOptions: {
    labels: [1, 2, 3, 4],
  },

  legend: {
    position: 'left',
    offsetY: 100,
  },

  stroke: {
    width: 1.5,
  },

  theme: {
    mode: 'light',
  },
};

// Select the chart-2

const chart_2 = new ApexCharts(
  document.querySelector('.admin-charts-2'),
  chartOption_2
);

// Render the changes

chart_2.render();

let toggleMode = 'light';

const clickHandler_2 = () => {
  if (toggleMode === 'light') {
    toggleMode = 'dark';
  } else {
    toggleMode = 'light';
  }

  chart_1.updateOptions({
    theme: {
      mode: toggleMode,
    },
    gradient: {
      shadeIntensity: 0.2,
    },
  });

  chart_2.updateOptions({
    theme: {
      mode: toggleMode,
    },
    stroke: {
      width: 0,
    },
  });
};
