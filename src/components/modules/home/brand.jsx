import Image from "next/image";
import brand1Img from "../../../assets/img/brand1.png";
import brand2Img from "../../../assets/img/brand2.png";
import brand3Img from "../../../assets/img/brand3.png";
import brand4Img from "../../../assets/img/brand4.png";
import brand5Img from "../../../assets/img/brand5.png";
import PropTypes from "prop-types";
import BodyText from "@/components/molecules/bodyText";

export default function Brand({ sectionBg, sectionTitle }) {
  return (
    <div
      className={`${
        sectionBg || "bg-[#162035]"
      }  py-12 relative before:content[''] before:absolute before:${
        sectionBg || "bg-[#141d31]"
      }  before:w-full before:h-[50%] before:bottom-[0px]`}
    >
      <div className="container">
        {sectionTitle && (
          <BodyText
            additionalClass="mx-auto text-center text-[20px] sm:max-w-[50%] max-w-[95%] sm:px-0 px-2 mb-12"
            text={sectionTitle}
          />
        )}
        <div className="flex flex-wrap items-center gap-y-2.5 justify-center">
          <div className="lg:w-[20%] md:w-[20%] w-[50%] text-center px-[10px]">
            <Image
              className="m-auto opacity-[0.5]"
              src={brand5Img}
              alt="Axa"
              width={100}
              height={62}
              priority
            />
          </div>
          <div className="lg:w-[20%] md:w-[20%] w-[50%] text-center px-[10px]">
            <Image
              className="m-auto opacity-[0.5]"
              src={brand1Img}
              alt="Zurich"
              width={150}
              height={82}
              priority
            />
          </div>
          <div className="lg:w-[20%] md:w-[20%] w-[50%] text-center px-[10px]">
            <Image
              className="m-auto opacity-[0.5]"
              src={brand2Img}
              alt="SwissLife"
              width={80}
              height={52}
              priority
            />
          </div>
          <div className="lg:w-[20%] md:w-[20%] w-[50%] text-center px-[10px]">
            <Image
              className="m-auto opacity-[0.5]"
              src={brand3Img}
              alt="Allianz"
              width={150}
              height={82}
              priority
            />
          </div>
          <div className="lg:w-[20%] md:w-[20%] w-[50%] text-center px-[10px]">
            <Image
              className="m-auto opacity-[0.5]"
              src={brand4Img}
              alt="Helvetica"
              width={150}
              height={82}
              priority
            />
          </div>
        </div>
      </div>
    </div>
  );
}
Brand.propTypes = {
  sectionBg: PropTypes.string,
  sectionTitle: PropTypes.string,
};
