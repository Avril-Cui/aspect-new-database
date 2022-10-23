import styles from './Dropdown.module.css'
import Link from "next/link";


const Dropdown = (props: any) => {
    return(
        <div className={styles.all_drop}>
            <div>
                {props.children}
            </div>
            <div className={styles.dropdown_content}>
                <Link href={props.link} >{props.content.one}</Link>
                <Link href={props.link} >{props.content.two}</Link>
                <Link href={props.link} >{props.content.three}</Link>
                <Link href={props.link} >{props.content.four}</Link>
                <Link href={props.link} >⏯ Explore</Link>
            </div>
        </div>  
    );
};

export default Dropdown;