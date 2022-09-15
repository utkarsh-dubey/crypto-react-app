import { AppBar, Typography, Container, makeStyles, Button, ThemeProvider, createTheme } from '@material-ui/core'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useUser } from '../Context/User'
import LoginButton from './LoginButton'


const useStyles = makeStyles(() => ({
    container: {
        display: "flex",
        padding: 15
    },
    title: {
        flex: 1,
        fontWeight: 'bold'
    }
}))




const Header = () => {

    const navigate = useNavigate();
    const classes = useStyles();
    const { user, setUser } = useUser();
    const handleLogout = () => {
        setUser()
    }
    const darkTheme = createTheme({
        palette: {
          primary: {
            main: "#fff",
          },
          type: "dark",
        },
      });
    return (
        <div>
        
            <ThemeProvider theme={darkTheme}>
                <AppBar color="transparent" position="static">
                    <Container className={classes.container}>
                        <Typography variant='h6' className={classes.title} onClick={()=>navigate('/')}>
                            Crypto
                        </Typography>
                        {user ? (
                            <>
                                <Typography variant='h7'>
                                    Welcome {user.email}
                                </Typography>
                                <Button
                                    variant="contained"
                                    style={{ width: 80, height: 40, backgroundColor: "#FF0000" }}
                                    onClick={handleLogout}>
                                    Logout
                                </Button>
                            </>

                        ) : (<LoginButton />)}
                    </Container>
                </AppBar>
            </ThemeProvider>

        </div>
    )
}

export default Header