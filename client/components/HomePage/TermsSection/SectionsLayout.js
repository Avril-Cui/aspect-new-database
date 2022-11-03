import Sections from "./Sections";
import accounting_pic from "../../../image/accounting_pic.png";
import valuation_pic from "../../../image/valuation_pic.png";
import portfo_pic from "../../../image/portfo_pic.png";
import defi_pic from "../../../image/defi_pic.png";
import Link from "next/link";
import styles from "./SectionsLayout.module.css"

const SectionsLayout = () => {
  return (
    <div className={styles.container_big}>
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6 " style={{marginTop:60}}>
      <div className={styles.container_layout}>
      <Link href="/terms/accounting">
        <div>
          <Sections
            img_source={accounting_pic}
            section_name="Accounting"
            section_description="What are the three financial statements? How to tell if a company has a health business operation? How is a company’s profitability?"
          />
        </div>
      </Link>
      </div>
      
      <div className={styles.container_layout}>
      <Link href="/terms/valuation">
        <div>
          <Sections
            img_source={valuation_pic}
            section_name="Valuation"
            section_description="Does the company’s stock appropriately valuates the actual value of the company? Various valuation metrics and models are included."
          />
        </div>
      </Link>
      </div>
      <div className={styles.container_layout}>
      <Link href="/terms/portfolio">
        <div>
          <Sections
            img_source={portfo_pic}
            section_name="Portfolio Management"
            section_description="What is the relationship between risk and return? What is an efficient portfolio? What are some logical approaches to manage a portfolio?"
          />
        </div>
      </Link>
      </div>

      <div className={styles.container_layout}>
      <Link href="/terms/defi">
        <div>
          <Sections
            img_source={defi_pic}
            section_name="De-Fi"
            section_description="What is decentralized finance? How is it different from the centralized finance? What are the mechanisms behind it? What are its applications?"
          />
        </div>
      </Link>
      </div>
      </div>
    </div>
  );
};

export default SectionsLayout;
