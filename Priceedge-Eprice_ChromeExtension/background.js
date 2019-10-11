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
            cache: false,
            // url: 'http://localhost/Blueberry/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation',
            url: 'https://staging.priceedge.eu/eprice/rdTemplate/rdData.aspx?rdData=ChromeExtension.GetCompetitorDeviation&rdDataID=competitorDeviation'
        }).done(function(deviationData){
            console.log(deviationData);

            if (deviationData){
                if (IsJsonString(deviationData)){
                    var result = JSON.parse(deviationData);
                
                    console.log(result );
                    console.log('logged in   ');
                    // Send data back to content.js
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                        console.log(tabs);
                        chrome.tabs.sendMessage(tabs[0].id,{'data': result, 'dataType': 'productList'});  
                    });
                }else{
                    console.log('Possible not to be logged in');
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                        console.log(tabs);
                        chrome.tabs.sendMessage(tabs[0].id,{ 'dataType': 'loginCheck'});  
                    });
                }
                
            }
        })
    }

});


