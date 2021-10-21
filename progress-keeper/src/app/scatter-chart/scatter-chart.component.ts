import { Component, Input, OnInit } from '@angular/core';
import ProgressLogJSON from '../../../../data/exports/ProgressLog.json'
import { Chart } from 'chart.js';

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit {
  @Input() exercise: string;
  @Input() year: string;

  progressLog: any = ProgressLogJSON; // {yr:string: {wk:string: {exercise:string: [int]}}}

  allWeeks: string[] = [];
  chartData: { x: number, y: number }[] = [];

  scatterChart: any;

  constructor() { }

  ngOnInit(): void {
    this.allWeeks = Object.keys(this.progressLog[this.year]);
    // this.sortWeights()
    this.fillData()
    this.displayScatterChart();
  }

  sortWeights(): void {
    for (let i = 0; i < this.allWeeks.length; ++i) {
      this.progressLog[this.year][this.allWeeks[i]][this.exercise].sort()
    }
  }

  fillData(): void {
    for (let i = 0; i < this.allWeeks.length; ++i) {
      var week: string = this.allWeeks[i]
      if(typeof(this.progressLog[this.year][week][this.exercise]) != "undefined"){
        var weights = this.progressLog[this.year][week][this.exercise]
        for (let j = 0; j < weights.length; ++j) {
          var weight: number = weights[j]
          this.chartData.push(this.createPoint(Number(week), weight));
        }
      }
    }
  }

  createPoint(week: number, weight: number): Point {
    var p: Point = {
      x: week,
      y: weight,
    }
    return p;
  }

  displayScatterChart(): void {
    // Chart.defaults.font.family = "Arial";
    this.scatterChart = new Chart("scatterChartID", {
      type: 'scatter',
      data: {
        datasets: [{
          backgroundColor: '#000',
          data: this.chartData,
        }]
      },
      options: {
        maintainAspectRatio: false,
        scales: {
          xAxes: [{
            ticks: {
              display: true,
              fontSize: 15,
              padding: 10,
              stepSize: 1,
              fontFamily: "Verdana"
            },
            gridLines: {
              display: true,
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Week of year",
              fontSize: 15,
              fontFamily: "Verdana"
            }
          }],
          yAxes: [{
            ticks: {
              display: true,
              fontSize: 15,
              padding: 10,
              fontFamily: "Verdana"
            },
            gridLines: {
              display: true,
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Weight (lbs)",
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

interface Point {
  x: number,
  y: number
}