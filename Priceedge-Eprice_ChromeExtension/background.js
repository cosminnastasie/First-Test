console.log('Background loaded');


function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }



chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
        
    
    
    
    console.log('Message received');


    if (message.request == 'getData'){// Data request from product list page
        console.log(message);
        var idsStr = message.idsStr;
        var competitorName = message.competitorName;
        var typeStr = message.typeStr;

        $.ajax({
            method: 'POST',
            data: {
                idsList: idsStr,
                competitor: competitorName,
                idType: typeStr
            },
            url: 'http://localhost/Blueberry/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation',
            // url: 'https://staging.priceedge.eu/eprice/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation'
        }).done(function(deviationData){
            console.log(deviationData);

            if (deviationData){
                
                var result = JSON.parse(deviationData);
                
                console.log(result );

                // Send data back to content.js
                chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                    console.log(tabs);
                    chrome.tabs.sendMessage(tabs[0].id,{'data': result, 'dataType': 'productList'});  
                });
            }
        })
    }

});




// // 4. Send ids to database and receive data: list of ids, deviation
// $.ajax({
//     method: 'POST',
//     data: {
//         idsList: JSON.stringify(idsArr),
//         competitor: competitorName,
//         idType: i['type']
//     },
//     cache: false,
//     url: 'http://localhost/Blueberry/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation',
//     // url: 'https://cors-anywhere.herokuapp.com/http://localhost/Blueberry/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation',
//     // url: 'https://cors-anywhere.herokuapp.com/https://eprice.priceedge.eu/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation',
    
// }).done(function(deviationData){
//     console.log(deviationData);
//     if (deviationData){
//         eval(deviationData);
//         var result = competitorDeviation;
        
//         console.log('Loop');
//         console.log(result );
//         // 5. Go to result list, get ids and deviation and add them back in the page withi needed highlight
//         $(productsListSelector).each(function(){
//             for (var r of result){
//                 if ($(this).attr(attrStr).indexOf(r['Number']) > -1){
//                     var deviationStr = r['Deviation'];
//                     var deviation = (parseFloat(r['Deviation'])*100).toFixed(2);
//                     console.log('Dev perc');
//                     console.log(deviation);
//                     statusClass = '';
//                     if (deviation < ranges.min){
//                         statusClass = 'success-info';
//                     }else if(deviation > ranges.max){
//                         statusClass = 'alert-info';
//                     }else{
//                         statusClass = 'primary-info';
//                     }
//                     console.log('Highlight el');
//                     console.log(highlightElement);
//                     // $(this).closest(parentBoxSelector).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');
//                     $(this).closest(parentBoxSelector).find(highlightElement).addClass('item-parent-box ' + statusClass).append('<span class="item-info-text"><span class="' + statusClass + '">' + deviation + ' %</span></span>');;
//                 }
//             }
//         });
//     }else{
//         alert ('For using Chrome extension features, you need to login');
//     }
    

// })         







