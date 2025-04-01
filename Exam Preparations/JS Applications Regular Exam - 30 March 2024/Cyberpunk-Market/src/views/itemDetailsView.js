import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { deleteItem, getItemById } from '../services/itemsService.js';
import { retrieveUserData } from '../util/users.js';

const template = (item, isOwner, onDelete,  isAuthenticated) => html
`<section id="details">
          <div id="details-wrapper">
            <div>
              <img id="details-img" src="${item.imageUrl}" alt="example1" />
              <p id="details-title">${item.item}</p>
            </div>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="details-price">Price: €${item.price}</p>
                <p class="details-availability">
                ${item.availability}
                </p>
                <p class="type">Type: ${item.type}</p>
                <p id="item-description">
                ${item.description}
                </p>
              </div>
              <div id="action-buttons">
              ${isAuthenticated && isOwner ? 
                html`
                <a href="/edit/${item._id}" id="edit-btn">Edit</a>
                <a id="delete-btn" @click=${onDelete}>Delete</a>
                ` : ''}
              </div>
            </div>
          </div>
        </section>`;

export async function itemDetails(context){

    const {id} = context.params;

    const item = await getItemById(id);
    const user = retrieveUserData();

    const isSeller = user?._id === item?._ownerId;
    const isLoggedInUser = !!user;    

    render(template(item, isSeller, () => deleteItemHandler(id), isLoggedInUser));
}

async function deleteItemHandler(id){

    const choice = confirm('Are you sure you want to delete this item?');

    if(!choice){
        return;
    }

    await deleteItem(id);

    page.redirect('/dashboard');

}



