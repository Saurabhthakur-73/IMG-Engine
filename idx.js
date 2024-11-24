const acceskey = "iP33_3tzbRCM8n_fV4fu4RRNcsx34bRJfOitXCfyMKo"
const searchform = document.getElementById("serach-form")
const searchbox = document.getElementById("search-box")
const searchresult = document.getElementById("serach-result")
const showMore = document.getElementById("show-more")

let keyword = ''
let page = 1;

async function searchImg() {
    keyword = searchbox.value ;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${acceskey}&per_page=12`;

    const response = await fetch(url);
    const data =  await response.json();
    if (page === 1) {
        searchresult.innerHTML = ""
    }

    const results = data.results;
    results.map((result)=>{
        const image = document.createElement('img');
        image.src = result.urls.small;
        const imgLink = document.createElement('a');
        imgLink.href  = result.links.html;
        imgLink.target = '_blank'

        imgLink.appendChild(image);
        searchresult.appendChild(imgLink);
    })
    showMore.style.display = 'block'
    showMore.addEventListener('click', ()=>{
        page++;
        searchImg();
    })
}

searchform.addEventListener("submit", (e)=>{
    e.preventDefault();
    page = 1;
    searchImg();
})

let lastScrollY = window.scrollY;
const nav = document.querySelector('nav');

window.addEventListener('scroll', () => {
  if (window.scrollY > lastScrollY) {
    // Scrolling down: hide the navbar
    nav.style.top = '-60px'; // Adjust height to move out of view
  } else {
    // Scrolling up: show the navbar
    nav.style.top = '0';
  }
  lastScrollY = window.scrollY;
});