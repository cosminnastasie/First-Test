console.log('Background loaded');

function IsJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
  }

// If extension button is clicked send message to content to display the popup
chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('Clicked');    

    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
        if (tabs.length){
            chrome.tabs.sendMessage(tabs[0].id,{'action': 'openPopup'});  
        }else{
            console.log('No tab identified');
        }
    });
});


chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {

    console.log('Message received');
    // Check login
    if (message.request == "checkLogin"){
        
        loginUrl = message.loginUrl

        $.ajax({
            method: 'POST',
            url: loginUrl
        }).done(function(data){
            var loginState = false;
            if (IsJsonString(data)){
                loginState = true
            }
            //Get tab info; check if it's on a tracked page
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                console.log(tabs);
                chrome.tabs.sendMessage(tabs[0].id,{ 'loginState': loginState});  
            });
        })
    }



    if (message.request == 'getData'){// Data request from product list page
        console.log(message);
        var idsStr = message.idsStr;
        var competitorName = message.competitorName;
        var typeStr = message.typeStr;
        var competitorDeviationUrl = message.competitorDeviationUrl

        $.ajax({
            method: 'POST',
            data: {
                idsList: idsStr,
                competitor: competitorName,
                idType: typeStr
            },
            cache: false,
            url: competitorDeviationUrl
        }).done(function(deviationData){
            console.log(deviationData);

            if (deviationData){
                if (IsJsonString(deviationData)){
                    var result = JSON.parse(deviationData);
                
                    console.log(result );
                    console.log('Logged in   ');
                    // Send data back to content.js
                    chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                        if (tabs.length){
                            console.log('Tabs ok')
                            console.log(tabs);
                            chrome.tabs.sendMessage(tabs[0].id,{'data': result, 'dataType': 'productList'});  
                        }else{
                            console.log('No tab identified');
                        }
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

    if (message.request == 'getProductData'){
        console.log(message.url);
        $.ajax({
            method: 'POST',
            data: {},
            cache: false,
            url: message.url
        }).done(function(data){
            console.log('Data: ', data);
            chrome.tabs.query({active: true, currentWindow: true}, function(tabs){
                if (tabs.length){
                    console.log('Tabs ok')
                    chrome.tabs.sendMessage(tabs[0].id,{'data': data, 'dataType': 'competitorPrices'});  
                }else{
                    console.log('No tab identified');
                }
            });
        });
    }

});


