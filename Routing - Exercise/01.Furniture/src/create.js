import { html, render } from "./../node_modules/lit-html/lit-html.js";
import page from "//unpkg.com/page/page.mjs";

const baseUrl = `http://localhost:3030/data/catalog`;

const mainElement = document.querySelector('main');


export default function createPage() {
  render(createTemplate(), mainElement);
}

function createTemplate() {
  return html`
    <div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Create New Furniture</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form>
        <div class="row space-top">
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-make">Make</label>
                    <input class="form-control valid" id="new-make" type="text" name="make">
                </div>
                <div class="form-group has-success">
                    <label class="form-control-label" for="new-model">Model</label>
                    <input class="form-control is-valid" id="new-model" type="text" name="model">
                </div>
                <div class="form-group has-danger">
                    <label class="form-control-label" for="new-year">Year</label>
                    <input class="form-control is-invalid" id="new-year" type="number" name="year">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-description">Description</label>
                    <input class="form-control" id="new-description" type="text" name="description">
                </div>
            </div>
            <div class="col-md-4">
                <div class="form-group">
                    <label class="form-control-label" for="new-price">Price</label>
                    <input class="form-control" id="new-price" type="number" name="price">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-image">Image</label>
                    <input class="form-control" id="new-image" type="text" name="img">
                </div>
                <div class="form-group">
                    <label class="form-control-label" for="new-material">Material (optional)</label>
                    <input class="form-control" id="new-material" type="text" name="material">
                </div>
                <input type="submit" class="btn btn-primary" value="Create" />
            </div>
        </div>
    </form>
</div>
  `
}

function create(e) {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);

    const make =  formData.get("new-make");
    const model =  formData.get("new-model");
    const year =  formData.get("new-year");
    const description =  formData.get("new-description");
    const price =  formData.get("new-price");
    const image =  formData.get("new-image");
    const materials = formData.get("new-material");


  
    fetch(baseUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        make,
        model,
        year,
        description,
        price,
        image,
        materials
      }),
    })
      .then((res) => res.json())
      .then(() => {
  
        page.redirect("/");

      })
      .catch((err) => console.error(err.message));


  }