# Does the equivalent of 
#   python parser.py && cd progress-keeper && ng serve --open
#   subprocess.call(["python", "parser.py"])

import subprocess
import os
import sys

# Start parser.py process
# If pipe returns 0, files exist in /data/imports
# Else, error msg
def pipeAndCheckForFiles():
    sub_result = subprocess.Popen(
        [sys.executable, "parser.py"],
        stdout=subprocess.PIPE)
    sub_result.wait()
    out, err = sub_result.communicate()
    return_code = sub_result.returncode
    if return_code == 0:
      os.chdir("./progress-keeper")
      subprocess.call(["ng", "serve", "--open"])
    else:
      print("error: Place .txt log files in /data/imports")
      sys.exit(0)

if __name__ == '__main__':
  pipeAndCheckForFiles()