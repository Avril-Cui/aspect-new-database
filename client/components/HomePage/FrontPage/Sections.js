import classes from './Sections.module.css';

const Sections = (props) => {
    return (
        <div className={classes.container} style={{backgroundImage: `url(${props.background_source})`}}>  
            <img className={classes.image} src={props.img_source} alt=''/>
            <p className={classes.summary}>{props.children}</p>
            {/* <img className={classes.background} src={props.background_source} alt="" /> */}
        </div>
    );
};

export default Sections;