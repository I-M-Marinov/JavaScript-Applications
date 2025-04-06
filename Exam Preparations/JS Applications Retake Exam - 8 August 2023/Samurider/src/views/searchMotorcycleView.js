import { html, render } from '../lib/litHtml.js';
import { searchForMotorcycle } from '../services/motorcycleService.js';

const template = (result, onSearch) => html`
<section id="search">
            <div class="form">
              <h4>Search</h4>
              <form class="search-form" @submit=${onSearch}>
                <input
                  type="text"
                  name="search"
                  id="search-input"
                />
                <button class="button-list">Search</button>
              </form>
            </div>
            <h4 id="result-heading">Results:</h4>
            <div class="search-result">
                ${result.length > 0 
                ? result.map(motorcycle => html`
                <div class="motorcycle">
                <img src="${motorcycle.imageUrl}" alt="${motorcycle.model}" />
                <h3 class="model">${motorcycle.model}</h3>
                <a class="details-btn" href="/motorcycles/${motorcycle._id}">More Info</a>
                </div>`)
                : html`<h2 class="no-avaliable">No result.</h2>`
                }
            </div>
</section>`;

export function searchMotorcycleView() {
    let results = [];

    const onSearch = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('search').trim();

        if (!searchTerm) {
            return;
        }

        results = await searchForMotorcycle(searchTerm);
        update();
    };

    const update = () => render(template(results, onSearch));
    update();
}
