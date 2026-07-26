const categorySelect = document.getElementById('category');
const amountInput = document.getElementById('amount');
const fromSelect = document.getElementById('from-unit');
const toSelect = document.getElementById('to-unit');
const resultDisplay = document.getElementById('result');
const statusText = document.getElementById('status');
const convertButton = document.getElementById('convert-button');
const swapButton = document.getElementById('swap-button');

const categories = [
  {
    name: 'Length',
    units: {
      Millimetre: 0.001,
      Centimetre: 0.01,
      Metre: 1,
      Kilometre: 1000,
      Inch: 0.0254,
      Foot: 0.3048,
      Yard: 0.9144,
      Mile: 1609.34,
    },
  },
  {
    name: 'Weight',
    units: {
      Milligram: 0.000001,
      Gram: 0.001,
      Kilogram: 1,
      Pound: 0.453592,
      Ounce: 0.0283495,
    },
  },
  {
    name: 'Temperature',
    units: ['Celsius', 'Fahrenheit', 'Kelvin'],
  },
  {
    name: 'Time',
    units: {
      Second: 1,
      Minute: 60,
      Hour: 3600,
      Day: 86400,
    },
  },
  {
    name: 'Area',
    units: {
      'Square metre': 1,
      'Square kilometre': 1000000,
      Hectare: 10000,
      Acre: 4046.86,
    },
  },
  {
    name: 'Volume',
    units: {
      Millilitre: 0.001,
      Litre: 1,
      Gallon: 3.78541,
    },
  },
  {
    name: 'Currency',
    units: ['USD', 'EUR', 'GBP', 'NGN'],
  },
];

const currencyRates = {
  NGN: 1,
  USD: 1362.09,
  EUR: 1556.42,
  GBP: 1818.78,
};

function populateCategories() {
  categories.forEach((category) => {
    const option = document.createElement('option');
    option.value = category.name;
    option.textContent = category.name;
    categorySelect.appendChild(option);
  });
}

function populateUnits() {
  const selectedCategory = categories.find((item) => item.name === categorySelect.value);
  const units = Array.isArray(selectedCategory.units)
    ? selectedCategory.units
    : Object.keys(selectedCategory.units);

  fromSelect.innerHTML = '';
  toSelect.innerHTML = '';

  units.forEach((unit) => {
    const fromOption = document.createElement('option');
    const toOption = document.createElement('option');
    fromOption.value = unit;
    toOption.value = unit;
    fromOption.textContent = unit;
    toOption.textContent = unit;
    fromSelect.appendChild(fromOption);
    toSelect.appendChild(toOption);
  });

  toSelect.selectedIndex = 1 < units.length ? 1 : 0;
}

function convertTemperature(value, fromUnit, toUnit) {
  let celsiusValue;

  if (fromUnit === toUnit) {
    return value;
  }

  if (fromUnit === 'Celsius') {
    celsiusValue = value;
  } else if (fromUnit === 'Fahrenheit') {
    celsiusValue = (value - 32) * (5 / 9);
  } else {
    celsiusValue = value - 273.15;
  }

  if (toUnit === 'Celsius') {
    return celsiusValue;
  }

  if (toUnit === 'Fahrenheit') {
    return celsiusValue * (9 / 5) + 32;
  }

  return celsiusValue + 273.15;
}

function formatValue(value) {
  const number = Number(value);
  if (Number.isNaN(number)) return value;
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: Number.isInteger(number) ? 0 : 0,
    maximumFractionDigits: 10,
  }).format(number);
}

function parseInputValue(value) {
  const cleaned = String(value).trim().replace(/\s+/g, '').replace(/,/g, '.');
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : NaN;
}

function formatInputValue(value) {
  const cleaned = String(value).replace(/[^\d.]/g, '').split('.');
  const integer = cleaned[0] || '';
  const fraction = cleaned[1] || '';
  if (!integer && !fraction) return '';
  const grouped = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  return fraction ? `${grouped}.${fraction}` : grouped;
}

function convertCurrency(amount, fromUnit, toUnit) {
  const fromRate = currencyRates[fromUnit];
  const toRate = currencyRates[toUnit];
  if (fromRate == null || toRate == null) return showError('Currency rate unavailable.');
  const converted = (amount * fromRate) / toRate;
  displayResult(`${formatValue(amount)} ${fromUnit} = ${formatValue(converted)} ${toUnit}`);
}

function convertUnits() {
  clearStatus();
  const raw = amountInput.value;
  const amount = parseInputValue(raw);
  if (Number.isNaN(amount) || !raw.trim()) return showError('Please enter a valid number.');
  amountInput.value = formatInputValue(raw);
  const category = categories.find((item) => item.name === categorySelect.value);
  const fromUnit = fromSelect.value;
  const toUnit = toSelect.value;
  if (category.name === 'Currency') return convertCurrency(amount, fromUnit, toUnit);
  if (category.name === 'Temperature') {
    const converted = convertTemperature(amount, fromUnit, toUnit);
    return displayResult(`${formatValue(amount)} ${fromUnit} = ${formatValue(converted)} ${toUnit}`);
  }
  return displayResult(`${formatValue(amount)} ${fromUnit} = ${formatValue((amount * category.units[fromUnit]) / category.units[toUnit])} ${toUnit}`);
}

function swapUnits() {
  const temp = fromSelect.value;
  fromSelect.value = toSelect.value;
  toSelect.value = temp;
  clearStatus();
}

function displayResult(message) {
  resultDisplay.textContent = message;
}

function showError(message) {
  resultDisplay.textContent = message;
  resultDisplay.style.color = '#F99191';
  statusText.textContent = 'Error';
}

function clearStatus() {
  statusText.textContent = '';
  resultDisplay.style.color = '';
}

categorySelect.addEventListener('change', () => {
  populateUnits();
  clearStatus();
  displayResult('Choose the amount and convert.');
});

convertButton.addEventListener('click', convertUnits);
swapButton.addEventListener('click', swapUnits);

amountInput.addEventListener('input', () => {
  const formatted = formatInputValue(amountInput.value);
  amountInput.value = formatted;
  clearStatus();
});

window.addEventListener('load', () => {
  populateCategories();
  populateUnits();
});
