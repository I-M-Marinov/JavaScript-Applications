import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { deleteTattoo, getAllLikes, getLikeByUser, getTattooById, likeTattoo } from '../services/tattoesService.js';
import { getUserData } from '../util/users.js';

import { confirmDeletionOfTattoo } from '../const/constants.js';


const template = (tattoo, isOwner, onDelete, onLike, alreadyLiked, allLikes, isAuthenticated) => html
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
                <h3>Like tattoo:<span id="like">${allLikes}</span></h3>
                <div id="action-buttons">
                ${isAuthenticated && isOwner ? 
                html`
                    <a href="/edit/${tattoo._id}" id="edit-btn">Edit</a>
                    <a id="delete-btn" @click=${onDelete}>Delete</a>
                ` : ''}

                 ${isAuthenticated && !isOwner && alreadyLiked === 0 ? 
                html`
                    <a id="like-btn" @click=${onLike}>Like</a>
                ` : ''}
                
                </div>
                </div>
        </div>
    </div>
</section>`;

export async function detailsTattooView(context){

    const {id} = context.params;

    const tattoo = await getTattooById(id);
    const user = getUserData();
    const isOwner = user?._id === tattoo?._ownerId;
    const alreadyLiked = await getLikeByUser(tattoo._id, user?._id);
    const isAuthenticated = !!user;
    
    const allLikes = await getAllLikes(tattoo?._id);
    console.log(allLikes);
    

    render(template(tattoo, isOwner, () => handleDelete(id), () => handleLike(id), alreadyLiked, allLikes, isAuthenticated));
}

async function handleDelete(id){

    const choice = confirm(confirmDeletionOfTattoo);

    if(!choice){
        return;
    }

    await deleteTattoo(id);

    page.redirect('/dashboard');

}

async function handleLike(tattooId){
    
    await likeTattoo({"tattooId": tattooId});

    page.redirect(`/dashboard/${tattooId}`);

}

