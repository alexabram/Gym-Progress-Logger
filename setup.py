import subprocess
import os

# cd progress-keeper && npm install && cd ..
os.chdir("./progress-keeper")
subprocess.call(["npm", "install"])
os.chdir("./..")

# mkdir -p data/imports data/exports
subprocess.call(["mkdir", "-p", "data/imports", "data/exports"])

# cd data/exports && touch ExerciseGroupMap.json && cd ../../
os.chdir("./data/exports")
subprocess.call(["touch", "ExerciseGroupMap.json"])
os.chdir("../../")

# cd data/exports && touch ProgressLog.json && cd ../../
os.chdir("./data/exports")
subprocess.call(["touch", "ProgressLog.json"])
os.chdir("../../")