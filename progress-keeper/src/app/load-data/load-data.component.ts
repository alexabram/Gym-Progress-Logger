import { Component, Input, OnInit } from '@angular/core';
import ProgressLogJSON from '../../../../data/exports/ProgressLog.json'

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent implements OnInit {
  @Input() exercise:string;
  @Input() year:string;
  progressLog:any = ProgressLogJSON; // {yr:string: {wk:string: {exercise:string: [int]}}}

  allWeeks:string[] = [];

  lengthWeights:number = 0;
  printTable:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.printTable = false;
    this.allWeeks = Object.keys(this.progressLog[this.year]);
    this.sortWeights()
    this.printTable = true;
  }

  sortWeights():void{
    var weights:number[] = []
    for(let i = 0; i < this.allWeeks.length; ++i){
      weights = this.progressLog[this.year][this.allWeeks[i]][this.exercise]
      if(typeof(weights) != "undefined"){
        this.progressLog[this.year][this.allWeeks[i]][this.exercise].sort()
        this.lengthWeights += this.progressLog[this.year][this.allWeeks[i]][this.exercise].length
      }
    }
  }

  // Use with [ngStyle] to modify table.styles.height during runtime
  getTableHeight():string{
    var height = ""
    if(this.lengthWeights < 12){
      let temp = 46.428571429 * this.lengthWeights
      height = String(temp) + "px"
    }
    else{
      height = "650px"
    }
    return height;
  }
}
