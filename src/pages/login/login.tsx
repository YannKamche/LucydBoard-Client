import { useEffect, useRef } from "react";
import { useLogin } from "@refinedev/core";

// Login component
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import  TextField  from "@mui/material/TextField";
import  AccountCircle  from "@mui/icons-material/AccountCircle";
import LockIcon from '@mui/icons-material/Lock';
import { InputAdornment } from "@mui/material";
import {useMediaQuery} from "@mui/material";



import { lucydBLogo, women, background, icon} from "assets";
import FacebookIcon from '@mui/icons-material/Facebook';

import { CredentialResponse } from "../../interfaces/google";

// Todo: Update your Google Client ID here
const GOOGLE_CLIENT_ID =
  "1041339102270-e1fpe2b6v6u1didfndh7jkjmpcashs4f.apps.googleusercontent.com";

export const Login: React.FC = () => {
  const { mutate: login } = useLogin<CredentialResponse>();

  const GoogleButton = (): JSX.Element => {
    const divRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (typeof window === "undefined" || !window.google || !divRef.current) {
        return;
      }

      try {
        window.google.accounts.id.initialize({
          ux_mode: "popup",
          //initialize personal Google Client Id
          client_id: process.env.REACT_APP_GOOGLE_CLIENT_ID,
          callback: async (res: CredentialResponse) => {
            if (res.credential) {
              login(res);
            }
          },
        });
        window.google.accounts.id.renderButton(divRef.current, {
          theme: "filled_blue",
          size: "medium",
          type: "standard",
        });
      } catch (error) {
        console.log(error);
      }
    }, []);

    return <div ref={divRef} />;
  };

  const containerStyle = {width: '100vw', height: "100vh",display: "flex", justifyContent: "center", alignItems: "center", };
  
  const isBigScreen = useMediaQuery('(min-width: 1024px)');
  const boxHeight = isBigScreen ? 700 : 550;

  return (
    <Container
      style={containerStyle}

    >
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="row"
        width="100%"
         height={`${boxHeight}px`}
        boxShadow="0px 0px 10px rgba(0, 0, 0, 0.3)"
        borderRadius="20px"
        
      >
        
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "15px",
          width: isBigScreen ? '50%': ''
        }}>
          {/** Logo Image */}
          <img 
              src={lucydBLogo} 
              alt="lucydb-logo" 
              style={{marginBottom: "10px" }}/>

          {/* Titles */}
          <div>
            <Typography 
                  align="center" 
                  fontSize="30px" 
                  fontFamily="Poppins"
                  fontWeight="700"
                  lineHeight="45px"
                  >
                  LOGIN
              </Typography>

              <Typography
                  align="center"
                  fontFamily="Poppins"
                  fontWeight="400"
                  fontSize="16px"
                  lineHeight="24px"

              >
                Welcome Back!
              </Typography>
          </div>

          {/* Text Fields */}
          <div 
          style={{
            marginTop: "10px", 
            display: "flex", 
            flexDirection: "column", 
            gap: "10px",
            width: "100%",
            padding: isBigScreen? '0 50px': ''
            }}>
              
               <TextField 
               label="username"
               placeholder="Username"
               fullWidth
               variant="outlined"
               style={{background: '#F0EDFF', borderRadius: '16px'}}
               InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <AccountCircle />
                    </InputAdornment>
                  ),
              }}
               />
              <TextField 
               label="password"
               placeholder="Password"
               fullWidth
               variant="outlined"
               style={{background: '#F0EDFF', borderRadius: '16px'}}
               InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon />
                  </InputAdornment>
                )
               }}
               />
            
          </div>

          {/* Buttons */}
          <div 
            style={{
              display:'flex',
              flexDirection: 'column',
              gap: '8px'
              }}>
              <Button 
              variant="contained" 
              size="large"
              sx={{  
                background: 'linear-gradient(90deg, #9181F4 0%, #5038ED 100%)',
                color: 'white', 
                borderRadius: '8px',
                fontFamily: 'Poppins',
                fontWeight: '700',
                fontSize: '12px',
                lineHeight: '18px',
                textTransform: 'capitalize',
                width: '60%',
                margin: 'auto',
                padding: '12px'
              }}
              >
                Login</Button>
                <p style={{fontFamily: 'Poppins', textAlign:'center'}}><span style={{fontWeight: '700'}}>Login </span>with Others</p>
                <Button 
                startIcon={<FacebookIcon style={{fontSize: '30px', color: '#1976d2'}}/>}
                  style={{
                    textTransform: 'none', 
                    fontFamily: 'Poppins', 
                    fontSize: '14px', 
                    color: 'black',
                    width: '100%',
                    border: '1px',
                    borderStyle: 'solid',
                    borderColor: '#F0EDFF'

                    }}><span style={{fontWeight: '700'}}>Login</span>with Facebook</Button>
              <GoogleButton />
          </div>

        </div>
        
        
        {isBigScreen && (
          <div style={{ width: "50%", height: "100%", backgroundImage: `url(${background})`, display: "flex", justifyContent: "center", alignItems: "center", borderTopRightRadius: "20px", borderBottomRightRadius: "20px"}}>
            <div style={{ width: "50%", height: "50%", borderRadius: "30px", position: "relative", borderWidth: "1px", borderColor: "white", borderStyle: "solid", backgroundColor: "#9889F5" }}>
              <div style={{ position: "absolute", right: "-6rem", bottom: "-4rem"}}>
                <img src={women} width="600px" height="500px" alt="women-holding-tablet" />
              </div>

              <div style={{width: "150px", height: "80px", position: "absolute", left: "5px"}}>
                <p style={{fontFamily: "poppins", fontSize: "18px", lineHeight: "20px", color: "white", fontWeight: "700"}}>Very good works are waiting for you. Login Now!!!</p>
              </div>

              <div style={{position: "absolute", bottom: '3rem', left: "-2rem"}}>
                <img src={icon} alt="icon" />
              </div>
            </div>
          </div>
        )}
        

        

        {/* <Typography align="center" color={"text.secondary"} fontSize="12px">
          Powered by
          <img
            style={{ padding: "0 5px" }}
            alt="Google"
            src="https://refine.ams3.cdn.digitaloceanspaces.com/superplate-auth-icons%2Fgoogle.svg"
          />
          Google
        </Typography> */}
      </Box>
    </Container>
  );
};
