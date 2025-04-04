import { html, render  } from '../lib/litHtml.js';
import { page } from "../lib/page.js";

import { deleteFact, getFactById, likeFact, getAllLikes, getLikeByUser  } from '../services/factsService.js';
import { confirmDeletionOfFact } from '../util/constants.js';
import { getUserData } from '../util/users.js';

const template = (fact, isCreator, onDelete, onLike, alreadyLiked, allLikes, isLoggedIn) => html
  `<section id="details">
      <div id="details-wrapper">
        <img id="details-img" src="${fact.imageUrl}" alt="example1" />
        <p id="details-category">${fact.category}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">${fact.description}</p>
            <p id ="more-info">${fact.moreInfo}</p>
          </div>
          <h3>Likes:<span id="likes">${allLikes}</span></h3>
          <div id="action-buttons">
            
                ${isLoggedIn && isCreator ? 
            html`
                <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
                <a id="delete-btn" @click=${onDelete} >Delete</a>
            ` : ''}

              ${isLoggedIn && !isCreator && alreadyLiked === 0 ? 
            html`
                <a id="like-btn" @click=${onLike} >Like</a>
            ` : ''}

          </div>
        </div>
      </div>
  </section>`;
        
        export async function factDetails(context){
        
            const {id} = context.params;
        
            const fact = await getFactById(id);            
            const user = getUserData();
            const isCreator = user?._id === fact?._ownerId;
            const alreadyLiked = await getLikeByUser(fact._id, user?._id);
            const isLoggedIn = !!user;
            
            const allLikes = await getAllLikes(fact?._id);
            
      
            render(template(fact, isCreator, () => deleteFactHandler(id), () => likeFactHandler(id), alreadyLiked, allLikes, isLoggedIn));
        }
        
        async function deleteFactHandler(id){
        
            const choice = confirm(confirmDeletionOfFact);
        
            if(!choice){
                return;
            }
        
            await deleteFact(id);
        
            page.redirect('/dashboard');
        
        }
        
        async function likeFactHandler(factId){
            
            await likeFact({ "factId": factId });
        
            page.redirect(`/dashboard/${factId}`);
        
        }
        