

import dynamic from 'next/dynamic';

const Chart = dynamic(() => import('react-apexcharts'), {
    ssr: false,
});

export const options = {
    colors: ['#ccc'],
    chart: {
        background: 'transparent',
        foreColor: 'var(--gray-400)',    
    },
    xaxis: {
        axisBorder: {
            color: 'var(--gray-400)'
       },
       axisTicks: {
            color: 'var(--gray-400)'
       },
        categories: [
            'Jan',
            'Fev',
            'Mar',
            'Abr',
            'Mai',
            'Jun',
            'Jul',
            'Ago',
            'Set',
            'Out',
            'Nov',
            'Dez',
        ]
    },
  
    tooltip: {
        theme: 'light',
        x: {
            show: true,
            format: "dd/MM/yy HH:mm"
        },
  
    },
   
    fill: {
        colors: ['var(--blue-500)']
    },
    title: {
        text: 'Records registered per month',
        align: 'center'
    }
               
}


interface PopChartsProps {
    arr: number[];
}

export function PopCharts({arr} : PopChartsProps){
    const series = [
        {
            name: 'Total Records',
            data: arr.map(i => i)
        }
    ]
    return(
  
            <Chart options={options}  series={series} type="bar" height={450} width="100%"/>
  
    )
}