from matplotlib import pyplot as plt
import numpy as np

file = open("log1.log", "r")
logData = file.read()
fileName = logData[logData.find(":")+1:10]
logData = logData.replace("\n", "")
lines = logData.split(",")
countWithHours = {}

file1 = open("Hourly_data/" + fileName.replace(":", "-") + ".txt", "w")
for line in lines:
    chars = line.split(":")
    # count = chars[0]
    hour = int(chars[4])
    # print(chars)
    if hour in countWithHours.keys():
        temp = countWithHours.get(hour)
        countWithHours[hour] = temp + int(chars[0])
    else:
        countWithHours.setdefault(hour, int(chars[0]))
# print(countWithHours)
for key, value in countWithHours.items():
    file1.write(str(key) + ":" + str(value) + "\n")
file1.close()

keysInDict = list()
valuesInDict = list()
for key in countWithHours.keys():
    keysInDict.append(key)
    valuesInDict.append(countWithHours[key])
fig, ax = plt.subplots(1, 1)
print("values", np.array(valuesInDict))
print("keys", countWithHours.keys())
ax.set_title("Analytics")
ax.set_xlabel('hour')
ax.set_ylabel('no. of people with no mask')
plt.bar(countWithHours.keys(), countWithHours.values(), width=0.5, color='g')
# plt.plot(keysInDict, valuesInDict)
# plt.xlabel('Hour')
# plt.ylabel('No of people without mask')
# plt.title('Analytics')
plt.show()
fig.savefig("graph_data/analytics-" + fileName.replace(":", "-") + ".png", bbox_inches='tight')

