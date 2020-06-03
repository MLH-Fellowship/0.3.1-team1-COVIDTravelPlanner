# COVIDTravelPlanner
_Hackathon project repository for pod 0.3.1 team 1_

## The Project
This project aims to use SciML to fit a differential equation to the COVID-19 Number-Of-Cases time series data. This would allow us to predict the number of cases in the future, to some degree of accuracy. This would be done separately per district or state, as per the availability of reliable data. The results would be displayed on an interactive graphical webpage.
The project also implements an interesting use case of the prediction model: a mobile application that is a personal scheduler/calendar. The user can enter where they are headed to in the next few days, and the application would warn them if those regions are predicted to have a high number of cases then.

## Tech Stack
### Server
- Julia
- Genie

## Local Setup
Clone the repository first.
### Setting Up The Server
1. Hop inside `Server` directory
2. Start Julia Interpreter ( type ```julia``` in your terminal)
3. Enter the Pkg Mode (type `]`)
4. Install dependencies using:  
```instantiate()```
5. Leave Pkg mode (`ctrl + d` | `⌘ + d`)
6. Start the server using:  
```bin/server```

## Contributing Guidelines
_Coming up soon_
