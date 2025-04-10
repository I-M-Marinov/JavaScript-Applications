import { html, render  } from '../lib/litHtml.js';
import { getFruitById, editFruit } from '../services/fruitsService.js';
import page  from "page";

const template = (fruit, onSubmit) => html
`
<section id="edit">
          <div class="form">
            <h2>Edit Fruit</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Fruit Name"
                .value=${fruit.name}
              />
              <input
                type="text"
                name="imageUrl"
                id="Fruit-image"
                placeholder="Fruit Image URL"
                .value=${fruit.imageUrl}
              />
              <textarea
                id="fruit-description"
                name="description"
                placeholder="Description"
                rows="10"
                cols="50"
                .value=${fruit.description}
              ></textarea>
              <textarea
                id="fruit-nutrition"
                name="nutrition"
                placeholder="Nutrition"
                rows="10"
                cols="50"
                .value=${fruit.nutrition}
              ></textarea>
              <button type="submit">post</button>
            </form>
          </div>
        </section>

`;

export async function editFruitView(context){

    const {id} = context.params;

    const fruit = await getFruitById(id);
    
    render(template(fruit, (e) => editFruitHandler(e, id)));
}

async function editFruitHandler(e, id){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
      const { name, imageUrl, description, nutrition } = Object.fromEntries(formData);
    

    if(!name || !imageUrl || !description || !nutrition){
        return alert("All fields are required!");
    }

    await editFruit(id, {name, imageUrl, description, nutrition});
    
    page.redirect(`/fruits/${id}`);

}