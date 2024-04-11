'use strict';

const newsContainer = document.getElementById('news-container');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');

let userArr = JSON.parse(getFromStorage('USER_ARRAY', '[]'));
let userNameArr = JSON.parse(getFromStorage('USER_NAME', '[]'));
let currentUser = getFromStorage('CURRENT_USER');

const apiKey = '445e0c7967ac4ebb82ef54528388a7f0';
let curPage = parseInt(pageNum.textContent);
let pageSize;
let category;

if (currentUser != undefined) {
    currentUser = JSON.parse(currentUser);
    pageSize = currentUser.newsPerPage;
    category = currentUser.newsCategory;
} else {
    pageSize = 5;
    category = 'science';
}


const init = function () {
    getNews('us', category, curPage, pageSize);
};

// Change state of button when num of page has changed
function changeBtn(curPage, totalResult, pageSize) {
    if (curPage === 1) {
        prevBtn.style.display = 'none';
        // console.log(1);
        return;
    }
    if (curPage >= totalResult / pageSize) {
        nextBtn.style.display = 'none';
        return;
    } else {
        console.log(curPage);
        prevBtn.style.display = 'block';
        nextBtn.style.display = 'block';
    }
}

// Go to next or previous page
const prevPage = function () {
    curPage -= 1;
    pageNum.textContent = curPage;
    getNews('us', category, curPage, pageSize);
};

const nextPage = function () {
    curPage += 1;
    pageNum.textContent = curPage;
    // changeBtn(curPage, 36, 5);
    getNews('us', category, curPage, pageSize);
};

// Render news in one page
const renderNews = function (img_path, title, content, url) {
    const html = `
        <div class="card flex-row flex-wrap">
            <div class="card mb-3" style="">
                <div class="row no-gutters">
                    <div class="col-md-4">
                        <img src="${img_path}"
                            class="card-img"
                            alt="${title}">
                    </div>
                    <div class="col-md-8">
                        <div class="card-body">
                            <h5 class="card-title">${title}</h5>
                            <p class="card-text">${content}</p>
                            <a href="${url}"
                                class="btn btn-primary">View</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
    newsContainer.insertAdjacentHTML('beforeend', html);
};

// get news through API
async function getNews(country, category, page, pageSize) {
    try {
        const resNews = await fetch(
            `https://newsapi.org/v2/top-headlines?country=${country}&category=${category}&page=${page}&pageSize=${pageSize}&apiKey=445e0c7967ac4ebb82ef54528388a7f0`
        );
        if (!resNews.ok) throw new Error('Problem with getting news');

        const data = await resNews.json();
        console.log(data.articles, data.totalResults);

        newsContainer.innerHTML = '';
        await changeBtn(page, data.totalResults, pageSize);
        data.articles.forEach(e => {
            renderNews(e.urlToImage, e.title, e.description, e.url);
        });
    } catch (err) {
        console.error(err.message);
    }
}

///////////////////////////////
init();
prevBtn.addEventListener('click', prevPage);
nextBtn.addEventListener('click', nextPage);
