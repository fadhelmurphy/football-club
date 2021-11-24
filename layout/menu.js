import Head from "next/head";
import Image from "next/image";
import { Container, Nav, Navbar, NavDropdown, Col } from "react-bootstrap";
import styles from "../styles/Home.module.css";
import Link from "next/link";
export default function Menu() {
  const listMenu = [
    {
      text: "About",
      link: "https://fadhelmurphy.github.io/about"
    }
  ];
  return (
    <>
      <Navbar
        variant="dark"
        expand="lg"
        className="py-3 p-md-5"
        style={{ backgroundColor: "#030848" }}
      >
        <Container className="row mx-auto px-0">
          <Col data-aos="fade-down" xs="6">
            <Link href="/">
              <Navbar.Brand className="fw-bolder" href="#">
                BolaNgabs
              </Navbar.Brand>
            </Link>
          </Col>
          <Col xs="6" data-aos="fade-down" className="d-flex d-md-none">
            <Navbar.Toggle className="ms-auto" aria-controls="navbarScroll" />
          </Col>
          <Col data-aos="fade-down" xs="12" md="6" className="d-flex">
            <Navbar.Collapse id="navbarScroll">
              <Nav className="ms-auto my-2 my-lg-0" navbarScroll>
                {listMenu.map(({ link, text }) => (
                  <Link href={link}>
                    <Nav.Link className="px-3" href={link}>
                      {text}
                    </Nav.Link>
                  </Link>
                ))}
              </Nav>
            </Navbar.Collapse>
          </Col>
        </Container>
      </Navbar>
    </>
  );
}
