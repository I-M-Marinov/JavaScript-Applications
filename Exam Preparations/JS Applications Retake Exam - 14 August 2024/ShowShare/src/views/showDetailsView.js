import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { deleteShow, getShowById } from '../services/showsService.js';
import { getUserData } from '../util/users.js';


const template = (show, isOwner, onDelete, isAuthenticated) => html
`<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${show.imageUrl}" alt="${show.title}" />
            <div id="details-text">
              <p id="details-title">${show.title}</p>
              <div id="info-wrapper">
                <div id="description">
                  <p id="details-description">
                    ${show.details}
                  </p>
                </div>
              </div>
                <div id="action-buttons">
              ${isAuthenticated && isOwner ? 
                html`
                    <a href="/edit/${show._id}" id="edit-btn">Edit</a>
                    <a id="delete-btn" @click=${onDelete}>Delete</a>
                ` : ''}
              </div>
            </div>
          </div>
        </section>`;

export async function showDetailsView(context){

    const {id} = context.params;

    const show = await getShowById(id);
    const user = getUserData();
    const isOwner = user?._id === show?._ownerId;
    const isAuthenticated = !!user;
    
    render(template(show, isOwner, () => deleteShowHandler(id), isAuthenticated));
}

async function deleteShowHandler(id){

    const choice = confirm('Are you sure you want to delete this show?');

    if(!choice){
        return;
    }

    await deleteShow(id);

    page.redirect('/shows');

}