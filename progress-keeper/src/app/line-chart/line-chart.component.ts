import { Component, Input, OnInit } from '@angular/core';
import ProgressLogJSON from '../../../../data/exports/ProgressLog.json'
import { Chart } from 'chart.js';

const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];


@Component({
  selector: 'app-line-chart',
  templateUrl: './line-chart.component.html',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() exercise: string;
  @Input() year: string;

  progressLog: any = ProgressLogJSON; // {yr:string: {wk:string: {exercise:string: [int]}}}

  allWeeks: string[] = [];
  chartData: number[] = [];

  lineChart: any;
  labels: string[] = [];

  constructor() { }

  ngOnInit(): void {
    this.allWeeks = Object.keys(this.progressLog[this.year]);
    // this.sortWeights()
    this.fillDataAndLabels()
    this.displayLineChart();
  }

  fillDataAndLabels() {
    //for each week of weights, add up and get avg
    for (let i = 0; i < this.allWeeks.length; ++i) {
      var week: string = this.allWeeks[i]
      var weights = this.progressLog[this.year][week][this.exercise]
      if (typeof (weights) != "undefined") {
        var total:number = 0;
        for (let j = 0; j < weights.length; ++j) {
          total += weights[j]
        }
        this.chartData.push(total / weights.length);
        let date = this.getDateOfWeekNumber(this.year, week)
        var weekString:string = monthName[date.getMonth()] + " " + date.getDate();
        this.labels.push(weekString)
      }
    }
  }
  
  // https://stackoverflow.com/a/16591175
  getDateOfWeekNumber(year:string, week:string):Date{
    var simple = new Date(Number(year), 0, 1 + (Number(week) - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  displayLineChart() {
    var label_xAxes:string = "Week of " + this.year
    this.lineChart = new Chart("lineChartID", {
      type: 'line',
      data: {
        labels: this.labels,
        datasets: [{
          fill: false,
          data: this.chartData,
          lineTension: 0.1,
          backgroundColor: "blue",
          borderColor: "lightblue",
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              display: true,
              fontSize: this.chartData.length > 10 ? 10 : 15,
              padding: 10,
              stepSize: 1,
              fontFamily: "Verdana",
              fontColor: "red",
            },
            gridLines: {
              display: true,
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: label_xAxes,
              fontSize: 15,
              fontFamily: "Verdana"
            }
          }],
          yAxes: [{
            ticks: {
              display: true,
              fontSize: 15,
              padding: 10,
              fontFamily: "Verdana",
              fontColor: "blue",
            },
            gridLines: {
              display: true,
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Weight avg. (lbs)",
              fontSize: 15,
              fontFamily: "Verdana"
            }
          }],
        },
        legend: {
          display: false,
        }
      },
    });
  }
}
