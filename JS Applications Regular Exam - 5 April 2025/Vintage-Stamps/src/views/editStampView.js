import page  from "page";
import { html, render  } from '../lib/litHtml.js';

import { getStampById, editStamp } from '../services/stampsService.js';
import { allFieldsAreRequired } from '../util/constants.js';


const template = (stamp, onSubmit) => html
`
<section id="edit">
        <div class="form">
          <h2>Edit Post Stamp</h2>
          <form class="edit-form" @submit=${onSubmit}>
            <input type="text" name="name-input" id="name" placeholder="Stamp Name" .value=${stamp.name} />
            <input type="text" name="image-url-input" id="image-url" placeholder="Image URL" .value=${stamp.imageUrl} />
            <input type="number" id="year-input" name="year-input" placeholder="Year" .value=${stamp.year} />
            <textarea id="more-info" name="more-info-textarea" placeholder="More Info" rows="8" cols="10" .value=${stamp.learnMore} ></textarea>
            <button type="submit">Edit</button>
          </form>
        </div>
      </section>
`;

export async function editStampView(context){

    const { id } = context.params;

    const stamp = await getStampById(id);
    
    render(template(stamp, (e) => stampEditHandler(e, id)));
}

async function stampEditHandler(e, id){
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const name = formData.get('name-input');
    const imageUrl = formData.get('image-url-input');
    const year = formData.get('year-input');
    const learnMore = formData.get('more-info-textarea');

    
    if(!name || !imageUrl || !year || !learnMore){
        return alert(allFieldsAreRequired);
    }

    await editStamp(id, {name, imageUrl, year, learnMore});
    
    page.redirect(`/collection/${id}`);

}