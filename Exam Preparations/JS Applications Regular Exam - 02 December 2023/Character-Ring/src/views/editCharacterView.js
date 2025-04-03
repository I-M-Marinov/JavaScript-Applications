import { html, render  } from '../lib/litHtml.js';
import { getCharacterById, editCharacter } from '../services/charactersService.js';
import page  from "page";


const template = (character, onSubmit) => html
`
<section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="">
            <h2>Edit Character</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Character Type"
              .value=${character.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${character.imageUrl}
            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="2"
            cols="10"
            .value=${character.description}
          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="2"
            cols="10"
            .value=${character.moreInfo}
          ></textarea>
              <button type="submit">Edit</button>
            </form>
            <img class="border" src="./images/border.png" alt="">
          </div>
        </section>
`;

export async function editCharacterView(context){

    const {id} = context.params;

    const character = await getCharacterById(id);
    
    render(template(character, (e) => characterEditHandler(e, id)));
}

async function characterEditHandler(e, id){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const category = formData.get('category');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const moreInfo = formData.get('additional-info');

    
    if(!category || !imageUrl || !description || !moreInfo){
        return alert("All fields are required!");
    }

    await editCharacter(id, {category, imageUrl, description, moreInfo});
    
    page.redirect(`/dashboard/${id}`);

}