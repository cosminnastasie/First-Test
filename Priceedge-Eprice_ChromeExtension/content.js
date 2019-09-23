console.log('Content.js loaded');

console.log(window.location.host);

// This should be set for each chrome extension
// Object containing domain, selector and attr(if needed )that should be found on page, type of the searched Id, competitor name

let obj = [
    {'domain': 'www.eprice.it', 'selector': [ {'sel': 'meta[itemprop="mpn"]', 'attr': 'content', 'replace': ''}],  'type': 'id', 'competitor': 'eprice'},
    {'domain': 'monclick.it', 'selector': [ {'sel': '#test', 'attr': 'content', 'replace': ''}, {'sel': '.mk-product-item-details a[data-action = "add-to-cart"][data-product-code]', 'attr': 'data-product-code', 'replace': ''}, {'sel': 'span[itemprop="identifier"]', 'attr': 'text', 'replace': '' }],  'type': 'number', 'competitor': 'monclick'},   
    {'domain': 'www.yeppon.it', 'selector': [{'sel':'span[itemprop="productID"]', 'attr': 'text', 'replace': ''}], 'type': 'number', 'competitor': 'yeppon'},
    {'domain': 'www.onlinestore.it', 'selector': [{'sel': 'input[name="sAdd"]', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'onlinestore'},
    {'domain': 'www.amazon.it', 'selector': [{'sel': '#ASIN', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'amazon'},
    {'domain': 'www.mediaworld.it', 'selector': [{'sel': 'h1', 'attr': 'data-prod-detail-id', 'replace': ''}], 'type': 'number', 'competitor': 'mediaworld'},
    {'domain': 'www.unieuro.it', 'selector': [{'sel':'div[data-productdetail-sku]', 'attr': 'data-productdetail-sku', 'replace': ''}], 'type': 'number', 'competitor': 'unieuro'},
    {'domain': 'www.euronics.it', 'selector': [{'sel':'#productId', 'attr': 'value', 'replace': 'eProd'}], 'type': 'number', 'competitor': 'euronics'},
    {'domain': 'www.trony.it', 'selector': [{'sel': 'input[name="ProductSKU"]', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'trony'},
]




// 2) If id is called by popup message:
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('Meesage received');

    // a) Get needed informations from obj
    let competitor = '';
    let type = '';
    for(var i of obj){
        console.log(i);
        console.log(window.location.host);
        // console.log(i['domain']);

        if (i['domain'] == window.location.host){

            console.log('Selectors loop');
            var selector = '';
            var attr = '';
            var replace = '';

            for (var z of i['selector']){
                console.log(z);
                // console.log(z['sel']);
                if ($(z['sel']).length > 0){
                    selector = z['sel'];
                    attr = z['attr'];
                    replace = z['replace']
                    break;
                }
            }

            if(attr == 'text'){
                productId = $(selector).text();
            }else{
                productId = $(selector).attr(attr);
            }

            if (replace != ''){
                productId = productId.replace(replace, '');
            }

            console.log($(selector).attr(attr));
            console.log(productId);
            type = i['type'];
            competitor = i['competitor']
            break;
        }
    }

    //  b.1) if product id or number is found, it will be sended to popup with type and competitor infos
    if (typeof productId !== 'undefined'){
        
            
            // B - When popup is opened it sends message with parameters getId=true the content send back the product id/number and type (id or number)
            //    - content finds the id and send it back to popup
            if (message['getId']){

                chrome.runtime.sendMessage({
                    data: {
                        "productId": productId,
                        "type": type,
                        "competitor": competitor
                    }
                }, function (response) {
                    console.log('Id send back: ' + productId);   
                });
            }
    //  b.2) If product Id is not found, send back not found message  
    }else{
        console.log('Id not found on the page');
        chrome.runtime.sendMessage({
            data: {
                "notFound": 'notFound',
                
            }
        }, function (response) {
            console.log('Not found. Send back: ' + response);   
        });
    }    
})



