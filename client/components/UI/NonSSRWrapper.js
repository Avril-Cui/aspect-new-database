import dynamic from "next/dynamic";
import { Fragment } from "react";

const NonSSRWrapper = (props) => ( 
  <Fragment>{props.children}</Fragment> 
) 
export default dynamic(() => Promise.resolve(NonSSRWrapper), { 
  ssr: false 
})