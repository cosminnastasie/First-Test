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
                    'highlightElement': '',
                    'listWrapper':'',
                    'dinamicPage': false
                }
           ]
        },
        'type':'id',
        'competitor':'eprice',
        'timeout': 0
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
                    'layoutSelectors':{},
                    'highlightElement':'div',
                    'listWrapper':'',
                    'dinamicPage': false
                }
            ]
        },
        'type':'number',
        'competitor':'monclick',
        'timeout': 0
    },
    // {'domain': 'monclick.it', 'selector': [ {'sel': '#test', 'attr': 'content', 'replace': ''}, {'sel': '.mk-product-item-details a[data-action = "add-to-cart"][data-product-code]', 'attr': 'data-product-code', 'replace': ''}, {'sel': 'span[itemprop="identifier"]', 'attr': 'text', 'replace': '' }],  'type': 'number', 'competitor': 'monclick'},   
    { 
        'domain':'www.yeppon.it',
        'selector':{ 
           'popupSelector':[ 
              { 
                 'sel':'span[itemprop="productID"]',
                 'attr':'text',
                 'replace':''
              }
           ],
           'productPageSelector': [
                {
                    'target': '',
                    'sel': '.card-content .code',
                    'attr': 'text',
                    'replace': '',
                    'splitKey': 0,
                    'parentBoxSelector': 'mat-card',
                    'layoutSelectors':{ 
                        'gridLayoutParent':'.grid-products',
                        'gridHighlightEl':'mat-card',
                        'listLayoutParent':'.list-products',
                        'listHighlightEl':'.card-image'
                    },
                    'highlightElement': '',
                    'listWrapper': '.category-products. ng-star-inserted',
                    'dinamicPage': true
                }
           ]
        },
        'type':'number',
        'competitor':'yeppon',
        'timeout': 5000
    },
    // {'domain': 'www.yeppon.it', 'selector': [{'sel':'span[itemprop="productID"]', 'attr': 'text', 'replace': ''}], 'type': 'number', 'competitor': 'yeppon'},
    { 
        'domain':'www.onlinestore.it',
        'selector':{ 
           'popupSelector':[ 
              { 
                 'sel':'input[name="sAdd"]',
                 'attr':'value',
                 'replace':''
              }
           ],
           'productPageSelector': [
                {
                    'target': 'productImage',
                    'sel': '.product--action.action--note',
                    'attr': 'href',
                    'replace': '',
                    'splitKey': -1,
                    'parentBoxSelector': '.box--content',
                    'layoutSelectors':{},
                    'highlightElement': '.box--content',
                    'listWrapper' : '.listing',
                    'dinamicPage': true
                }
           ]
        },
        'type':'number',
        'competitor':'onlinestore',
        'timeout': 0
    },
    // {'domain': 'www.onlinestore.it', 'selector': [{'sel': 'input[name="sAdd"]', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'onlinestore'},
    { 
        'domain':'www.mediaworld.it',
        'selector':{ 
           'popupSelector':[ 
              { 
                 'sel':'h1',
                 'attr':'data-prod-detail-id',
                 'replace':''
              }
           ],
           'productPageSelector': [
                {
                    'target': 'productImage',//used when getting the id from an Url which request split. Set to empty if not
                    'sel': '.product-image_cont a', //Selector from where the id comes
                    'attr': 'href',
                    'replace': '',
                    'splitKey': -2,
                    'parentBoxSelector': 'article',// parent of sel
                    'layoutSelectors':{ 
                        'gridLayoutParent':'.display-mode-grid.active',
                        'gridHighlightEl':'article',
                        'listLayoutParent':'.display-mode-list.active',
                        'listHighlightEl':'.col-1'
                    },
                    'highlightElement': '',// used to highlight element. If grid/list option available it should be empty
                    'listWrapper' : '',//element used on checking if page content has changed
                    'dinamicPage': false
                }
           ]
        },
        'type':'number',
        'competitor':'mediaworld',
        'timeout': 0
    },
    // {'domain': 'www.mediaworld.it', 'selector': [{'sel': 'h1', 'attr': 'data-prod-detail-id', 'replace': ''}], 'type': 'number', 'competitor': 'mediaworld'},
    
    { 
        'domain':'www.unieuro.it',
        'selector':{ 
           'popupSelector':[ 
              { 
                 'sel':'div[data-productdetail-sku]',
                 'attr':'data-productdetail-sku',
                 'replace':''
              }
           ],
           'productPageSelector': [
                {
                    'target': '',
                    'sel': 'article[data-product-tile-sku]',
                    'attr': 'data-product-tile-sku',
                    'replace': '',
                    'splitKey': 0,
                    'parentBoxSelector': 'section',
                    'layoutSelectors':{ 
                        // 'gridLayoutParent':'.grid-products',
                        // 'gridHighlightEl':'mat-card',
                        // 'listLayoutParent':'.list-products',
                        // 'listHighlightEl':'.card-image'
                    },
                    'highlightElement': 'article',
                    'listWrapper': '#listing-result',
                    'dinamicPage': true
                }
           ]
        },
        'type':'number',
        'competitor':'unieuro',
        'timeout': 5000
    },
    
    // {'domain': 'www.unieuro.it', 'selector': [{'sel':'div[data-productdetail-sku]', 'attr': 'data-productdetail-sku', 'replace': ''}], 'type': 'number', 'competitor': 'unieuro'},

    { 
        'domain':'www.euronics.it',
        'selector':{ 
           'popupSelector':[ 
              { 
                 'sel':'#productId',
                 'attr':'value',
                 'replace':'eProd'
              }
           ],
           'productPageSelector': [
                {
                    'target': '',
                    'sel': '#log_prodotto',
                    'attr': 'value',
                    'replace': 'product:eProd',
                    'splitKey': 0,
                    'parentBoxSelector': '.productCard',
                    'layoutSelectors':{ 
                        // 'gridLayoutParent':'.wrapContent:not(.cardHorizontal) ',
                        // 'gridHighlightEl':'.productCard',
                        // 'listLayoutParent':'.wrapContent.cardHorizontal',
                        // 'listHighlightEl':'.productCard__image'
                    },
                    'highlightElement': '.productCard',
                    'listWrapper': '#listingContainer',
                    'dinamicPage': true
                }
           ]
        },
        'type':'number',
        'competitor':'euronics',
        'timeout': 0
    },

    // {'domain': 'www.euronics.it', 'selector': [{'sel':'#productId', 'attr': 'value', 'replace': 'eProd'}], 'type': 'number', 'competitor': 'euronics'},
    
    { 
        'domain':'www.trony.it',
        'selector':{ 
           'popupSelector':[ 
              { 
                 'sel':'input[name="ProductSKU"]',
                 'attr':'value',
                 'replace':''
              }
           ],
           'productPageSelector': [
                {
                    'target': '',
                    'sel': 'input[name="SKU"]',
                    'attr': 'value',
                    'replace': '',
                    'splitKey': 0,
                    'parentBoxSelector': '.smcc-listing-risultati-prodotto',
                    'layoutSelectors':{},
                    'highlightElement': '.smcc-listing-risultati-prodotto',
                    'listWrapper': '',
                    'dinamicPage': false
                }
           ]
        },
        'type':'number',
        'competitor':'trony',
        'timeout': 0
    },
    // {'domain': 'www.trony.it', 'selector': [{'sel': 'input[name="ProductSKU"]', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'trony'},

    { 
        'domain':'www.amazon.it',
        'selector':{ 
           'popupSelector':[ 
              { 
                 'sel':'#ASIN',
                 'attr':'value',
                 'replace':''
              }
           ],
           'productPageSelector': [
                {
                    'target': '',
                    'sel': 'div[data-asin]',
                    'attr': 'data-asin',
                    'replace': '',
                    'splitKey': 0,
                    'parentBoxSelector': 'div[data-asin]',
                    'layoutSelectors':{ 
                        // 'gridLayoutParent':'.grid-products',
                        // 'gridHighlightEl':'mat-card',
                        // 'listLayoutParent':'.list-products',
                        // 'listHighlightEl':'.card-image'
                    },
                    'highlightElement': 'div[data-asin]',
                    'listWrapper': '',
                    'dinamicPage': false
                },
                {
                    'target': '',
                    'sel': 'li[data-asin]',
                    'attr': 'data-asin',
                    'replace': '',
                    'splitKey': 0,
                    'parentBoxSelector': 'li[data-asin]',
                    'layoutSelectors':{ 
                        // 'gridLayoutParent':'.grid-products',
                        // 'gridHighlightEl':'mat-card',
                        // 'listLayoutParent':'.list-products',
                        // 'listHighlightEl':'.card-image'
                    },
                    'highlightElement': 'li[data-asin]',
                    'listWrapper': '',
                    'dinamicPage': false
                }
           ]
        },
        'type':'number',
        'competitor':'amazon',
        'timeout': 0
    },

    {'domain': 'www.amazon.it', 'selector': [{'sel': '#ASIN', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'amazon'},
]

let loginUrl = 'https://eprice.priceedge.eu/rdTemplate/rdData.aspx?rdData=System&rdDataID=GetUserSetting';
let login = 'https://staging.priceedge.eu/eprice';

// -------------- end Chrome extension settings


// a) Get needed informations from obj
let competitor = '';
let type = '';

for(var i of obj){
    // console.log(i);
    // console.log(window.location.host);
    // console.log(i['domain']);

    if (i['domain'] == window.location.host){


        // ----------- Popup
        
        // 2) If id is called by popup message:
        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
            console.log('Popup logic. Meesage received');
            // console.log(message);
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

        var timeout = i['timeout']
        console.log('Check if page is products list page');
        
        var productsListSelector = '';
        var attrStr = '';
        var replaceStr = '';
        var parentBoxSelector = '';
        var highlightElement = '';
        var splitKey = 0;   
        var target = '';     
        var listWrapper = '';
        var dinamicPage = false;

        setTimeout(function(){


            var competitorName = window.location.host.replace('www.', '').split('.')[0];
            var idsArr = []
            var typeStr = i['type'];


            var highlight = function(){
                
                for (var t of i['selector']['productPageSelector']){
                    console.log(t['sel']);
                    if ($(t['sel']).length > 0){
                        productsListSelector = t['sel'] + ':not(.item-checked)';
                        attrStr = t['attr'];
                        replaceStr = t['replace'];
                        parentBoxSelector = t['parentBoxSelector']
                        splitKey = t['splitKey'];
                        target = t['target']
                        listWrapper = t['listWrapper'];
                        dinamicPage = t['dinamicPage']
                        // console.log('Layout selectors');
                        // console.log(t['layoutSelectors']);
        
        
                        if(t['highlightElement'] == ''){
                            if ($(t['layoutSelectors']['gridLayoutParent']).length){
                                highlightElement = t['layoutSelectors']['gridHighlightEl'];
                                // console.log('Grid');
                            }else if ($(t['layoutSelectors']['listLayoutParent']).length){
                                highlightElement = t['layoutSelectors']['listHighlightEl'];
                                // console.log('List');
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
                        console.log('listWrapper' + listWrapper);
                        console.log('dinamicPage: ' + dinamicPage);
                        
                        break;
                    }
                }
        
        
        
                // 2. Check productsListSelector array to see if location is on a product list page
                // If selector exists on page => location on product lists pages
                
                var idsStr = '';
                console.log($(productsListSelector).length );
                if ($(productsListSelector).length ){
                    console.log($(productsListSelector).length );
                         
                    if (target != 'productImage'){
                        $(productsListSelector).each(function(){
                            if(attrStr != 'text'){
                                if($(this).attr(attrStr) != null){
                                    // console.log($(this).attr(attrStr));
                                    // idsArr.push($(this).attr(attrStr)//.replace(replaceStr, ''));
                                    idsStr += $(this).attr(attrStr).replace(replaceStr, '') + ',';
                                }
                                
                            }else if(attrStr == 'text'){
                                // idsArr.push($(this).attr(attrStr)//.replace(replaceStr, ''));
                                idsStr += $(this).text().replace(replaceStr, '') + ',';
                            }
                            
                        });
                    }else{
                        $(productsListSelector).each(function(){
                            var imgSrc = $(this).attr(attrStr).replace(replaceStr, '');
                            var getIdArr = imgSrc.split('/');
                            var id = getIdArr[getIdArr.length + splitKey]
                            idsStr +=  id + ',';
                           
                        })
                        
                    }
                    console.log('Ids string');
                    console.log(idsStr);
                    // console.log(typeStr);
                    // console.log(competitorName);
                    // console.log(idsArr);
        
        
                    // ############################################## Messaging to background
        
                    chrome.runtime.sendMessage(
                        {request: 'getData', typeStr: typeStr, competitorName: competitorName, idsStr: idsStr},
                    )
        
                    // #################################################

                }
                console.log('Highlighted');
                console.log(idsStr);
            }

            highlight();


            // 3. Get back the message from highlight
            chrome.runtime.onMessage.addListener(
                function(message, sender, sendResponse) {
                    console.log('Data from background:');

                    if (message.dataType == 'productList'){
                        console.log(message.data.data);

                        if(message.data.data.length){
                            $(productsListSelector).each(function(){
                                


                                    
                                for (var r of message.data.data){
                                    // console.log(r);
                                    // console.log($(this).attr(attrStr));

                                    

                                    if (typeStr == 'id'){
                                        idNumber = 'Number'
                                    }else if(typeStr == 'number'){
                                        idNumber = 'competitorNumber';
                                    }

                                    if (attrStr != 'text'){
                                       
                                        if ($(this).attr(attrStr).indexOf(r[idNumber]) > -1){
                                            var deviationStr = r['Deviation'];
                                            var deviation = (parseFloat(r['Deviation'])*100).toFixed(2);

                                            statusClass = '';
                                            if (deviation < ranges.min){
                                                statusClass = 'success-info';
                                            }else if(deviation > ranges.max){
                                                statusClass = 'alert-info';
                                            }else{
                                                statusClass = 'primary-info';
                                            }
                                            
                                            if (parentBoxSelector != highlightElement){
                                                $(this).closest(parentBoxSelector).addClass('parenting').find(highlightElement).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                            }else if (parentBoxSelector == highlightElement) {
                                                $(this).closest(parentBoxSelector).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                            }else{
                                                $(this).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                            }
                                            
                                        }
                                    }else if(attrStr == 'text'){
                                        if ($(this).text() == r['competitorNumber']){
                                            var deviationStr = r['Deviation'];
                                            var deviation = (parseFloat(r['Deviation'])*100).toFixed(2);

                                            statusClass = '';
                                            if (deviation < ranges.min){
                                                statusClass = 'success-info';
                                            }else if(deviation > ranges.max){
                                                statusClass = 'alert-info';
                                            }else{
                                                statusClass = 'primary-info';
                                            }
                                            // console.log('List code here');
                                            // console.log(parentBoxSelector);
                                            // console.log(highlightElement);
                                            if (parentBoxSelector != highlightElement){
                                                $(this).closest(parentBoxSelector).find(highlightElement).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                            }else{
                                                $(this).closest(parentBoxSelector).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                            }
                                            
                                        }
                                    }
                                    
                                }
                                
                                $(this).addClass('item-checked');
                            });
                            
                        }else{
                            console.log('No data from background');
                        }
                    }else if(message.dataType == 'loginCheck'){
                        console.log('Not logged in');
                        $('body').append('<div class="info-alert-box"><div class="content-box-info"><span class="private-box-label" ><h2>To access the extension,</h2> <div>you must first log in to <strong>PriceEdge™</strong></div></span></div><span class="close-info-box">&#10006;</span><div class="footer-box"><a href="'+login+'" class="private-red-button" target="blank">Go to log in page</a></div></div>');
                    }

                    
                }
            );





            // 4. Listen page change
            if (dinamicPage){
                setInterval(function(){

                    // $("body").on('DOMSubtreeModified', listWrapper, function() {
                        console.log('Check for changes');
                        console.log($(productsListSelector).length);
                        if($(productsListSelector).length){
                            highlight();
                        };
                        // highlight();
                    // });
                }, 3000);
            }
            
            

        
           
            


        }, timeout
        );


        
    // --------------------- End Product-list pages
        


        break;
    }
}

   



