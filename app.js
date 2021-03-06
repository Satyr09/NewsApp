const main = document.querySelector('main');
const sourceSelector = document.querySelector('#sourceSelector');
const defaultSource = 'the-washington-post';

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () =>
    navigator.serviceWorker.register('sw.js')
      .then(registration => console.log('Service Worker registered'))
      .catch(err => 'SW registration failed'));
}

window.addEventListener('load', e =>{
  updateNews();
  console.log('app file');
  updateSources();
  sourceSelector.value = defaultSource;

  sourceSelector.addEventListener('change', e=>{
    updateNews(e.target.value);
  })

});

async function updateSources(){


  const res = await fetch(`https://newsapi.org/v2/sources?apiKey=a955ea5818964bf6b533628ccad8572a
`);
  const json = await res.json();
  sourceSelector.innerHTML = json.sources.map(src => `<option value = "${src.id}">${src.name}</option>`).join('\n');
  console.log(json);
}

async function updateNews(source = defaultSource){
    const res= await fetch(`https://newsapi.org/v2/top-headlines?sources=${source}&apiKey=a955ea5818964bf6b533628ccad8572a`);
    const json = await res.json();
    main.innerHTML = json.articles.map(createArticle).join('\n');

};

function createArticle(article){
  return `
    <div class="article">
        <a href="${article.url}">
            <h2>${article.title}</h2>
            <img src="${article.urlToImage}">
              <p>${article.description}</p>
    </a>
  </div>
  `;


}
