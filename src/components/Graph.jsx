import axios from 'axios';
import React, { useEffect, useRef, useState } from 'react'
import {Line} from 'react-chartjs-2';
import {Chart as Chartjs,Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement} from 'chart.js';

Chartjs.register(
    Title, Tooltip, LineElement, Legend, CategoryScale, LinearScale, PointElement
)


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

  return (
    <div>
        {!loading?(<Line 

                    data = { 
                        {
                        labels:graphData.map((i)=>{
                            let date = new Date(i[0]);
                            return date.toLocaleDateString();
                            }),
                        datasets: [
                            {
                                data : graphData.map((i)=>i[1]),
                                label: "Prices",
                            }
                        ]
                    }
                    }
        />):(<h1>loading..</h1>)}
        
    </div>
  )
}

export default Graph