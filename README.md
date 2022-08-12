# Getting Started with this Project

This project is a simple logging application for hosting an amateur radio net. I built this to facilitate running the Saturday Morning 9:00 Net on the PSRG repeater located in Seattle, WA.

You can find this app running live on <a href="https://www.kg7aii.com/" target="_blank">www.kg7aii.com</a>.

This app works entirely client-side, and does not store any data outside the browser. This means that if you refresh the page, all data will be gone, so be careful! This app is meant to be a simple way to log amateur radio contacts without necessarily storing the data anywhere.

To see the "preamble" and "closing" scripts, click the hamburger icon in the top-left corner of the screen and select the desired script.

This app requests station data from QRZ as you enter a station's callsign. To enable this feature, you must log into QRZ by clicking the Account Icon in the top-right corner of the screen and entering your credentials.

Once logged in, if you enter a valid callsign, the app will request and show data from QRZ including the station's profile picture.

Press "enter" or click the button labeled "Add station to round..." and the station information will be added to the next round.

When there are enough stations in the current round, click the button labeled "+ Round" to create another round.

Wash, rinse, repeat until there are no more stations checking into the net.

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.