import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { addCar } from '../services/carService.js';


const template = (onSubmit) => html
`
<section id="create">
          <div class="form form-auto">
            <h2>Share Your Car</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input type="text" name="model" id="model" placeholder="Model"/>
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
              ></textarea>
              <button type="submit">Add</button>
            </form>
          </div>
        </section>
`;

export function addCarView(){

    render(template(addCarHandler));
}

async function addCarHandler(e){
    e.preventDefault();

    try {

      const formData = new FormData(e.currentTarget);
      const { model, imageUrl, price, weight, speed, about } = Object.fromEntries(formData);


    if(!model || !imageUrl || !price || !weight || !speed || !about){
        return alert("All fields are required!");
    }

    const data = {model, imageUrl, price, weight, speed, about};
    
    await addCar(data);
    
    page.redirect('/cars');

    } catch (error) {
      alert(error.message);
    }

}