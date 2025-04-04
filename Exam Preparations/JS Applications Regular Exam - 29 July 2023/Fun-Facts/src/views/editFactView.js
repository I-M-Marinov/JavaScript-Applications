import page  from "page";
import { html, render  } from '../lib/litHtml.js';

import { getFactById, editFact } from '../services/factsService.js';
import { allFieldsAreRequired } from '../util/constants.js';


const template = (fact, onSubmit) => html
`
<section id="edit">
          <div class="form">
            <h2>Edit Fact</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
              type="text"
              name="category"
              id="category"
              placeholder="Category"
              .value=${fact.category}
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
              .value=${fact.imageUrl}

            />
            <textarea
            id="description"
            name="description"
            placeholder="Description"
            rows="10"
            cols="50"
            .value=${fact.description}

          ></textarea>
          <textarea
            id="additional-info"
            name="additional-info"
            placeholder="Additional Info"
            rows="10"
            cols="50"
            .value=${fact.moreInfo}
          ></textarea>
              <button type="submit">Post</button>
            </form>
          </div>
        </section>
`;

export async function editFactView(context){

    const {id} = context.params;

    const fact = await getFactById(id);
    
    render(template(fact, (e) => factEditHandler(e, id)));
}

async function factEditHandler(e, id){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const category = formData.get('category');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const moreInfo = formData.get('additional-info');

    
    if(!category || !imageUrl || !description || !moreInfo){
        return alert(allFieldsAreRequired);
    }

    await editFact(id, {category, imageUrl, description, moreInfo});
    
    page.redirect(`/dashboard/${id}`);

}