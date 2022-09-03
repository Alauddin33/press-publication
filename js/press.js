const loadCatagories = () => {
    const url = `https://openapi.programming-hero.com/api/news/categories`;
    fetch(url)
        .then(res => res.json())
        .then(data => displayCatagories(data.data.news_category))
        .catch(error => console.log(error))

}
const displayCatagories = catagories => {

    const navContainer = document.getElementById('nav-container');
    catagories.forEach(catagory => {
        console.log(catagory);
        const navLi = document.createElement('li');
        navLi.classList.add('nav-item');
        navLi.innerHTML = `
        <a class="nav-link" href="#">${catagory.category_name}</a>
        `;
        navContainer.appendChild(navLi);
    });
}

loadCatagories();






