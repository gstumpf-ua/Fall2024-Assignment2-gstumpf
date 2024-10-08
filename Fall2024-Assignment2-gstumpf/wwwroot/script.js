function apiSearch() {
    var params = {
        'q': $('#query').val(),
        'count': 50,
        'offset': 0,
        'mkt': 'en-us'
    };

    $.ajax({
        url: 'https://api.bing.microsoft.com/v7.0/search?' + $.param(params),
        type: 'GET',
        headers: {
            'Ocp-Apim-Subscription-Key': '2af320e8e947424ea23a345116925531'
        }
    })
        .done(function (data) {
            var len = data.webPages.value.length;
            var results = '';
            for (i = 0; i < len; i++) {
                results += `<p><a href="${data.webPages.value[i].url}">${data.webPages.value[i].name}</a>: ${data.webPages.value[i].snippet}</p>`;
            }

            $('#searchResults').html(results);
            $('#searchResults').css('visibility', 'visible').dialog();
        })
        .fail(function () {
            alert('error');
        });
}
function showTime() {

    var now = new Date();
    var hours = now.getHours().toString().padStart(2, '0');
    var minutes = now.getMinutes().toString().padStart(2, '0');
    var timeString = hours + ':' + minutes;
    console.log(timeString);

    $('#time').html('<p>' + timeString + '</p>');


    $('#time').css('visibility', 'visible').dialog({
        modal: true,
        title: 'Current Time',
        width: 300,
        show: { effect: 'fade', duration: 800 },  
        hide: { effect: 'fade', duration: 800 }   
    });
}
function changeBackground() {
    var currentBackground = $('body').css('background-image');
    var image1 = 'url(Background1.jpg)';  
    var image2 = 'url(Background2.jpg)';  

    if (currentBackground.includes('Background1.jpg')) {
        $('body').css('background-image', image2);
    } else {
        $('body').css('background-image', image1);
    }
}

$(document).ready(function () {
    
    $('#searchBtn').click(apiSearch);

    
    $('#timeBtn').click(showTime);

    
    $('#siteName').click(changeBackground);
});