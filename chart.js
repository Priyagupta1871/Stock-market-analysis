const convas = document.getElementById('myChart');
let ctx = convas.getContext('2d');
const oneMo= document.getElementById('1mo');
const threeMo= document.getElementById('3mo');
const oneY= document.getElementById('1y');
const fiveY=document.getElementById('5y');
let currentCompany;
let chartInstance;


oneMo.addEventListener('click',()=>{
    chartInstance.destroy();


    
    //ctx.clearRect(0, 0, convas.width, convas.height);

    getChart(currentCompany,'1mo');

})

threeMo.addEventListener('click',()=>{

   // ctx.clearRect(0, 0, convas.width, convas.height);

   // ctx=convas.getContext('2d');

   chartInstance.destroy();



    getChart(currentCompany,'3mo');

})

oneY.addEventListener('click',()=>{
    chartInstance.destroy();

    getChart(currentCompany,'1y');
    

    
})

fiveY.addEventListener('click',()=>{
    chartInstance.destroy();

    getChart(currentCompany,'5y');

})

async function getChart(company,timeFilter){
    try{
        currentCompany=company;
        const result= await fetch('https://stocksapi-uhe1.onrender.com/api/stocks/getstocksdata');
        if(!result.ok){
            throw new Error('data not found')
        }
        const response = await result.json();
        
        showChart(response.stocksData[0][currentCompany][timeFilter]['timeStamp'],response.stocksData[0][currentCompany][timeFilter]['value']);
    
    }catch(error){
    console.log(error);
    }
    
    }



function showChart(timestamp,value){
    const labels = timestamp.map(ts => {
        const date = new Date(ts * 1000); // Convert Unix timestamp to milliseconds
        return `${date.getMonth() + 1}/${date.getDate()}/${date.getFullYear()}`;
    });
    
    // Set up Chart.js
  chartInstance= new Chart(ctx, {
        type: 'line', // The type of chart
        data: {
            labels: labels, // X-axis labels (dates)
            datasets: [{
                label: '', // Label for the dataset
                data: value, // Y-axis values
                borderColor: 'rgba(75, 192, 192, 1)', // Line color
                backgroundColor: 'rgba(75, 192, 192, 0.2)', // Fill color under the line
                borderWidth: 1
            }]
        },
        options: {
            plugins: {
                tooltip: {
                    callbacks: {
                        // Custom tooltip label function
                        label: function(context) {
                            // Get index of the current data point
                            const index = context.dataIndex;
                            // Get value and label (date)
                            const value1 = value[index];
                            const date = labels[index];
                            // Return custom tooltip content
                            return `${currentCompany}  Date: ${date}  Value: $${value1.toFixed(2)}`;
                        }
                    }
                }
            },
            scales: {
                x: {
                    beginAtZero: true,
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 10 // Limits number of ticks on the x-axis
                    }
                },
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}

 export {getChart,chartInstance};