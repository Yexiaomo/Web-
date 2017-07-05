$(document).ready(function() {
  function getArticles( useQuery ) {
    var wikiApiUrl = 'https://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch='
                      + useQuery + '&callback=?';
    $.getJSON(wikiApiUrl, function(articles) {
      renderArticlesMarkup(articles);
    });
  }

  function renderArticlesMarkup(articles) {
    var articlesMarkup = '';
    if (articles.query === undefined) {
      articlesMarkup += '<dic class="error">Nothing found. Try another query</div>';
    } else {
      var pages = articles.query.pages;
      for (var property in pages) {
        if ( pages.hasOwnProperty(property) ) {
          articlesMarkup += '<div class="article">'
                              +'<a href="https://en.wikipedia.org/wiki/'+ pages[property].title +'" target="_blank">'
                                +'<h2>'+pages[property].title+'</h2>'
                                +'<div class="snippet">';
          if (pages[property].thumbnail !== undefined) {
                 articlesMarkup += '<img src="' + pages[property].thumbnail.source + '">';
          }

                 articlesMarkup += '<p>' +pages[property].extract +'</p>'
                                +'</div>'
                              +'</a>'
                            +'</div>';
        }
      }

     $('.wrap').css('margin-top', '20px');
    }

    $('.result').html(articlesMarkup);
  }
  
  
  $('#search').on('click', function() {
    getArticles( $('#query').val() );
  });

  $('#query').keydown(function(e) {
    e = e || window.event;
    if ( e.which == 13 ) {
      getArticles( $('#query').val() );
    }
  });

});