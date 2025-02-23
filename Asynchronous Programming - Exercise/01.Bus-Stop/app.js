async function getBusInfo() {
    const stopId = document.getElementById('stopId').value;
    const stopNameDiv = document.getElementById('stopName');
    const busesList = document.getElementById('buses');

    stopNameDiv.textContent = '';
    busesList.innerHTML = '';

    try {
        const response = await fetch(`http://localhost:3030/jsonstore/bus/businfo/${stopId}`);

        if (!response.ok) {
            throw new Error('Invalid bus stop ID');
        }

        const data = await response.json();
        stopNameDiv.textContent = data.name;

        Object.entries(data.buses).forEach(([busId, time]) => {
            const li = document.createElement('li');
            li.textContent = `Bus ${busId} arrives in ${time} minutes`;
            busesList.appendChild(li);
        });

    } catch (error) {
        stopNameDiv.textContent = 'Error';
    }
}

function getInfo() {
    document.getElementById('submit').addEventListener('click', getBusInfo);
}

getInfo();
