import BodyText from "../molecules/bodyText";
import Button from "../molecules/button";
import H6 from "../molecules/headings/h6";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";

export default function CustomModel({
  showmodel,
  modelheading,
  modelsubheading,
  content,
  action,
  buttonnlabel,
  onClose,
  onAction,
}) {
  return (
    <>
      {showmodel && (
        <div
          className={`bg-black bg-opacity-30 fixed top-[0px] left-[0px] w-full h-full z-[9] flex items-center justify-center`}
        >
          <div className="bg-black py-6 px-6 sm:w-[600px] w-[95%] rounded-[12px]">
            <div className="flex items-center justify-between pb-6 border-b border-[rgba(251,251,251,0.12)]">
              <H6
                additionalClass="text-base font-normal"
                label={modelheading}
              />
              <MdClose
                size={22}
                color={"rgba(251,251,251,0.74)"}
                className="cursor-pointer"
                onClick={onClose}
              />
            </div>
            <div className="py-4 text-left">
              <BodyText additionalClass="text-[18px] font-medium" text={modelsubheading} />
              <BodyText additionalClass="text-white/[0.4] mt-3 font-medium" text={content} />
            </div>
            {action && (
              <div className="flex items-center justify-end">
                <Button
                  textClass="!font-normal"
                  label={buttonnlabel}
                  onClick={onAction}
                />
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
CustomModel.propTypes = {
  showmodel: PropTypes.bool,
  modelsubheading: PropTypes.string,
  modelheading: PropTypes.string,
  content: PropTypes.string,
  action: PropTypes.bool,
  buttonnlabel: PropTypes.string,
  onClose: PropTypes.func,
  onAction: PropTypes.func,
};
