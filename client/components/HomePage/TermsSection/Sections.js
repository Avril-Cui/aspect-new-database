import styles from './Sections.module.css'
import Image from 'next/image';

const Sections = (props) => {
    return(
        <div className={styles.section}>
            <div className={styles.image_style}>
                <div>
                    <Image src={props.img_source} width={280} height={190} style={{borderRadius:15}}/>
                </div>
            </div>
            <p className={styles.section_name}>{props.section_name}</p>
            <p className={styles.section_description}>{props.section_description}</p>
            <p className={styles.read_more}>Read More</p>
        </div>
    );
};

export default Sections;