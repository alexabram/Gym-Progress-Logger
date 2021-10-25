import { Component, Input, OnInit } from '@angular/core';
import ProgressLogJSON from '../../../../data/exports/ProgressLog.json'
import { UserConfig } from "gridjs";

const monthName = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
];

@Component({
  selector: 'app-load-data',
  templateUrl: './load-data.component.html',
  styleUrls: ['./load-data.component.scss']
})
export class LoadDataComponent implements OnInit {
  @Input() exercise: string;
  @Input() year: string;
  progressLog: any = ProgressLogJSON; // {yr:string: {wk:string: {exercise:string: [int]}}}

  allWeeks: string[] = [];

  lengthWeights: number = 0;
  printTable: boolean = false;

  constructor() { }

  public gridConfig: UserConfig = {};

  ngOnInit(): void {
    this.printTable = false;
    this.allWeeks = Object.keys(this.progressLog[this.year]);
    this.sortWeights()
    this.gridConfig = this.populateGrid()
    this.printTable = true;
  }

  populateGrid(): UserConfig {
    var data: String[][] = []
    for (let i = 0; i < this.allWeeks.length; ++i) {
      var week = this.allWeeks[i];
      var weights: number[] = [];
      weights = this.progressLog[this.year][week][this.exercise]
      if (typeof (weights) != "undefined") {
        var weightString: String = ""
        for (let j = 0; j < weights.length; ++j) {
          weightString += String(weights[j])
          if (j + 1 != weights.length) {
            weightString += ", "
          }
        }
        // week of {month} {day} 
        let date = this.getDateOfWeekNumber(this.year, week)
        var weekString:string = monthName[date.getMonth()] + " " + date.getDate();
        let temp = ["Week of " + weekString, weightString]
        data.push(temp)
      }
    }
    return {
      columns: ["Week", "Weights"],
      data: data,
      search: true,
      pagination: {
        enabled: true,
        limit: 6,
      },
      language: {
        search: {
          placeholder: 'Search for week or weight...'
        },
        pagination: {
          showing: 'Displaying',
        }
      }
    };
  }

  // https://stackoverflow.com/a/16591175
  getDateOfWeekNumber(year:string, week:string):Date{
    var simple = new Date(Number(year), 0, 1 + (Number(week) - 1) * 7);
    var dow = simple.getDay();
    var ISOweekStart = simple;
    if (dow <= 4)
      ISOweekStart.setDate(simple.getDate() - simple.getDay() + 1);
    else
      ISOweekStart.setDate(simple.getDate() + 8 - simple.getDay());
    return ISOweekStart;
  }

  sortWeights(): void {
    var weights: number[] = []
    for (let i = 0; i < this.allWeeks.length; ++i) {
      weights = this.progressLog[this.year][this.allWeeks[i]][this.exercise]
      if (typeof (weights) != "undefined") {
        this.progressLog[this.year][this.allWeeks[i]][this.exercise].sort()
        this.lengthWeights += this.progressLog[this.year][this.allWeeks[i]][this.exercise].length
      }
    }
  }

  // Use with [ngStyle] to modify table.styles.height during runtime
  getTableHeight(): string {
    var height = ""
    if (this.lengthWeights < 12) {
      let temp = 46.428571429 * this.lengthWeights
      height = String(temp) + "px"
    }
    else {
      height = "650px"
    }
    return height;
  }
}
