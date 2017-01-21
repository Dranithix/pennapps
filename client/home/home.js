/**
 * Created by Kenta Iwasaki on 1/21/2017.
 */
import annotator from 'annotator';
import Chart from 'chart.js';

Template.home.viewmodel({
    onCreated() {
        $('head').append('<link rel="stylesheet" href="/css/home.css" type="text/css" />');
        // let app = new annotator.App();
        // app.include(annotator.ui.main);
        // app.include(annotator.storage.http);

        // app.start();

    },
    onRendered() {
      var progress = new Chart(document.getElementById("progress"), {
          type: 'doughnut',
          data: {
              labels: ["Complete", "Left"],
              datasets: [{
                  data: [68, 32],
                  backgroundColor: [
                    "#8AD8B6",
                    "#E6E7E6"
                  ],
                  hoverBackgroundColor: [
                    "#71BF9D",
                    "#D7D8D7"
                  ]
              }]
          },
          options: {
            responsive: true,
            legend: {
              display: false
            },
            cutoutPercentage: 75
          }
      });

      Chart.pluginService.register({
          beforeDraw: function(chart) {
            var width = chart.chart.width,
                height = chart.chart.height,
                ctx = chart.chart.ctx;

            ctx.restore();
            var fontSize = (height / 57).toFixed(2);
            ctx.font = fontSize + "em sans-serif";
            ctx.textBaseline = "middle";

            var text = "68%",
              textX = Math.round((width - ctx.measureText(text).width) / 2),
              textY = height / 2;

            ctx.fillText(text, textX, textY);
            ctx.save();
          }
      });
    }
})
