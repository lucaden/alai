import Image from "next/image";
import BgPattern from "@/assets/img/pattern_bg.png";
import H2 from "@/components/molecules/headings/h2";
import BodyText from "@/components/molecules/bodyText";
import Personilzed from "@/assets/img/thumbs.png";
import CertifiedPlatform from "@/assets/img/Certified_Platform.png";
import Claim from "@/assets/img/claim.png";
import PropTypes from "prop-types";
import H4 from "@/components/molecules/headings/h4";

export default function WhyFuture({ sectionHeading, subHeading, section_bg }) {
  return (
    <div
      className={`${
        section_bg ? "bg-primary" : "bg-secondary"
      } lg:py-28 py-12 bg_banner run_animate`}
      style={{
        background: section_bg || `url(${BgPattern.src}) , #000F28`,
      }}
    >
      <div className="container">
        {sectionHeading && (
          <div className="text-center sm:max-w-[60%] mx-auto mb-16">
            <H2 additionalClass="mb-4" label={sectionHeading} />
            <BodyText additionalClass="opacity-[0.6]" text={subHeading} />
          </div>
        )}
        <div className="flex items-start lg:flex-row flex-col mx-[-16px]">
          <div className="px-[16px] text-center lg:mb-0 mb-8 flex-1 lg:w-[33.33%] w-full">
            <div>
              <figure className="m-0 mb-4 p-0 mx-auto w-[50px] h-[50px] rounded-[50%] bg-primary flex items-center justify-center">
                <Image
                  src={Personilzed}
                  alt="Next.js Logo"
                  width={25}
                  height={25}
                  priority
                />
              </figure>
              <H4
                additionalClass="mb-4 lg:text-[22px] text-base"
                label="Personalized Recommendations"
              />
              <BodyText
                additionalClass="lg:text-base text-sm px-12 "
                text="The app uses AI algorithms to analyze user data and provide personalized insurance recommendations."
              />
            </div>
          </div>
          <div className="px-[16px] text-center lg:mb-0 mb-8 flex-1 lg:w-[33.33%] w-full">
            <div>
              <figure className="m-0 mb-4 p-0 mx-auto w-[50px] h-[50px] rounded-[50%] bg-primary flex items-center justify-center">
                <Image
                  src={CertifiedPlatform}
                  alt="Next.js Logo"
                  width={22}
                  height={26}
                  priority
                />
              </figure>
              <H4
                additionalClass="mb-4 lg:text-[22px] text-base"
                label="Certified Platform"
              />
              <BodyText
                additionalClass="lg:text-base text-sm px-12 "
                text="The app uses AI algorithms to analyze user data and provide personalized insurance recommendations."
              />
            </div>
          </div>
          <div className="px-[16px] text-center lg:mb-0  flex-1 lg:w-[33.33%] w-full">
            <div>
              <figure className="m-0 mb-4 p-0 mx-auto w-[50px] h-[50px] rounded-[50%] bg-primary flex items-center justify-center">
                <Image
                  src={Claim}
                  alt="Next.js Logo"
                  width={17}
                  height={16}
                  priority
                />
              </figure>
              <H4
                additionalClass="mb-4 lg:text-[22px] text-base"
                label="Claims Processing Assistance"
              />
              <BodyText
                additionalClass="lg:text-base text-sm px-12 "
                text="The app offers a streamlined claims process, allowing users to report and track claims directly through the app."
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

WhyFuture.propTypes = {
  sectionHeading: PropTypes.string,
  subHeading: PropTypes.string,
  section_bg: PropTypes.string,
};
