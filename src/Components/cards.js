import {Col,Card, Container, Row,Image} from "react-bootstrap";
import React, { useEffect, useState } from "react";
import home from "../assets/home.jpeg";
import Rooms from "./Room"
import apto from "../assets/Edificio.jpeg";

function CardsComponent() {
    const [places, setPlaces] = useState([]);
    const [selectedPlace, setSelectedPlace] = useState(null);

    let url = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  
    const isSelectedPlaceNull = selectedPlace === null;

    useEffect(() => {
       if (!navigator.onLine) {
          if (localStorage.getItem("places") === null) {
        setPlaces([]);
      } else {
           setPlaces(JSON.parse(localStorage.getItem("places")));
      }
    } else {
    
      fetch(url)
        .then((resp) => resp.json())
        .then((jsonData) => {
          setPlaces(jsonData);
          localStorage.setItem("places", JSON.stringify(jsonData));
        })
        .catch((error) => console.error(error));
    }}, []);

     return (
        
         
    <div>   
    <Container>
        <Row >

             

         {places.map((element) => InfoCartas(element,setSelectedPlace))}
        
         </Row>
         </Container>
         {!isSelectedPlaceNull && <Rooms selectedPlace={selectedPlace} />}

          </div>
     
      );




}


function InfoCartas(place,setSelectedPlace)
{


    return(
      <Col className="col-mb-4" key={`space ${place.name}`} md="4">
        <Card onClick={() => {
                  setSelectedPlace(place);
                }}
              >
        <div className="card">
        <Image
        className="card-img-top"
        src={place.type === "house" ? home : apto}
        alt="Card image cap"
        fluid
      />
        <div className="card-body">
            <h5 className="card-title">{place.name} </h5>
            <p className="card-text">{place.address}</p>
        </div>
    </div>
    </Card>

    </Col>
    );


}

export default CardsComponent;

