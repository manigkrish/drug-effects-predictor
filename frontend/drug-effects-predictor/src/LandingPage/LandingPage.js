import React from 'react'
import { useState } from 'react';
import {Button,Modal,Row,Col,Container,Navbar,Nav, Card} from 'react-bootstrap';
import { Link } from 'react-router-dom';

function LandingPage() {
    const [show, setShow] = useState(true);
    function handleShow() {
        
        setShow(true);
      }
  return (
    <div>
        {/* <Button onClick={handleShow}>Show MOdal</Button> */}
    <Modal show={show} fullscreen={true} style={{
        
    }}>
        
        <Modal.Body style={{ 
            backgroundColor:"#fff",
        // backgroundImage: `url('../landingbackground.png')`,
        // backgroundSize: 'cover',
        // backgroundPosition: 'center',
        // backgroundRepeat:"no-repeat",
        // filter:"blur(5px)"
        // backdropFilter: 'blur(1px)',
        
         }}>
            <img src={'../landingbackground.png'} style={{ position:"absolute", height:"97.5%",width:"97.8%", backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat:"no-repeat",
        filter:"blur(5px)",margin:"0" }}/>
            {/* <img src={'../doctor.gif'} style={{ position:"absolute",left:"68vw",top:"25vh",height:"70%" }}/> */}
            <div style={{textAlign:"center",position:"relative",top:"80px"}}>
               <h1 style={{fontFamily: "'Meie Script', cursive"}}><i><b><u>PharmaCutieCal</u></b></i></h1>
               <div style={{margin:"50px"}}>
               <p><b>Welcome to our health portal, where we provide personalized insights into potential side effects of drugs, vaccines, and medicines tailored to your unique medical history. Utilizing an AI-driven model trained on extensive clinical trials data, our platform ensures that the information is customized to you, enhancing the safety and efficacy of your healthcare decisions. Simplify your journey towards informed health decisions with our comprehensive, user-friendly resource.</b></p> 
               </div>
            </div>
{/* 
            <div>
               
            </div> */}
            <Container>
            <Card style={{position:"relative",top:"20vh",height:"auto",}}>
            <h2 className="text-center mb-4">Team Members</h2>
            <Card.Body style={{filter:"blue(5px)"}}>
           
                <Row style={{marginLeft:"14%"}}>
                <Col md={2} style={{textAlign:"center"}}>
                   
                <img src={'../anshul.jpeg'} style={{ height:"70px",width:"70px",borderRadius:"50%" }}/>
                
                <h5>Anshul<br/> Chaudhary</h5>
                
                
                
                </Col>
                <Col md={2} style={{textAlign:"center"}}>
                   
                <img src={'../abhishek.png'} style={{ height:"70px",width:"70px",borderRadius:"50%" }}/>
                
                <h5>Abhishek<br/> Nair</h5>
                
                
                
                </Col>
                <Col md={2} style={{textAlign:"center"}}>
                   
                <img src={'../muskan.JPG'} style={{ height:"70px",width:"70px",borderRadius:"50%" }}/>
                
                <h5>Muskan<br/> Raisinghani</h5>
                
                
                
                </Col>
                <Col md={2} style={{textAlign:"center"}}>
                   
                <img src={'../roshan.JPG'} style={{ height:"70px",width:"70px",borderRadius:"50%" }}/>
                
                <h5>Roshan<br/> Dadlani</h5>
                
                
                
                </Col>
                <Col md={2} style={{textAlign:"center"}}>
                   
                <img src={'../tejas.jpeg'} style={{ height:"70px",width:"70px",borderRadius:"50%" }}/>
                
                <h5>Tejas<br/> Sridhar</h5>
                
                
                
                </Col>
                
                </Row>

              
            </Card.Body>
          </Card>
            </Container>
            <Link style={{position:"relative",top:"25vh",left:"46vw"}} className="w-100" to="/login">
                <Button >Click Here!</Button>
            </Link>
        </Modal.Body>
      </Modal>
      </div>
  )
}

export default LandingPage