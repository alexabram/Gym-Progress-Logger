import { Component, OnInit } from '@angular/core';
import { Chart } from 'chart.js';
import ProgressLogJSON from '../../../../data/exports/ProgressLog.json'
import { ScatterChartComponent } from '../scatter-chart/scatter-chart.component';

@Component({
  selector: 'app-visualize-data',
  templateUrl: './visualize-data.component.html',
  styleUrls: ['./visualize-data.component.scss']
})
export class VisualizeDataComponent implements OnInit {
  progressLog:any = ProgressLogJSON; // {yr:string: {wk:string: {exercise:string: [int]}}}
  allYears:string[] = [];
  // allWeeks:string[] = [];
  allExerciseNames:string[] = [];
  yearSelected:boolean = false;
  selectedYear:string = "";
  exerciseSelected:boolean = false;
  selectedExercise:string = "";
  
  prevSelectedExercise:string = "";
  prevSelectedYear:string = "";
  loadNewChart:boolean = false;

  firstLoad:boolean = true;

  constructor() { }

  ngOnInit(): void {
    this.allYears = Object.keys(this.progressLog);
  }

  // Populate allExerciseNames
  getAllExerciseNames(year:string){
    // Using class variable allWeeks:string[]
    // this.allWeeks = Object.keys(this.progressLog[year]);
    // for(let i = 0; i < this.allWeeks.length; ++i){
    //   this.allExerciseNames = Object.keys(this.progressLog[year][this.allWeeks[i]]);
    // }
    var allWeeks:string[] = Object.keys(this.progressLog[year]);
    for(let i = 0; i < allWeeks.length; ++i){
      this.allExerciseNames = Object.keys(this.progressLog[year][allWeeks[i]]);
    }
  }

  // User selected year
  yearSelect(year:string){
    this.yearSelected = true;
    this.selectedYear = year;
    this.getAllExerciseNames(this.selectedYear);
  }

  // User selected exericse
  exerciseSelect(exercise:string){
    this.exerciseSelected = true;
    this.selectedExercise = exercise;

    if(this.firstLoad){
      this.firstLoad = false;
      this.prevSelectedExercise = this.selectedExercise
      console.log("FIRST LOAD")
      this.loadNewChart = true;
    }
    else{
      this.alternateLoadNewChart();
    }
  }

  alternateLoadNewChart(){
    if(this.loadNewChart){
      this.loadNewChart = false;
    }
    else{
      this.loadNewChart = true;
    }
  }

}
