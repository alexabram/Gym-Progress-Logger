import { Component, OnInit } from '@angular/core';
import ProgressLogJSON from '../../../../data/exports/ProgressLog.json'

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {

  progressLog:any = ProgressLogJSON; // {string: {string: {string: [int]}}}
  allYears:string[] = [];
  allExerciseNames:string[] = [];
  allWeeks:string[] = [];

  testing:string[] = ["one", "two", "three", "four"];
  
  yearSelected:boolean = false;
  selectedYear:string = "";
  selectedExercise:string = "";

  constructor() { }

  ngOnInit(): void {
    // populate allYears
    this.allYears = Object.keys(this.progressLog);

    // for(let key in this.progressLog){
    //   console.log(this.progressLog[key])
    //   console.log(key)
    //   var allWeeks = Object.keys(this.progressLog[key])
    //   console.log(allWeeks)
    // }
    // // this.allYears = Object.keys(this.progressLog)
    // this.populateAllExerciseNames()
  }

  populateAllExercises(year:string){
    this.allWeeks = Object.keys(this.progressLog[year])
    for(let i = 0; i < this.allWeeks.length; ++i){
      let week = this.allWeeks[i]
      // this.allExerciseNames.push(Object.keys(this.progressLog[year][week]))
    }
  }

  // Call this upon click on select year
  yearSelect(year:string){
    // populate allExerciseNames and list them
    this.selectedYear = year;
    this.yearSelected = true;
    this.populateAllExercises(this.selectedYear);
  }
}
