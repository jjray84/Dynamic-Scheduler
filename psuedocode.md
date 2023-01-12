# Psuedocode Outline
This markup will serve as a guide for how we want to structure our programming logic for our web app. Topics are free to be added and removed as we revise our wireframe and MVP functionality. 

## Navbar
Title: ON mouse click, refresh the page <br>
Employee List: ON mouse click, take user to new page of employee info <br>
Hours Remaining: SUM calendar hours, and DISPLAY hours remaining


## Employee Info
Employee attributes displayed in a format TBD <br>
* name
* status
* daysAvailable


## CTRL Panel
Save btn: ON mouse click, SET page data to local storage <br>
Add New Employee: ON mouse click, OPEN a form to enter attributes. <br>
* ON Submit, PUSH New Employee into array of employee objects <br>
Set MAX Hours: ENTER Max hours for interval, SAVE to storage

## Calendar
USING third-party api, DISPLAY time

## Carosel
USING third-party api: DISPLAY boxes of dates <br>
IF dates are in the past, DISABLE box functionality and set COLOR to gray <br>
MANUALLY enter employee name and availability <br>
COLOR CODE EMPLOYEE NAME based on shift <br>
RIGHT ARROW on mouse click, present two more weeks and UPDATE Calendar dates <br>

## Note Widget
WHEN CTRL Panel - Submit mouse click, send text to local storage

## INIT()
ON page load, data from local storage is displayed in appropriate area
