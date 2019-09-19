console.log('Content.js loaded');

console.log(window.location.host);

// This should be set for each chrome extension
// Object containing domain, selector and attr(if needed )that should be found on page, type of the searched Id, competitor name

let obj = [
    {'domain': 'www.eprice.it', 'selector': 'meta[itemprop="mpn"]', 'attr': 'content', 'replace': '', 'type': 'id', 'competitor': 'eprice'},
    {'domain': 'monclick.it', 'selector': '.mk-product-item-details a[data-action = "add-to-cart"][data-product-code]', 'attr': 'data-product-code', 'replace': '', 'type': 'number', 'competitor': 'monclick'},
    // {'domain': 'monclick.it', 'selector': 'span[itemprop="identifier"]', 'attr': 'text', 'replace': '', 'type': 'number', 'competitor': 'monclick'},
    {'domain': 'www.yeppon.it', 'selector': 'span[itemprop="productID"]', 'attr': 'text', 'replace': '', 'type': 'number', 'competitor': 'yeppon'},
    {'domain': 'www.onlinestore.it', 'selector': 'input[name="sAdd"]', 'attr': 'value', 'replace': '', 'type': 'number', 'competitor': 'onlinestore'},
    {'domain': 'www.amazon.it', 'selector': '#ASIN', 'attr': 'value', 'replace': '', 'type': 'number', 'competitor': 'amazon'},
    {'domain': 'www.mediaworld.it', 'selector': 'h1', 'attr': 'data-prod-detail-id', 'replace': '', 'type': 'number', 'competitor': 'mediaworld'},
    // {'domain': 'www.unieuro.it', 'selector': 'script[data-flix-ean]', 'attr': 'data-flix-ean', 'replace': '', 'type': 'number', 'competitor': 'unieuro'},
    {'domain': 'www.unieuro.it', 'selector': 'div[data-productdetail-sku]', 'attr': 'data-productdetail-sku', 'replace': '', 'type': 'number', 'competitor': 'unieuro'},
    {'domain': 'www.euronics.it', 'selector': '#productId', 'attr': 'value', 'replace': 'eProd', 'type': 'number', 'competitor': 'euronics'},
    {'domain': 'www.trony.it', 'selector': 'input[name="ProductSKU"]', 'attr': 'value', 'replace': '', 'type': 'number', 'competitor': 'trony'},
]




// 2) If id is called by popup message:
chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    console.log('ok');

    // a) Get needed informations from obj
    let competitor = '';
    let type = '';
    for(var i of obj){
        console.log(i);
        console.log(window.location.host);
        console.log(i['domain']);
        if (i['domain'] == window.location.host){
            selector = i['selector'];
            console.log('selector:');
            console.log(selector);

            if(i['attr'] == 'text'){
                productId = $(selector).text();
                
                console.log(productId);
            }else{
                productId = $(selector).attr(i['attr']);
                console.log(productId);
            }
            if (i['replace'] != ''){
                productId = productId.replace(i['replace'], '');
            }
            console.log(productId);
            type = i['type'];
            competitor = i['competitor']
            break;
        }
    }

    //  b.1) if product id or number is found, it will be sended to popup with type and competitor infos
    if (typeof productId !== 'undefined'){
        
            console.log(productId);
            console.log(type);
            
            // B - When popup is opened it sends message with parameters getId=true the content send back the product id/number and type (id or number)
            //    - content finds the id and send it back to popup
            if (message['getId']){
                console.log('Iddddd');
                console.log(productId);

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
        console.log('not on the page');
        chrome.runtime.sendMessage({
            data: {
                "notFound": 'notFound',
                
            }
        }, function (response) {
            console.log('NOt found send back: ' + response);   
        });
    }    
})



