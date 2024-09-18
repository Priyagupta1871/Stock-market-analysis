import { topCompanies } from './market.js';

const container = document.getElementById('container2');
const summary = document.getElementById('summary');


async function getSummary(stockName,bookValue,profit){
    try{

        const result= await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksprofiledata');

        if(!result.ok){
            throw new Error('data not found');
        }
    const response = await result.json();
    showSummary(response,stockName,bookValue,profit);
     
    }catch(error){
        console.log(error);
    }
    }

function showSummary(response,stockName,bookValue,profit){


    const stockSummary = response.stocksProfileData[0][stockName]['summary'];

    container.innerHTML='';

    const compName= document.createElement('span');
    const compBookValue= document.createElement('span');
    const compProfit= document.createElement('span');


    compName.classList.add('compName');
    compBookValue.classList.add('bookValue');
    if(profit>0){
        compProfit.classList.add('profitGreen');
    }else{
        compProfit.classList.add('profitRed');

    }

 

    compName.textContent=stockName;
    compBookValue.textContent="$"+bookValue;
    compProfit.textContent=profit+"%";


    compName.style.marginRight = '10px';
    compBookValue.style.marginRight = '10px';


    // companyContainer.appendChild(compName);
    // companyContainer.appendChild(compBookValue);
    // companyContainer.appendChild(compProfit);

    // container.innerHTML=companyContainer;

    container.appendChild(compName);
    container.appendChild(compBookValue);
    container.appendChild(compProfit);



    summary.innerHTML=stockSummary;

    
    
    console.log("summary----->"+bookValue+"--"+profit);

}

export {getSummary};




