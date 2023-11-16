import { Container, Card, ListGroup } from "react-bootstrap";

function About() {
  return (
    <div>
        <br/>
        <br/>
        <br />
    <Container>
      <Card>
        <Card.Body>
          <Card.Title style={{textAlign :"center"}}>About Indeed</Card.Title>
          <br/>
          <Card.Text>
            Welcome to Indeed, a leading platform for job search and employment
            opportunities. At Indeed, we are dedicated to connecting job
            seekers with their dream careers and helping employers find the
            right talent to foster growth and success.
          </Card.Text>

          <Card.Text>
            <strong>Our Vision:</strong>
            <br />
            To empower individuals by providing them with the tools and
            resources needed to advance their professional lives and achieve
            career fulfillment.
          </Card.Text>

          <Card.Text>
            <strong>What Sets Us Apart:</strong>
            <br/>
            <ListGroup>
              <ListGroup.Item>
                <strong>Extensive Job Listings:</strong> Explore a vast array
                of job opportunities across various industries and locations.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>User-Friendly Interface:</strong> Our platform is
                designed with user experience in mind, ensuring ease of
                navigation and accessibility.
              </ListGroup.Item>
              <ListGroup.Item>
                <strong>Employer Solutions:</strong> We offer comprehensive
                solutions for employers, making it simple to find the perfect
                candidates for their teams.
              </ListGroup.Item>
            </ListGroup>
          </Card.Text>

          <Card.Text>
            Join Indeed today to embark on a journey of professional growth and
            discover endless possibilities for your career.
          </Card.Text>
        </Card.Body>
      </Card>
    </Container>
    </div>
  );
}

export default About;
