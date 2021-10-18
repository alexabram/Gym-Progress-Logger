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

  constructor() { }

  ngOnInit(): void {
    console.log(this.exercise)
    console.log(this.year)
  }

}
