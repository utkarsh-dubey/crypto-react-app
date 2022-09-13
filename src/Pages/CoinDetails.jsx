import { makeStyles, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import Graph from '../components/Graph';



const useStyles = makeStyles(()=>({
    container: {
        display: 'flex',
    },

    leftSide: {
        width:"30%",
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        marginTop:30,
        borderRight: "2px solid grey"
    },
    description: {
        width:"70%",
        padding:25,
        paddingBottom:15,
        paddingTop:0,
        textAlign:"justify"
    }
}));

const CoinDetails = () => {

    const {id} = useParams();
    const [coinDetail,setCoinDetail] = useState({});
    const [loading, setLoading] = useState(true);

    const getCoinDetails = async()=>{
        setLoading(true);
        const {data} = await axios.get('https://api.coingecko.com/api/v3/coins/bitcoin');
        setCoinDetail(data);
       
    }
    useEffect(()=>{
        getCoinDetails();
        setLoading(false);
    },[]);

    

    const classes = useStyles();

  return (
    <>
          {!loading ? (
              <div className={classes.container}>
                  <div className={classes.leftSide}>
                      <img src={coinDetail?.image?.large} height='200' style={{ marginBottom: 30 }}></img>
                      <Typography variant='h3'>
                          {coinDetail?.name}
                      </Typography>
                      <Typography className={classes.description}>
                          {coinDetail?.description?.en.split('.')[0]}.
                      </Typography>
                      <div>
                          <Typography style={{ fontWeight: 'bold', fontSize: 30 }}>Rank: {coinDetail?.market_cap_rank}</Typography>
                          {/* <Typography>Current Price: {coinDetail?.market_data?.current_price}</Typography>
                <Typography>Market Cap: {coinDetail?.market_data?.market_cap?.inr}</Typography> */}
                      </div>
                  </div>
                  <div>
                    <Graph id={coinDetail?.id}/>
                  </div>
              </div>
    ):(<h1>loading</h1>)}</>
    
    
  )
}

export default CoinDetails