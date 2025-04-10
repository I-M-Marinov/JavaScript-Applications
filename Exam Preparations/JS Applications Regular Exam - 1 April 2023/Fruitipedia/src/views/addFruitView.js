import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { addFruit } from '../services/fruitsService.js';


const template = (onSubmit) => html
`
<section id="create">
          <div class="form">
            <h2>Add Fruit</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image"
              />
              <textarea
              id="fruit-description"
              name="description"
              placeholder="Description"
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="fruit-nutrition"
              name="nutrition"
              placeholder="Nutrition"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fruit</button>
            </form>
          </div>
        </section>
`;

export function addFruitView(){

    render(template(addMotorcycleHandler));
}

async function addMotorcycleHandler(e){
    e.preventDefault();

    try {

      const formData = new FormData(e.currentTarget);
      const { name, imageUrl, description, nutrition } = Object.fromEntries(formData);


    if(!name || !imageUrl || !description || !nutrition){
        return alert("All fields are required!");
    }

    const data = { name, imageUrl, description, nutrition };
    
    await addFruit(data);
    
    page.redirect('/fruits');

    } catch (error) {
      alert(error.message);
    }

}