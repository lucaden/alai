import BodyText from "@/components/molecules/bodyText";
import H2 from "@/components/molecules/headings/h2";
import Image from "next/image";
import PropTypes from "prop-types";

export default function ContentMedia({ image, heading, content,mediaposition }) {
  return (
    <div
      className={`bg-[#162035] flex items-centerjustify-center md:py-24 py-12 border-t border-secondary`}
    >
      <div className="container">
        <div className={`items-center md:flex gap-x-5  ${mediaposition == 'right' ? 'flex-row-reverse' : ''}`}>
          <div className="flex-1 media ">
            <figure className="w-full p-0 m-0">
              <Image
                className={`md:mx-auto md:mb-0 mb-4`}
                src={image}
                alt={heading}
                width={480}
                height={390}
                priority
              />
            </figure>
          </div>
          <div className="flex-1">
            <H2 additionalClass="mb-4" label={heading} />
            <BodyText
              additionalClass="text-[#b3b3b3] text-base leading-[30px] text-opacity-80"
              text={content}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

ContentMedia.propTypes = {
  image: PropTypes.string,
  heading: PropTypes.string,
  content: PropTypes.string,
  mediaposition: PropTypes.string,
};
