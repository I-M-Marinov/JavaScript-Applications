import { html, render  } from '../lib/litHtml.js';
import { getAllCharacters } from '../services/charactersService.js';


const template = (characters) =>html`<h2>Characters</h2>
        <section id="characters">
        ${characters?.length
          ? characters.map((c) =>
        html`<div class="character">
            <img src="${c.imageUrl}" alt="${c.category}" />
            <div class="hero-info">
              <h3 class="category">${c.category}</h3>
              <p class="description">${c.description}</p>
              <a class="details-btn" href="/dashboard/${c._id}">More Info</a>
            </div>
          </div>
        </div>
        </section>`)
        :html`<h2>No added Heroes yet.</h2>`}`;


export async function charactersView() {
  const characters = await getAllCharacters();

  render(template(characters));
};