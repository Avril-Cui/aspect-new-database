import MainLayout from "./FrontPage/MainLayout";
import SimulatorMain from './SimulatorSection/SimulatorMain';
import TermsMains from "./TermsSection/TermsMain";
import TheoryMain from "./TheorySection/TheoryMain";
import styles from "./HomePage.module.css"

const HomePage = () => {
  return (
    <div className={styles.Home}>
      <MainLayout />
      <SimulatorMain />
      <TermsMains />
      <TheoryMain />
    </div>
  )
}

export default HomePage;