import { html, render  } from '../lib/litHtml.js';
import { page } from "../lib/page.js";

import { deleteStamp, getStampById, likeStamp, getAllLikes, getLikeByUser  } from '../services/stampsService.js';
import { confirmDeletetionOfStamp } from '../util/constants.js';
import { getUserData } from '../util/users.js';

// const template = (fact, isCreator, onDelete, onLike, alreadyLiked, allLikes, isLoggedIn) => html
//   `<section id="details">
//       <div id="details-wrapper">
//         <img id="details-img" src="${fact.imageUrl}" alt="example1" />
//         <p id="details-category">${fact.category}</p>
//         <div id="info-wrapper">
//           <div id="details-description">
//             <p id="description">${fact.description}</p>
//             <p id ="more-info">${fact.moreInfo}</p>
//           </div>
//           <h3>Likes:<span id="likes">${allLikes}</span></h3>
//           <div id="action-buttons">
            
//                 ${isLoggedIn && isCreator ? 
//             html`
//                 <a href="/edit/${fact._id}" id="edit-btn">Edit</a>
//                 <a id="delete-btn" @click=${onDelete} >Delete</a>
//             ` : ''}

//               ${isLoggedIn && !isCreator && alreadyLiked === 0 ? 
//             html`
//                 <a id="like-btn" @click=${onLike} >Like</a>
//             ` : ''}

//           </div>
//         </div>
//       </div>
//   </section>`;

const template = (stamp, isCreator, onDelete, onLike, alreadyLiked, allLikes, isLoggedIn) => html
  `<section id="details">
        <div id="details-wrapper">
          <img id="details-img" src="${stamp.imageUrl}" alt="example1" />
          <div>
            <p id="details-name">${stamp.name}</p>
            <div id="info-wrapper">
              <div id="details-year-description">
                <p id="year-description">
                  Year of oldest stamps - <span id="year">${stamp.year}</span> 
                </p>
                <p id="more-info">${stamp.learnMore}</p>
              </div>
            </div>

            <h3>Stamp total likes:
              <span id="likes">${allLikes}</span>
            </h3>

            <div id="action-buttons">
              ${isLoggedIn && isCreator ? 
              html`
                    <a href="/edit/${stamp._id}" id="edit-btn">Edit</a>
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
        
        export async function stampDetailsView(context){
        
            const { id } = context.params;
        
            const stamp = await getStampById(id);            
            const user = getUserData();

            const isCreator = user?._id === stamp?._ownerId;
            const alreadyLiked = await getLikeByUser(stamp._id, user?._id);
            const isLoggedIn = !!user;
            
            const allLikes = await getAllLikes(stamp?._id);
                        
            render(template(stamp, isCreator, () => deleteStampHandler(id), () => stampLikeHandler(id), alreadyLiked, allLikes, isLoggedIn));
        }
        
        async function deleteStampHandler(id){
        
            const choice = confirm(confirmDeletetionOfStamp);
        
            if(!choice){
                return;
            }
        
            await deleteStamp(id);
        
            page.redirect('/collection');
        
        }
        
        async function stampLikeHandler(stampId){
            
            await likeStamp({ "stampsId": stampId });
        
            page.redirect(`/collection/${stampId}`);
        
        }
        