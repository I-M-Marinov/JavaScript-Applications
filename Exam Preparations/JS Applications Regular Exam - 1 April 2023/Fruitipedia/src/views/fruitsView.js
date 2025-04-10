import { html, render  } from '../lib/litHtml.js';
import { getAllFruits } from '../services/fruitsService.js';


const template = (fruits) => html`<h2>Fruits</h2>
        <section id="dashboard">
        ${fruits?.length
          ? fruits.map((fruit) =>
                html`<div class="fruit">
            <img src="${fruit.imageUrl}" alt="${fruit.name}" />
            <h3 class="title">${fruit.name}</h3>
            <p class="description">${fruit.description}</p>
            <a class="details-btn" href="/fruits/${fruit._id}">More Info</a>
          </div>
        
        </section>`
     )
        : html`<h2>No fruit info yet.</h2>`}`;


export async function fruitsView() {
  const fruits = await getAllFruits();

  render(template(fruits));
};