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
      var week: number = Number(this.allWeeks[i])
      var weights = this.progressLog[this.year][week][this.exercise]
      for (let j = 0; j < weights.length; ++j) {
        var weight: number = weights[j]
        this.chartData.push(this.createPoint(week, weight));
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
    this.scatterChart = new Chart("scatterChartID", {
      type: 'scatter',
      data: {
        datasets: [{
          backgroundColor: '#000',
          data: this.chartData,
        }]
      },
      options: {
        scales: {
          xAxes: [{
            ticks: {
              display: true,
              fontSize: 15,
              padding: 10,
              stepSize: 1,
            },
            gridLines: {
              display: true,
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Week of year",
              fontSize: 15,
            }
          }],
          yAxes: [{
            ticks: {
              display: true,
              fontSize: 15,
              padding: 10,
            },
            gridLines: {
              display: true,
              drawBorder: false,
            },
            scaleLabel: {
              display: true,
              labelString: "Weight (lbs)",
              fontSize: 15,
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