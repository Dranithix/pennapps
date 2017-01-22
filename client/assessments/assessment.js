import Chart from "chart.js"

Template.assessments.viewmodel({
  onRendered() {
    _.each($(".progressChart"), element => {
      const power = parseInt(Math.random() * 100);
      const progressChart = new Chart(
        element,
        {
          type: 'pie',
          data: {
            labels: ["Progress", "To do"],
            datasets: [
              {
                label: "Percentage",
                data: [power, 100 - power],
                backgroundColor: ["#6FE0B8"],
                hoverBackgroundColor: ["#50C692"]
              }
            ]
          },

        }
      )
    })

  },
})