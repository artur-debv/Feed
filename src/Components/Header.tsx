
import styles from "./Header.module.css"

import igniteLogo from "../assets/Ignite-Logo.svg";


export function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogo} alt="logotipo do ignite" />
      <h1 className={styles.title}>Feed</h1>
    </header>
  )
}