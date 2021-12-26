function addGasFee(){
    console.log('add gas fee function being called')
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://www.etherchain.org/api/gasPriceOracle", false );
    xmlHttp.send( null );
    var result = JSON.parse(xmlHttp.responseText);
    var recommendedBaseFee = result['recommendedBaseFee'];
    var currentBaseFee = result['currentBaseFee'];

    var currentElement = document.getElementById("currentGas");
    var recommendedElement = document.getElementById("recommendedGas");
    currentElement.getElementsByClassName("buttonFee")[0].innerHTML=currentBaseFee;
    recommendedElement.getElementsByClassName("buttonFee")[0].innerHTML=recommendedBaseFee;
}

addGasFee()
