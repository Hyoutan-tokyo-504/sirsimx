## about thisrepository
This project edits the project by Lorenzo Felletti  
reference:https://github.com/lorenzofelletti/sirsimx

## added function
### 1. a random number related to Recovery Time\[ms\]  
average = recoveryTimeInMillis  
variance = 900  
distribution -> normal distribution  
  
### 2. new status: QUARANTINED
new parameter  | function
------------- | -------------
detection success rate  | the possibility infectious status is detected [0,1]
interval   | interval until next quarantine is conducted\[100,1000\]

・how interval time used  
 in every turn, the next conditions are judged on each element of ballsInfectionTime  
1.ball.time !== undefined  
not different from previous  
2.ball.quarantime !== undefined  
I added a new parameter(quarantime) to ballsInfectionTime's element.  
It has the information about the last quarantined time  
when infected, push quarantime as Date.now()  
3.Date.now() - ball.quarantime > interval  
judge whether interval time has passed 
  
to judge above conditions, I added interval  
