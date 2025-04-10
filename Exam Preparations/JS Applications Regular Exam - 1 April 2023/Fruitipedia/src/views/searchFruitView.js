import { html, render } from '../lib/litHtml.js';
import { searchForFruit } from '../services/fruitsService.js';


const template = (result, onSearch) => html`
<section id="search">
      <div class="form">
          <h2>Search</h2>
          <form class="search-form" @submit=${onSearch}>
            <input
              type="text"
              name="search"
              id="search-input"
            />
            <button class="button-list">Search</button>
          </form>
      </div>
        <h4>Results:</h4>
          <div class="search-result">
              ${result.length > 0 
              ? result.map(fruit => html`
                <div class="fruit">
              <img src="${fruit.imageUrl}" alt="${fruit.name}" />
              <h3 class="title">${fruit.name}</h3>
              <p class="description">${fruit.description}</p>
              <a class="details-btn" href="/fruits/${fruit._id}">More Info</a>
          </div>`)
              : html`<p class="no-result">No result.</p>`}
        </div>
</section>`;

export function searchFruitView() {
    let results = [];

    const onSearch = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('search').trim();

        if (!searchTerm) {
            return;
        }

        results = await searchForFruit(searchTerm);
        update();
    };

    const update = () => render(template(results, onSearch));
    update();
}
