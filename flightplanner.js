document.addEventListener('DOMContentLoaded', () => {
    const totalDistBox = document.getElementById('total-dist');
    const totalTimeBox = document.getElementById('total-time');
    const fuelInputs = document.querySelectorAll('.fuel-input');
    const totalFuelInput = document.getElementById('total-fuel');
    const flightFuelInput = document.getElementById('flight-fuel');
    const aircraftSelect = document.getElementById('aircraft-select');

    function calculateDistTimeTotals() {
        let totalDist = 0;
        let totalTime = 0;

        document.querySelectorAll('.dist-input').forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) totalDist += val;
        });

        document.querySelectorAll('.time-input').forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) totalTime += val;
        });

        totalDistBox.value = totalDist > 0 ? totalDist : '';
        totalTimeBox.value = totalTime > 0 ? totalTime : '';
        calculateFlightFuel();
    }

    function calculateFlightFuel() {
        const totalTimeMinutes = parseFloat(totalTimeBox.value);
        const burnRate = parseFloat(aircraftSelect.value);
        if (!isNaN(totalTimeMinutes) && totalTimeMinutes > 0) {
            flightFuelInput.value = Math.ceil(totalTimeMinutes / 60 * burnRate);
        } else {
            flightFuelInput.value = '';
        }
        calculateFuelTotal();
    }

    function calculateFuelTotal() {
        let totalFuel = 0;
        fuelInputs.forEach(input => {
            const val = parseFloat(input.value);
            if (!isNaN(val)) totalFuel += val;
        });
        totalFuelInput.value = totalFuel > 0 ? totalFuel : '';
    }

    document.querySelectorAll('.from-to-table').forEach(table => {
        const distInput = table.querySelector('.dist-input');
        const gsInput = table.querySelector('.gs-input');
        const timeInput = table.querySelector('.time-input');

        function computeRowTime() {
            const dist = parseFloat(distInput.value);
            const gs = parseFloat(gsInput.value);
            if (!isNaN(dist) && !isNaN(gs) && gs > 0) {
                timeInput.value = Math.round((dist / gs) * 60);
            } else {
                timeInput.value = '';
            }
            calculateDistTimeTotals();
        }

        distInput.addEventListener('input', computeRowTime);
        gsInput.addEventListener('input', computeRowTime);
        timeInput.addEventListener('input', calculateDistTimeTotals);
    });

    aircraftSelect.addEventListener('change', calculateFlightFuel);
    fuelInputs.forEach(input => input.addEventListener('input', calculateFuelTotal));
});
