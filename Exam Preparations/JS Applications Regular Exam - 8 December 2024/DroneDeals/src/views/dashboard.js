import { html, render  } from '../lib/litHtml.js';
import { getAllDrones } from '../services/dronesService.js';

// const template = (tattoos) => html`<h2>Collection</h2>
//   <section id="tattoos">
//     ${tattoos?.length
//       ? tattoos.map(
//           (t) =>
//             html`<div class="tattoo">
//               <img src="${t.imageUrl}" />
//               <div class="tattoo-info">
//                 <h3 class="type">${t.type}</h3>
//                 <span>Uploaded by </span>
//                 <p class="user-type">${t.userType}</p>
//                 <a class="details-btn" href="/dashboard/${t._id}">Learn More</a>
//               </div>
//             </div>`
//         )
//       : html
//       `
//         <h2 id="no-tattoo">
//           Collection is empty, be the first to contribute
//         </h2>`}
//   </section>`;

const template = (drones) => html`<h3 class="heading">Marketplace</h3>
      <section id="dashboard">
      ${drones?.length
        ? drones.map(
            (drone) =>
              html`<div class="drone">
          <img src="${drone.imageUrl}" alt="example1" />
          <h3 class="model">${drone.model}</h3>
          <div class="drone-info">
            <p class="price">Price: $${drone.price}</p>
            <p class="condition">Condition: ${drone.condition}</p>
            <p class="weight">Weight: ${drone.weight}</p>
          </div>
          <a class="details-btn" href="/dashboard/${drone._id}">Details</a>
        </div>`): html`
        <h3 class="no-drones">No Drones Available</h3>`}
        
      </section>`
      

export async function dashboardView() {
  const drones = await getAllDrones();

  render(template(drones));
};