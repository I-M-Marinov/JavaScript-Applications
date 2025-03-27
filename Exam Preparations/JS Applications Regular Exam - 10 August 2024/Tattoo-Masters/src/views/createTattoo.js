import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { allFieldsRequired } from '../const/constants.js';
import { createTattoo } from '../services/tattoesService.js';


const template = (onSubmit) => html
`
<section id="create">
          <div class="form">
            <h2>Add tattoo</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Tattoo Type"
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
              <select id="user-type" name="user-type">
                <option value="" disabled selected>Select your role</option>
                <option value="Tattoo Artist">Tattoo Artist</option>
                <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                <option value="First Time in Tattoo">
                  First Time in Tattoo
                </option>
                <option value="Tattoo Collector">Tattoo Collector</option>
              </select>
              <button type="submit">Add tattoo</button>
            </form>
          </div>
        </section>
`;

export function createTattooView(){

    render(template(handleCreateForm));
}

async function handleCreateForm(e){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const type = formData.get('type');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const userType = formData.get('user-type');

    if(!type || !imageUrl || !description || !userType){
        return alert(allFieldsRequired);
    }

    await createTattoo({type, imageUrl, description, userType});
    
    page.redirect('/dashboard');

}