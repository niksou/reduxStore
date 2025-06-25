import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"
import DishesList from './Pages/DishesList'
import Cart from "./Pages/Cart";
import {useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {Box,Toolbar,Typography,Button,AppBar} from "@mui/material";

function App() {
    const items = useSelector((state:any)=>state.cart)
    const navigate = useNavigate()
    
    console.log("niksou");
    
  return (
    <>
        <Box>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        Wolt Redux
                    </Typography>
                    <Button color="inherit" onClick={()=>navigate('/cart')}>
                        CART ({items.length})
                    </Button>
                    <Button color="inherit" onClick={()=>navigate('/')}>
                        ראשי
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
      <Routes>
        <Route path="/" element={<DishesList />} />
          <Route path="/cart" element={<Cart/>}/>
      </Routes>
    </>
  )
}

export default App
