import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { createMotorcycle } from '../services/motorcycleService.js';


const template = (onSubmit) => html
`
<section id="create">
          <h2>Add Motorcycle</h2>
          <div class="form">
            <h2>Add Motorcycle</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="model"
                id="model"
                placeholder="Model"
              />
              <input
                type="text"
                name="imageUrl"
                id="moto-image"
                placeholder="Moto Image"
              />
              <input
              type="number"
              name="year"
              id="year"
              placeholder="Year"
            />
            <input
            type="number"
            name="mileage"
            id="mileage"
            placeholder="mileage"
          />
          <input
            type="text"
            name="contact"
            id="contact"
            placeholder="contact"
          />
            <textarea
              id="about"
              name="about"
              placeholder="about"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Motorcycle</button>
            </form>
          </div>
</section>
`;

export function addMotorcycleView(){

    render(template(addMotorcycleHandler));
}

async function addMotorcycleHandler(e){
    e.preventDefault();

    try {

      const formData = new FormData(e.currentTarget);
      const { model, imageUrl, year, mileage, contact, about } = Object.fromEntries(formData);


    if(!model || !imageUrl || !year || !mileage || !contact || !about){
        return alert("All fields are required!");
    }

    const data = { model, imageUrl, year, mileage, contact, about };
    
    await createMotorcycle(data);
    
    page.redirect('/motorcycles');

    } catch (error) {
      alert(error.message);
    }

}