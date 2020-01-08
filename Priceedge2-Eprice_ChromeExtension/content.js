// ####################### Chrome extension settings ######################
console.log('Content loaded');
let ranges = {
    min: -2,
    max: 2
}

let loginState = false
let obj = [
    { 
        'domain':'www.eprice.it',
        'selector':{ 
           'popupSelector':[ 
              { 
                 'sel':'meta[itemprop="mpn"]',
                 'attr':'content',
                 'replace':''
              },
              { 
                'sel':'.contInfo>strong:not(#ftenhance)',
                'attr':'text',
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
        'timeout': 3000
    },
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
                    'layoutSelectors':{},
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
                    'layoutSelectors':{},
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
                    'sel': 'div[data-asin].sg-col-20-of-24',
                    'attr': 'data-asin',
                    'replace': '',
                    'splitKey': 0,
                    'parentBoxSelector': 'div[data-asin].sg-col-20-of-24',
                    'layoutSelectors':{},
                    'highlightElement': '.a-section .sg-row > div:nth-child(1) .sg-col-inner span[data-component-type="s-product-image"] a .a-section ',
                    'listWrapper': '',
                    'dinamicPage': false
                },
                {
                    'target': '',
                    'sel': 'div[data-asin].sg-col-4-of-24',
                    'attr': 'data-asin',
                    'replace': '',
                    'splitKey': 0,
                    'parentBoxSelector': 'div[data-asin]',
                    'layoutSelectors':{},
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
                    'layoutSelectors':{},
                    'highlightElement': 'li[data-asin]',
                    'listWrapper': '',
                    'dinamicPage': false
                },
                {
                    'target': '',
                    'sel': 'div[data-asin].sg-col-20-of-24',
                    'attr': 'data-asin',
                    'replace': '',
                    'splitKey': 0,
                    'parentBoxSelector': 'div[data-asin].sg-col-20-of-24',
                    'layoutSelectors':{},
                    'highlightElement': '.a-section .sg-row > div:nth-child(1) .sg-col-inner span[data-component-type="s-product-image"] a .a-section ',
                    'listWrapper': '',
                    'dinamicPage': false
                }    
           ]
        },
        'type':'number',
        'competitor':'amazon,amazon_proper',
        'timeout': 0
    },

    { 
        'domain':'expertonline.it',
        'selector':{ 
            'popupSelector':[ 
                { 
                    'sel':'div[id^=Expert_]',
                    'attr':'id',
                    'replace':'Expert_'
                }
            ],
            'productPageSelector':[ 
                { 
                    'target':'',
                    'sel':'div[id^=PROD_Expert_]',
                    'attr':'id',
                    'replace':'PROD_Expert_',
                    'splitKey':0,
                    'parentBoxSelector':'div[data-codiceextra]',
                    'layoutSelectors':{
                        'gridLayoutParent':'.skywalker_quadro',
                        'gridHighlightEl':'.skywalker_imgProdotto',
                        'listLayoutParent':'.skywalker_riga.skywalker_riga_articolo',
                        'listHighlightEl':'.skywalker_imgProdotto'
                    },
                    'highlightElement':'',
                    'listWrapper':'',
                    'dinamicPage': false
                }
            ]
        },
        'type':'number',
        'competitor':'expertOnline',
        'timeout': 0
    }, 

]

let loginUrl = 'https://eprice.priceedge.eu/rdTemplate/rdData.aspx?rdData=System&rdDataID=GetUserSetting';
let login = 'https://eprice.priceedge.eu';
let getDeviationUrl = 'https://eprice.priceedge.eu/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation';
let getCompetitorPricesUrl = 'https://eprice.priceedge.eu/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorPrices&'
let waitImage = '<div class="popup-center-message vertical-content" id="loadingData"><div class="message-label">Loading ...</div><img src="'+chrome.extension.getURL('images/wait2.gif')+'" class="wait-img" /></div>'

// ##################### end Chrome extension settings


// Request login via message

chrome.runtime.sendMessage(
    {request: 'checkLogin', loginUrl: loginUrl}
)


// -------------------- 1. Get needed informations from obj ---------------------

let competitor = '';
let type = '';

$(document.body).on('click', '#closePopup', function(){
    $('#pricePopup').hide();
});

$(document).click(function(event) { 
    $target = $(event.target);
    if(!$target.closest('#pricePopup').length) {
        $('#pricePopup').hide();
    }        
});

// Hide popup on tab focus loose
var checkWindowVisibility = setInterval(function(){
    if (document.hidden) {
        $('#pricePopup').hide();
    }
}, 1000)


chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
    if (message.loginState != null){

        // User not logged in 

        if (message.loginState == false){
            setTimeout(function() {
                    $('body').append('<div id="pricePopup" class="private-popup"><div class="private-actions-row private-actions-row"><span id="closePopup" class="close-popup"></span></div><div id="login" class="popup-center-message vertical-content"><img src="' + chrome.extension.getURL('images/logo-priceedge.png') + '" class="logo"><img src="' + chrome.extension.getURL('images/image.png') + '" class="info-pic"><span class="wait-label">To access the extension, you must first log in to <strong>PriceEdge™</strong>.</span><a href="https://eprice.priceedge.eu/bsLogon.aspx" target="blank" class="private-red-button m-top-12">Go to log in page</a></div></div>')
                }, 3000);         
        }else{
            // User logged in
            for(var i of obj){

                if (i['domain'] == window.location.host || window.location.host.indexOf(i['domain']) > 0 ){
        
                    // ############################################### POPUP LOGIC #########################
                    // ##############################################

                    // A. If id is called by popup message:
                    chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                        
                        // 1. Open/create popup
        
                        if (message['action'] == 'openPopup'){
                            console.log('Open popup');
                            if($('#pricePopup').length <= 0){
                                
                                $('body').append('<div id="pricePopup" class="private-popup"><div class="private-actions-row"><span id="closePopup" class="close-popup"></span></div><div id="pricesGrid" style="width:550px" class="ag-theme-balham"></div> ' + waitImage + '</div>');

                                $(function(){
                                    $( "#pricePopup").draggable({
                                        containment: "html",
                                        handle: '.private-actions-row'
                                    });
                                });

                                var selector = '';
                                var replace = '';
                                for (var z of i['selector']['popupSelector']){
                                    if ($(z['sel']).length > 0){
                                        selector = z['sel'];
                                        var attr = z['attr'];
                                        replace = z['replace']
                                        if ($(selector).attr(attr) != null){
                                            if ($(selector).attr(attr).replace(replace, '') != ''){
                                                break;
                                            }
                                        }              
                                    }
                                }
                                if ($(selector).length > 0){
                                    if(attr == 'text'){
                                        productId = $(selector).text()
                                    }else{
                                        productId = $(selector).attr(attr);
                                    }
                                    
                                    if (replace != ''){
                                        productId = productId.replace(replace, '').trim();
                                    }         
                        
                                    type = i['type'];
                                    competitor = i['competitor'].split(',')[0]
                                    
                                    if (typeof productId !== 'undefined'){
                                        productId = encodeURIComponent(productId)
                                        src = getCompetitorPricesUrl + 'productId=' + productId + '&type=' + type + '&competitor=' + competitor;
                                        chrome.runtime.sendMessage(
                                            {request: 'getProductData', url: src}
                                        )

                                        chrome.runtime.onMessage.addListener(function (message, sender, sendResponse) {
                                            if (message.dataType == "competitorPrices"){

                                                // Data should be available here
                                                if (JSON.parse(message.data).data[0]){
                                                    let productData = JSON.parse(message.data).data[0];
                                                    
                                                    //Load popup html

                                                    //Load header
                                                
                                                    let header = '<span class="item-name"><span>' + productData.Item_Name + '</span></span>';
                                                    $('#pricesGrid').before(header);

                                                    //Load subheader

                                                    let subHeader = '<span class="item-prices-info"><span><span class="item-label">PRICE</span><span class="item-value">'+parseFloat(productData.Item_Price).toFixed(2)+'</span></span><span><span class="item-label"> SHIPPING PRICE</span><span class="item-value">'+parseFloat(productData.Item_ShippingPrice).toFixed(2)+'</span></span><span><span class="item-label">TOTAL PRICE</span><span class="item-value">'+parseFloat(productData.Item_TotalPrice).toFixed(2)+'</span></span></span>'
                                                    
                                                    $('#pricesGrid').before(subHeader);

                                                    //Load table
                                                    if(productData.competitorsPrices == ''){
                                                        $('#pricesGrid').before('<span class="centered-block">No match for this item!</span>');
                                                    }else{
                                                        let tableData = JSON.parse(productData.competitorsPrices);
                                                        const priceAvg = tableData.reduce((a, {Price}) => a + Price, 0) / tableData.length;
                                                        const diffAvg = tableData.reduce((a, {Diff}) => a + Diff, 0) / tableData.length;
                                                        const shippingAvg = tableData.reduce((a, {Shipping}) => a + Shipping, 0) / tableData.length;
                                                        const totalAvg = tableData.reduce((a, {Total}) => a + Total, 0) / tableData.length;
                                                        const diffTotalAvg = tableData.reduce((a, {DiffTotal}) => a + DiffTotal, 0) / tableData.length;

                                                        //Load the table
                                                        var columnDefs = [
                                                            {headerName: "COMPETITOR", field: "CompetitorName",
                                                                cellRenderer: function(params) {
                                                                    if (params.data.Url != ''){
                                                                        return '<a target="_blank" href="' + params.data.Url + '"' + '>' + params.value + '</a>';
                                                                    }else{
                                                                        return '<span class="default-color">' + params.value + '</span>';
                                                                    }
                                                                }
                                                            },
                                                            {headerName: "PRICE", field: "Price", 
                                                                valueFormatter: function(params) {
                                                                    return params.value.toFixed(2);
                                                                },                                                                  
                                                            },
                                                            {headerName: "DIFF", field: "Diff", 
                                                                cellStyle: function(params) {
                                                                    if (params.value < 0) {
                                                                        return {color: '#0091ae !important'};
                                                                    } else {
                                                                        return {color: '#e7556a !important'};
                                                                    }
                                                                },
                                                                valueFormatter: function(params) {
                                                                    let sign = ''
                                                                    if (params.value > 0 ){sign = '+' }
                                                                    return sign + params.value.toFixed(2) + '%';
                                                                }
                                                            },
                                                            {headerName: "Shipping Cost", field: "Shipping",
                                                                valueFormatter: function(params) {
                                                                    return params.value.toFixed(2);
                                                                }, 
                                                            },
                                                            {headerName: "TOTAL", field: "Total", 
                                                                valueFormatter: function(params) {
                                                                    return params.value.toFixed(2);
                                                                },
                                                            },
                                                            {headerName: "DIFF TOTAL", field: "DiffTotal", 
                                                                cellStyle: function(params) {
                                                                    if (params.value < 0) {
                                                                        return {color: '#0091ae !important'};
                                                                    } else {
                                                                        return {color: '#e7556a !important'};
                                                                    }
                                                                },
                                                                valueFormatter: function(params) {
                                                                    let sign = ''
                                                                    if (params.value > 0 ){sign = '+' }
                                                                    return sign + params.value.toFixed(2) + '%';
                                                                }
                                                            },
                                                            {headerName: "Availability", field: "Available",
                                                                cellRenderer: function(params){
                                                                    if (params.value == 1){
                                                                        return '<span class="icon-oks">&#10003;</span>'
                                                                    }else if(params.value == 0){
                                                                        return '<span class="icon-cross">&#xd7;</span>'
                                                                    }else{
                                                                        return ''
                                                                    }
                                                                },
                                                                width: 50, suppressSizeToFit: true
                                                            }
                                                        ];
            
                                                        var gridOptions = {
                                                            defaultColDef: {
                                                                sortable: true
                                                            },
                                                            columnDefs: columnDefs,
                                                            rowData: tableData,
                                                            domLayout:'autoHeight',
                                                            onFirstDataRendered: function(params) {
                                                                params.api.sizeColumnsToFit();
                                                            },
                                                            pinnedBottomRowData: [
                                                                {
                                                                    CompetitorName: "Avg. Price",
                                                                    Price: priceAvg,
                                                                    Diff: diffAvg,
                                                                    Shipping: shippingAvg,
                                                                    Total: totalAvg,
                                                                    DiffTotal: diffTotalAvg,
                                                                    Available: 2,
                                                                    Url: "",}
                                                            ],
                                                            rowHeight: 32,
                                                            animateRows: true
                                                        };
                                                        var gridDiv = document.querySelector('#pricesGrid');
                                                        new agGrid.Grid(gridDiv, gridOptions);
                                                    }

                                                    //Load footer

                                                    let footer = '<div class="footer-row"><span class="flex-block columns-row m-bottom-3"><span><span class="item-label">INTERNAL ID:</span><span class="item-value">'+productData.Item_InternalId+'</span></span><span><span class="item-label">MFGR ID:</span><span class="item-value">'+productData.Item_Mpn+'</span></span></span><span class="logo-box"><img src="' + chrome.extension.getURL('images/logo-priceedge.png') + '" class="logo"></span><a href="https://eprice.priceedge.eu/rdPage.aspx?rdReport=Home.Timeline&amp;itemNumberTimeline=' +productData.itemNumber + '" id="goToTimeline" target="blank"><span id="showGraph" class="private-red-button ">SHOW GRAPH</span></a></div>';

                                                    $('#pricesGrid').after(footer);
                                                    
                                                    $('#loadingData').remove();
                                                }else{
                                                    $('#loadingData').remove();
                                                    $('#pricePopup').append('<div class="popup-center-message"><div class="vertical-content flex-center"><img src="' + chrome.extension.getURL('images/icecream-error.png') + '" class="error-img"><span class="centered-text">Sorry. Something went wrong. Try to reload the page or pick another product!</span></div></div>')
                                                    console.log('Nothing found!')
                                                }
                                            }
                                        })
                                    }else{
                                        console.log('Id not found on the page');
                                        $('#loadingData').remove();
                                        $('#pricePopup').append('<div class="popup-center-message"><div class="vertical-content flex-center"><img src="' + chrome.extension.getURL('images/icecream-error.png') + '" class="error-img"><span>Sorry. The system isn"t tracking this page.</span></div></div>')           
                                    }           
                                }else{
                                    $('#loadingData').remove();
                                    $('#pricePopup').append('<div class="popup-center-message"><div class="vertical-content flex-center"><img src="' + chrome.extension.getURL('images/icecream-error.png') + '" class="error-img"><span>Sorry. The system isn"t tracking this page.</span></div></div>')         
                                }
                            }else{
                                $('#pricePopup').show();
                            }
                        }  
                    })

                    // ################################# Products-list pages logic ##############################################################################
 
                    // A. Set selectors from obj: 
                    // - selector used for id extraction - productsListSelector + attribute to extract + replaceStr (if needed)
                    // - selector of highlight element - highlightElement (different for grid or list layout)
                            
                    var timeout = i['timeout']
                    var productsListSelector = '';
                    var attrStr = '';
                    var replaceStr = '';
                    var parentBoxSelector = '';
                    var highlightElement = '';
                    var splitKey = 0;   
                    var target = '';     
                    var listWrapper = '';
                    var dinamicPage = false;
                    console.log('Timeout',timeout )
        
                    // A.1 If needed, set timeout (for the pages that loads scripts like yeppon, onlinestore)
                    setTimeout(function(){
        
                        var competitorName = i['competitor']
                        var typeStr = i['type'];
        
                        // A.2 Function that will:
                                // a - get all selectors
                                // b - check if id selector is on the page
                                // c - get all ids into idsStr
                                // d - send message to background with ids list
        
                        var highlight = function(){
                            // A.2.a
                            for (var t of i['selector']['productPageSelector']){
                                if ($(t['sel']).length > 0){
                                    productsListSelector = t['sel'] + ':not(.item-checked)';
                                    attrStr = t['attr'];
                                    replaceStr = t['replace'];
                                    parentBoxSelector = t['parentBoxSelector']
                                    splitKey = t['splitKey'];
                                    target = t['target']
                                    listWrapper = t['listWrapper'];
                                    dinamicPage = t['dinamicPage']       
                    
                                    if(t['highlightElement'] == ''){
                                        if ($(t['layoutSelectors']['gridLayoutParent']).length){
                                            highlightElement = t['layoutSelectors']['gridHighlightEl'];
                                        }else if ($(t['layoutSelectors']['listLayoutParent']).length){
                                            highlightElement = t['layoutSelectors']['listHighlightEl'];
                                        }
                                    }else{
                                        highlightElement = t['highlightElement']
                                    }
                    
                                    break;
                                }
                            }
                
                            // A.2.b.
                            // Check productsListSelector array to see if location is on a product list page
                            // If selector exists on page => location on product lists pages
                            
                            var idsStr = '';
        
                            if ($(productsListSelector).length ){
        
                                // A.2.c.    
                                if (target != 'productImage'){
                                    $(productsListSelector).each(function(){
                                        if(attrStr != 'text'){
                                            if($(this).attr(attrStr) != null){
                                                idsStr += $(this).attr(attrStr).replace(replaceStr, '') + ',';
                                            }
                                        }else if(attrStr == 'text'){
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
                            
                                // A.2.d 
                                // ############ Messaging to background
                                console.log('Ids send to background:');
                                console.log(idsStr);
        
                                chrome.runtime.sendMessage(
                                    {request: 'getData', typeStr: typeStr, competitorName: competitorName, idsStr: idsStr, competitorDeviationUrl : getDeviationUrl},
                                )
                            }
                        }
        
                        highlight();
        
                        // B. - Get back the message from highlight
                                // - if data
                                //     - Hightlight elements that have data
                                // - else
                                //     - add popup for login
                
                        chrome.runtime.onMessage.addListener(
                            function(message, sender, sendResponse) {
                                
                                if (message.dataType == 'productList'){
                                    console.log('Message from background: ');
                                    console.log(message.data);
        
                                    if(message.data.data.length){
                                        $(productsListSelector).each(function(){
                                            for (var r of message.data.data){
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
                                                            if (parentBoxSelector == productsListSelector){
                                                                $(this).addClass('parenting').find(highlightElement).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                                            }else{
                                                                $(this).closest(parentBoxSelector).addClass('parenting').find(highlightElement).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                                            }
                                                        }else if (parentBoxSelector == highlightElement) {
                                                            $(this).closest(parentBoxSelector).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
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
                                }
                            }
                        );
        
                        // C. Listen page change for the pages that have dinamicPage = true
                        if (dinamicPage){
                            setInterval(function(){
                                console.log('Changed items number: ' + $(productsListSelector).length);
                                if($(productsListSelector).length){
                                    highlight();
                                };
                            }, 3000);
                        }
                        
                    }, timeout);
                            
                // ---- End Product-list pages
                    break;
                }
            }
        }
    }
})






   



