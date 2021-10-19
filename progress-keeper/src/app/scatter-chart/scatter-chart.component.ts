import { Component, Input, OnInit } from '@angular/core';
import ProgressLogJSON from '../../../../data/exports/ProgressLog.json'

@Component({
  selector: 'app-scatter-chart',
  templateUrl: './scatter-chart.component.html',
  styleUrls: ['./scatter-chart.component.scss']
})
export class ScatterChartComponent implements OnInit {
  @Input() exercise:string;
  @Input() year:string;
  progressLog:any = ProgressLogJSON; // {yr:string: {wk:string: {exercise:string: [int]}}}

  allWeeks:string[] = [];
  data:{x: number, y:number}[] = [];

  constructor() { }

  ngOnInit(): void {
    this.allWeeks = Object.keys(this.progressLog[this.year]);
    this.sortWeights()
    this.fillData()
  }

  sortWeights():void{
    for(let i = 0; i < this.allWeeks.length; ++i){
      this.progressLog[this.year][this.allWeeks[i]][this.exercise].sort()
    }
  }

  fillData():void{
    for(let i = 0; i < this.allWeeks.length; ++i){
      var week:number = Number(this.allWeeks[i])
      var weights = this.progressLog[this.year][week][this.exercise]
      for(let j = 0; j < weights.length; ++j){
        var weight:number = weights[j]
        this.data.push(this.createPoint(week, weight));
      }
    }
  }

  createPoint(week:number, weight:number):Point{
    var p:Point = {
      x: week,
      y: weight,
    }
    return p;
  }

}

interface Point {
  x:number,
  y:number
}