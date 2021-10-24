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

  emptyExercisesData:boolean = false;

  showYearContent:boolean = true;
  showExerciseContent:boolean = true;

  loadNewGrid:boolean = false;
  firstLoad:boolean = true;

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

  // User selected year
  yearSelect(year:string){
    this.allExerciseNames = []
    this.selectedYear = year;
    this.yearSelected = true;
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
    if(this.showExerciseContent == false){
      this.showExerciseContent = true
    }
    else{
      this.showExerciseContent = false;
    }

    if(this.firstLoad){
      this.firstLoad = false;
      this.loadNewGrid = true;
    }
    else{
      this.alternateLoadNewGrid();
    }
  }

  alternateLoadNewGrid(){
    if(this.loadNewGrid){
      this.loadNewGrid = false;
    }
    else{
      this.loadNewGrid = true;
    }
  }
}
