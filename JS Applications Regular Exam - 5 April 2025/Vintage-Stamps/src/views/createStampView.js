import { html, render  } from '../lib/litHtml.js';
import page  from "page";

import { addStamp } from '../services/stampsService.js';
import { allFieldsAreRequired } from '../util/constants.js';

const template = (onSubmit) => html
`
<section id="create">
        <div class="form">
          <h2>Add Post Stamp</h2>
          <form class="create-form" @submit=${onSubmit}>
            <input type="text" name="name-input" id="name-input" placeholder="Stamp Name" />
            <input type="text" name="image-url-input" id="image-url-input" placeholder="Image URL" />
            <input type="number" id="year-input" name="year-input" placeholder="year" />
            <textarea id="more-info-textarea" name="more-info-textarea" placeholder="More Info" rows="8" cols="10"></textarea>
            <button type="submit">Add Stamp</button>
          </form>
        </div>
      </section>
`;

export function addStampView(){

    render(template(addStampHandler));
}

async function addStampHandler(e){
    e.preventDefault();

    try {

      const formData = new FormData(e.currentTarget);
      const { ["name-input"]: name, ["image-url-input"]: imageUrl, ["year-input"]: year, ["more-info-textarea"]: learnMore } = Object.fromEntries(formData);


    if(!name || !imageUrl || !year || !learnMore){
        return alert(allFieldsAreRequired);
    }

    const data = {name, imageUrl, year, learnMore};
    
    await addStamp(data);
    
    page.redirect('/collection');

    } catch (error) {
      alert(error.message);
    }

}