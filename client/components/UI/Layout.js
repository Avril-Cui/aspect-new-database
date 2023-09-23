// import Header from ""
import dynamic from "next/dynamic";
import styles from "./Layout.module.css";
const Header = dynamic(() => import("../Header/Header"), {
    ssr: false,
  });
const Layout = ( {children} ) => {
    return(
        <div className={styles.layout}>
            <div>
                <Header />
                { children }
            </div>  
        </div>
    )
}

export default Layout;