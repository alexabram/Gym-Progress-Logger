import sys # for use w/ cmdline arguments
import variables # local file
import datetime
import pprint
import json


progress_log = {} # progress_log[year_number][muscle_group][exercise][week_number][LIST_WEIGHT]
current_exercise = ""
current_exercise_group = ""


def getYearAndWeek(line):
  # line looks like: "Started on: September 2, 2021"
  line = line[12:]
  # make line look like: September 2, 2021
  split = line.split(' ')
  month_number = getMonthNumber(split[0])
  year_number = int(split[2])
  day_number = int(split[1][:-1])
  return [year_number, datetime.date(year_number, month_number, day_number).isocalendar()[1]]


def getMuscleGroup(exercise, muscle_groups_list):
  # exercise looks like: "incline db press"
  # muscle_groups_list looks like: ['chest', 'back', 'biceps']
  for group in muscle_groups_list:
    if(exercise in variables.exercises[group]):      
      return group


def printASCII(str):
  for char in str:
    print(ord(char))


def normalizeLine(line):
  # If line is not solely newline, remove newline char from end of line
  if(len(line) > 1 and ord(line[len(line) - 1]) == 10):
    return line[:-1]
  # Elif line is solely newline, skip processing this line
  elif(len(line) == 1 and ord(line[0]) == 10):
    return 0


def getExerciseGroup(exercise):
  for group in variables.exercise_groups:
    if exercise in variables.exercises[group]:
      return group
  return -1


def getExerciseInWeightLine(line):
  split = line.split(' ')
  # print(split)
  split = ' '.join(split[1:len(split) - 1])
  if(split[len(split) - 1] == ':'):
    return split[:-1]
  else:
    return split


def getMonthNumber(month_string):
  return{
    "January": 1,"February": 2,"March": 3,"April": 4,"May": 5,"June": 6,"July": 7,
    "August": 8,"September": 9,"October": 10,"November": 11,"December": 12,
}[month_string]


def imortToJSON():
  file = open('output.json', 'w')
  json.dump(progress_log, file)


def parseFile(filename):
  global current_exercise, current_exercise_group
  with open(filename, "r") as fd:
    while True:
      # Read the current line
      line = fd.readline()

      # If at EOF, break
      if not line:
        imortToJSON()
        break

      ret = normalizeLine(line)
      if(ret == 0):
        continue

      # Check if line 1 - get year and week_started
      if(line.find("Started") != -1):
        tuple_year_week = getYearAndWeek(line) # [year, week_started]
        year_number = tuple_year_week[0]
        started_week_number = tuple_year_week[1]
        # if year_number unique to progress_log, push it
        if(year_number not in progress_log):
          progress_log[year_number] = {}
      

      # Check if exerise line - parse exercise
      if(line.find(") ") != -1):
        count = 0
        split = line.split(' ')[1:]
        current_exercise = ' '.join(split).lower()[:-1]
        
      # Check if week line - parse week number and add to started_week_number
      # - next line is weight line
      #  - parse weights and populate progress_log
      processed_W = False
      check_for_weight_line_exercise = False;
      input_weights = False;
      split = []
      list_weights = []
      if(line.find("W") != -1 and line[1].isdigit()):
        current_week_number = int(line[1]) + started_week_number - 1
        line = fd.readline() # Read next line to parse weights
        line = normalizeLine(line)
        split = line.split(' ')
        if(split[len(split) - 1] == "skip"):
          continue
        list_weights = split[len(split) - 1].split(',')
        processed_W = True
        check_for_weight_line_exercise = True
        input_weights = True
        # print(list_weights)
        
      
      # Check if weight line
      # - parse weights and populate progress_log
      # - keep track of which "weight:" line to update current_week_number
      if(line.find("weight:") != -1 and processed_W == False):
        current_week_number = count + started_week_number
        count += 1
        line = normalizeLine(line)
        # print(line)
        split = line.split(' ')
        if(split[len(split) - 1] == "skip"):
          continue
        list_weights = split[len(split) - 1].split(',')
        check_for_weight_line_exercise = True
        input_weights = True
        # print(list_weights)
      
      if(check_for_weight_line_exercise == True):
        if(len(split) > 2):
          exercise_temp = getExerciseInWeightLine(line)
          if(exercise_temp == "lying" and current_exercise == "hamstring curl"):
            current_exercise = "lying hamstring curl"
          elif(exercise_temp == "cable overhead" and current_exercise == "french press"):
            current_exercise = "cable overhead"
          elif(exercise_temp == "seated" and current_exercise.find("CALV") != -1):
            current_exercise = "seated calve raise"
          elif(exercise_temp == "standing" and current_exercise.find("CALV") != -1):
            current_exercise = "standing calve raise"
          elif(exercise_temp == "hammer" and current_exercise == "free bicep exercise"):
            current_exercise = "hammer curl"
          elif(exercise_temp == "conce" and current_exercise == "free bicep exercise"):
            current_exercise = "concentration curl"
          elif(exercise_temp == "dumbbell" and current_exercise == "bench press"):
            current_exercise = "flat db press"
          elif(exercise_temp == "dumbbell" and current_exercise == "incline pause bench press"):
            current_exercise = "incline db press"
          elif(exercise_temp == "cable" and current_exercise == "pec dec fly"):
            current_exercise = "cable fly"
          elif(exercise_temp == "cable overhead" and current_exercise == "db skull crusher"):
            current_exercise = "db skull crusher"
        current_exercise_group = getExerciseGroup(current_exercise)
        if(current_exercise_group == -1):
          continue
        elif(current_exercise_group not in progress_log[year_number]):
          progress_log[year_number][current_exercise_group] = {}
      elif(input_weights == True):
        current_exercise_group = getExerciseGroup(current_exercise)
        if(current_exercise_group == -1):
          continue
        elif(current_exercise_group not in progress_log[year_number]):
          progress_log[year_number][current_exercise_group] = {}
      
      if(input_weights == True):
      # if(len(current_exercise) > 0 and len(current_exercise_group) > 0 and len(list_weights) > 0):
        if(current_exercise not in progress_log[year_number][current_exercise_group]):
          progress_log[year_number][current_exercise_group][current_exercise] = {}
        if(current_week_number not in progress_log[year_number][current_exercise_group][current_exercise]):
          progress_log[year_number][current_exercise_group][current_exercise][current_week_number] = list_weights
  pprint.pprint(progress_log)

if __name__ == "__main__":
  # if len(sys.argv) != 2:
  #   sys.exit(2)
  # else:
  #   parseFile(sys.argv[1])

  parseFile("data/sep2.txt")