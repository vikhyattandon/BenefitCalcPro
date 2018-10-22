## Benefit Calculation Pro


## Motivation
This project provide the benefit department of the company a great tool to calculate the health, dental and vision benefit and generate report for financial processing.

## Build status
Build status of continus integration i.e. travis, appveyor etc. Ex. - 

[![Build Status](https://travis-ci.org/akashnimare/foco.svg?branch=master)](https://travis-ci.org/akashnimare/foco)
[![Windows Build Status](https://ci.appveyor.com/api/projects/status/github/akashnimare/foco?branch=master&svg=true)](https://ci.appveyor.com/project/akashnimare/foco/branch/master)

## Code style
If you're using any code style like xo, standard etc. That will help others while contributing to your project. Ex. -

[![js-standard-style](https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat)](https://github.com/feross/standard)
 
## Screenshots
Include logo/demo screenshot etc.

## Tech/framework used
* Node
* Npm
* Docker
* Java 8
* Angular 2

## Features
What makes your project stand out?

## Code Example
Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Installation
We need to have the node and docker install on the computer.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.

## Tests
Describe and show how to run the tests with code examples.

## How to Run?

### GTP_benefit_calc_app
1st we need the GTPPayroollApp running and get the ip of the docker and change the url in getRestURL() method in file GTP_benefit_calc_app\src\app\shared\base.service.ts
Open the console to the root of the this project. Then run "npm start".
The last line is "webpack: Compiled successfully."

### Angular-auth-demo-master
Open the console to the root of the this project. Then run "npm start".
The last line is "webpack: Compiled successfully."

### GTPPayrollApp
Open the docker. change the directory to the docker-compose.yml file. Then run docker-compose up this will bring the database and the backend java app up.
This will take sometime to start the last line is "Tomcat started on port(s): 8080/http"

## How to use?
we can use the app with login and without login.
  *  To use without login The app is running on localhost:4200. We can search for employes look at the benefits and modify them.
  *  To use with login to the app. 1st we need to register with the google or facebook emaild here http://localhost:4200/employeeRegister and then go to  localhost:4201. We can create a acount with the app and then come back to localhost:4201 and login and use the app

## Contribute

Let people know how they can contribute into your project. A [contributing guideline](https://github.com/zulip/zulip-electron/blob/master/CONTRIBUTING.md) will be a big plus.

## Credits
Give proper credits. This could be a link to any repo which inspired you to build this project, any blogposts or links to people who contrbuted in this project. 

#### Anything else that seems useful
