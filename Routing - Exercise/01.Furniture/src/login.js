import { html, render } from "./../node_modules/lit-html/lit-html.js";
import page from "//unpkg.com/page/page.mjs";

const baseUrl = `http://localhost:3030/users`;

const mainElement = document.querySelector('main');


export default function loginPage() {
  render(loginTemplate(), mainElement);
}

function loginTemplate() {
  return html`
    <div class="container">
    <div class="row space-top">
        <div class="col-md-12">
            <h1>Login User</h1>
            <p>Please fill all fields.</p>
        </div>
    </div>
    <form @submit=${loginUser}>
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
                <input type="submit" class="btn btn-primary" value="Login" />
            </div>
        </div>
    </form>
</div>
  `
}


function loginUser(e) {
    e.preventDefault();
  
    const formData = new FormData(e.currentTarget);
  
    fetch(`${baseUrl}/login`, {
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

      if (!data.accessToken) {
        throw new Error("Invalid login credentials");
    }

    sessionStorage.setItem("accessToken", data.accessToken);
    sessionStorage.setItem("userId", data._id);
    sessionStorage.setItem("email", data.email);

    alert("Login successful!");
    
    page.redirect("/");
    })
    .catch((err) => console.error(err.message));
  }