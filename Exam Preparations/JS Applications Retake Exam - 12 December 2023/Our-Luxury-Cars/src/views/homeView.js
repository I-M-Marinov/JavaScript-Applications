import { html, render  } from '../lib/litHtml.js';

const template = () => html`
    <section id="hero">
        <h1>
        Accelerate Your Passion Unleash the Thrill of Sport Cars Together!
        </h1>
    </section>
    `;

export function homeView(){
    render(template());
}