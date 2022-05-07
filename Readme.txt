Note: Below cli commands are written in inverted commas, Please avoid inverted commas in following scenarios.
* When searching keyword in text editor
* When running commands in command prompt or any another cli

## This Section is for First Time Project Setup

-- open command prompt on current folder
-- run 'npm i' in command prompt


## This Section is for starting the Project

-- open command prompt on current folder
-- run 'npm run start' in command prompt


## This Section is for changing backend Environment 

-- Go to Src folder
-- Open App.js
-- Find baseUrl variables as below respectively

'baseUrlH' for Heroku production Environment
'baseUrlL' for local Environment
'baseUrlD' for Heroku development Environment
'baseUrlA' for Azure production Environment

-- To change the Environment select anyone of the above Environment
-- Search for baseUrl , reference line below

 this.state = {
     res:null,token:null,user:null,baseUrl:baseUrlD, activeClass:"nostalled" , activeState:"Dashboard"
    };

-- Change the baseUrl variable with the selected variable ,

In above ref line the selected variable is baseUrlD.


