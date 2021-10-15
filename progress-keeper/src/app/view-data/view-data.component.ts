import { Component, OnInit } from '@angular/core';
import ProgressLogJSON from '../../../../data/exports/ProgressLog.json'

@Component({
  selector: 'app-view-data',
  templateUrl: './view-data.component.html',
  styleUrls: ['./view-data.component.scss']
})
export class ViewDataComponent implements OnInit {

  progressLog = ProgressLogJSON

  constructor() { }

  ngOnInit(): void {
    console.log(this.progressLog)
    console.log(this.progressLog["2021"])
  }

}
