[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-22041afd0340ce965d47ae6ef1cefeee28c7c493a6346c4f15d667ab976d596c.svg)](https://classroom.github.com/a/mNaxAqQD)

# React REST Countries App

## Overview

This project is a React frontend application that displays country data using the REST Countries API. It allows users to search, filter by region or language, and view detailed information about each country. The app is styled with Tailwind CSS for a modern, responsive user interface.

---

## Features

- **Search** countries by name
- **Filter** countries by region and language
- **View details** for each country (name, capital, region, population, flag, languages)
- **Responsive design** for desktop and mobile
- **Dark mode** toggle
- **Unit and integration tests** with Jest and React Testing Library

---

## Technology Stack

- **Frontend:** React (functional components)
- **CSS Framework:** Tailwind CSS
- **API:** [REST Countries API](https://restcountries.com/)
- **Testing:** Jest, React Testing Library

---

## Setup Instructions

1. **Clone the repository:**

2. # Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

3. ## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

4. ### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

5. ### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.



## Cross-Browser Compatibility

This React application was manually tested on the following browsers:
- Google Chrome (latest)
- Mozilla Firefox (latest)
- Microsoft Edge (latest)
- Safari (via BrowserStack)

All core features (country listing, search, filter, details modal, dark/light mode, responsiveness) worked as expected. No major layout or functionality issues were observed.

-----------------------------------------
## Tailwind CSS Usage

- The project uses **Tailwind CSS** for all component styling.
- Tailwind utility classes (e.g. `bg-blue-500`, `p-4`, `rounded-lg`, `dark:bg-gray-900`) are used directly in the JSX to style components, enabling rapid development and a consistent, responsive design[^8].
- The Tailwind configuration is in `tailwind.config.js`.
- Tailwind’s preflight ensures cross-browser consistency.

---

## API Usage

- The app uses the following REST Countries API endpoints:
- `/all` – fetch all countries
- `/name/{name}` – search by country name
- `/region/{region}` – filter by region
- `/alpha/{code}` – fetch details by country code
- All API calls are handled in `src/Services/api.js`.

---

## How to Use

- Use the search bar to find countries by name.
- Use the filter dropdown to filter by region or language.
- Click on a country card to view more details in a modal.
- Toggle dark mode using the switch in the header.

---

## Testing

- Run all tests with `npm test`.
- Tests are located in the `src/Components/Tests/` and `src/Pages/Tests/` folders.
- Both unit and integration tests are implemented.

---

## Cross-Browser Compatibility

- The app was tested on Chrome, Firefox, Edge, and Safari (via BrowserStack).
- All features and layout work as expected on all major browsers.

---

<!--## Deployment

- The application is been deployed on vercel
- Hosted Domain :deployed URL  --> https://af-2-it-22591852.vercel.app/ -->


