import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Alert from "react-bootstrap/Alert";
import Navbar from "react-bootstrap/Navbar";

export interface LayoutParams {
  title: string;
  intro: string;
  children: React.ReactNode;
}

const Layout = ({ title, intro, children }: LayoutParams): React.ReactNode => {
  return (
    <Container fluid>
      <Row>
        <Col>
          <Navbar bg="light" variant="light">
            <Navbar.Brand href="#home">
              <img
                alt=""
                src="/assets/controller.png"
                width="52"
                height="30"
                className="d-inline-block align-top"
              />
              {` -- ${title} --`}
            </Navbar.Brand>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <Col>
          <Alert variant="info">{intro}</Alert>
        </Col>
      </Row>
      <Row>
        <Col>{children}</Col>
      </Row>
    </Container>
  );
};

export default Layout;
