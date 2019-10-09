console.log('Content.js loaded');

console.log(window.location.host);

// This should be set for each chrome extension
// Object containing domain, selector and attr(if needed )that should be found on page, type of the searched Id, competitor name
let ranges = {
    min: -2,
    max: 2
}

let obj = [
    {'domain': 'www.eprice.it', 'selector': {'popupSelector': [ {'sel': 'meta[itemprop="mpn"]', 'attr': 'content', 'replace': ''}], 'productsListSelector': [{'sel':'.item .stelline', 'attr': 'id', 'replace': 'BVRRInlineRating-', 'parentBoxSelector': '.row', 'layoutSelectors': { 'gridLayoutParent': '#esempioGriglia', 'gridHighlightEl': '.item', 'listLayoutParent': '#esempioLista', 'listHighlightEl': '.linkImg'}}]},  'type': 'id', 'competitor': 'eprice'},

    {'domain': 'monclick.it', 'selector': [ {'sel': '#test', 'attr': 'content', 'replace': ''}, {'sel': '.mk-product-item-details a[data-action = "add-to-cart"][data-product-code]', 'attr': 'data-product-code', 'replace': ''}, {'sel': 'span[itemprop="identifier"]', 'attr': 'text', 'replace': '' }],  'type': 'number', 'competitor': 'monclick'},   
    {'domain': 'www.yeppon.it', 'selector': [{'sel':'span[itemprop="productID"]', 'attr': 'text', 'replace': ''}], 'type': 'number', 'competitor': 'yeppon'},
    {'domain': 'www.onlinestore.it', 'selector': [{'sel': 'input[name="sAdd"]', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'onlinestore'},
    {'domain': 'www.amazon.it', 'selector': [{'sel': '#ASIN', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'amazon'},
    {'domain': 'www.mediaworld.it', 'selector': [{'sel': 'h1', 'attr': 'data-prod-detail-id', 'replace': ''}], 'type': 'number', 'competitor': 'mediaworld'},
    {'domain': 'www.unieuro.it', 'selector': [{'sel':'div[data-productdetail-sku]', 'attr': 'data-productdetail-sku', 'replace': ''}], 'type': 'number', 'competitor': 'unieuro'},
    {'domain': 'www.euronics.it', 'selector': [{'sel':'#productId', 'attr': 'value', 'replace': 'eProd'}], 'type': 'number', 'competitor': 'euronics'},
    {'domain': 'www.trony.it', 'selector': [{'sel': 'input[name="ProductSKU"]', 'attr': 'value', 'replace': ''}], 'type': 'number', 'competitor': 'trony'},
]

let loginUrl = 'https://eprice.priceedge.eu';


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

$.ajax({
    method: 'POST',
    // url: 'https://eprice.priceedge.eu/rdTemplate/rdData.aspx?rdData=System&rdDataID=GetUserSetting',
    url: "http://localhost/Blueberry/rdTemplate/rdData.aspx?rdData=System&rdDataID=GetUserSetting",

}).done(function(data){
    console.log(data);
    if (! IsJsonString(data)){
        console.log('Not logged in');
        // $('body').append('<div class="info-alert-box"> <div class="info-text">To access the extension features, you must first <a href="' + loginUrl + '" target="blank"> log in to PriceEdge™</a></div><span id="closeInfoBox" onclick="parentNode.remove()" class="close-info-box">&#10006;<span></div>');
    }else{
        console.log('Logged in ');
    }
})




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
            // console.log('Meesage received');
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
            

        // --------------------- end popup










        // -------- Product pages list

        
        
        // 1. Check if page is products list page
        console.log('Check if page is products list page');
        var productsListSelector = '';
        var attrStr = '';
        var replaceStr = '';
        var parentBoxSelector = '';
        var highlightElement = ''

        // 2. Set selectors from obj: 
        // - selector used for id extraction - productsListSelector + attribute to extract + replaceStr (if needed)
        // - selector of highlight element - highlightElement (different for grid or list layout)

        for (var t of i['selector']['productsListSelector']){
            // console.log(t);
            if ($(t['sel']).length> 0){
                productsListSelector = t['sel'];
                attrStr = t['attr'];
                replaceStr = t['replace'];
                parentBoxSelector = t['parentBoxSelector']
                

                console.log('Layout selectors');
                console.log(t['layoutSelectors']);
                
                if ($(t['layoutSelectors']['gridLayoutParent']).length){
                    highlightElement = t['layoutSelectors']['gridHighlightEl'];
                    console.log('Grid');
                }else if ($(t['layoutSelectors']['listLayoutParent']).length){
                    highlightElement = t['layoutSelectors']['listHighlightEl'];
                    console.log('List');
                }
                break;
            }
        }



        //3. Check productsListSelector array to see if location is on a product list page
        // If selector exists on page => location on product lists pages

        if ($(productsListSelector).length ){
            
            var idsArr = []
            
            $(productsListSelector).each(function(){
                idsArr.push($(this).attr(attrStr).replace(replaceStr, ''));
            });
            typeStr = i['selector']['productsListSelector'];
            // console.log('IdsArr:');
            // console.log(idsArr);
            // console.log(JSON.stringify(idsArr));
            var competitorName = window.location.host.replace('www.', '').split('.')[0];
            
            // 4. Send ids to database and receive data: list of ids, deviation
            $.ajax({
                method: 'POST',
                data: {
                    idsList: JSON.stringify(idsArr),
                    competitor: competitorName,
                    idType: i['type']
                },
                cache: false,
                url: 'http://localhost/Blueberry/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation',
                // url: 'https://cors-anywhere.herokuapp.com/http://localhost/Blueberry/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation',
                // url: 'https://cors-anywhere.herokuapp.com/https://eprice.priceedge.eu/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation',
                
            }).done(function(deviationData){
                console.log(deviationData);
                if (deviationData){
                    eval(deviationData);
                    var result = competitorDeviation;
                    
                    console.log('Loop');
                    console.log(result );
                    // 5. Go to result list, get ids and deviation and add them back in the page withi needed highlight
                    $(productsListSelector).each(function(){
                        for (var r of result){
                            if ($(this).attr(attrStr).indexOf(r['Number']) > -1){
                                var deviationStr = r['Deviation'];
                                var deviation = (parseFloat(r['Deviation'])*100).toFixed(2);
                                console.log('Dev perc');
                                console.log(deviation);
                                statusClass = '';
                                if (deviation < ranges.min){
                                    statusClass = 'success-info';
                                }else if(deviation > ranges.max){
                                    statusClass = 'alert-info';
                                }else{
                                    statusClass = 'primary-info';
                                }
                                console.log('Highlight el');
                                console.log(highlightElement);
                                // $(this).closest(parentBoxSelector).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
                                $(this).closest(parentBoxSelector).find(highlightElement).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');;
                            }
                        }
                    });
                }else{
                    alert ('For using Chrome extension features, you need to login');
                }
                

            })         
            console.log(i['selector']['productsListSelector'])
        }


        // ---------- end of product pages list
        


        break;
    }
}

   



