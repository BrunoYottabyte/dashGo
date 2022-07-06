import dynamic from 'next/dynamic';
import moment from 'moment'
const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});



interface AreaChartProps{
    arr: number[];
    title?: string;
}

export function AreaChart({arr, title}: AreaChartProps){

     const options = {
          chart: {
               zoom: {
                    enabled: false
               },
               background: 'transparent',
               foreColor: 'var(--gray-400)',
               export: {
                    csv: {
                      filename: 'undefined',
                      columnDelimiter: ',',
                      headerCategory: 'category',
                      headerValue: 'value',
                      dateFormatter(timestamp) {
                        return new Date(timestamp).toDateString()
                      }
                    }
               }
          },
          grid: {
               show: false,
          },
          dataLabels: {
               enabled: false
          },
          tooltip: {
               theme: 'light',
               foreColor: 'var(--gray-400)',  
             
          },
      
          xaxis: {
               type: 'category',
               axisBorder: {
                    color: 'var(--gray-400)'
               },
               axisTicks: {
                    color: 'var(--gray-400)'
               },
               categories: [
                    `Mon - ${moment().weekday(1).format('DD')}`,
                    `Tue - ${moment().weekday(2).format('DD')}`,
                    `Wed - ${moment().weekday(3).format('DD')}`,
                    `Thu - ${moment().weekday(4).format('DD')}`,
                    `Fri - ${moment().weekday(5).format('DD')}`,
                    `Sat - ${moment().weekday(6).format('DD')}`,
                    `Sun - ${moment().weekday(0).format('DD')}`,
               ]
          },
          yaxis: {
               labels: {
                    formatter: function (val) {
                        return val.toFixed(0)
                    }
                }
          },
          fill: {
                   gradient: {
                    shade: 'dark',
                    opacityFrom: 1,
                    opacityTo: 0.2
               },
              
          },
          title: {
               text: title,
               align: 'right',
               offsetX: -35,
               offsetY: -2,
               floating: true,
               style: {
                 fontSize:  '15px',
                 fontWeight:  'bold',
                 color:  'var(--gray-400)'
               },
           }
      };
      

    const series = [
        {
            name: 'Registered Records',
            data: arr.map(i => i)
        }
    ]
    return(
        <Chart options={options} series={series} type="area" height={180} />
    )
}