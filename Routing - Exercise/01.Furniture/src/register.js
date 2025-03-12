import { html, render } from "./../node_modules/lit-html/lit-html.js";
import page from "//unpkg.com/page/page.mjs";

const baseUrl = `http://localhost:3030/users`;

const mainElement = document.querySelector('main');



export default function registerPage() {
  render(registerTemplate(), mainElement);
}

function registerTemplate() {
  return html`
    <div class="container">
        <div class="row space-top">
            <div class="col-md-12">
                <h1>Register New User</h1>
                <p>Please fill all fields.</p>
            </div>
        </div>
        <form @submit=${registerUser}>
            <div class="row space-top">
                <div class="col-md-4">
                    <div class="form-group">
                        <label class="form-control-label" for="email">Email</label>
                        <input class="form-control" id="email" type="text" name="email">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="password">Password</label>
                        <input class="form-control" id="password" type="password" name="password">
                    </div>
                    <div class="form-group">
                        <label class="form-control-label" for="rePass">Repeat</label>
                        <input class="form-control" id="rePass" type="password" name="rePass">
                    </div>
                    <input type="submit" class="btn btn-primary" value="Register" />
                </div>
            </div>
        </form>
    </div>
  `
}


function registerUser(e) {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);

    console.log(formData.email);
    console.log(formData.password);
    
  
    fetch(`${baseUrl}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: formData.get("email"),
        password: formData.get("password"),
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("email", data.email);
        localStorage.setItem("_id", data._id);
  
        page.redirect("/");

      })
      .catch((err) => console.error(err.message));
  }