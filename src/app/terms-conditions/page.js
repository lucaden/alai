"use client";
import Footer from "@/components/includes/footer";
import Header from "@/components/includes/header";
import StaticBanner from "@/components/modules/static/static-banner";
import H4 from "@/components/molecules/headings/h4";
import BodyText from "@/components/molecules/bodyText";
import Link from "next/link";

export default function TermsConditions() {
  return (
    <main className="">
      <Header headerType="transparent" />
      <StaticBanner
        heading="Terms and conditions"
        content="Welcome to alai! By using our chatbot service for car insurance brokerage, you agree to the following terms and conditions:"
      />
      <div className="lg:py-20 py-12 bg-secondary">
        <div className="max-w-[1024px] mx-auto px-4">
            <H4 additionalClass="mb-4 md:text-[28px] text-base" label="Acceptance of Terms" />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text="By accessing and using alai's services, you accept and agree to be bound by the terms and provisions of this agreement. If you do not agree to these terms, you may not use our services." />
            <H4 additionalClass="mb-4 md:text-[28px] text-base mt-8" label="Services Provided" />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text="alai provides an AI-driven chatbot service to assist users in finding and managing car insurance policies. Our chatbot offers information and recommendations based on user inputs and publicly available data." />
            <H4 additionalClass="mb-4 md:text-[28px] text-base mt-8" label="User Responsibilities" />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text="Users are responsible for providing accurate and up-to-date information when interacting with our chatbot. alai is not liable for any issues arising from incorrect or misleading information provided by users." />
            <H4 additionalClass="mb-4 md:text-[28px] text-base mt-8" label="Privacy and Data Security" />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text={<span>We take your privacy seriously and are committed to protecting your personal information. Please review our <Link href="/privacy-policy" className="text-primary underline">Privacy Policy</Link> for more details on how we collect, use, and protect your data.</span>} />
            <H4 additionalClass="mb-4 md:text-[28px] text-base mt-8" label="Limitation of Liability" />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text="alai is not responsible for any damages or losses resulting from the use of our services. We provide recommendations and information, but the final decision regarding car insurance policies rests with the user." />
            <H4 additionalClass="mb-4 md:text-[28px] text-base mt-8" label="Third-Party Links" />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text="Our service may contain links to third-party websites or services that are not owned or controlled by alai. We have no control over and assume no responsibility for the content, privacy policies, or practices of any third-party sites or services." />
            <H4 additionalClass="mb-4 md:text-[28px] text-base mt-8" label="Modifications to Terms" />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text="alai reserves the right to modify these terms at any time. We will provide notice of any significant changes by posting the new terms on our website. Your continued use of the service after such changes constitutes your acceptance of the new terms." />
            <H4 additionalClass="mb-4 md:text-[28px] text-base mt-8" label="Governing Law" />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text="These terms shall be governed and construed in accordance with the laws of Switzerland, without regard to its conflict of law provisions." />
            <H4 additionalClass="mb-4 md:text-[28px] text-base mt-8" label="Contact Us" />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text={<span>If you have any questions about these Terms and Conditions, please contact us at <Link href="mailto:support@alai.insure" className="text-primary underline">support@alai.insure</Link></span>} />
            <BodyText additionalClass="text-opacity-70 lg:text-base text-sm mb-4" text="By using our service, you acknowledge that you have read, understood, and agree to be bound by these terms and conditions." />
            
        </div>
      </div>
      <Footer />
    </main>
  );
}
