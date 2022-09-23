# MobileApp

RUN SERVER

- Open terminal inside MobileApp folder and run

cd frontend-challenge && go run server.go

RUN CLIENT

- Open terminal inside MobileApp folder:

cd TestApp
npm install
Adb reverse tcp:8080 tcp:8080 ( if you use a physical device)
npx react-native run-android

DEPENDENCIES

"react-native-actions-sheet": "^0.8.7" => To get icons that are needed to 
implement the proposal UI.

"react-native-vector-icons": "^9.2.0" => To implement the document creation sheet. I used this package because it makes you easy to manage a modal like the one is proposed in the UI.
