import Image from "react-bootstrap/Image";
import React, { useEffect, useState } from "react";

function CardsComponent() {
    const [places, serPlaces] = useState([]);
    const [selectedPlaves, setSelectedPlaces] = useState(null);
  
    let url = "https://gist.githubusercontent.com/josejbocanegra/0067d2b28b009140fee423cfc84e40e6/raw/6e6b11160fbcacb56621b6422684d615dc3a0d33/spaces.json";
  
    
  
    console.log("urlll", url);
    useEffect(() => {
      fetch(url)
        .then((resp) => resp.json())
        .then((jsonData) => {
          console.log("JSON Data", jsonData);
          serPlaces(jsonData);
        })
        .catch((error) => console.error(error));
    }, []);

     return (
        
         

         
        <div>

             

         {places.map((element) => InfoCartas(element))}
        
         </div>
          
      );




}


function InfoCartas(place)
{

    return(
        <div className="card">
        <div className="card-body">
            <h5 className="card-title">{place.name} </h5>
            <p className="card-text">{place.address}</p>
        </div>
    </div>
    );


}

export default CardsComponent;

