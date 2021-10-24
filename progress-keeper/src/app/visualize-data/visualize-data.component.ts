import { ThrowStmt } from '@angular/compiler';
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

  emptyExercisesData:boolean = false;

  showYearContent:boolean = true;
  showExerciseContent:boolean = true;

  chartTypeSelected:boolean = false;
  selectedChartType:string = "";
  allChartTypes:string[] = ["scatter chart", "line chart"]
  showChartTypeContent:boolean = false;
  scatterChart:boolean = false;
  lineChart:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.allYears = Object.keys(this.progressLog);
    this.allYears.sort().reverse();
  }

  // Populate allExerciseNames
  getAllExerciseNames(year:string){
    // Using class variable allWeeks:string[]
    // this.allWeeks = Object.keys(this.progressLog[year]);
    // for(let i = 0; i < this.allWeeks.length; ++i){
    //   this.allExerciseNames = Object.keys(this.progressLog[year][this.allWeeks[i]]);
    // }
    if(typeof(this.progressLog[year]) == "undefined"){
      this.emptyExercisesData = true;
      return;
    }
    else{
      this.emptyExercisesData = false;
      var allWeeks:string[] = Object.keys(this.progressLog[year]);
      for(let i = 0; i < allWeeks.length; ++i){
        this.allExerciseNames = Object.keys(this.progressLog[year][allWeeks[i]]);
      }
      this.allExerciseNames = this.allExerciseNames.sort()
    }
  }

  chartSelect(type:string){
    this.chartTypeSelected = true;
    this.selectedChartType = type;
    if(type == "line chart"){
      this.lineChart = true;
      this.scatterChart = false;
    }
    else if(type == "scatter chart"){
      this.scatterChart = true;
      this.lineChart = false;
    }
    if(this.showChartTypeContent == false){
      this.showChartTypeContent = true
    }
    else{
      this.showChartTypeContent = false;
    }
  }

  // User selected year
  yearSelect(year:string){
    this.yearSelected = true;
    this.selectedYear = year;
    this.allExerciseNames = []
    this.getAllExerciseNames(this.selectedYear);
    if(this.showYearContent == false){
      this.showYearContent = true
    }
    else{
      this.showYearContent = false;
    }
  }

  // User selected exericse
  exerciseSelect(exercise:string){
    this.exerciseSelected = true;
    this.selectedExercise = exercise;

    if(this.firstLoad){
      this.firstLoad = false;
      this.prevSelectedExercise = this.selectedExercise
      this.loadNewChart = true;
    }
    else{
      this.alternateLoadNewChart();
    }
    if(this.showExerciseContent == false){
      this.showExerciseContent = true
    }
    else{
      this.showExerciseContent = false;
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
