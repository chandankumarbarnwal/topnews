let apiKey = '081c5851471d3a70ff33b5759d0cd13f';

let newsAccordion = document.getElementById('newsAccordion');

let token = '081c5851471d3a70ff33b5759d0cd13f';

var lang = 'en';

setlanguage = function(link) {
  var a_text = link.innerText || link.textContent;

  let str = a_text;
  let myArr = str.split("-");
  lang = myArr[1]; 
  
    if (a_text == 'Lang-hi') {
        link.innerText='Lang-en'
    }

    if (a_text == 'Lang-en') {
        link.innerText='Lang-hi'
    }

    getData (lang)
}

getsearchdata = function(){

    let searchData = document.getElementById('search').value;

    getData (lang, searchData)
}


function getData (lang='en', q='', country='in'){

    fetch(`https://gnews.io/api/v4/top-headlines?lang=${lang}&country=${country}&q=${q}&token=${token}`)
    .then(function (response) {

        return response.json();
    })
    .then(function (articles) {

        let newsHtml = "";

        articles.articles.forEach(function(element, index) {
        
            let news = `<div class="card">
                            <div class="card-header" id="heading${index}">
                                <h2 class="mb-0">
                                
                                <button class="btn btn-link collapsed" type="button" data-toggle="collapse" data-target="#collapse${index}"
                                    aria-expanded="false" aria-controls="collapse${index}">
                                <b>Breaking News ${index+1}:</b> ${element["title"]}

                                </button>

                                </h2>`;

                                if (index%2 == 0) {
                                    news += `<img src="${element['image']}" alt="image"  width="300" height="300">`;
                                } else {
                                    news += `<img src="${element['image']}" align='right' alt="image"  width="300" height="300">`;
                                }

                            news += `</div>

                            <div id="collapse${index}" class="collapse" aria-labelledby="heading${index}" data-parent="#newsAccordion">
                                <div class="card-body"> ${element["content"]}. <a href="${element['url']}" target="_blank" >Read more here</a>  </div>
                            </div>
                        </div>`;
            newsHtml += news;
    });
    newsAccordion.innerHTML = newsHtml;
    });
}

getData();