import { getSummary} from "./summary.js";

import { getChart,chartInstance } from "./chart.js";




const topCompanies=[ 'AAPL', 'GOOGL', 'MSFT', 'AMZN', 'PYPL', 'TSLA', 'JPM', 'NVDA', 'NFLX', 'DIS' ];

const container = document.getElementById('container');


async function getMarketData(){
    try{
  const response =await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstockstatsdata');
if(!response.ok){
    throw new Error('data not found');
}
const result= await response.json();
const firstData = result.stocksStatsData[0];

getSummary(topCompanies[0],firstData[topCompanies[0]]['bookValue'],firstData[topCompanies[0]]['profit']);
displayData(result);
    
    }catch(error){
        console.log(error);
    }

}
getMarketData();

function displayData(data){
    topCompanies.forEach(stock=>{
        const result=data.stocksStatsData[0];
        const bookValue= result[stock]['bookValue'];
        const profit= result[stock]['profit'];
        
        const companyContainer = document.createElement('div');
        companyContainer.style.marginBottom = '10px'; // 

        const compName= document.createElement('span');
        const compBookValue= document.createElement('span');
        const compProfit= document.createElement('span');

        compName.addEventListener('click',()=>{
           // printLog(stock);
           getSummary(stock,bookValue,profit);
           chartInstance.destroy();
           getChart(stock,'1mo');

        })

        compName.classList.add('compName');
        compBookValue.classList.add('bookValue');
        if(profit>0){
            compProfit.classList.add('profitGreen');
        }else{
            compProfit.classList.add('profitRed');

        }


        compName.style.marginRight = '10px';
        compBookValue.style.marginRight = '10px';


        compName.textContent=stock;
        compBookValue.textContent="$"+bookValue;
        compProfit.textContent=profit+"%";


        //console.log(result[stock]['bookValue']+"   "+result[stock]['profit']);

        companyContainer.appendChild(compName);
        companyContainer.appendChild(compBookValue);
        companyContainer.appendChild(compProfit);

        // Append the company container to the main container
        container.appendChild(companyContainer);

        getChart(topCompanies[0],'1mo');



    })
}
export { topCompanies };
