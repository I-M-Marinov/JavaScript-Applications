import { html, render  } from '../lib/litHtml.js';
import { getallSolutions } from '../services/solutionsService.js';

const template = (solutions) =>html`<h2>Solutions</h2>
        <section id="solutions">
        ${solutions?.length
          ? solutions.map((s) =>
                html`
          <div class="solution">
            <img src="${s.imageUrl}" alt="${s.type}" />
            <div class="solution-info">
              <h3 class="type">${s.type}</h3>
              <p class="description">
                ${s.description}
              </p>
              <a class="details-btn" href="/dashboard/${s._id}">Learn More</a>
            </div>
          </div>  
        </section>`
        )
          : html`<h2 id="no-solution">No Solutions Added.</h2>`}`;


export async function solutionsView() {
  const solutions = await getallSolutions();

  render(template(solutions));
};