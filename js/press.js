// catagory api call section
const loadCatagories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category))
        .catch(error => console.log(error))
}
loadCatagories();

// catagory display section
const displayCatagories = catagories => {
    const navContainer = document.getElementById('nav-container');
    catagories.forEach(catagory => {
        const navLi = document.createElement('li');
        navLi.classList.add('nav-item')
        navLi.innerHTML = `
        <button onclick="loadNewsDetails('${catagory.category_id}')" class="btn btn-primary my-4">${catagory.category_name}</button>
        `;
        navContainer.appendChild(navLi);
    });
}


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
    try {
        const res = await fetch(url);
        const data = await res.json();
        displayNewsDetails(data.data);
    }
    catch (error) {
        console.log(error);
    }

}

// news details display section

const displayNewsDetails = elements => {
    // display no news found
    const noNews = document.getElementById('no-found-message');
    if (elements.length === 0) {
        noNews.classList.remove('d-none');
    }
    else {
        noNews.classList.add('d-none');
    }

    // items count
    const itemsShow = document.getElementById('items show');
    if (elements.length > 0) {
        itemsShow.innerText = `Search Result: ${elements.length} items found`;
    }

    else {
        itemsShow.innerText = 'No result found';
    }

    // display news
    const newsDisplayContainer = document.getElementById('news-display-container');
    newsDisplayContainer.innerHTML = '';
    elements.forEach(element => {
        const newsDiv = document.createElement('div');
        newsDiv.classList.add("mb-3");
        newsDiv.innerHTML = `
        <div class="row g-0 d-flex shadow mb-5 bg-body rounded">
        <div class="col-sm-2 col-md-4">
            <img src="${element.image_url}" class="img-fluid rounded-start" alt="...">
        </div>
                <div class="card-body col-md-8 col-sm-4 px-3">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">${element.details.slice(0, 250)}...</p>

                <div class="d-flex align-items-baseline justify-content-between">
                <div class="d-flex align-items-baseline justify-content-between" style = "width: 70%;">
                <p><img src="${element.author.img}" class="rounded-circle img-fluid" style = "width: 40px;" alt="...">
                ${element.author.name ? element.author.name : 'No data available'}</p>
                
                 <p> <i class="fa-regular fa-eye px-1"></i> ${element.total_view ? element.total_view : 'Not a single viewers'}</p> 
                               
                </div>

                <div>
                <button onclick="modalNewsDetails('${element._id}')" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#newsDetailModal">Show Details</button>
                </div>
                </div>
                </div>
                </div>
          `;
        newsDisplayContainer.appendChild(newsDiv);
    });

    // stop loader
    toggleSpinner(false);
}

// news detail modal
const modalNewsDetails = (id) => {
    const url = `https://openapi.programming-hero.com/api/news/${id}`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayModalDetails(data.data))
        .catch(error => console.log(error))
}

const displayModalDetails = (news) => {
    const modalTitle = document.getElementById('newsDetailModalLabel');
    modalTitle.innerText = news[0].title;
    const modalDetails = document.getElementById('modal-details');
    modalDetails.innerHTML = `
    <p>published date: ${news[0].author.published_date ? news[0].author.published_date : 'no data found'}</p>
    <p class= "text-success">User view: ${news[0].total_view ? news[0].total_view : 'no user view'}</p>
    <p class= "text-success">User Rating: ${news[0].rating ? news[0].rating.number : 'did not get user feedback'}</p>
    `;
}
























