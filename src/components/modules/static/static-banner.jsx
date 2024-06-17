import BodyText from "@/components/molecules/bodyText";
import H1 from "@/components/molecules/headings/h1";
import PropTypes from "prop-types";

export default function StaticBanner({ heading, content }) {
  return (
    <div className={`bg-secondary banner_shape overflow-hidden relative sm:pt-0 pt-16 sm:pb-0 pb-6 sm:min-h-[450px] min-h-[350px] flex items-centerjustify-center`}>
      <div className="md:max-w-[50%] max-w-[90%] px-4 w-full text-center pt-12 m-auto relative z-[5]">
        <H1 additionalClass="mb-4" label={heading} />
        <BodyText
          additionalClass="text-[#b3b3b3] text-[18px] leading-[30px] text-center text-opacity-80"
          text={content}
        />
      </div>
    </div>
  );
}

StaticBanner.propTypes = {
  heading: PropTypes.string,
  content: PropTypes.string,
};
