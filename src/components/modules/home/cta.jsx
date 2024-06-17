import Button from "@/components/molecules/button";
import H2 from "@/components/molecules/headings/h2";
import { useRouter } from 'next/navigation'

import PropTypes from "prop-types";

export default function Cta({ sectionBg }) {
  const router = useRouter();
  return (
    <div className={`${sectionBg || "bg-secondary"}  lg:py-16 py-8`}>
      <div className="container">
        <div className="flex flex-col items-center justify-between lg:flex-row">
          <H2
            additionalClass="xl:flex-[0.5] lg:flex-[0.7] lg:mb-0 mb-4 sm:text-left text-center"
            label="Join us now for a prosperous and secure future"
          />
          <Button onClick={() => router.push('/chat')} textClass="font-normal" label="Discover the Insurance" />
        </div>
      </div>
    </div>
  );
}
Cta.propTypes = {
  sectionBg: PropTypes.string,
};
