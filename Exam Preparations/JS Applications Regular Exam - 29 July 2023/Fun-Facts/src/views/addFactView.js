import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { addFact } from '../services/factsService.js';
import { allFieldsAreRequired } from '../util/constants.js';

const template = (onSubmit) => html
`
<section id="create">
          <div class="form">
            <h2>Add Fact</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="category"
                id="category"
                placeholder="Category"
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
              rows="10"
              cols="50"
            ></textarea>
            <textarea
              id="additional-info"
              name="additional-info"
              placeholder="Additional Info"
              rows="10"
              cols="50"
            ></textarea>
              <button type="submit">Add Fact</button>
            </form>
          </div>
        </section>
`;

export function addFactView(){

    render(template(addFactHandler));
}

async function addFactHandler(e){
    e.preventDefault();

    try {

      const formData = new FormData(e.currentTarget);
      const { category, ["image-url"]: imageUrl, description, ["additional-info"]: moreInfo} = Object.fromEntries(formData);


    if(!category || !imageUrl || !description || !moreInfo){
        return alert(allFieldsAreRequired);
    }

    const data = {category, imageUrl, description, moreInfo};
    
    await addFact(data);
    
    page.redirect('/dashboard');

    } catch (error) {
      alert(error.message);
    }

}