import { html, render  } from '../lib/litHtml.js';
import { page } from "./../lib/page.js";

import { deleteSolution, getSolutionById, likeSolution, getAllLikes, getLikeByUser  } from '../services/solutionsService.js';
import { getUserData } from '../util/users.js';


        const template = (solution, isOwner, onDelete, onLike, alreadyLiked, allLikes, isLoggedIn) => html
`<section id="details">
          <div id="details-wrapper">
            <img
              id="details-img"
              src="${solution.imageUrl}"
              alt="example1"
            />
            <div>
              <p id="details-type">${solution.type}</p>
              <div id="info-wrapper">
                <div id="details-description">
                  <p id="description">
                  ${solution.description}
                  </p>
                  <p id="more-info">
                  ${solution.learnMore}
                  </p>
                </div>
              </div>
              <h3>Like Solution:<span id="like">${allLikes}</span></h3>
              
              <div id="action-buttons">
              ${isLoggedIn && isOwner ? 
                html`
                    <a href="/edit/${solution._id}" id="edit-btn">Edit</a>
                    <a id="delete-btn" @click=${onDelete}>Delete</a>
                ` : ''}

                  ${isLoggedIn && !isOwner && alreadyLiked === 0 ? 
                html`
                    <a id="like-btn" @click=${onLike}>Like</a>
                ` : ''}  
              </div>
            </div>
          </div>
        </section>`;
        
        export async function detailsSolution(context){
        
            const {id} = context.params;
        
            const solution = await getSolutionById(id);
            const user = getUserData();
            const isOwner = user?._id === solution?._ownerId;
            const alreadyLiked = await getLikeByUser(solution._id, user?._id);
            const isLoggedIn = !!user;
            
            const allLikes = await getAllLikes(solution?._id);
            
      
            render(template(solution, isOwner, () => handleDelete(id), () => handleLike(id), alreadyLiked, allLikes, isLoggedIn));
        }
        
        async function handleDelete(id){
        
            const choice = confirm("Are you sure you want to delete this solution?");
        
            if(!choice){
                return;
            }
        
            await deleteSolution(id);
        
            page.redirect('/dashboard');
        
        }
        
        async function handleLike(solutionId){
            
            await likeSolution({"solutionId": solutionId});
        
            page.redirect(`/dashboard/${solutionId}`);
        
        }
        