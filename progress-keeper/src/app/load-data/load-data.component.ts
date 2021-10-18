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

  constructor() { }

  ngOnInit(): void {
    this.allWeeks = Object.keys(this.progressLog[this.year]);
    this.sortWeights()
  }

  sortWeights():void{
    for(let i = 0; i < this.allWeeks.length; ++i){
      this.progressLog[this.year][this.allWeeks[i]][this.exercise].sort()
    }
  }
}
