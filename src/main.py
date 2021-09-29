import sys # for use w/ cmdline arguments
import variables # local file
import datetime

def parseFile(filename):
  with open(filename, "r") as fd:
    # date looks like "Started on: September 2, 2021"
    # read until fd is at 'S' after ": "
    while(True):
      char = fd.read(1);
      if char == ':':
        char = fd.read(1);
        break
    date_string = ""
    char = ''
    # read entire Month D, YYYY into a string
    while(char != '\n'):
      date_string += char
      char = fd.read(1)
    print(date_string)
    week_number = parseDate(date_string)
    print(week_number)


def parseDate(date_string):
  # parse string for MM, DD, YY
  # use datetime to get week #
  split_date = date_string.split(' ');
  month_number = getMonthNumber(split_date[0])
  year_number = int(split_date[2])
  day_number = int(split_date[1][:-1])
  return datetime.date(year_number, month_number, day_number).isocalendar()[1]

def getMonthNumber(month_string):
  return{
    "January": 1,
    "February": 2,
    "March": 3,
    "April": 4,
    "May": 5,
    "June": 6,
    "July": 7,
    "August": 8,
    "September": 9,
    "October": 10,
    "November": 11,
    "December": 12,
  }[month_string]


if __name__ == "__main__":
  # if len(sys.argv) != 2:
  #   sys.exit(2)
  # else:
  #   parseFile(sys.argv[1])

  parseFile("data/sep2.txt")