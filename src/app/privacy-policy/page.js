"use client";
import Footer from "@/components/includes/footer";
import Header from "@/components/includes/header";
import StaticBanner from "@/components/modules/static/static-banner";
import H4 from "@/components/molecules/headings/h4";
import BodyText from "@/components/molecules/bodyText";
import Link from "next/link";

export default function PrivacyPolicy() {
  return (
    <main className="">
      <Header headerType="transparent" />
      <StaticBanner
        heading="Privacy Policy"
        content="Welcome to alai! Your privacy is important to us. This Privacy Policy explains how we collect, use, and protect your personal information when you use our chatbot service for car insurance brokerage."
      />
      <div className="py-12 lg:py-20 bg-secondary">
        <div className="max-w-[1024px] mx-auto px-4">
          <H4 additionalClass="mb-4" label="Information We Collect" />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">
                  Personal Information:
                </span>
                {' '}
                When you use our service, we may collect personal information
                such as your name, email address, phone number, and car details.
              </span>
            }
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">Usage Data:</span>
                {' '}
                We collect information on how you interact with our chatbot,
                including chat logs, IP address, browser type, and device
                information.
              </span>
            }
          />
          <H4
            additionalClass="mb-4 md:text-[28px] text-base mt-8"
            label="How We Use Your Information"
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">
                  To Provide Services:</span>
                {' '}
                We use your information to provide and improve our car insurance
                brokerage services.
              </span>
            }
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">Communication:</span>
                {' '}
                We may use your contact information to send you updates,
                notifications, and marketing communications related to our
                services.
              </span>
            }
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">Analytics:</span>
                {' '}
                We analyze usage data to improve our chatbot&lsquo;s  performance and user
                experience.
              </span>
            }
          />
          <H4
            additionalClass="mb-4 md:text-[28px] text-base mt-8"
            label="Data Sharing and Disclosure"
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">
                  Third-Party Service Providers:</span>
                {' '}
                We may share your information with third-party service providers
                who assist us in providing our services, such as insurance
                companies and IT service providers.
              </span>
            }
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">
                  Legal Requirements:</span>
                  {' '}
                We may disclose your information if required by law or in
                response to legal requests.
              </span>
            }
          />
          <H4
            additionalClass="mb-4 md:text-[28px] text-base mt-8"
            label="Data Security"
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text="We implement appropriate technical and organizational measures to protect your personal information from unauthorized access, alteration, disclosure, or destruction."
          />
          <H4
            additionalClass="mb-4 md:text-[28px] text-base mt-8"
            label="Your Rights"
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">Access: </span>
                {' '}
                You have the right to request access to the personal information we
                hold about you.
              </span>
            }
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">Correction: </span>
                {' '}
                You have the right to request the correction of inaccurate or
                incomplete information.
              </span>
            }
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                <span className="font-bold text-white">Deletion: </span>
                {' '}
                You have the right to request the deletion of your personal
                information, subject to certain legal obligations.
              </span>
            }
          />
          <H4
            additionalClass="mb-4 md:text-[28px] text-base mt-8"
            label="Cookies and Tracking Technologies"
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text="We use cookies and similar tracking technologies to track the activity on our service and hold certain information. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent."
          />
          <H4
            additionalClass="mb-4 md:text-[28px] text-base mt-8"
            label="Changes to This Privacy Policy"
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text="We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes."
          />
          <H4
            additionalClass="mb-4 md:text-[28px] text-base mt-8"
            label="Contact Us"
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text={
              <span>
                If you have any questions about this Privacy Policy, please
                contact us at
                <Link
                  href="mailto:support@alai.insure"
                  className="underline text-primary"
                >
                  support@alai.insure
                </Link>
              </span>
            }
          />
          <BodyText
            additionalClass="text-opacity-70 lg:text-base text-sm mb-4"
            text="By using our service, you agree to the collection and use of information in accordance with this Privacy Policy."
          />
        </div>
      </div>
      <Footer />
    </main>
  );
}
