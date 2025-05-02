import React from 'react'
import { Line,Doughnut } from 'react-chartjs-2'
import { Chart as ChartJS,Tooltip,Filler,CategoryScale,LinearScale,
    PointElement,LineElement,ArcElement,Legend,
    plugins,
    scales
  } from 'chart.js'
import { BorderColor } from '@mui/icons-material';
import { lightpurple, purple ,orange} from '../../constants/Color';
import { getLast7Days } from '../../lib/features';

  ChartJS.register(
    Tooltip,Filler,CategoryScale,LinearScale,
    PointElement,LineElement,ArcElement,Legend);
const labels=getLast7Days();
console.log(labels)

const lineChartOptions={
//it is just a setting for the line graph
responsive:true,
plugins:{
  legend:{
    display:false,
  },
  title:{
    display:false,
  },
},
scales:{
  x:{
    grid:{
      display:false,
    }
  }
,
  y:{
    beginAtZero:true,
    grid:{
      display:false,
    }

  }
}

};

const LineChart = ({value=[]}) => {
const data={
  labels,
  datasets:[
      
      {
      
        data :value,
        label:"Message",
        fill:true,
        backgroundColor:lightpurple ,
        borderColor:purple
      
      
      },
    

      ],
};

  return  <Line data={data} options={lineChartOptions}/>
}



const doughnutChartoption={//this is the setting for the doughnut chart
  responsive:true,
  plugins:{
    legend:{
      display:false,
    },
    // title:{
    //   display:false,
    // },

  },

  cutout:120
}

// The DoughnutChart component is used to visually represent proportional data in a circular format, where each segment corresponds to a percentage of the whole. It helps 
//  understanding the distribution of data at a glance.
// it is used in the shark tank india
const DoughnutChart = ({value=[],labels=[]}) => {
  
  const data={
    labels,
    datasets:[ 
        {
          data :value,
          backgroundColor:
            [lightpurple,orange],
             
          borderColor:[
            purple,orange],
            offset:40
            
        
        
        },
      
  
        ],
  };  
  return <Doughnut  style={{zIndex:10}} data={data}  options={doughnutChartoption}/>

}
export {LineChart,DoughnutChart}
 
