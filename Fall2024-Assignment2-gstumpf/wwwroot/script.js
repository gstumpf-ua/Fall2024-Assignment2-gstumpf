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

function luckySearch() {
    var params = {
        'q': $('#query').val(),
        'count': 1, 
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
            if (data.webPages && data.webPages.value.length > 0) {
                // Redirect to the first result's URL
                window.location.href = data.webPages.value[0].url;
            } else {
                alert('No results found.');
            }
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

var currentBackgroundIndex = 0;
var lightSet = ['Background2.jpg', 'Background3.jpg'];  
var darkSet = ['Background1.jpg', 'Background4.jpg']; 
var isAlternate = false;  
var imageCycleInterval;  

function cycleBackground(images) {
    currentBackgroundIndex = (currentBackgroundIndex + 1) % images.length;
    $('body').css('background-image', 'url(' + images[currentBackgroundIndex] + ')');
}

function startImageCycle(images) {
    clearInterval(imageCycleInterval);  
    imageCycleInterval = setInterval(function () {
        cycleBackground(images);
    }, 10000);  
}

function changeImageSet() {
    if (isAlternate) {
        $('body').css('background-image', 'url(' + lightSet[currentBackgroundIndex] + ')');
        startImageCycle(lightSet);  
    } else {
        $('body').css('background-image', 'url(' + darkSet[currentBackgroundIndex] + ')');
        startImageCycle(darkSet);  
    }
    isAlternate = !isAlternate;  
}

$(document).ready(function () {
    startImageCycle(lightSet);
    $('#searchBtn').click(apiSearch);
    $('#luckyBtn').click(luckySearch);
    $('#timeBtn').click(showTime);
    $('#siteName').click(changeImageSet);
});
