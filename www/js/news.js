// Page init event
document.addEventListener('init', function(event) {
    
    var page = event.target;
    
    if (page.matches('#content2')) {
        $.getJSON("https://news.penmark.jp/wp-json/wp/v2/posts?_embed&tags=40",function(data) {
            $(function() {
                for (var i=0; i<data.length; i++) {
                    
                    $('.pickupPosts').append("<div class='post' data-id='"+data[i].id+"'><img alt='' style='width:100%;' src="+data[i]['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['full']['source_url']+">");
                    $('.pickupPosts').append('<li data-id="'+data[i].id+'">'+data[i].title.rendered+'</a></li></div>');
                }
            });
        })
        $.getJSON("https://news.penmark.jp/wp-json/wp/v2/posts?_embed",function(data) {
            $(function() {
                for (var i=0; i<data.length; i++) {
                    $('.newPosts').append("<div class='post' data-id='"+data[i].id+"'><img alt='' style='width:50%;' src="+data[i]['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['full']['source_url']+">");
                    $('.newPosts').append('<li>'+data[i].title.rendered+'</a></li></div>');
                }
            });
        })
        $(document).on("click", ".post", function () {
            articleId = $(this).data("id");//記事のidをグローバル変数に
            document.querySelector('#navigator').pushPage('content2-1.html');
        });
    } else if (page.matches('#content2-1')) {
        $.getJSON("https://news.penmark.jp/wp-json/wp/v2/posts/"+articleId+"/?_embed",function(data) {
            $(function() {
                $('.articleContent').append("<img alt='' style='width:100%;' src="+data['_embedded']['wp:featuredmedia'][0]['media_details']['sizes']['full']['source_url']+">");
                $('.articleContent').append(data.content.rendered);
            });
        })
    };
});

$(document).on('click', 'a', function(event){
    event.preventDefault();
    window.open(event.target.href,"_blank");
});