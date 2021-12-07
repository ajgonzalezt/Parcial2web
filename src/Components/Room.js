import React, { useEffect, useState } from "react";
import { Card, Col, Container, Row, Image, Table } from "react-bootstrap";
import { FormattedMessage } from "react-intl";
import Cama from "../assets/Cama.png";
import Cocina from "../assets/Cocina.png";
import Comedor from "../assets/Comedor.png";
import Sala from "../assets/Sala.png";
import Tabla from "./Tabla"
import Charts from "./Charts"


function Room(props) {
    const [rooms, setRooms] = useState([]);
    const [selectedRoom, setSelectedRoom] = useState(null);

    const url =
      "https://gist.githubusercontent.com/josejbocanegra/92c90d5f2171739bd4a76d639f1271ea/raw/9effd124c825f7c2a7087d4a50fa4a91c5d34558/rooms.json";
  
    useEffect(() => {

      let currentRooms = [];
  
      if (!navigator.onLine) {
        if (localStorage.getItem("rooms") === null) {
          setRooms([]);
        } else {
          let r = JSON.parse(localStorage.getItem("rooms"));
          r.map((e) => {
            if (e.homeId === props.selectedPlace.id) {
              currentRooms.push(e);
            }
          });
          setRooms(currentRooms);
        }
      } else {
        fetch(url)
        .then((resp) => resp.json())
        .then((jsonData) => {
            console.log("JSON Data", jsonData);
            setRooms(jsonData.filter((element) => element.homeId === props.selectedPlace.id));
            localStorage.setItem("rooms", JSON.stringify(jsonData));
        })
        .catch((error) => console.error(error));
    }}, [props, props.selectedPlace]);

  
  
    const isSelectedRoomNull =selectedRoom === null;
    return (
      <div>
        <h2
          className="roomTitle"
          style={{ textAlign: "left", marginLeft: "2rem" }}
        >
          <FormattedMessage id="rooms" />
        </h2>
        <Container>
          <Row>
            <Col md="5">
              <Row>
                {rooms.map((e, i) => (
                  <Col md="4" key={`room ${i}`}>
                    <Card
                      onClickCapture={() => {
                        setSelectedRoom(e);
                        console.log("selectedRoom ", selectedRoom);
                      }}
                    >
                      <Card.Title className="roomTitle">
                        {RommName(e.name)}
                      </Card.Title>
                      <Image src={Imagen(e.name)} />
                    </Card>
                  </Col>
                ))}
              </Row>
            </Col>
            <Col >             
            {!isSelectedRoomNull&& <Tabla  selectedRoom={selectedRoom}/>}
            </Col>
            <Charts  rooms={rooms}/>
          </Row>
        </Container>
      </div>
    );
  }
function  Imagen(roomName){
    
    if (roomName ==="Kitchen")
      return Cocina;    
    else if (roomName ==="Dinner room")
      return Comedor;
    else if (roomName ==="Living room")
      return Sala;
    else
      return Cama;
}

function RommName(roomName)
{
    if (roomName ==="Kitchen")
        return <FormattedMessage id="kitchen" />; 
    else if (roomName ==="Dinner room")
        return <FormattedMessage id="dinnerRoom" />; 
    else if (roomName ==="Living room")
      return <FormattedMessage id="livingRoom" />; 
    else
      return <FormattedMessage id="bedroom" />; 
}
  
export default Room;

