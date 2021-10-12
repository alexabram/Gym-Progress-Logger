import { Component, OnInit } from '@angular/core';
import ProgressLogJSON from '../../assets/output.json'

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
    console.log(this.progressLog["2021"]["chest"])
    console.log(this.progressLog["2021"]["chest"]["incline db press"])
    console.log(this.progressLog["2021"]["chest"]["incline db press"]["35"])
  }

}
