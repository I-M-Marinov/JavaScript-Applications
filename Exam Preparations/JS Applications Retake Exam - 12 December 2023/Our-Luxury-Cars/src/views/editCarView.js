import { html, render  } from '../lib/litHtml.js';
import { getCarById, editCar } from '../services/carService.js';
import page  from "page";

const template = (car, onSubmit) => html
`
<section id="edit">
          <div class="form form-auto">
            <h2>Edit Your Car</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input 
              type="text" 
              name="model" 
              id="model" 
              placeholder="Model" 
              .value=${car.model}
              />
              <input
                type="text"
                name="imageUrl"
                id="car-image"
                placeholder="Your Car Image URL"
                .value=${car.imageUrl}
              />
              <input
                type="text"
                name="price"
                id="price"
                placeholder="Price in Euro"
                .value=${car.price}
              />
              <input
                type="number"
                name="weight"
                id="weight"
                placeholder="Weight in Kg"
                .value=${car.weight}
              />
              <input
                type="text"
                name="speed"
                id="speed"
                placeholder="Top Speed in Kmh"
                .value=${car.speed}
              />
              <textarea
                id="about"
                name="about"
                placeholder="More About The Car"
                rows="10"
                cols="50"
                .value=${car.about}
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
</section>`;

export async function editCarView(context){

    const {id} = context.params;

    const car = await getCarById(id);
    
    render(template(car, (e) => showEditHandler(e, id)));
}

async function showEditHandler(e, id){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const model = formData.get('model');
    const imageUrl = formData.get('imageUrl');
    const price = formData.get('price');
    const weight = formData.get('weight');
    const speed = formData.get('speed');
    const about = formData.get('about');
    

    if(!model || !imageUrl || !price || !weight || !speed || !about){
      console.log(model, imageUrl, price, weight, speed, about);
      
      return alert("All fields are required!");
  }
    await editCar(id, {model, imageUrl, price, weight, speed, about});
    
    page.redirect(`/cars/${id}`);

}