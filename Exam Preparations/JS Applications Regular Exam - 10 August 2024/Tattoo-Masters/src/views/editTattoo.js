import { html, render  } from '../lib/litHtml.js';
import { getTattooById, updateTattoo } from '../services/tattoesService.js';
import page  from "page";

const template = (tattoo, onSubmit) => html
`
<section id="edit">
          <div class="form">
            <h2>Edit tattoo</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Tattoo Type"
                .value=${tattoo.type}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value=${tattoo.imageUrl}
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
                .value=${tattoo.description}
              ></textarea>
              <select id="user-type" name="user-type" .value=${tattoo.userType}>
                <option value="" disabled selected>Select your role</option>
                <option value="Tattoo Artist">Tattoo Artist</option>
                <option value="Tattoo Enthusiast">Tattoo Enthusiast</option>
                <option value="First Time in Tattoo">
                  First Time in Tattoo
                </option>
                <option value="Tattoo Collector">Tattoo Collector</option>
              </select>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>

`;

export async function editTattooView(context){

    const {id} = context.params;
    const tattoo = await getTattooById(id);
    
    render(template(tattoo, (e) => handleEditForm(e, id)));
}

async function handleEditForm(e, id){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const type = formData.get('type');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const userType = formData.get('user-type');
    

    if(!type || !imageUrl || !description || !userType){
        return alert(allFieldsRequired);
    }

    await updateTattoo(id, {type, imageUrl, description, userType});
    
    page.redirect(`/dashboard/${id}`);

}