import { html, render } from '../lib/litHtml.js';
import { searchForShow } from '../services/showsService.js';

const template = (result, onSearch) => html`
<section id="search">
    <div class="form">
        <h2>Search</h2>
        <form @submit=${onSearch} class="search-form">
            <input type="text" name="search" id="search-input" />
            <button type="submit" class="button-list">Search</button>
        </form>
    </div>

    <h4>Results:</h4>
    <div class="search-result">
        ${result.length > 0 
            ? result.map(show => html`
                <div class="show">
                    <img src="${show.imageUrl}" alt="${show.title}" />
                    <div class="show-info">
                        <h3 class="title">${show.title}</h3>
                        <p class="genre">Genre: ${show.genre}</p>
                        <p class="country-of-origin">Country of Origin: ${show.country}</p>
                        <a class="details-btn" href="/shows/${show._id}">Details</a>
                    </div>
                </div>`)
            : html`<p class="no-result">There is no TV show with this title</p>`
        }
    </div>
</section>`;

export function searchView() {
    let results = [];

    const onSearch = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.currentTarget);
        const searchTerm = formData.get('search').trim();

        if (!searchTerm) {
            return;
        }

        results = await searchForShow(searchTerm);
        update();
    };

    const update = () => render(template(results, onSearch));
    update();
}
