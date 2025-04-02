import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { deleteCar, getCarById } from '../services/carService.js';
import { getUserData } from '../util/users.js';


// const template = (show, isOwner, onDelete, isLoggedIn) => html
// `<section id="details">
//           <div id="details-wrapper">
//             <img id="details-img" src="${show.imageUrl}" alt="${show.title}" />
//             <div id="details-text">
//               <p id="details-title">${show.title}</p>
//               <div id="info-wrapper">
//                 <div id="description">
//                   <p id="details-description">
//                     ${show.details}
//                   </p>
//                 </div>
//               </div>
//                 <div id="action-buttons">
//               ${isLoggedIn && isOwner ? 
//                 html`
//                     <a href="/edit/${show._id}" id="edit-btn">Edit</a>
//                     <a id="delete-btn" @click=${onDelete}>Delete</a>
//                 ` : ''}
//               </div>
//             </div>
//           </div>
//         </section>`;


const template = (car, isOwner, onDelete, isLoggedIn) => html
`<<section id="details">
          <div id="details-wrapper">
            <img id="details-img" src="${car.imageUrl}" alt="${car.model}" />
            <p id="details-title">${car.model}</p>
            <div id="info-wrapper">
              <div id="details-description">
                <p class="price">Price: €${car.price}</p>
                <p class="weight">Weight: ${car.weight} kg</p>
                <p class="top-speed">Top Speed: ${car.speed} kph</p>
                <p id="car-description">
                  ${car.about}</p>
              </div>
                <div id="action-buttons">
              ${isLoggedIn && isOwner ? 
                html`
                     <a href="/edit/${car._id}" id="edit-btn">Edit</a>
                     <a id="delete-btn" @click=${onDelete}>Delete</a>
                ` : ''}
            </div>
          </div>
        </section>`;

export async function carDetailsView(context){

    const {id} = context.params;

    const car = await getCarById(id);
    const user = getUserData();
    const isOwner = user?._id === car?._ownerId;
    const isLoggedIn = !!user;
    
    render(template(car, isOwner, () => removeCarHandler(id), isLoggedIn));
}

async function removeCarHandler(id){

    const choice = confirm('Are you sure you want to delete this car?');

    if(!choice){
        return;
    }

    await deleteCar(id);

    page.redirect('/cars');

}