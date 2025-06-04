import React from 'react';
// import { Container, Row, Col, Card } from 'react-bootstrap';
import { Doughnut, Line,Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';
import { Container, Row, Col, Card } from 'react-bootstrap';
  // Now you can create your chart using these registered components

import NavbarCustom from '../Navbar/NavbarCustom'
  

const DashboardPage = () => {
  // Sample data for the Line Chart
  
  const lineChartData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
      {
        label: 'Users Over Time',
        data: [65, 59, 80, 81, 56, 55, 40],
        fill: false,
        backgroundColor: 'rgb(75, 192, 192)',
        borderColor: 'rgba(75, 192, 192, 0.2)',
      },
    ],
  };

  // Sample data for the Doughnut Chart
  const doughnutChartData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
      {
        label: 'Dataset 1',
        data: [300, 50, 100],
        backgroundColor: ['rgb(255, 99, 132)', 'rgb(54, 162, 235)', 'rgb(255, 205, 86)'],
        hoverOffset: 4,
      },
    ],
  };

  return (
    <div>
      <NavbarCustom />
      <Container fluid>
        <Row className="mt-4" style={{ margin: "50px" }}>
          <Col md={6}>
            <Card style={{ width: "98%", height: "100%" }}>
              <Card.Body>
                <Card.Title>Line Chart</Card.Title>
                <Line style={{ width: "90%", height: "95%" }} data={lineChartData} />
              </Card.Body>
            </Card>
          </Col>
          <Col md={6}>
            <Card style={{ width: "98%", height: "100%", float: "right" }}>
              <Card.Body>
                <Card.Title>Pie Chart</Card.Title>
                {/* Wrap the Pie chart in a div to control its size */}
                <div style={{ width: "50%", height: "auto",margin:"auto" }}>
                  <Pie data={doughnutChartData} options={{ maintainAspectRatio: true }} />
                </div>
              </Card.Body>
            </Card>
          </Col>
        </Row>
        {/* Additional rows and columns for more cards/charts */}
      </Container>
    </div>
  );
};

export default DashboardPage;
