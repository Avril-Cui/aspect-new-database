import Head from "next/head";
import HomePage from "../components/HomePage/HomePage"
import PageButtom from "../components/UI/PageButtom/PageButtom"


export default function Home () {
  return (    
    <div>
      <Head>
        <title>Aspect - Learn Financial Knowledge</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <HomePage />
      <PageButtom/>
    </div>
  );
};