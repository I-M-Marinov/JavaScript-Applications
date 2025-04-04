import { html, render  } from '../lib/litHtml.js';
import { getAllFacts } from '../services/factsService.js';


const template = (facts) => html`<h2>Fun Facts</h2>
        <section id="dashboard">
        ${facts?.length
          ? facts.map((fact) =>
        html`<div class="fact">
            <img src="${fact.imageUrl}" alt="example1" />
            <h3 class="category">${fact.category}</h3>
            <p class="description">${fact.description}</p>
            <a class="details-btn" href="/dashboard/${fact._id}">More Info</a>
          </div>
        </section>`)
        :html`<h2>No Fun Facts yet.</h2>`}`;


export async function allFactsView() {
  const facts = await getAllFacts();

  render(template(facts));
};