import Head from "next/head";
import { Container, Nav, Navbar, NavDropdown, Col } from "react-bootstrap";
import styles from "../styles/Home.module.css"
import Menu from "./menu";
export default function Header({title,desc,style}){
  const sty = {}
  if(style){
    for (const [key, value] of Object.entries(style)) {
      sty[key] = value
    }
  }
    return(<>
    <Menu/>
        <div className={styles.container} style={{backgroundColor:"#030848"}}>
          <main className={styles.main + " container"} style={sty}>
            {title && <h1 data-aos="fade-up" className={styles.title}>
              {title}
            </h1>}
  
            {desc && <p data-aos="fade-up" className={styles.description}>
              {desc}
            </p>}
          </main>
        </div>
    </>)
}