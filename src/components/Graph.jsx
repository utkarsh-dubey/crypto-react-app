import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import {Line} from 'react-chartjs-2';

const Graph = ({id}) => {

    const [graphData,setGraphData] = useState([]);
    const [loading, setLoading] = useState(true);
    // const chartRef = useRef();
    const getData = async()=>{
        const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=inr&days=30');
        console.log(data);
        setGraphData(data.prices);
        setLoading(false);
    }

    useEffect(()=>{
        console.log("works");
        // chartRef.current.update();
        getData();
    },[]);

    const labels = [1,2,3,4,5,6,7];
const data = {
  labels: labels,
  datasets: [{
    label: 'My First Dataset',
    data: [65, 59, 80, 81, 56, 55, 40],
    backgroundColor: [
      'rgba(255, 99, 132, 0.2)',
      'rgba(255, 159, 64, 0.2)',
      'rgba(255, 205, 86, 0.2)',
      'rgba(75, 192, 192, 0.2)',
      'rgba(54, 162, 235, 0.2)',
      'rgba(153, 102, 255, 0.2)',
      'rgba(201, 203, 207, 0.2)'
    ],
    borderColor: [
      'rgb(255, 99, 132)',
      'rgb(255, 159, 64)',
      'rgb(255, 205, 86)',
      'rgb(75, 192, 192)',
      'rgb(54, 162, 235)',
      'rgb(153, 102, 255)',
      'rgb(201, 203, 207)'
    ],
    borderWidth: 1
  }]
};



  return (
    <div>
        {!loading? (<Line 
                    // ref = {chartRef }
                    data = { data
                    //     {
                    //     labels:graphData?.map((i)=>{
                    //         let date = new Date(i[0]);
                    //         return date.toLocaleDateString();
                    //         }),
                    //     datasets: [
                    //         {
                    //             data : graphData.map((i)=>{
                    //                 i[1]
                    //             }),
                    //             label: "Prices"
                    //         }
                    //     ]
                    // }}
                    }
        />):(<h1>loading..</h1>)}
        
    </div>
  )
}

export default Graph