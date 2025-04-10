import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { deleteFruit, getFruitById } from '../services/fruitsService.js';
import { getUserData } from '../util/users.js';

const template = (fruit, isCreator, onDelete, isAuthenticated) => html
`<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${fruit.imageUrl}" alt="${fruit.name}" />
            <p id="details-title">${fruit.name}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p>${fruit.description}</p>
                    <p id="nutrition">Nutrition</p>
                <p id = "details-nutrition">${fruit.nutrition}</p>
              </div>
              
            <div id="action-buttons">
              ${isAuthenticated && isCreator ? 
                html`
                  <a href="/edit/${fruit._id}" id="edit-btn">Edit</a>
                  <a id="delete-btn" @click=${onDelete}>Delete</a>
            ` : ''}
            </div>
          </div>
        </div>
      </section>`;

export async function fruitsDetailsView(context){

    const {id} = context.params;

    const fruit = await getFruitById(id);
    const user = getUserData();
    const isCreator = user?._id === fruit?._ownerId;
    const isAuthenticated = !!user;
    
    render(template(fruit, isCreator, () => deleteFruitHandler(id), isAuthenticated));
}

async function deleteFruitHandler(id){

    const choice = confirm('Are you sure you want to delete this fruit ?');

    if(!choice){
        return;
    }

    await deleteFruit(id);

    page.redirect('/fruits');
}