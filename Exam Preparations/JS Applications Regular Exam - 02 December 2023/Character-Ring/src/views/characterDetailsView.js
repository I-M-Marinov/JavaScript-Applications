import { html, render  } from '../lib/litHtml.js';
import { page } from "../lib/page.js";

import { removeCharacter, getCharacterById, likeCharacter, getAllLikes, getLikeByUser  } from '../services/charactersService.js';
import { getUserData } from '../util/users.js';


const template = (character, isCreator, onDelete, onLike, alreadyLiked, allLikes, isLoggedIn) => html
  `<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${character.imageUrl}" alt="example1" />
            <div>
            <p id="details-category">${character.category}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p id="description">${character.description}</p>
                <p id ="more-info">${character.moreInfo}</p>
              </div>
            </div>
              <h3>Is This Useful:<span id="likes">${allLikes}</span></h3>

          <div id="action-buttons">
            ${isLoggedIn && isCreator ? 
              html`
                  <a href="/edit/${character._id}" id="edit-btn">Edit</a>
                  <a id="delete-btn" @click=${onDelete}>Delete</a>
              ` : ''}

                ${isLoggedIn && !isCreator && alreadyLiked === 0 ? 
              html`
                  <a id="like-btn" @click=${onLike}>Like</a>
              ` : ''}
          </div>
        </div>
      </div>
  </section>`;
        
        export async function characterDetails(context){
        
            const {id} = context.params;
        
            const character = await getCharacterById(id);
            const user = getUserData();
            const isCreator = user?._id === character?._ownerId;
            const alreadyLiked = await getLikeByUser(character._id, user?._id);
            const isLoggedIn = !!user;
            
            const allLikes = await getAllLikes(character?._id);
            
      
            render(template(character, isCreator, () => handleDelete(id), () => handleLike(id), alreadyLiked, allLikes, isLoggedIn));
        }
        
        async function handleDelete(id){
        
            const choice = confirm("Are you sure you want to remove this character?");
        
            if(!choice){
                return;
            }
        
            await removeCharacter(id);
        
            page.redirect('/dashboard');
        
        }
        
        async function handleLike(characterId){
            
            await likeCharacter({"characterId": characterId});
        
            page.redirect(`/dashboard/${characterId}`);
        
        }
        