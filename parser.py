#####################################
##### python main.py [filename] #####
#####################################

import sys # for use w/ cmdline arguments
import datetime
import pprint
import json


progress_log = {} # progress_log[year_number][muscle_group][exercise][week_number][LIST_WEIGHT]
map_exercise_to_group = {}


def getYearAndWeek(line):
  # line looks like: "Started on: September 2, 2021"
  line = line[12:]
  # make line look like: September 2, 2021
  split = line.split(' ')
  month_number = getMonthNumber(split[0])
  year_number = int(split[2])
  day_number = int(split[1][:-1])
  return [year_number, datetime.date(year_number, month_number, day_number).isocalendar()[1]]


def printASCII(str):
  for char in str:
    print(ord(char))

'''
If line contains newline
  If line contains more char than newline, return line w/o newline char
  Elif line contains only newline, return 0
Else line does not contain newline, return original line
'''
def normalizeLine(line):
  if(ord(line[len(line) - 1]) == 10):
    if(len(line) > 1):
      return line[:-1]
    elif(len(line) == 1):
      return 0
  else:
    return line


def getMonthNumber(month_string):
  return{
    "January":1, "February":2,"March":3, "April":4, "May":5, "June":6, "July":7,
    "August":8, "September":9, "October":10, "November":11, "December":12,
  }[month_string]


def importProgressLogToJSON():
  file = open('../data/exports/ProgressLog.json', 'w')
  json.dump(progress_log, file)

def exportExerciseGroupMapToJSON():
  file = open('../data/exports/ExerciseGroupMap.json', 'w')
  json.dump(map_exercise_to_group, file)

def parseExerciseLine(line):
  split = line.split(' ')
  # Get the group
  group = split[len(split) - 1]  # (group)
  group = group.replace('(', '') # group)
  group = group.replace(')', '') # group
  # Get the exercise
  exercise = split[1:-1] # remove "E)" and "(group)"
  exercise = ' '.join(exercise) # create exercise string
  return [exercise, group]


def parseAltExerciseLine(line):
  split = line.split(' ')
  if(len(split) == 1):
    return 0
  else:
    exercise = split[1:]
    exercise = ' '.join(exercise)
    return exercise

def parseWeightLine(line):
  split = line.split(' ') # remove spaces
  split = split[1:] # remove "weight:" string
  split = split[0].split(',')
  split = [int(item) for item in split]
  return split

def push_prog_log(year, week, exercise, weight_list):
  if(week not in progress_log[year]):
    progress_log[year][week] = {}
  if(exercise not in progress_log[year][week]):
    progress_log[year][week][exercise] = weight_list

def parseFile(filename):
  global map_exercise_to_group
  have_year_and_start_week = False
  delta_initial_week = 0
  with open(filename, "r") as fd:
    while True:
      # Read the current line
      line = fd.readline()

      # If at EOF, break
      if not line:
        importProgressLogToJSON()
        exportExerciseGroupMapToJSON()
        break

      # print("BEFORE NORMALIZE():{}".format(line))
      line = normalizeLine(line)
      if(line == 0):
        continue
      # print("AFTER NORMALIZE():{}".format(line))

      # Check if first line - get log's year and initial week
      if(have_year_and_start_week == False and line.find("Started") != -1):
        have_year_and_start_week = True
        tuple_year_week = getYearAndWeek(line) # [year, week_started]
        current_year_number = tuple_year_week[0]
        initial_week_number = tuple_year_week[1]
        # If current_year_number unique to progress_log, push it
        if(current_year_number not in progress_log):
          progress_log[current_year_number] = {}
        # if(initial_week_number not in progress_log[current_year_number]):
        #   progress_log[current_year_number][initial_week_number] = {}
      
      # Populate map<exercise, group>
      if(line.find("E)") != -1):
        # print(line)
        tuple_exercise_group = parseExerciseLine(line)
        current_exercise = tuple_exercise_group[0].lower()
        current_group = tuple_exercise_group[1].lower()
        if(current_exercise not in map_exercise_to_group):
          map_exercise_to_group[current_exercise] = current_group
        # pprint.pprint(map_exercise_to_group)
      
      if(line.find("W") != -1 and line[1].isdigit()):
        current_week_number = int(line[1]) + initial_week_number - 1
      
      if(line.find("alt") != -1 ):
        ret = parseAltExerciseLine(line)
        if(ret != 0):
          current_exercise = ret.lower()
          if(current_exercise not in map_exercise_to_group):
            map_exercise_to_group[current_exercise] = current_group
          # print(current_exercise)

      if(line.find("weight:") != -1):
        current_week_number = initial_week_number + delta_initial_week
        delta_initial_week += 1
        if(delta_initial_week > 2):
          delta_initial_week = 0
        split = line.split(' ')
        if(split[len(split) - 1] != "skip"): # If weight line doesn't say skip
          weight_list = parseWeightLine(line)
          push_prog_log(current_year_number, current_week_number, current_exercise, weight_list)
      
  # pprint.pprint(progress_log)

if __name__ == "__main__":
  # if len(sys.argv) != 2:
  #   sys.exit(2)
  # else:
  #   parseFile(sys.argv[1])

  parseFile("../data/imports/sep2copy1.txt")