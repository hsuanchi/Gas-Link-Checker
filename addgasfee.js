
function addGasFee(){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", "https://www.etherchain.org/api/gasPriceOracle", false );
    xmlHttp.send( null );
    var result = JSON.parse(xmlHttp.responseText);
    var recommendedBaseFee = result['recommendedBaseFee'];
    var currentBaseFee = result['currentBaseFee'];
    console.log(recommendedBaseFee);
    console.log(currentBaseFee);
    document.getElementById("currentBaseFee").innerHTML = "Current Base Fee: "+currentBaseFee;
    document.getElementById("recommendedBaseFee").innerHTML = "Recommended Base Fee: "+recommendedBaseFee;
}

addGasFee()
