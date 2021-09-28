import sys # for use w/ cmdline arguments
import variables # local file

def readFile(filename):
  with open(filename, "r") as fd:
    fileText = fd.read().lower()
    print(fileText);

if __name__ == "__main__":
  # if len(sys.argv) != 2:
  #   sys.exit(2)
  # else:
  #   readFile(sys.argv[1])

  print(variables.muscleGroup["chest"])
  for exercise in variables.muscleGroup["shoulders"]["exercises"]:
    print(exercise);