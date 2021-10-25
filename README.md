# Gym Progress Logger and Visualizer - Web Application

---



## Quick links

---

- [Download and install node and npm](https://docs.npmjs.com/cli/v7/configuring-npm/install)
- [Installing Angular CLI](https://angular.io/cli)

## Purpose of the project

---

A web application to help track the user's workout progress and stay motivated throughout their fitness journey to good health.

This AngularJS web application aggregates the user's gym progress data and allows them to view their fitness data in grid table views and chart views. The user will use a templated workout log [template.txt](https://github.com/alexabram/Gym_Progress_Keeper/blob/master/template.txt) to track their progress. Each workout log template consists of data across three weeks of training. Data across multiple (one or more) three-week-workout-logs are then aggregated to provide the user with a user-friendly medium to analyze their progress.

### Motivation for the project

I personally have been using this template for almost a year. I have shared this template with multiple peers who consistently utilize and track their progress in plain text. I input (and recommend users to input) data into template.txt by copying the file into your mobile Notes application and filling data on-the-go during gym workouts. Up until now, plain text was the only way to view our data. Now, we will be able to view our data in both grid tables and charts, providing an easier and readable medium (easier than plain text) to track and analyze our progress.

## Contents

---

- [Gym Progress Logger and Visualizer - Web Application](#gym-progress-logger-and-visualizer-web---application)

* [Quick links](#quick-links)

- [Purpose of the project](#purpose-of-the-project)
  - [Motivation for the project](#motivation-for-the-project)
- [Setup](#setup)
- [How to use](#how-to-use)

## Setup

1. Follow [npm install instructions](https://docs.npmjs.com/cli/v7/configuring-npm/install) to download and install node and npm.
2. Follow [Angular CLI reference](https://angular.io/cli) to download and install Angular CLI.
3. Clone this [repository](https://github.com/alexabram/Gym_Progress_Keeper).
4. `cd Gym_Progress_Keeper`
5. `python setup.py`

## How to use [template.txt](https://github.com/alexabram/Gym_Progress_Keeper/blob/master/template.txt)

- Download and modify template.txt to match your workout routine.
  - "Started on: "
    - MMMM: Month (e.g., January)
    - DD: day (e.g., 14)
    - YYYY: year (e.g., 2021)
  - DAY# - group/group (# cannot exceed 7)
    - For example, DAY1 will denote a list of exercises for DAY1 of your weekly routine.
  - E) EXERCISE NAME (muscle group)
    - For example, E) BENCH PRESS (chest) will denote the bench press exercise for muscle group chest
  - W#:
    - Is used to denote variable repetition ranges per time the exercise is performed within the week
  - alt:
    - Can be used to denote an alternate exercise to the one listed in E)
  - weight:
    - Is used as a list to log the weight used with the exericse
      - e.g., 10, 20, 30 - user performed three sets of exercise with weight 10lbs, 20lbs, 20lbs respectively.
    - Each of the three entries below an exercise denote the weight performed that week (3 weight lines for 3 week log)
- User can:
  - add as many days (up to 7 maximum) in each template.txt log
  - add an unlimited amount of exercises to each day
  - any sort of exercise and muscle group
  - any set and repetition range they wish

## Run the application (local)

1. Place all template.txt (if more than one file, rename files uniquely) file inside the `/data/imports/` folder created during [setup](#setup).
2. Run command `python runlocal.py` in the directory where this repository was cloned during [setup](#setup).
3. The application web page should open in your default browser.
   1. To quit, enter keys `ctrl c` in window where command in step 2 above was entered.

