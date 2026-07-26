# Universal Converter

## Project Overview
Universal Converter is a beginner-friendly single-page app built with HTML5, CSS3, and vanilla JavaScript. It converts common units locally and uses a live API for currency conversions.

## Features
- Convert length, weight, time, area, volume, and temperature.
- Live currency conversion with Frankfurter API.
- Category-based unit selection with automatic dropdown updates.
- Swap button to exchange source and target units.
- Responsive layout for desktop and mobile.
- Simple validation and friendly error messages.

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript
- Frankfurter API for currency exchange rates

## How It Works
1. Select a conversion category.
2. Enter an amount.
3. Choose the source and target units.
4. Click `Convert`.
5. The app uses JavaScript for local unit conversions.
6. For currencies, it fetches a live rate from the API.

## API Used
- **Frankfurter API**
- Endpoint: `https://api.frankfurter.app/latest`
- No API key required.

## Project Structure
- `index.html` — app structure and form controls.
- `style.css` — visual styling, responsive layout, and minimal modern theme.
- `script.js` — conversion logic, event handling, and API fetch.

## Possible Improvements
- Add more currency options dynamically.
- Support conversion history or saved favorites.
- Add dark mode and custom themes.
- Improve error messages with specific API feedback.
- Add keyboard shortcuts for faster conversion.
