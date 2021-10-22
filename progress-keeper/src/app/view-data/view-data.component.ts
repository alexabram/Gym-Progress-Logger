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
    document.getElementById("dropdown-content-exercise")?.classList.remove('show')
    this.getAllExerciseNames(this.selectedYear);
    document.getElementById("dropdown-content-year")?.classList.toggle('show')
    // document.getElementById("dropdown-content-exercise")?.classList.remove('show')
  }

  // User selected exericse
  exerciseSelect(exercise:string){
    this.exerciseSelected = true;
    this.selectedExercise = exercise;
    document.getElementById("dropdown-content-year")?.classList.remove('show')
    document.getElementById("dropdown-content-exercise")?.classList.toggle('show')
  }
}
