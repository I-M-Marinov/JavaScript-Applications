import { html, render  } from '../lib/litHtml.js';
import { getAllItems } from '../services/itemsService.js';

const template = (items) => html`<h3 class="heading">Market</h3>
        <section id="dashboard">
        ${items?.length
          ? items.map(
              (item) =>
                html`<div class="item">
            <img src="${item.imageUrl}" alt="example1" />
            <h3 class="model">${item.item}</h3>
            <div class="item-info">
              <p class="price">Price: €${item.price}</p>
              <p class="availability">
                ${item.availability}
              </p>
              <p class="type">Type: ${item.type}</p>
            </div>
            <a class="details-btn" href="/dashboard/${item._id}">Uncover More</a>
          </div>`): html`
          <h3 class="empty">No Items Yet</h3>` }
        </section>`
        
      

export async function dashboardView() {
  const items = await getAllItems();

  render(template(items));
};