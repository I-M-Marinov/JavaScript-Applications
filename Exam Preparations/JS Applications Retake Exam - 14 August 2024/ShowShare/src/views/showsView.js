import { html, render  } from '../lib/litHtml.js';
import { getAllShows } from '../services/showsService.js';

const template = (shows) =>html`<h2>Users Recommendations</h2>
        <section id="shows">
        ${shows?.length
            ? shows.map((show) =>
                  html`
          <div class="show">
            <img src="${show.imageUrl}" alt="${show.title}" />
            <div class="show-info">
              <h3 class="title">${show.title}</h3>
              <p class="genre">Genre: ${show.genre}</p>
              <p class="country-of-origin">Country of Origin: ${show.country}</p>
              <a class="details-btn" href="/shows/${show._id}">Details</a>
            </div>
          </div>
        </section>`
     )
        : html`<h2 id="no-show">No shows Added.</h2>`}`;


export async function showsView() {
  const shows = await getAllShows();

  render(template(shows));
};