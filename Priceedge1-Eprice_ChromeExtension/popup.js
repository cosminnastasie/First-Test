// ###################### Popup Settings

console.log('Popup js loaded');

let domains = [
    'https://www.eprice.it/',
    'https://monclick.it/',
    'https://www.yeppon.it/',
    'https://www.amazon.it',
    'https://www.onlinestore.it/',
    'https://www.mediaworld.it/',
    'https://www.unieuro.it/',
    'https://www.euronics.it/',
    'https://www.trony.it/online',
    'https://www.expertonline.it/'
]

let blackUrlsList = [
    'https://www.eprice.it/s/',
    'https://www.eprice.it/prodotti/'
]

// ################### end Chrome settings

let params = {
    active: true,
    currentWindow: true
}

function checkUrl(url){
    let allowed = false;

    // 1. check domains
    for (var u of domains){
            if(url.indexOf(u) != -1 && url != u){
                allowed = true;
            }     
    }

    if (allowed){
        for (var i of blackUrlsList){
            if (url.indexOf(i) != -1){
                allowed = false;
                break;
            }
        }
    }

    return (allowed);
}

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

// Check if looged in

$.ajax({
    method: 'POST',
    url: 'https://eprice.priceedge.eu/rdTemplate/rdData.aspx?rdData=System&rdDataID=GetUserSetting'
}).done(function(data){

    if (IsJsonString(data)){
        
        // 1. When Popup is called it checks if the url is inside an allowed domain -> send the message to content to get the product Id or competitor Number

        //Get tab info; check if it's on a tracked page
        var query = { active: true, currentWindow: true };
        chrome.tabs.query(query,function (tabs) {
            currentTab = tabs[0]; // there will be only one in this array  
            url =  currentTab['url']         
            if (checkUrl(url)){
                var message = {
                    "getId": true
                };
                chrome.tabs.query(params, function(tabs){
                    chrome.tabs.sendMessage( tabs[0].id, message);
                    console.log('Popup sended message');
                })
            }else{
                $('#notTracking').removeClass('hide');
                $('#waitPanel').hide();
            }
        })
    }else{
        console.log('User is Logged Out');
        $('#waitPanel').addClass('hide');
        $('#login').removeClass('hide');
    }
})



// 2. Content send product Id to popup which sets call priceedge into iframe and set Id on src

chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('Message received');
    if (message['data']){
        productId = message['data'].productId;
    }
    var type = message['data'].type;
    var competitor = message['data'].competitor;
    if(message['data'].productId != undefined){
        productId = encodeURIComponent(productId)
        src = 'https://eprice.priceedge.eu/rdPage.aspx?rdReport=Setup.ChromeCompetitorPrices' + '&productId=' + productId + '&type=' + type + '&competitor=' + competitor;
        $('body').append('<iframe src=' + src + ' id="privateIframe"></iframe>');
        $('#showGraph').removeClass('hide');
    }else{
        $('#notTracking').html('<img src="images/icecream-error.png" class="error-img"><span>Product id not found on page. Please reload the page or try another product!</span>').removeClass("hide");
        $('#waitPanel').hide();
    }
});




// 3. Show graphic (Timeline view)
$(document).ready(function(){

    $('#showGraph').on('click', function(){
        console.log('Show graph');
        var query = { active: true, currentWindow: true };
                  
        // Create Graphic popup
        chrome.windows.create(
            {url: "https://eprice.priceedge.eu/rdPage.aspx?rdReport=Home.Timeline&itemNumberTimeline=" + productId + '#callChangelogCharts', type: "popup", width: 1100, height: 606, left: 20, top: 400}
        );        
    });
})










