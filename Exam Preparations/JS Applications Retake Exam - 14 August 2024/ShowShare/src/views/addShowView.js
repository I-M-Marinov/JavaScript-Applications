import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { createShow } from '../services/showsService.js';


const template = (onSubmit) => html
`
<section id="create">
          <div class="form">
            <h2>Add Show</h2>
            <form class="create-form" @submit=${onSubmit}>
              <input
              type="text"
              name="title"
              id="title"
              placeholder="TV Show title"
            />
            <input
              type="text"
              name="image-url"
              id="image-url"
              placeholder="Image URL"
            />
            <input
            type="text"
            name="genre"
            id="genre"
            placeholder="Genre"
          />
          <input
          type="text"
          name="country"
          id="country"
          placeholder="Country"
        />
            <textarea
              id="details"
              name="details"
              placeholder="Details"
              rows="2"
              cols="10"
            ></textarea>
              <button type="submit">Add Show</button>
            </form>
          </div>
        </section>
`;

export function addShowView(){

    render(template(addShowHandler));
}

async function addShowHandler(e){
    e.preventDefault();

    // const formData = new FormData(e.currentTarget);

    // const title = formData.get('title');
    // const imageUrl = formData.get('image-url');
    // const genre = formData.get('genre');
    // const country = formData.get('country');
    // const details = formData.get('details');
    

    try {

      const formData = new FormData(e.currentTarget);
      const { title, ["image-url"]: imageUrl, genre, country, details} = Object.fromEntries(formData);


    if(!title || !imageUrl || !genre || !country || !details){
        return alert("All fields are required!");
    }

    const data = {title, imageUrl, genre, country, details};
    
    await createShow(data);
    
    page.redirect('/shows');

    } catch (error) {
      alert(error.message);
    }

}