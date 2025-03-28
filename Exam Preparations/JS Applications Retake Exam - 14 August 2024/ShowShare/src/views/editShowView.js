import { html, render  } from '../lib/litHtml.js';
import { getShowById, editShow } from '../services/showsService.js';
import page  from "page";

const template = (show, onSubmit) => html
`
<section id="edit">
          <div class="form">
            <h2>Edit Show</h2>
            <form class="edit-form" @submit=${onSubmit}>
              <input
                type="text"
                name="title"
                id="title"
                placeholder="TV Show title"
                .value=${show.title}
              />
              <input
                type="text"
                name="image-url"
                id="image-url"
                placeholder="Image URL"
                .value=${show.imageUrl}

              />
              <input
              type="text"
              name="genre"
              id="genre"
              placeholder="Genre"
              .value=${show.genre}

            />
            <input
            type="text"
            name="country"
            id="country"
            placeholder="Country"
            .value=${show.country}
          />
              <textarea
                id="details"
                name="details"
                placeholder="Details"
                rows="2"
                cols="10"
                .value=${show.details}
              ></textarea>
              <button type="submit">Edit Show</button>
            </form>
          </div>
        </section>

`;

export async function editShowView(context){

    const {id} = context.params;

    const show = await getShowById(id);
    
    render(template(show, (e) => showEditHandler(e, id)));
}

async function showEditHandler(e, id){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const title = formData.get('title');
    const imageUrl = formData.get('image-url');
    const genre = formData.get('genre');
    const country = formData.get('country');
    const details = formData.get('details');
    

    if(!title || !imageUrl || !genre || !country || !details){
        return alert("All fields are required!");
    }

    await editShow(id, {title, imageUrl, genre, country, details});
    
    page.redirect(`/shows/${id}`);

}