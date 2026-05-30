document.addEventListener('DOMContentLoaded', () => {
    // Distance and Time Elements
    const distInputs = document.querySelectorAll('.dist-input');
    const timeInputs = document.querySelectorAll('.time-input');
    const totalDistBox = document.getElementById('total-dist');
    const totalTimeBox = document.getElementById('total-time');

    // Fuel Elements
    const fuelInputs = document.querySelectorAll('.fuel-input');
    const totalFuelInput = document.getElementById('total-fuel');

    function calculateDistTimeTotals() {
        let totalDist = 0;
        let totalTime = 0;

        distInputs.forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) totalDist += val;
        });

        timeInputs.forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) totalTime += val;
        });

        totalDistBox.textContent = totalDist > 0 ? totalDist : '';
        totalTimeBox.textContent = totalTime > 0 ? totalTime : '';
    }

    function calculateFuelTotal() {
        let totalFuel = 0;
        
        fuelInputs.forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) totalFuel += val;
        });

        totalFuelInput.value = totalFuel > 0 ? totalFuel : '';
    }

    // Add event listeners so totals calculate immediately upon typing
    distInputs.forEach(input => input.addEventListener('input', calculateDistTimeTotals));
    timeInputs.forEach(input => input.addEventListener('input', calculateDistTimeTotals));
    fuelInputs.forEach(input => input.addEventListener('input', calculateFuelTotal));
});
