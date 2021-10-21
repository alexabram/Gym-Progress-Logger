import subprocess
import os

# python parser.py && cd progress-keeper && ng serve --open
subprocess.call(["python", "parser.py"])
os.chdir("./progress-keeper")
subprocess.call(["ng", "serve", "--open"])