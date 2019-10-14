console.log('Content.js loaded');

// -------------- Chrome extension settings

let ranges = {
    min: -2,
    max: 2
}

let obj = [
    { 
        'domain':'www.eprice.it',
        'selector':{ 
           'popupSelector':[ 
              { 
                 'sel':'meta[itemprop="mpn"]',
                 'attr':'content',
                 'replace':''
              }
           ],
           'productPageSelector': [
                {
                    'target': 'productImage',
                    'sel': '.ep_prodListing .ep_prodImg img',
                    'attr': 'src',
                    'replace': '',
                    'splitKey': -2,
                    'parentBoxSelector': 'a.ep_prodListing',
                    'layoutSelectors':{},
                    'highlightElement': 'a.ep_prodListing'
                },
                {
                    'target': '',
                    'sel': '.item .stelline',
                    'attr': 'id',
                    'replace': 'BVRRInlineRating-',
                    'splitKey': 0,
                    'parentBoxSelector': '.row',
                    'layoutSelectors':{ 
                        'gridLayoutParent':'#esempioGriglia',
                        'gridHighlightEl':'.item',
                        'listLayoutParent':'#esempioLista',
                        'listHighlightEl':'.linkImg'
                    },
                    'highlightElement': ''
                }
           ]
        },
        'type':'id',
        'competitor':'eprice'
    },
    { 
        'domain':'monclick.it',
        'selector':{ 
            'popupSelector':[ 
                { 
                    'sel':'.mk-product-item-details a[data-action = "add-to-cart"][data-product-code]',
                    'attr':'data-product-code',
                    'replace':''
                },
                { 
                    'sel':'span[itemprop="identifier"]',
                    'attr':'text',
                    'replace':''
                }
            ],
            'productPageSelector':[ 
                { 
                    'target':'',
                    'sel':'.mainListingContainer .mk-listingProduct .mk-productListingImage a[data-product-code]',
                    'attr':'data-product-code',
                    'replace':'',
                    'splitKey':0,
                    'parentBoxSelector':'div',
                    'layoutSelectors':{ 

                    },
                    'highlightElement':'div'
                }
            ]
        },
        'type':'number',
        'competitor':'monclick'
    },
    // {'domain':'monclick.it','selector':{'popupSelector':[{'sel':'.mk-product-item-details a[data-action = "add-to-cart"][data-product-code]','attr':'data-product-code','replace':''},{'sel': 'span[itemprop="identifier"]', 'attr': 'text', 'replace': '' }],'productPageSelector': [{'target': 'productImage','sel': '.ep_prodListing .ep_prodImg img','attr': 'src','replace': '','splitKey': -2,'parentBoxSelector': 'a.ep_prodListing','layoutSelectors':{},'highlightElement': 'a.ep_prodListing'}]},'type':'number','competitor':'monclick'},

    // {'domain': 'monclick.it', 'selector': [ {'sel': '#test', 'attr': 'content', 'replace': ''}, {'sel': '.mk-product-item-details a[data-action = "add-to-cart"][data-product-code]', 'attr': 'data-product-code', 'replace': ''}, {'sel': 'span[itemprop="identifier"]', 'attr': 'text', 'replace': '' }],  'type': 'number', 'competitor': 'monclick'},   
    {'domain': 'www.yeppon.it', 'selector': [{'sel':'span[itemprop="productID"]', 'attr': 'text', 'replace': ''}], 'type': 'number', 'competitor': 'yeppon'},
    {'domain': 'www.onlinestore.it', 'selector': [{'sel': 'input[name="sAdd"]', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'onlinestore'},
    {'domain': 'www.amazon.it', 'selector': [{'sel': '#ASIN', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'amazon'},
    {'domain': 'www.mediaworld.it', 'selector': [{'sel': 'h1', 'attr': 'data-prod-detail-id', 'replace': ''}], 'type': 'number', 'competitor': 'mediaworld'},
    {'domain': 'www.unieuro.it', 'selector': [{'sel':'div[data-productdetail-sku]', 'attr': 'data-productdetail-sku', 'replace': ''}], 'type': 'number', 'competitor': 'unieuro'},
    {'domain': 'www.euronics.it', 'selector': [{'sel':'#productId', 'attr': 'value', 'replace': 'eProd'}], 'type': 'number', 'competitor': 'euronics'},
    {'domain': 'www.trony.it', 'selector': [{'sel': 'input[name="ProductSKU"]', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'trony'},
]

let loginUrl = 'https://eprice.priceedge.eu/rdTemplate/rdData.aspx?rdData=System&rdDataID=GetUserSetting';
let login = 'https://staging.priceedge.eu/eprice';

// -------------- end Chrome extension settings




function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}



// a) Get needed informations from obj
let competitor = '';
let type = '';

for(var i of obj){
    console.log(i);
    // console.log(window.location.host);
    // console.log(i['domain']);

    if (i['domain'] == window.location.host){


        // ----------- Popup
        
        // 2) If id is called by popup message:
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            console.log('Meesage received');
            console.log(message);
            if (message['getId']){//Message from popup
                    // console.log('Selectors loop');
                    var selector = '';
                    var replace = '';

                    for (var z of i['selector']['popupSelector']){
                        // console.log(z);
                        if ($(z['sel']).length > 0){

                            selector = z['sel'];
                            var attr = z['attr'];
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

                    // console.log($(selector).attr(attr));
                    // console.log(productId);
                    type = i['type'];
                    competitor = i['competitor']

                    //  b.1) if product id or number is found, it will be sended to popup with type and competitor infos
                    if (typeof productId !== 'undefined'){
                        
                            // B - When popup is opened it sends message with parameters getId=true the content send back the product id/number and type (id or number)
                            //    - content finds the id and send it back to popup
                            

                                chrome.runtime.sendMessage({
                                    data: {
                                        "productId": productId,
                                        "type": type,
                                        "competitor": competitor
                                    }
                                }, function (response) {
                                    console.log('Id send back: ' + productId);   
                                });
                            
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
            }
        })
            

        // --------------------- end Popup logic










        // --------------------- Start Products-list pages logic 

        
        
        // 1. Set selectors from obj: 
        // - selector used for id extraction - productsListSelector + attribute to extract + replaceStr (if needed)
        // - selector of highlight element - highlightElement (different for grid or list layout)



        console.log('Check if page is products list page');
        var productsListSelector = '';
        var attrStr = '';
        var replaceStr = '';
        var parentBoxSelector = '';
        var highlightElement = '';
        var splitKey = 0;   
        var target = '';     

        for (var t of i['selector']['productPageSelector']){
            if ($(t['sel']).length > 0){
                productsListSelector = t['sel'];
                attrStr = t['attr'];
                replaceStr = t['replace'];
                parentBoxSelector = t['parentBoxSelector']
                splitKey = t['splitKey'];
                target = t['target']

                // console.log('Layout selectors');
                // console.log(t['layoutSelectors']);


                if(t['highlightElement'] == ''){
                    if ($(t['layoutSelectors']['gridLayoutParent']).length){
                        highlightElement = t['layoutSelectors']['gridHighlightEl'];
                        console.log('Grid');
                    }else if ($(t['layoutSelectors']['listLayoutParent']).length){
                        highlightElement = t['layoutSelectors']['listHighlightEl'];
                        console.log('List');
                    }
                }else{
                    highlightElement = t['highlightElement']
                }

                console.log('productsListSelector: ' + productsListSelector);
                console.log('attrStr: ' + attrStr);
                console.log('replaceStr: ' + replaceStr);
                console.log('parentBoxSelector: ' + parentBoxSelector);
                console.log('highlightElement: ' + highlightElement);
                console.log('splitKey: ' + splitKey);
                
                break;
            }
        }



        //2. Check productsListSelector array to see if location is on a product list page
        // If selector exists on page => location on product lists pages

        if ($(productsListSelector).length ){
            // console.log('Exista');
            var typeStr = i['type'];
            var competitorName = window.location.host.replace('www.', '').split('.')[0];
            var idsArr = []
            var idsStr = '['

            if (target != 'productImage'){
                $(productsListSelector).each(function(){
                    idsArr.push($(this).attr(attrStr).replace(replaceStr, ''));
                    idsStr += $(this).attr(attrStr).replace(replaceStr, '') + ',';
                });
            }else{
                $(productsListSelector).each(function(){
                    var imgSrc = $(this).attr(attrStr).replace(replaceStr, '');
                    var getIdArr = imgSrc.split('/');
                    var id = getIdArr[getIdArr.length + splitKey]
                    idsStr += '"' + id + '",';
                   
                })
                idsStr += ']';
            }
            
            console.log(idsStr);
            console.log(typeStr);
            console.log(competitorName);
            console.log(idsArr);


            // ############################################## Messaging to background


            chrome.runtime.sendMessage(
                {request: 'getData', typeStr: typeStr, competitorName: competitorName, idsStr: idsStr},
            )


            chrome.runtime.onMessage.addListener(
                function(message, sender, sendResponse) {
                    console.log('Content.js messaging:');

                    if (message.dataType == 'productList'){
                        console.log(message.data.data);

                        $(productsListSelector).each(function(){
                            for (var r of message.data.data){
                                // console.log(r);
                                // console.log($(this).attr(attrStr));

                                
                                if ($(this).attr(attrStr).indexOf(r['Number']) > -1){
                                    var deviationStr = r['Deviation'];
                                    var deviation = (parseFloat(r['Deviation'])*100).toFixed(2);
                                    // console.log('Dev perc');
                                    // console.log(deviation);
                                    statusClass = '';
                                    if (deviation < ranges.min){
                                        statusClass = 'success-info';
                                    }else if(deviation > ranges.max){
                                        statusClass = 'alert-info';
                                    }else{
                                        statusClass = 'primary-info';
                                    }
                                    // console.log('Highlight el');
                                    // console.log(highlightElement);
                                    // $(this).closest(parentBoxSelector).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                    if (parentBoxSelector != highlightElement){
                                        $(this).closest(parentBoxSelector).find(highlightElement).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                    }else{
                                        $(this).closest(parentBoxSelector).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                    }
                                    
                                }
                            }
                        });
                    }else if(message.dataType == 'loginCheck'){
                        console.log('Not logged in');
                        $('body').append('<div class="info-alert-box"><div class="content-box-info"><span class="private-box-label" ><h2>To access the extension,</h2> <div>you must first log in to <strong>PriceEdge™</strong></div></span></div><span class="close-info-box">&#10006;</span><div class="footer-box"><a href="'+login+'" class="private-red-button" target="blank">Go to log in page</a></div></div>');
                    }

                    
                }
            );

            // #################################################




            
            // console.log(i['selector']['productPageSelector'])
        }


        // --------------------- End Product-list pages
        


        break;
    }
}

   



