import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { deleteMotorcycle, getMotorcycleById } from '../services/motorcycleService.js';
import { getUserData } from '../util/users.js';


const template = (motorcycle, isCreator, onDelete, isAuthenticated) => html
`<section id="details">
      <div id="details-wrapper">
        <img id="details-img" src="${motorcycle.imageUrl}" alt="${motorcycle.model}" />
        <p id="details-title">${motorcycle.model}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p class="year">Year: ${motorcycle.year}</p>
            <p class="mileage">Mileage: ${motorcycle.mileage} km.</p>
            <p class="contact">Contact Number: ${motorcycle.contact}</p>
            <p id = "motorcycle-description">${motorcycle.about}</p>
          </div>
          <div id="action-buttons">
          ${isAuthenticated && isCreator ? 
                html`
            <a href="/edit/${motorcycle._id}" id="edit-btn">Edit</a>
            <a id="delete-btn" @click=${onDelete}>Delete</a>
            ` : ''}
          </div>
        </div>
      </div>
</section>`;

export async function motorcycleDetailsView(context){

    const {id} = context.params;

    const motorcycle = await getMotorcycleById(id);
    const user = getUserData();
    const isCreator = user?._id === motorcycle?._ownerId;
    const isAuthenticated = !!user;
    
    render(template(motorcycle, isCreator, () => deleteMotorcycleHandler(id), isAuthenticated));
}

async function deleteMotorcycleHandler(id){

    const choice = confirm('Are you sure you want to delete this motorcycle?');

    if(!choice){
        return;
    }

    await deleteMotorcycle(id);

    page.redirect('/motorcycles');
}