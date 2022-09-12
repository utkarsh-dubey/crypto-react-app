import { Container, createTheme, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, ThemeProvider, Typography } from '@material-ui/core';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Pagination from '@material-ui/lab/Pagination';

const CoinsTable = () => {

    const [dataAPI, setDataAPI] = useState([]);
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);

    const callAPI = async () => {
        setLoading(true);
        try {
            const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=inr');
            console.log(response);
            setDataAPI(response.data);
            setLoading(false);
        }
        catch {
            console.log("error");
        }
    }

    useEffect(() => {
        callAPI();
        // console.log(dataAPI);
    }, [])

    const darkTheme = createTheme({
        palette: {
            primary: {
                main: "#fff"
            },
            type: "dark"
        }
    });

    return (
        <>

            <ThemeProvider theme={darkTheme}>
                <Container style={{ textAlign: 'center' }}>
                    <Typography variant="h4">
                        Cryptocurrency Prices by Market Cap
                    </Typography>

                    <TextField
                        label="Search for a cryptocurrency.."
                        variant='outlined'
                        style={{ width: "100%", marginBottom: 20, marginTop: 10 }} />


                    <TableContainer>
                        <Table >
                            <TableHead style={{ backgroundColor: "red" }}>
                                <TableRow>
                                    <TableCell style={{
                                        color: "black",
                                        fontWeight: "700",
                                    }}>
                                        Coin
                                    </TableCell>
                                    <TableCell style={{
                                        color: "black",
                                        fontWeight: "700",
                                    }}>
                                        Price
                                    </TableCell>
                                    <TableCell style={{
                                        color: "black",
                                        fontWeight: "700",
                                    }}>
                                        24H Change
                                    </TableCell>
                                    <TableCell style={{
                                        color: "black",
                                        fontWeight: "700",
                                    }}>
                                        MarketCap
                                    </TableCell>
                                </TableRow>
                            </TableHead>

                            {!loading ? <TableBody>

                                {
                                    dataAPI.slice((page-1)*10, (page-1)*10+10).map(i => {
                                        return (
                                            <TableRow>
                                                <TableCell style={{ display: "flex", gap: 10 }}>
                                                    <img src={i.image} height="30" style={{ marginBottom: 10 }}></img>
                                                    <div style={{ display: "flex", flexDirection: "column", color:"darkgrey" }}>
                                                        <span style={{ textTransform: "uppercase", fontSize: 18 }}>{i.symbol}</span>
                                                        <span>{i.name}</span>
                                                    </div>
                                                </TableCell>
                                                <TableCell style={{color:"darkgrey"}}>
                                                    {i.current_price}
                                                </TableCell>
                                                <TableCell style={{ color: (i.market_cap_change_percentage_24h > 0) ? "green" : "red" }}>
                                                    {i.market_cap_change_percentage_24h}
                                                </TableCell>
                                                <TableCell style={{color:"darkgrey"}}>
                                                    {i.market_cap}
                                                </TableCell>


                                            </TableRow>
                                        )
                                    })
                                }

                            </TableBody> : (<h1>Loading</h1>)}

                        </Table>
                    </TableContainer>
                    <Pagination
                        count={dataAPI?.length/10}
                        style={{
                            padding:20,
                            width:"100%",
                            display:"flex",
                            justifyContent:"center"
                        }}
                        onChange={(_,value)=>{
                            setPage(value);
                        }}>
                        
                    </Pagination>
                </Container>
            </ThemeProvider>



        </>
    )
}

export default CoinsTable