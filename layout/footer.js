
import styles from "../styles/Home.module.css"
import Image from "next/image";
export default function Footer(){
    return(
        <>
                  <footer className={styles.footer}>
                    <p>Design and develop by <a
            href="https://fadhelmurphy.github.io/"
            target="_blank"
            rel="noopener noreferrer"
          >
            Fadhel Ijlal Falah
          </a>. Powered by
            <span className={styles.logo}>
              <Image
                src="/vercel.svg"
                alt="Vercel Logo"
                width={72}
                height={16}
              />
            </span>
          </p>
        </footer>
        </>
    )
}