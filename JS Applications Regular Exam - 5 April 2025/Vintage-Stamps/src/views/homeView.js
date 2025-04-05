import { html, render  } from '../lib/litHtml.js';

const template = () => html`
  <section id="home">
      <h1>
        Explore a world of rare and historic vintage stamps, where collectors connect to exchange knowledge and unique
        finds. Preserve the art of philately while discovering hidden gems from different eras and regions.
      </h1>
      <img id="home-img" src="./images/logo.webp" alt="home-img" />
  </section>
`;

export function homeView(){
    render(template());
}