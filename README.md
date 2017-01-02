# Prerequisites
* Application is developed using `Nodejs`, `Express` and `MongoDB`.
* I couldn't find any free plateform to deploy this application with MongoDB, so you'll have to run this locally.
* Nodejs, npm and MongoDB must be installed on your machine for this application to work.
* Application doesn't have any user interface or view, on the startup it will fetch the data from Amazon service and insert it to MongoDB named `s3_amazon`.
* I used WebStorm <https://www.jetbrains.com/webstorm> to develop and run the application locally.

# Instructions
* Run the MongoDB instance on your machine.
* Clone this code or download as a zip.
* Open this folder in `WebStorm' and Run the app.
* You should see an `inserted` message.
* Now go to `iOS` source code and provide the ip address of your machine in `URL_BASE` in `Utilities/Constants`.
* Your iOS device and Machine must be on the same Internet network.
* Run the iOS app.

## If you are unable to setup the server side, the iOS application will still run with the locallay stored data.
