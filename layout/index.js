import Header from "./header";
import Footer from "./footer";
import styles from "../styles/Home.module.css";
export default function Layout(props) {
  const { children,title,desc } = props
  return (
    <>
      <Header {...props} />

      {children && <main className={styles.main} style={{backgroundColor:"#f8f9fb"}}><div className="container">{children}</div></main>}
      <Footer />
    </>
  );
}
