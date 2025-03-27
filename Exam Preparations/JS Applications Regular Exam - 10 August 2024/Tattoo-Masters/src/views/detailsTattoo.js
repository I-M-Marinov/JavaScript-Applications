import { html, render  } from '../lib/litHtml.js';
import { getTattooById } from '../services/tattoesService.js';
import { getUserData } from '../util/users.js';

const template = (tattoo, isOwner) => html
`<section id="details">
    <div id="details-wrapper">
        <img
            id="details-img"
                src="${tattoo.imageUrl}"
            alt="example1"
        />
        <div>
            <div id="info-wrapper">
                <p id="details-type">${tattoo.type}</p>
                <div id="details-description">
                    <p id="user-type">${tattoo.userType}</p>
                    <p id="description">
                    ${tattoo.description}
                    </p>
                </div>
                <h3>Like tattoo:<span id="like">0</span></h3>

                ${isOwner ? 
                html`<div id="action-buttons">
                    <a href="/edit" id="edit-btn">Edit</a>
                    <a href="/delete" id="delete-btn">Delete</a>
                    <a href="#" id="like-btn">Like</a>
                </div>` : ''}
                </div>
        </div>
    </div>
</section>`;

export async function detailsTattooView(context){

    const {id} = context.params;

    const tattoo = await getTattooById(id);
    const user = getUserData();
    const isOwner = user?._id === tattoo?._ownerId;

    render(template(tattoo, isOwner));
}

