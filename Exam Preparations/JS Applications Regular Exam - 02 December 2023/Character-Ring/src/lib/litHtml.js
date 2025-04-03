import {render as baseRender, html } from "./../../node_modules/lit-html/lit-html.js";

const root = document.querySelector('main');

function render(template){
    baseRender(template, root);
}

export { render, html };