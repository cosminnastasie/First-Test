console.log('Content.js loaded');

console.log(window.location.host);
if (window.location.host == 'www.eprice.it'){
    productId = $('meta[itemprop=mpn]').attr('content');
    console.log(productId);

    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
        
        
        console.log(message);

        // 2. - When popup is opened it sends message with parameters getId=true
        //    - content finds the id and send it back to popup
        if (message['getId']){
            chrome.runtime.sendMessage({
                data: {
                    "productId": productId,
                }
            }, function (response) {
                console.log('Id send back: ' + productId);
                
            });
        }
    })
}else if(window.location.host == 'monclick.it'){
    console.log('Monclick');
    priceCompare();


}

function priceCompare(){

    numbers = []
    $('.mk-productListingTitle h5 a').each(function(){
        numbers.push($(this).attr('data-product-code'));
    });
    
    console.log(numbers);
    items = [
        {'number': 'MPXQ2T/A', 'price': 300, 'diffPerc': 1.2},
        {'number': 'MK_000000117274', 'price': 900, 'diffPerc': 2.3},
        {'number': 'MK_000000096527', 'price': 819.9, 'diffPerc': 0.0}
    ]

    for ( var i = 0; i< items.length; i++){
        number = items[i]['number']
        e_Price = items[i]['price']
        diffPerc = items[i]['diffPerc']

        $('.mk-productListingTitle h5 a').each(function(){
            c_Price = $(this).attr('data-product-price')
            c_number = $(this).attr('data-product-code');

            if (number == c_number ){
                if (parseFloat(c_Price) > e_Price){
                    $(this).closest('.mk-productListingBox').find('.mk-productListingImage img').addClass('price_success').before('<span class="price_badge"><span class="success_badge">+' + diffPerc + '%</span></span>');
                }else if(c_Price == e_Price){
                    $(this).closest('.mk-productListingBox').find('.mk-productListingImage img').addClass('price_info').before('<span class="price_badge"><span class="info_badge">' + diffPerc + '%</span></span>');
                }else if(c_Price < e_Price){
                    $(this).closest('.mk-productListingBox').find('.mk-productListingImage img').addClass('price_allert').before('<span class="price_badge"><span class="allert_badge">- ' + diffPerc + '%</span></span>');
                }
            }
        });
    }
    
  
    console.log('Ajax call')
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "https://cors-anywhere.herokuapp.com/https://bokhandelsgruppen.priceedge.eu/papi/token",
        "method": "POST",
        "headers": {
          "Content-Type": "application/x-www-form-urlencoded",
          "Accept": "*/*",
          "Cache-Control": "no-cache",
          "Postman-Token": "4b513783-ca78-4c40-bac5-7272e743b4bf,6e9e3ab8-c3ee-4e90-a2fd-630d6a0f1093",
          "cache-control": "no-cache"
        },
        "data": {
          "username": "scraper",
          "password": "!scraper2018",
          "grant_type": "password",
          "client_id": "scraper"
        }
      }
      $.ajax(settings).done(function (response) {

            token = response['access_token']
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "https://cors-anywhere.herokuapp.com/https://bokhandelsgruppen.priceedge.eu/papi/api/items/views/viewCollect_ScrapeBokusItems_p1",
                "method": "POST",
                "headers": {
                  "Authorization": "Bearer " + token,
                  "Content-Type": "application/json",
                  "clientId": "scraper",
                  "Accept": "*/*",
                  "Cache-Control": "no-cache",
                  "Postman-Token": "b68d7c0a-ab10-4d40-a676-c749ed2b5308,6e103d47-64e2-4b4b-8904-c4a2c473eb23",
                  "cache-control": "no-cache"
                },
                "processData": false,
                "data": "{\n\t\"PageNumber\": 1,\n\t\"RecordsOnPage\": 100\n}"
              }
              $.ajax(settings).done(function (response) {
                console.log(response);
              });
      });
    console.log('Ajax finish');
}
