document.addEventListener('DOMContentLoaded', () => {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-link');

  navLinks.forEach((link) => {
    const href = link.getAttribute('href');
    if (href === currentPage) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });

  const yearTarget = document.getElementById('year');
  if (yearTarget) {
    yearTarget.textContent = new Date().getFullYear();
  }

  const faqButtons = document.querySelectorAll('.faq-question');
  faqButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const isOpen = button.classList.contains('active');
      const answer = button.nextElementSibling;

      faqButtons.forEach((otherButton) => {
        otherButton.classList.remove('active');
        otherButton.setAttribute('aria-expanded', 'false');
        const otherAnswer = otherButton.nextElementSibling;
        if (otherAnswer) {
          otherAnswer.style.maxHeight = null;
        }
      });

      if (!isOpen) {
        button.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  const form = document.getElementById('energy-form');
  if (!form) return;

  const applianceSelect = document.getElementById('appliance');
  const wattsInput = document.getElementById('watts');
  const hoursInput = document.getElementById('hours');
  const priceInput = document.getElementById('price');
  const calcMessage = document.getElementById('calc-message');
  const calcResults = document.getElementById('calc-results');

  const updateMessage = (text, type) => {
    calcMessage.textContent = text;
    calcMessage.className = 'calc-message';
    if (type) {
      calcMessage.classList.add(type);
    }
  };

  const showResults = (dailyKwh, monthlyKwh, yearlyKwh, monthlyCost) => {
    calcResults.innerHTML = `
      <h3>Results</h3>
      <div class="result-row"><span>Daily energy use</span><strong>${dailyKwh.toFixed(2)} kWh</strong></div>
      <div class="result-row"><span>Monthly energy use</span><strong>${monthlyKwh.toFixed(2)} kWh</strong></div>
      <div class="result-row"><span>Yearly energy use</span><strong>${yearlyKwh.toFixed(2)} kWh</strong></div>
      <div class="result-row"><span>Estimated monthly cost</span><strong>$${monthlyCost.toFixed(2)}</strong></div>
    `;
  };

  const populateWatts = () => {
    const selected = applianceSelect.value;
    if (selected) {
      wattsInput.value = selected;
    }
  };

  applianceSelect.addEventListener('change', populateWatts);

  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const watts = Number(wattsInput.value);
    const hours = Number(hoursInput.value);
    const price = Number(priceInput.value);

    if (!watts || !hours || !price || watts <= 0 || hours <= 0 || price <= 0) {
      updateMessage('Please enter valid values for power, hours used, and price.', 'error');
      calcResults.innerHTML = '<h3>Results</h3><p>Enter valid numbers to generate a calculation.</p>';
      return;
    }

    const dailyKwh = (watts * hours) / 1000;
    const monthlyKwh = dailyKwh * 30;
    const yearlyKwh = monthlyKwh * 12;
    const monthlyCost = (dailyKwh * price * 30) / 100;

    updateMessage('Calculation complete.', 'success');
    showResults(dailyKwh, monthlyKwh, yearlyKwh, monthlyCost);
  });

  form.addEventListener('reset', () => {
    setTimeout(() => {
      updateMessage('', '');
      calcResults.innerHTML = '<h3>Results</h3><p>Enter values to estimate daily, monthly, and yearly usage.</p>';
    }, 0);
  });
});
