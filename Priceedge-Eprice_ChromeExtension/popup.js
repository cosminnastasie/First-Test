console.log('Popup js loaded');

let message = {
    "getId": true
};
let params = {
    active: true,
    currentWindow: true
}

var query = { active: true, currentWindow: true };
chrome.tabs.query(query,function (tabs) {
    currentTab = tabs[0]; // there will be only one in this array  
    url =  currentTab['url']         
    console.log(url);
})


// 1. When Popup is called it send the message to content to get the product Id
chrome.tabs.query(params, function(tabs){
    chrome.tabs.sendMessage( tabs[0].id, message);
    console.log('Popup sended message');
})


// 3. Content send product Id to popup which sets call priceedge into iframe and set Id on src
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('Message received');
    productId = message['data'].productId;
    if(message['data'].productId != undefined){
        src = 'http://localhost/Blueberry/rdPage.aspx?rdReport=Setup.ChromeCompetitorPrices' + '&productId=' + productId
        // src = 'https://eprice.priceedge.eu/rdPage.aspx?rdReport=Setup.ChromeCompetitorPrices' + '&productId=' + productId
        
        $('body').append('<iframe src=' + src + ' id="privateIframe"></iframe>');
    }
});


$(document).ready(function(){
    $('#showGraph').on('click', function(){
        console.log('Show graph');
        var query = { active: true, currentWindow: true };
        // chrome.tabs.query(query,function (tabs) {
        //     var currentTab = tabs[0]; // there will be only one in this array            
            console.log(currentTab);
            // Create Graphic popup
        chrome.windows.create(
            // {url: "https://eprice.priceedge.eu/rdPage.aspx?rdReport=Home.Timeline&itemNumberTimeline=" + productId + '#callChangelogCharts', type: "normal", width: 1100, height: 606, left: 20, top: 400}
            {url: "https://eprice.priceedge.eu/rdPage.aspx?rdReport=Home.Timeline&itemNumberTimeline=" + productId + '#callChangelogCharts', type: "popup", width: 1100, height: 606, left: 20, top: 400}
        );
        // });
        
    });
})










