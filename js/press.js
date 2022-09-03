// catagory api call section
const loadCatagories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category))
        .catch(error => console.log(error))

}

// catagory display section
const displayCatagories = catagories => {

    const navContainer = document.getElementById('nav-container');
    catagories.forEach(catagory => {
        // console.log(catagory);
        const navLi = document.createElement('li');
        navLi.classList.add('nav-item')
        navLi.innerHTML = `
        <button onclick="loadNewsDetails('${catagory.category_id}')" class="btn btn-primary my-4">${catagory.category_name}</button>
        `;
        navContainer.appendChild(navLi);
    });

}


loadCatagories();

const toggleSpinner = isLoading => {
    const loaderSection = document.getElementById('loader');
    if (isLoading) {
        loaderSection.classList.remove('d-none');
    }
    else {
        loaderSection.classList.add('d-none');
    }
}




// news details api call section
const loadNewsDetails = async (id) => {
    // start loader
    toggleSpinner(true);

    const url = `https://openapi.programming-hero.com/api/news/category/${id}`;
    const res = await fetch(url);
    const data = await res.json();
    displayNewsDetails(data.data);
}


// news details display section

const displayNewsDetails = elements => {
    console.log(elements);
    // display no news found
    const noNews = document.getElementById('no-found-message');
    if (elements.length === 0) {
        noNews.classList.remove('d-none');
    }
    else {
        noNews.classList.add('d-none');
    }
    // display news
    const newsDisplayContainer = document.getElementById('news-display-container');
    newsDisplayContainer.innerHTML = '';
    elements.forEach(element => {
        // console.log(element);

        const newsDiv = document.createElement('div');
        newsDiv.classList.add("mb-3");
        newsDiv.innerHTML = `
        <div class="row g-0 d-flex shadow mb-5 bg-body rounded">
        <div class="col-md-4">
            <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
        
            <div class="card-body col-md-8 px-3">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.details.slice(0, 250)}...</p>
                <div class="d-flex align-items-baseline justify-content-between" style = "width: 40%;">
                <p><img src="${element.author.img}" class="rounded-circle img-fluid" style = "width: 40px;" alt="...">
                ${element.author.name}</p>
                <p> <i class="fa-regular fa-eye px-1"></i> ${element.total_view}</p> 
                </div>

            </div>
        
        </div>
          `;
        newsDisplayContainer.appendChild(newsDiv);
    });

    // stop loader
    toggleSpinner(false);
}















