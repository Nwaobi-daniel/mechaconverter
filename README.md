# Mechaconverter

## Project Overview
Mechaconverter is a single-page converter app built with HTML5, CSS3, and vanilla JavaScript. It converts common units locally and uses fixed currency rates for NGN, USD, EUR, and GBP.

## Features
- Convert length, weight, time, area, volume, and temperature.
- Currency conversion using fixed currency rates relative to NGN.
- Category dropdown updates unit options automatically.
- Swap button to exchange the source and target units.
- Responsive dark theme layout for desktop and mobile.
- Input formatting with grouped thousands and decimal support.
- Validation and clear error messages for invalid input.

## Technologies Used
- HTML5
- CSS3
- Vanilla JavaScript

## How It Works
1. Pick a conversion category.
2. Enter a number in the amount field.
3. Choose the source and target units.
4. Click `Convert`.
5. Local conversions are calculated directly in JavaScript.
6. Currency conversions use fixed NGN exchange rates hardcoded in the app.

## Currency Rates Used
- `1 USD = ₦1,362.09`
- `1 EUR = ₦1,556.42`
- `1 GBP = ₦1,818.78`
- `1 NGN = 1 NGN`

## Project Structure
- `index.html` — page markup and converter form.
- `style.css` — dark themed styling and responsive layout.
- `script.js` — conversion logic, input formatting, and validation.

## Possible Improvements
- Add more currencies and rates.
- Include a conversion history panel.
- Add more unit categories like pressure or energy.
- Improve UX with animations and keyboard shortcuts.
- Add a clean mobile-only layout variant.
