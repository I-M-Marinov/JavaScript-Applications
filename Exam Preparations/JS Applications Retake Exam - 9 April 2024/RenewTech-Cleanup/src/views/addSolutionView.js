import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { addSolution } from '../services/solutionsService.js';

const template = (onSubmit) => html
`
<section id="create">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Add Solution</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
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
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
              ></textarea>
              <button type="submit">Add Solution</button>
            </form>
          </div>
        </section>
`;

export function addSolutionView(){

    render(template(addSolutionHandler));
}

async function addSolutionHandler(e){
    e.preventDefault();

    try {

      const formData = new FormData(e.currentTarget);
      const { type, ["image-url"]: imageUrl, description, ["more-info"]: learnMore} = Object.fromEntries(formData);


    if(!type || !imageUrl || !description || !learnMore){
        return alert("All fields are required!");
    }

    const data = {type, imageUrl, description, learnMore};
    
    await addSolution(data);
    
    page.redirect('/dashboard');

    } catch (error) {
      alert(error.message);
    }

}