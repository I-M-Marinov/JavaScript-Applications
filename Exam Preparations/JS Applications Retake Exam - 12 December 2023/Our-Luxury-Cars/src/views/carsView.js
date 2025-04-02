import { html, render  } from '../lib/litHtml.js';
import { getAllCars } from '../services/carService.js';

const template = (cars) =>html`<h3 class="heading">Our Cars</h3>
        <section id="dashboard">
        ${cars?.length
          ? cars.map((car) =>
                html`<div class="car">
            <img src="${car.imageUrl}" alt="example1" />
            <h3 class="model">${car.model}</h3>
            <div class="specs">
              <p class="price">Price: €${car.price}</p>
              <p class="weight">Weight: ${car.weight} kg</p>
              <p class="top-speed">Top Speed: ${car.speed} kph</p>
            </div>
            <a class="details-btn" href="/cars/${car._id}">More Info</a>
          </div>
        </section>`)
        : html`<h3 class="nothing">Nothing to see yet</h3>`}`;


export async function carsView() {
  const cars = await getAllCars();

  render(template(cars));
};