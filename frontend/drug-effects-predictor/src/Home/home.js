import React, { useState } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import NavbarCustom from '../Navbar/NavbarCustom'

function Home() {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [selectedResult, setSelectedResult] = useState('');
  const [returnValue, setReturnValue] = useState('');
  const handleSearchChange = (value) => {
    setSearchTerm(value);
  };

  const handleSelectChange = (value) => {
    console.log(value)
    if(value !== undefined){
      setSelectedResult(value);
    }
    // Call handleSubmit1 when the selected result changes
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      console.log(searchTerm);
      const response = await fetch(`http://localhost:5000/search?term=${searchTerm}&selectedResult=${selectedResult}`);
      if (response.ok) {
        const data = await response.json();
        // setSearchResults(data);
        setSearchResults([])
        if(data.results !== undefined){
        setSearchResults(data.results)
        }
        // setReturnValue(data.results);
        console.log(returnValue)
      } else {
        alert("Invalid Creds");
        console.error('Error fetching search results:', response.statusText);
      }
    } catch (error) {
      alert("Invalid Creds");
      console.error('Error fetching search results:', error);
    }
  };

  const handleClick1 = async (event) => {
    event.preventDefault();
    try {
      console.log(selectedResult);
      const response = await fetch(`http://localhost:5000/model?selectedResult=${selectedResult}&email=${localStorage.getItem("email")}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults([])
        if(data.results !== undefined){
          setSearchResults(data.results);
        }
        
        setReturnValue(data.results)
      alert("You may have "+data.result)
      } else {
        console.error('Error fetching search results:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
    }
  };

  return (
    <div>
    <NavbarCustom />
    <Container className="justify-content-center align-items-center custom-flex-width" style={{ minHeight: "100vh", width: "70vw", marginTop: "10%", marginBottom: "10%" }}>
      <Form onSubmit={handleSubmit}>
        <Row>
          <h2 className="text-center mb-4">Home</h2>
          <Col md={8}>
            <Form.Group id="search" className="mb-3">
              <Form.Control
                placeholder="Search Your Drug/Vaccine"
                type="text"
                value={searchTerm}
                onChange={(e) => handleSearchChange(e.target.value)}
                onKeyUp={handleSubmit} // Trigger search on key up
                required
              />
            </Form.Group>
            <Form.Group id="select" className="mb-3">
              <Form.Select
                value={selectedResult}
                onChange={(e) => handleSelectChange(e.target.value)}
                required
              >
                <option value="">Select a Result</option>
                {searchResults.map((result, index) => (
                  <option key={index} value={result}>{result}</option>
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md={4}>
            <Button className="w-100" type="submit"  onClick={handleClick1}>Search</Button>
          </Col>
        </Row>
      </Form>
    </Container>
    </div>
  );
}

export default Home;