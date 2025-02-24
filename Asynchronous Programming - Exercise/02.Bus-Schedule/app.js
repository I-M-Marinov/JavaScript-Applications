function solve() {
    
    const targetUrl = "http://localhost:3030/jsonstore/bus/schedule";
    const departButtonElement = document.getElementById('depart');
    const arriveButtonElement = document.getElementById('arrive');
    const infoElement = document.querySelector('.info');

    let currentStop = 'depot'; 
    let nextStop = ''; 

    async function depart() {
        try {
            const response = await fetch(`${targetUrl}/${currentStop}`);
            
            const data = await response.json();
            infoElement.textContent = `Next stop ${data.name}`;

            nextStop = data.next;

            departButtonElement.setAttribute("disabled", "true");
            arriveButtonElement.removeAttribute("disabled");

        } catch (error) {
            infoElement.textContent = "Error";
            departButtonElement.setAttribute("disabled", "true");
            arriveButtonElement.setAttribute("disabled", "true");
        }
    }

    async function arrive() {
        try {
            const response = await fetch(`${targetUrl}/${currentStop}`);

            const data = await response.json();
            infoElement.textContent = `Arriving at ${data.name}`;

            currentStop = nextStop;

            arriveButtonElement.setAttribute("disabled", "true");
            departButtonElement.removeAttribute("disabled");

        } catch (error) {
            infoElement.textContent = "Error";
            departButtonElement.setAttribute("disabled", "true");
            arriveButtonElement.setAttribute("disabled", "true");
        }
    }

    departButtonElement.addEventListener('click', depart);
    arriveButtonElement.addEventListener('click', arrive);

    return {
        depart,
        arrive
    };
}

let result = solve();
