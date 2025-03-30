import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { addDrone } from '../services/dronesService.js';


// const template = (onSubmit) => html
// `
// <section id="create">
//           <div class="form">
//             <h2>Add tattoo</h2>
//             <form class="create-form" @submit=${onSubmit}>
//               <input
//                 type="text"
//                 name="type"
//                 id="type"
//                 placeholder="Tattoo Type"
//               />
//               <input
//                 type="text"
//                 name="image-url"
//                 id="image-url"
//                 placeholder="Image URL"
//               />
//               <textarea
//                 id="description"
//                 name="description"
//                 placeholder="Description"
//                 rows="2"
//                 cols="10"
//               ></textarea>
//               <select id="user-type" name="user-type">
//                 <option value="" disabled selected>Select your role</option>
//                 <option value="Tattoo Artist">Tattoo Artist</option>
//                 <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
//                 <option value="First Time in Tattoo">
//                   First Time in Tattoo
//                 </option>
//                 <option value="Tattoo Collector">Tattoo Collector</option>
//               </select>
//               <button type="submit">Add tattoo</button>
//             </form>
//           </div>
//         </section>
// `;

const template = (onSubmit) => html
`
<section id="create">
        <div class="form form-item">
          <h2>Add Drone Offer</h2>
          <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="model" id="model" placeholder="Drone Model" />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" />
            <input type="number" name="price" id="price" placeholder="Price" />
            <input type="number" name="weight" id="weight" placeholder="Weight" />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" />
            <input type="text" name="condition" id="condition" placeholder="Condition" />
            <textarea name="description" id="description" placeholder="Description"></textarea>
            <button type="submit">Add</button>
          </form>

        </div>
      </section>
`;

export function addDroneView(){

    render(template(addDroneFormHandler));
}

async function addDroneFormHandler(e){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const model = formData.get('model');
    const imageUrl = formData.get('imageUrl');
    const price = formData.get('price');
    const condition = formData.get('condition');
    const weight = formData.get('weight');
    const phone = formData.get('phone');
    const description = formData.get('description');

    if(!model || !imageUrl || !price || !condition || !weight || !phone || !description){
        return alert("All fields are required!");
    }

    await addDrone({model, imageUrl, price, condition, weight, phone, description});
    
    page.redirect('/dashboard');

}