import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { addItem } from '../services/itemsService.js';
import { showError } from '../util/notifications.js';

const template = (onSubmit) => html
`
<section id="create">
          <div class="form form-item">
            <h2>Share Your item</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input type="text" name="item" id="item" placeholder="Item" />
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Add</button>
            </form>
          </div>
</section>
`;

export function addItemView(){

    render(template(addItemFormHandler));
}

async function addItemFormHandler(e){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const item = formData.get('item');
    const imageUrl = formData.get('imageUrl');
    const price = formData.get('price');
    const availability = formData.get('availability');
    const type = formData.get('type');
    const description = formData.get('description');


    if(!item || !imageUrl || !price || !availability || !type || !description){
        return showError("All fields are required!");
    }

    await addItem({item, imageUrl, price, availability, type, description});
    
    page.redirect('/dashboard');

}