import {render as baseRender, html } from "lit-html";

const root = document.querySelector('main');

function render(template){
    baseRender(template, root);
}

export { render, html };