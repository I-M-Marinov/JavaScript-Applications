import { html, render  } from '../lib/litHtml.js';
import { getSolutionById, editSolution } from '../services/solutionsService.js';
import page  from "page";


const template = (solution, onSubmit) => html
`
<section id="edit">
          <div class="form">
            <img class="border" src="./images/border.png" alt="" />
            <h2>Edit Solution</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="type"
                id="type"
                placeholder="Solution Type"
                .value=${solution.type}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value=${solution.imageUrl}
              />
              <textarea
                id="description"
                name="description"
                placeholder="Description"
                rows="2"
                cols="10"
                .value=${solution.description}
              ></textarea>
              <textarea
                id="more-info"
                name="more-info"
                placeholder="more Info"
                rows="2"
                cols="10"
                .value=${solution.learnMore}
              ></textarea>
              <button type="submit">Edit</button>
            </form>
          </div>
        </section>
`;

export async function editSolutionView(context){

    const {id} = context.params;

    const solution = await getSolutionById(id);
    
    render(template(solution, (e) => solutionEditHandler(e, id)));
}

async function solutionEditHandler(e, id){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const type = formData.get('type');
    const imageUrl = formData.get('image-url');
    const description = formData.get('description');
    const learnMore = formData.get('more-info');

    

    if(!type || !imageUrl || !description || !learnMore){
        return alert("All fields are required!");
    }

    await editSolution(id, {type, imageUrl, description, learnMore});
    
    page.redirect(`/dashboard/${id}`);

}