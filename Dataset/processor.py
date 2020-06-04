import json
import csv


raw = open("districts_daily.json").read()
data = json.loads(raw)['districtsDaily']

csvfile = open("final.csv", 'w')

states = data.keys()
dates = set()

for state in states:
	# print(state)
	districts = data[state].keys()
	for district in districts:
		if district == "Unknown":
			continue
		daily_data = data[state][district]
		for i in daily_data:
			dates.add(i['date'])

l = list(dates)
l.sort()
print(l)

writer = csv.DictWriter(csvfile, fieldnames=["district","state","category"] + l)
writer.writeheader()
for state in states:
	# print(state)
	districts = data[state].keys()
	for district in districts:
		if district == "Unknown":
			continue
		daily_data = data[state][district]
		for category in ["confirmed", "recovered", "deceased"]:
			row = dict()
			row["district"] = district
			row["state"] = state
			row["category"] = category
			for i in daily_data:
				row[i["date"]] = i[category]
			writer.writerow(row)


