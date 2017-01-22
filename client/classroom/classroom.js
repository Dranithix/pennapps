import Chart from "chart.js";

const names = [
    'John Aby',
    'Abi Lori',
    'Abie Mila',
    'Laurie Sia',
    'Flowa Tulip',
    'Binuri Autumn',
    'Riley Oloy',
    'Miya Saly',
    'Binuri Fleury',
    'Nira Toura',
    'Pooya Firhan',
    'Stephanie Leeyam',
    'Youra George',
    'Hassan Ali',
    'Kenta Leeyam',
    'Marie Faily',
    'Darren Shinay',
    'Akeel Ali',
    'David Hererra',
    'Darren Shinay',
    'David Hererra',
    'David Hererra',
    'Hassan Ali',
    'George Jared',
    'Kenta Leeyam',
    'David Hererra',
    'Darren Shinay',
    'David Hererra',
    'Youra George',
    'George Jared',
    'Marie Faily',
    'David Hererra',
    'Darren Shinay',
    'Sandrine Loreiller',
    'Sandrine Loreiller',
    'Kenta Leeyam',
    'Sandrine Loreiller',
    'Darren Shinay',
    'Sandrine Loreiller',
    'Sandrine Loreiller',
    'Darren Shinay',
    'Sandrine Loreiller',
    'Sandrine Loreiller',
    'Hassan Ali',
    'George Jared',
    'Darren Shinay',
    'George Jared',
    'Marie Faily',
    'Marc Palaci',
    'Marc Palaci',
    'Kenta Leeyam',
    'Marc Palaci',
    'Marc Palaci',
    'Marie Faily',
    'Marc Palaci',
    'Marc Palaci',
    'Youra George',
    'Marc Palaci',
    'Marie Faily',
    'Hassan Ali',
    'George Jared',
    'Darren Shinay',
    'Akeel Ali',
    'Marc Palaci',
    'Marc Palaci',
    'Youra George',
    'Akeel Ali',
    'Akeel Ali',
    'Darren Shinay',
    'Akeel Ali',
    'Marie Faily',
    'Akeel Ali'
];

const thumbnails = [
    'https://randomuser.me/api/portraits/men/15.jpg',
    'https://randomuser.me/api/portraits/women/55.jpg',
    'https://randomuser.me/api/portraits/women/78.jpg',
    'https://randomuser.me/api/portraits/women/27.jpg',
    'https://randomuser.me/api/portraits/women/75.jpg',
    'https://randomuser.me/api/portraits/women/46.jpg',
    'https://randomuser.me/api/portraits/women/1.jpg',
    'https://randomuser.me/api/portraits/women/7.jpg',
    'https://randomuser.me/api/portraits/women/24.jpg',
    'https://randomuser.me/api/portraits/women/10.jpg',
    'https://randomuser.me/api/portraits/women/28.jpg',
    'https://randomuser.me/api/portraits/women/92.jpg',
    'https://randomuser.me/api/portraits/women/81.jpg',
    'https://randomuser.me/api/portraits/women/93.jpg',
    'https://randomuser.me/api/portraits/women/74.jpg',
    'https://randomuser.me/api/portraits/women/90.jpg',
    'https://randomuser.me/api/portraits/women/77.jpg',
    'https://randomuser.me/api/portraits/women/49.jpg',
    'https://randomuser.me/api/portraits/women/16.jpg',
    'https://randomuser.me/api/portraits/women/22.jpg',
    'https://randomuser.me/api/portraits/women/86.jpg',
    'https://randomuser.me/api/portraits/women/43.jpg',
    'https://randomuser.me/api/portraits/women/56.jpg',
    'https://randomuser.me/api/portraits/women/58.jpg',
    'https://randomuser.me/api/portraits/women/69.jpg',
    'https://randomuser.me/api/portraits/women/17.jpg',
    'https://randomuser.me/api/portraits/women/41.jpg',
    'https://randomuser.me/api/portraits/women/80.jpg',
    'https://randomuser.me/api/portraits/women/94.jpg',
    'https://randomuser.me/api/portraits/women/31.jpg',
    'https://randomuser.me/api/portraits/women/15.jpg',
    'https://randomuser.me/api/portraits/women/50.jpg',
    'https://randomuser.me/api/portraits/women/72.jpg',
    'https://randomuser.me/api/portraits/women/66.jpg',
    'https://randomuser.me/api/portraits/women/61.jpg',
    'https://randomuser.me/api/portraits/women/87.jpg',
    'https://randomuser.me/api/portraits/women/52.jpg',
    'https://randomuser.me/api/portraits/women/39.jpg',
    'https://randomuser.me/api/portraits/women/65.jpg',
    'https://randomuser.me/api/portraits/women/83.jpg',
    'https://randomuser.me/api/portraits/women/62.jpg',
    'https://randomuser.me/api/portraits/women/89.jpg',
    'https://randomuser.me/api/portraits/women/29.jpg',
    'https://randomuser.me/api/portraits/women/54.jpg',
    'https://randomuser.me/api/portraits/women/23.jpg',
    'https://randomuser.me/api/portraits/women/13.jpg',
    'https://randomuser.me/api/portraits/women/45.jpg',
    'https://randomuser.me/api/portraits/women/57.jpg',
    'https://randomuser.me/api/portraits/women/12.jpg',
    'https://randomuser.me/api/portraits/women/0.jpg',
    'https://randomuser.me/api/portraits/women/34.jpg',
    'https://randomuser.me/api/portraits/women/2.jpg',
    'https://randomuser.me/api/portraits/women/3.jpg',
    'https://randomuser.me/api/portraits/men/43.jpg',
    'https://randomuser.me/api/portraits/men/69.jpg',
    'https://randomuser.me/api/portraits/men/89.jpg',
    'https://randomuser.me/api/portraits/men/17.jpg',
    'https://randomuser.me/api/portraits/men/70.jpg',
    'https://randomuser.me/api/portraits/men/25.jpg',
    'https://randomuser.me/api/portraits/men/47.jpg',
    'https://randomuser.me/api/portraits/men/21.jpg',
    'https://randomuser.me/api/portraits/men/75.jpg',
    'https://randomuser.me/api/portraits/men/66.jpg',
    'https://randomuser.me/api/portraits/men/13.jpg',
    'https://randomuser.me/api/portraits/men/86.jpg',
    'https://randomuser.me/api/portraits/men/35.jpg',
    'https://randomuser.me/api/portraits/men/51.jpg',
    'https://randomuser.me/api/portraits/lego/1.jpg',
    'https://randomuser.me/api/portraits/lego/3.jpg',
    'https://randomuser.me/api/portraits/lego/7.jpg',
    'https://randomuser.me/api/portraits/lego/8.jpg',
    'https://randomuser.me/api/portraits/lego/6.jpg'
];

const users = _.map(thumbnails, (thumbnail, i) => {
    return {thumbnail, name: names[i]}
});

Template.classroom.viewmodel({
    modalOpen: false,
    users: users,
    onRendered: function () {
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
                                backgroundColor: ['#'+(Math.random()*0xFFFFFF<<0).toString(16)],
                                hoverBackgroundColor: ["#50C692"]
                            }
                        ]
                    },

                }
            )
        });

        $(".modal-background").on("click", () => {
            this.toggleModal();
        });
    },

    toggleModal() {
        this.modalOpen(!$("#chartModal").hasClass("is-active"))
        $("#chartModal").toggleClass("is-active");
    },

    createAssessment() {
        FlowRouter.go("/worksheet/trigonometry");
    }
})

Template.chartModal.viewmodel({
    onRendered() {
        var parseDate = d3.time.format("%d-%b-%Y").parse;

        var lineData = [
            [parseDate("1-jan-2013"), 25],
            [parseDate("1-apr-2013"), 30],
            [parseDate("1-may-2013"), 50],
            [parseDate("1-jun-2013"), 60],
            [parseDate("1-dec-2013"), 45]
        ];

        var intermediateLineData = [
            [parseDate("1-jan-2013"), 0],
            [parseDate("1-apr-2013"), 5],
            [parseDate("1-may-2013"), 30],
            [parseDate("1-jun-2013"), 50],
            [parseDate("1-dec-2013"), 5]
        ];
        var area1Data = [
            [parseDate("1-dec-2012"), 0],
            [parseDate("1-jan-2013"), 25],
            [parseDate("1-feb-2013"), 10],
            [parseDate("1-mar-2013"), 17],
            [parseDate("1-apr-2013"), 30],
            [parseDate("1-may-2013"), 25],
            [parseDate("1-jun-2013"), 50],
            [parseDate("1-jul-2013"), 60],
            [parseDate("1-aug-2013"), 50],
            [parseDate("1-sep-2013"), 30],
            [parseDate("1-oct-2013"), 25],
            [parseDate("1-nov-2013"), 45],
            [parseDate("1-dec-2013"), 20],
            [parseDate("1-jan-2014"), 0]
        ];
        var area2Data = [
            [parseDate("1-dec-2012"), 0],
            [parseDate("1-jan-2013"), 10],
            [parseDate("1-feb-2013"), 7],
            [parseDate("1-mar-2013"), 12],
            [parseDate("1-apr-2013"), 25],
            [parseDate("1-may-2013"), 35],
            [parseDate("1-jun-2013"), 25],
            [parseDate("1-jul-2013"), 15],
            [parseDate("1-aug-2013"), 6],
            [parseDate("1-sep-2013"), 9],
            [parseDate("1-oct-2013"), 11],
            [parseDate("1-nov-2013"), 40],
            [parseDate("1-dec-2013"), 30],
            [parseDate("1-jan-2014"), 0]
        ];


        var nullLineData = [
            [parseDate("1-jan-2013"), 0],
            [parseDate("1-apr-2013"), 0],
            [parseDate("1-may-2013"), 0],
            [parseDate("1-jun-2013"), 0],
            [parseDate("1-dec-2013"), 0],
        ];
        var extremeNullData = [
            [parseDate("1-dec-2012"), 0],
            [parseDate("1-jan-2013"), 0],
            [parseDate("1-feb-2013"), 0],
            [parseDate("1-mar-2013"), 0],
            [parseDate("1-apr-2013"), 0],
            [parseDate("1-may-2013"), 0],
            [parseDate("1-jun-2013"), 0],
            [parseDate("1-jul-2013"), 0],
            [parseDate("1-aug-2013"), 0],
            [parseDate("1-sep-2013"), 0],
            [parseDate("1-oct-2013"), 0],
            [parseDate("1-nov-2013"), 0],
            [parseDate("1-dec-2013"), 0],
            [parseDate("1-jan-2014"), 0]
        ];


// Timing
        var start = 0;
        var beginChartIn = start + 800; //After baseline comes in
        var finishChartIn = beginChartIn + 1400;
        var beginChartOut = finishChartIn + 1500;
        var finishChartOut = beginChartOut + 1300; //begin taking baseline out
        var finish = finishChartOut + 1500;


        var marginBottom = 30;
        var width = 800;
        var height = 500;
        var chartBottom = height - marginBottom;
        var chartHeight = chartBottom - 10; // 10 = baseline

        var svg = d3.select("#chart")
            .attr("width", width)
            .attr("height", height);

// Scaling functions
        var xScale = d3.time.scale()
            .range([0, width])
            .domain(d3.extent(area1Data, function(d) { return d[0]; }));
        var yScale = d3.scale.linear()
            .range([chartHeight, 0])
            .domain([0, d3.max(area1Data, function(d) { return (d[1]*1.2); /* Pad for elastic easing */ })]);


        /* CREATE SVG ELEMENTS */

// Axis
        var xAxis = d3.svg.axis()
            .scale(xScale)
            .orient("bottom").ticks(12)
            .tickFormat(d3.time.format("%b"));
        var axisPath = svg.append("g")
            .attr("class", "x axis done")
            .attr("transform", "translate(0," + chartBottom + ")")
            .call(xAxis);

// Pink Area
        var area1 = d3.svg.area()
            .x(function(d) { return xScale(d[0]); })
            .y0(chartHeight)
            .y1(function(d) { return yScale(d[1]); });
        var area1Path = svg.append("path")
            .attr("class", "area area1");
        var area1LineR = svg.append("line")
            .attr("class", "basline area1Baseline rightBaseline");
        var area1LineL = svg.append("line")
            .attr("class", "basline area1Baseline leftBaseline");

// Orange Area
        var area2 = d3.svg.area()
            .x(function(d) { return xScale(d[0]); })
            .y0(chartHeight)
            .y1(function(d) { return yScale(d[1]); });
        var area2Path = svg.append("path")
            .attr("class", "area area2");
        var area2LineR = svg.append("line")
            .attr("class", "basline area2Baseline rightBaseline");
        var area2LineL = svg.append("line")
            .attr("class", "basline area2Baseline leftBaseline");

// Line Graph
        var line = d3.svg.line()
            .x(function(d,i){
                return xScale(d[0]);
            })
            .y(function(d,i){
                return yScale(d[1]);
            });
        var linePath = svg.append("svg:path")
            .attr("class", "line");

// Line that covers whole area to stop moz element reflection from thinking that the svg is shrinking when the graph shrinks.
        svg.append("line")
            .attr("x1", 0)
            .attr("y1", 0)
            .attr("x2", width)
            .attr("y2", height)
            .style("stroke", "blue")
            .style("stroke-width", "5px")
            .style("opacity", "0")



        /*
         THE FOLLOWING FUNCTION ACTUALLY PREFORMS THE ANIMATION
         CALL ON A LOOP TO MAKE THE ANIMATION LOOP
         */

        var beginAnimation = function() {

            area1Path
                .attr("d", area1(extremeNullData))
                .transition()
                .delay(beginChartIn + 200)
                .duration(1000)
                .ease("elastic", 1, 0.9)
                .attr("d", area1(area1Data))
                .transition()
            area1LineR
                .attr("x1", (width/2))
                .attr("x2", (width/2))
                .attr("y1", (height-marginBottom-5))
                .attr("y2", (height-marginBottom-5))
                .transition()
                .delay(start)
                .duration(900)
                .attr("x1", 0)
            area1LineL
                .attr("x1", (width/2))
                .attr("x2", (width/2))
                .attr("y1", (height-marginBottom-5))
                .attr("y2", (height-marginBottom-5))
                .transition()
                .delay(start)
                .duration(900)
                .attr("x2", width)

            area2Path
                .attr("d", area2(extremeNullData))
                .transition()
                .delay(beginChartIn + 200)
                .duration(1000)
                .ease("elastic", 1, 0.9)
                .attr("d", area2(area2Data))
            area2LineR
                .attr("x1", (width/2))
                .attr("x2", (width/2))
                .attr("y1", (height-marginBottom-5))
                .attr("y2", (height-marginBottom-5))
                .transition()
                .delay(start + 300)
                .duration(900)
                .attr("x1", 0)
            area2LineL
                .attr("x1", (width/2))
                .attr("x2", (width/2))
                .attr("y1", (height-marginBottom-5))
                .attr("y2", (height-marginBottom-5))
                .transition()
                .delay(start + 300)
                .duration(900)
                .attr("x2", width)

            linePath
                .attr("d", line(nullLineData))
                .transition()
                .delay(beginChartIn+200)
                .duration(1100)
                .ease("linear", 1, 0.4)
                .attr("d", line(intermediateLineData))
                .attr("class", "line")
                .transition()
                .delay(beginChartIn+800)
                .duration(1100)
                .ease("elastic", 1, 0.4)
                .attr("d", line(lineData))

            axisPath
                .transition()
                .delay(start)
                .duration(1100)
                .attr("class", "x axis")

        }

        beginAnimation();
    }
})