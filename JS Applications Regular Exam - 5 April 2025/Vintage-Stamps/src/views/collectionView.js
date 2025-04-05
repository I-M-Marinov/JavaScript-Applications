import { html, render  } from '../lib/litHtml.js';
import { getallStamps as getAllStamps } from '../services/stampsService.js';

const template = (stamps) => html`
      <h2>Collection</h2>
      <section id="collection">
      ${stamps?.length
        ? stamps.map((stamp) =>
      html`<div class="stamp">
            <img src="${stamp.imageUrl}" alt="${stamp.name}" />
            <div class="stamp-info">
              <h3 class="name">${stamp.name}</h3>
              <p class="year-description">
                <span class="year">${stamp.year}</span> 
              </p>
              <a class="learn-more-btn" href="/collection/${stamp._id}">Learn More</a>
            </div>
          </div
      </section>`)
      :html`<h2 id="no-stamp">No Stamps Added.</h2>`}`;


export async function allStampsView() {

  const stamps = await getAllStamps();

  render(template(stamps));

};