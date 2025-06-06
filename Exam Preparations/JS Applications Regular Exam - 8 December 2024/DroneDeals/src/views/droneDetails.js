import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { deleteDrone, getDroneById } from '../services/dronesService.js';
import { getUserData } from '../util/users.js';

const template = (drone, isOwner, onDelete,  isAuthenticated) => html
`<section id="details">
        <div id="details-wrapper">
          <div>
            <img id="details-img" src="${drone.imageUrl}" alt="example1" />
            <p id="details-model">${drone.model}</p>
          </div>
          <div id="info-wrapper">
            <div id="details-description">
              <p class="details-price">Price: $${drone.price}</p>
              <p class="details-condition">Condition: ${drone.condition}</p>
              <p class="details-weight">Weight: ${drone.weight}</p>
              <p class="drone-description">
              ${drone.description}
              </p>
              <p class="phone-number">Phone: ${drone.phone}</p>
            </div>

            <div class="buttons">
              ${isAuthenticated && isOwner ? 
                html`
                    <a href="/edit/${drone._id}" id="edit-btn">Edit</a>
                    <a href="" id="delete-btn" @click=${onDelete}>Delete</a>
                ` : ''}
            </div>
          </div>
        </div>
      </section>`;

export async function droneDetailsView(context){

    const {id} = context.params;

    const drone = await getDroneById(id);
    const user = getUserData();
    const isCreator = user?._id === drone?._ownerId;
    const isAuthenticated = !!user;    

    render(template(drone, isCreator, () => deleteDroneHandler(id), isAuthenticated));
}

async function deleteDroneHandler(id){

    const choice = confirm('Are you sure you want to delete this drone?');

    if(!choice){
        return;
    }

    await deleteDrone(id);

    page.redirect('/dashboard');

}



