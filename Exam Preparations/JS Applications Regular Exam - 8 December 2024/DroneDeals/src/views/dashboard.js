import { html, render  } from '../lib/litHtml.js';
import { getAllDrones } from '../services/dronesService.js';

const template = (drones) => html`<h3 class="heading">Marketplace</h3>
      <section id="dashboard">
      ${drones?.length
        ? drones.map(
            (drone) =>
              html`<div class="drone">
          <img src="${drone.imageUrl}" alt="example1" />
          <h3 class="model">${drone.model}</h3>
          <div class="drone-info">
            <p class="price">Price: $${drone.price}</p>
            <p class="condition">Condition: ${drone.condition}</p>
            <p class="weight">Weight: ${drone.weight}</p>
          </div>
          <a class="details-btn" href="/dashboard/${drone._id}">Details</a>
        </div>`): html`
        <h3 class="no-drones">No Drones Available</h3>`}
        
      </section>`
      

export async function dashboardView() {
  const drones = await getAllDrones();

  render(template(drones));
};