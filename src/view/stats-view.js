// import AbstractView from './abstract-view';
// import Chart from 'chart.js';
// import ChartDataLabels from 'chartjs-plugin-datalabels';
//
// const BAR_HEIGHT = 50;
// const statisticCtx = document.querySelector('.statistic__chart');
//
//
// // Обязательно рассчитайте высоту canvas, она зависит от количества элементов диаграммы
//
//
// const renderChart = (statisticCtx, movies) => {
//   statisticCtx.height = BAR_HEIGHT * 5;
// }
//
// const myChart = new Chart(statisticCtx, {
//   plugins: [ChartDataLabels],
//   type: 'horizontalBar',
//   data: {
//     labels: ['Sci-Fi', 'Animation', 'Fantasy', 'Comedy', 'TV Series'],
//     datasets: [{
//       data: [11, 8, 7, 4, 3],
//       backgroundColor: '#ffe800',
//       hoverBackgroundColor: '#ffe800',
//       anchor: 'start',
//       barThickness: 24,
//     }],
//   },
//   options: {
//     responsive: false,
//     plugins: {
//       datalabels: {
//         font: {
//           size: 20,
//         },
//         color: '#ffffff',
//         anchor: 'start',
//         align: 'start',
//         offset: 40,
//       },
//     },
//     scales: {
//       yAxes: [{
//         ticks: {
//           fontColor: '#ffffff',
//           padding: 100,
//           fontSize: 20,
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false,
//         },
//       }],
//       xAxes: [{
//         ticks: {
//           display: false,
//           beginAtZero: true,
//         },
//         gridLines: {
//           display: false,
//           drawBorder: false,
//         },
//       }],
//     },
//     legend: {
//       display: false,
//     },
//     tooltips: {
//       enabled: false,
//     },
//   },
// });
//
//
// const createStatisticTemplate = (anythink) => {
//
//   const data = anythink;
//
//   return `
//   <section class="statistic">
//     <p class="statistic__rank">
//       Your rank
// <!--      <img class="statistic__img" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">-->
//       <span class="statistic__rank-label">Movie buff</span>
//     </p>
//
//     <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
//       <p class="statistic__filters-description">Show stats:${anythink[1]}</p>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-all-time" value="all-time" checked>
//       <label for="statistic-all-time" class="statistic__filters-label">All time</label>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-today" value="today">
//       <label for="statistic-today" class="statistic__filters-label">Today</label>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-week" value="week">
//       <label for="statistic-week" class="statistic__filters-label">Week</label>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-month" value="month">
//       <label for="statistic-month" class="statistic__filters-label">Month</label>
//
//       <input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-year" value="year">
//       <label for="statistic-year" class="statistic__filters-label">Year</label>
//     </form>
//
//     <ul class="statistic__text-list">
//       <li class="statistic__text-item">
//         <h4 class="statistic__item-title">You watched</h4>
//         <p class="statistic__item-text">28 <span class="statistic__item-description">movies</span></p>
//       </li>
//       <li class="statistic__text-item">
//         <h4 class="statistic__item-title">Total duration</h4>
//         <p class="statistic__item-text">69 <span class="statistic__item-description">h</span> 41 <span class="statistic__item-description">m</span></p>
//       </li>
//       <li class="statistic__text-item">
//         <h4 class="statistic__item-title">Top genre</h4>
//         <p class="statistic__item-text">Drama</p>
//       </li>
//     </ul>
//
//     <!-- Пример диаграммы -->
// <!--    <img src="images/cinemaddict-stats-markup.png" alt="Пример диаграммы">-->
//
//     <div class="statistic__chart-wrap">
//       <canvas class="statistic__chart" width="1000"></canvas>
//     </div>
//
//   </section>
//   `;
// };
//
// class StatsView extends AbstractView {
//   #data = null;
//
//   constructor(data) {
//     super();
//     this.#data = data;
//   }
//
//   get template() {
//     return createStatisticTemplate(this.#data);
//   }
//
//   #setCharts = () => {
//     const {movies, statisticType} = this._data;
//     const statisticCtx = this.element.querySelector('.statistic__chart');
//
//     // this.#chart = renderChart(statisticCtx, movies, statisticType);
//   }
// }
//
// export default StatsView;