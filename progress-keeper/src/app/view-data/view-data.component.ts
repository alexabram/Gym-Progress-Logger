import { Component, OnInit } from '@angular/core';
import ProgressLogJSON from '../../../../data/exports/ProgressLog.json'

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {
  progressLog:any = ProgressLogJSON; // {yr:string: {wk:string: {exercise:string: [int]}}}
  allYears:string[] = [];
  // allWeeks:string[] = [];
  allExerciseNames:string[] = [];
  yearSelected:boolean = false;
  selectedYear:string = "";
  exerciseSelected:boolean = false;
  selectedExercise:string = "";

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
    this.selectedYear = year;
    this.yearSelected = true;
    this.getAllExerciseNames(this.selectedYear);
  }

  // User selected exericse
  exerciseSelect(exercise:string){
    this.exerciseSelected = true;
    this.selectedExercise = exercise;
  }
}
