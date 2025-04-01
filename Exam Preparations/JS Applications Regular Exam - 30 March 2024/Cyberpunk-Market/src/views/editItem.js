import page  from "page";
import { html, render  } from '../lib/litHtml.js';

import { getItemById, editItem } from '../services/itemsService.js';
import { showError } from '../util/notifications.js';

const template = (item, onSubmit) => html
`
 <section id="edit">
          <div class="form form-item">
            <h2>Edit Your Item</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input type="text" name="item" id="item" placeholder="Item" .value=${item.item} />
              <input
                type="text"
                name="imageUrl"
                id="item-image"
                placeholder="Your item Image URL"
                .value=${item.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value=${item.price}
              />
              <input
                type="text"
                name="availability"
                id="availability"
                placeholder="Availability Information"
                .value=${item.availability}
              />
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Item Type"
                .value=${item.type}
              />
              <textarea
                id="description"
                name="description"
                placeholder="More About The Item"
                rows="10"
                cols="50"
                .value=${item.description}
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
  </section>

`;

export async function editItemView(context){

    const {id} = context.params;
    const item = await getItemById(id);
    
    render(template(item, (e) => editItemFormHandler(e, id)));
}

async function editItemFormHandler(e, id){
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

    await editItem(id, {item, imageUrl, price, availability, type, description});
    
    page.redirect(`/dashboard/${id}`);

}