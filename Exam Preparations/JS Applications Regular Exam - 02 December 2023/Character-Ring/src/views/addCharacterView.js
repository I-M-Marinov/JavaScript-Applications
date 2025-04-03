import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { addNewCharacter } from '../services/charactersService.js';

const template = (onSubmit) => html
`
<section id="create">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Add Character</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Character Type"
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
              />
              <textarea
              id="description"
              name="description"
              placeholder="Description"
              rows="2"
              cols="10"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="2"
              cols="10"
            ></textarea>
              <button type="submit">Add Character</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
</section>
`;

export function addCharacterView(){

    render(template(addCharacterHandler));
}

async function addCharacterHandler(e){
    e.preventDefault();

    try {

      const formData = new FormData(e.currentTarget);
      const { category, ["image-url"]: imageUrl, description, ["additional-info"]: moreInfo} = Object.fromEntries(formData);


    if(!category || !imageUrl || !description || !moreInfo){
        return alert("All fields are required!");
    }

    const data = {category, imageUrl, description, moreInfo};
    
    await addNewCharacter(data);
    
    page.redirect('/dashboard');

    } catch (error) {
      alert(error.message);
    }

}