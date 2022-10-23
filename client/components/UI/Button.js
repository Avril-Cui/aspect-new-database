import classes from './Button.module.css';

const Button = (props) => {
    return (
        <button className={classes.button_shape}>{props.children}</button>
    );
  };
  
  export default Button;