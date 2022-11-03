import Sections from "./Section";
import dcf_model from "../../../image/dcf_model.png";
import capm_model from "../../../image/capm_model.png";
import technical_model from "../../../image/technical_model.png";

const SectionsLayout = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 md:gap-6 " style={{marginBottom:200, marginTop: 40}}>
      <div>
        <Sections
          img_source={dcf_model}
          section_name="DCF Model"
          section_description="Accounting, Valuation, Excel"
          section_difficulty="Difficulty:  ⭐⭐️⭐️️"
        />
      </div>

      <div>
        <Sections
          img_source={capm_model}
          section_name="CAPM Model"
          section_description="Risk, Portfolio Management"
          section_difficulty="Difficulty:  ⭐⭐️⭐️️⭐️️"
        />
      </div>

      <div>
        <Sections
          img_source={technical_model}
          section_name="Technical Models"
          section_description="Statistics, Trading, Technical"
          section_difficulty="Difficulty:  ⭐⭐️⭐️️⭐️️"
        />
      </div>
    </div>
  );
};

export default SectionsLayout;
