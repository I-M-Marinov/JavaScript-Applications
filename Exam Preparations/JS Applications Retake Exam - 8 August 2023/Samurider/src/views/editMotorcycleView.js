import { html, render  } from '../lib/litHtml.js';
import { getMotorcycleById, editMotorcycle } from '../services/motorcycleService.js';
import page  from "page";

const template = (motorcycle, onSubmit) => html
`
<section id="edit">
            <h2>Edit Motorcycle</h2>
            <div class="form">
              <h2>Edit Motorcycle</h2>
              <form class="edit-form" @submit=${onSubmit}>
                <input
                  type="text"
                  name="model"
                  id="model"
                  placeholder="Model"
                  .value=${motorcycle.model}
                />
                <input
                  type="text"
                  name="imageUrl"
                  id="moto-image"
                  placeholder="Moto Image"
                  .value=${motorcycle.imageUrl}
                />
                <input
                type="number"
                name="year"
                id="year"
                placeholder="Year"
                value=${motorcycle.year}
              />
              <input
              type="number"
              name="mileage"
              id="mileage"
              placeholder="mileage"
              .value=${motorcycle.mileage}
            />
            <input
              type="number"
              name="contact"
              id="contact"
              placeholder="contact"
              .value=${motorcycle.contact}
            />
              <textarea
                id="about"
                name="about"
                placeholder="about"
                rows="10"
                cols="50"
                .value=${motorcycle.about}
              ></textarea>
                <button type="submit">Edit Motorcycle</button>
              </form>
          </div>
        </section>

`;

export async function editMotorcycleHandler(context){

    const {id} = context.params;

    const motorcycle = await getMotorcycleById(id);
    
    render(template(motorcycle, (e) => motorcycleEditHandler(e, id)));
}

async function motorcycleEditHandler(e, id){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
      const { model, imageUrl, year, mileage, contact, about } = Object.fromEntries(formData);
    

    if(!model || !imageUrl || !year || !mileage || !contact || !about){
        return alert("All fields are required!");
    }

    await editMotorcycle(id, {model, imageUrl, year, mileage, contact, about});
    
    page.redirect(`/motorcycles/${id}`);

}