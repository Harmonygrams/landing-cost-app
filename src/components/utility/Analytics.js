import Chart from 'react-apexcharts'
const Analytics = ({productNames, landingPrices, landingAmounts}) => {
    console.log('These are the landing prices', landingPrices)
    const state = {
      series: landingPrices,
      options: {
        chart: {
          type: 'pie',
        },
        labels: productNames,
        center: [100, 100],  // specify the x and y coordinates of the center of the donut chart
        dataLabels : {
          enabled : true,
        }, 
        legend : {
          position : 'left',

        }, 
        
      },
    }
    const barChartOptions = {
          
      series: [{
        data: landingAmounts
      }],
      options: {
        chart: {
          type: 'bar',
          height: 350
        },
        plotOptions: {
          bar: {
            borderRadius: 4,
            horizontal: true,
          }
        },
        dataLabels: {
          enabled: false
        },
        xaxis: {
          categories: productNames,
        }
      },
    
    
    }
    return (
        <div className="analytics mt-4"> 
            <div className='mt-4 py-4'> 
                <h1 className="text-xl text-center font-semibold bg-black text-white py-2 rounded-lg"> Analytics </h1>
            </div>
            <div className='w-full my-8 flex items-start gap-2'>
              <div className="donut w-1/2 px-4">
                <h2 className='font-semibold inline-block analytics-col-1-heading'>Landing Cost Price</h2>
                <Chart 
                  options={state.options}
                  series={state.series} 
                  type="pie" 
                  width={"100%"} 
                  />
              </div>
              <div className='bar w-1/2 px-4'>
                <h2 className='font-semibold inline-block analytics-col-1-heading analytics-heading-2'>Amount Per Item</h2>
                <Chart 
                  options={barChartOptions.options}
                  series={barChartOptions.series} 
                  type="bar" 
                  width={"100%"} 
                />
              </div>
            </div>
        </div>
    )
}
export default Analytics