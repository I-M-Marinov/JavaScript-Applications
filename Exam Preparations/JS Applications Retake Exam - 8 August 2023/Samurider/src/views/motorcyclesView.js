import { html, render  } from '../lib/litHtml.js';
import { getAllMotorcycles } from '../services/motorcycleService.js';

const template = (motorcycles) =>html`<h2>Available Motorcycles</h2>
        <section id="dashboard">
        ${motorcycles?.length
          ? motorcycles.map((m) =>
                html`
          <div class="motorcycle">
            <img src="${m.imageUrl}" alt="${m.model}" />
            <h3 class="model">${m.model}</h3>
            <p class="year">Year: ${m.year}</p>
            <p class="mileage">Mileage: ${m.mileage} km.</p>
            <p class="contact">Contact Number: ${m.contact}</p>
            <a class="details-btn" href="/motorcycles/${m._id}">More Info</a>
          </div>
        </section>`
     )
        : html`<h2 class="no-avaliable">No avaliable motorcycles yet.</h2>`}`;


export async function motorcyclesView() {
  const motorcycles = await getAllMotorcycles();

  render(template(motorcycles));
};