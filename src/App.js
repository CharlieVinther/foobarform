import { useState, useEffect } from "react";
import './index.scss';
import logo from './logo.svg';
import './App.css';
import Form from './components/Form';
import Payment from './components/Payment';
import Beerinfo from "./components/Beerinfo";

function App() {

  const [beerData, setBeerData] = useState([]);
  const [beerOrder, setBeerOrder] = useState([{ name: 'GitHop', amount: 8}]);
  const [tapData, setTapData] = useState([]);





  useEffect(() => {


      
  }, []);



  useEffect(() => {

    fetch("https://foobarspacemonkeys.herokuapp.com/beertypes")
    .then(res => res.json())
    .then(bData => setBeerData(bData))
    .then(console.log(beerData))

    fetch("https://foobarspacemonkeys.herokuapp.com/")
    .then(res => res.json())
    .then(tapData => setTapData(tapData))
    .then(console.log(tapData))

    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(beerOrder)
    };
    fetch('https://foobarspacemonkeys.herokuapp.com/order', requestOptions)
      .then(async response => {
          const isJson = response.headers.get('content-type')?.includes('application/json');
          const data = isJson && await response.json();

          console.log(data);

          // check for error response
          if (data.status > 299) {
              // get error message from body or default to response status
              const error = (data && data.message) || response.status;
              console.log(error)
          }
      
          
      })


      
  },[]);

  if (!beerData) {
    console.log('njah')
    return null;
  }

console.log(tapData.taps)
  // const beerMap = beerData.map((b) => <Beerinfo data={b} taps={tapData.taps}/>)

  return (
    <>
    <Form beer={beerData} taps={tapData.taps}/>
    <Beerinfo beerData={beerData} tapData={tapData}/>
    <Payment />
    </>
  );
}

export default App;
