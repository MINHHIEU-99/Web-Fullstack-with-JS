'use strict';

const searchBtn = document.getElementById('btn-submit');
const newsContainer = document.getElementById('news-container');
const qInput = document.getElementById('input-query');
const prevBtn = document.getElementById('btn-prev');
const nextBtn = document.getElementById('btn-next');
const pageNum = document.getElementById('page-num');
const pageNav = document.getElementById('nav-page-num');

const apiKey = '445e0c7967ac4ebb82ef54528388a7f0';

const init = function () {
    pageNav.style.display = 'none';
};

// Change state of button when num of page has changed
function changeBtn(curPage, totalResult, pageSize) {
    if (curPage === 1) {
        prevBtn.style.display = 'none';
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
    getSearchResults(queryInput, curPage, pageSize);
};

const nextPage = function () {
    curPage += 1;
    pageNum.textContent = curPage;
    getSearchResults(queryInput, curPage, pageSize);
};

// Render search results in one page
const renderSearchResults = function (img_path, title, content, url) {
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

// get search results through API
async function getSearchResults(keyword, page, pageSize) {
    try {
        const resSearchResults = await fetch(
            `https://newsapi.org/v2/everything?q=${keyword}&&page=${page}&pageSize=${pageSize}&apiKey=445e0c7967ac4ebb82ef54528388a7f0`
        );
        if (!resSearchResults.ok) throw new Error('Problem with getting results');

        const data = await resSearchResults.json();
        // console.log(data, data.articles, data.totalResults);

        newsContainer.innerHTML = '';
        changeBtn(page, data.totalResults, pageSize);
        data.articles.forEach(e => {
            renderSearchResults(e.urlToImage, e.title, e.description, e.url);
        });
    } catch (err) {
        console.error(err.message);
    }
}

///////////////////////////////

let curPage = parseInt(pageNum.textContent);
let pageSize = 10;

let queryInput;

searchBtn.addEventListener('click', function () {
    queryInput = qInput.value;
    function validateQuery () {
        if (queryInput == '') {
            alert('You have not entered a keyword');
            return false;
        } else return true;
    }
    if(validateQuery()) {
        getSearchResults(queryInput, curPage, pageSize);
        pageNav.style.display = 'block';
    };

});

init();
prevBtn.addEventListener('click', prevPage);
nextBtn.addEventListener('click', nextPage);
