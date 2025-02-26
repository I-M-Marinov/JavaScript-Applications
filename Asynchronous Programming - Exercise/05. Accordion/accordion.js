async function solution() {
    const response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    const articlesList = await response.json();

    const mainSectionElement = document.getElementById('main');

    for (let i = 0; i < articlesList.length; i++) {

        const divAccordionElement = document.createElement('div');
        divAccordionElement.setAttribute('class', 'accordion');

        const divHeadElement = document.createElement('div');
        divHeadElement.setAttribute('class', 'head');

        const spanTitleElement = document.createElement('span');

        const moreButtonElement = document.createElement('button');
        moreButtonElement.setAttribute('class', 'button');
        moreButtonElement.textContent = 'More';

        const pInfoElement = document.createElement('p');

        moreButtonElement.addEventListener('click', async () => {

            if (pInfoElement.textContent === '') {
                const detailsResponse = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${_id}`);
                const detailsData = await detailsResponse.json();
                pInfoElement.textContent = detailsData.content;
            }

            divExtraElement.style.display = divExtraElement.style.display === 'none' ? 'block' : 'none';
            moreButtonElement.textContent = divExtraElement.style.display === 'none' ? 'More' : 'Less';
        });

        const divExtraElement = document.createElement('div');
        divExtraElement.setAttribute('class', 'extra');
        divExtraElement.style.display = 'none'; 

        const {_id, title} = articlesList[i];
        
        spanTitleElement.textContent = title;
        moreButtonElement.setAttribute('id', _id);

        divHeadElement.appendChild(spanTitleElement);
        divHeadElement.appendChild(moreButtonElement);

        divExtraElement.appendChild(pInfoElement);

        divAccordionElement.appendChild(divHeadElement);
        divAccordionElement.appendChild(divExtraElement);
        
        mainSectionElement.appendChild(divAccordionElement);
        
    }

}

solution();