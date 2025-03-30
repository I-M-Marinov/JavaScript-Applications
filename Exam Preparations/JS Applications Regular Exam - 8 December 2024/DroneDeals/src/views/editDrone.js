import { html, render  } from '../lib/litHtml.js';
import { getDroneById, editDrone } from '../services/dronesService.js';
import page  from "page";

const template = (drone, onSubmit) => html
`
 <section id="edit">
        <div class="form form-item">
          <h2>Edit Offer</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="model" id="model" placeholder="Drone Model" .value=${drone.model} />
            <input type="text" name="imageUrl" id="imageUrl" placeholder="Image URL" .value=${drone.imageUrl} />
            <input type="number" name="price" id="price" placeholder="Price" .value=${drone.price} />
            <input type="number" name="weight" id="weight" placeholder="Weight" .value=${drone.weight} />
            <input type="number" name="phone" id="phone" placeholder="Phone Number for Contact" .value=${drone.phone} />
            <input type="text" name="condition" id="condition" placeholder="Condition" .value=${drone.condition} />
            <textarea name="description" id="description" placeholder="Description"> ${drone.description} </textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>

`;

export async function editDroneView(context){

    const {id} = context.params;
    const drone = await getDroneById(id);
    
    render(template(drone, (e) => editDroneFormHandler(e, id)));
}

async function editDroneFormHandler(e, id){
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

    await editDrone(id, {model, imageUrl, price, condition, weight, phone, description});
    
    page.redirect(`/dashboard/${id}`);

}