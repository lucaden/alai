"use client";
import Footer from "@/components/includes/footer";
import Header from "@/components/includes/header";
import Brand from "@/components/modules/home/brand";
import StaticBanner from "@/components/modules/static/static-banner";
import ContentMedia from "@/components/modules/static/content-media";
import mediaImg from  '@/assets/img/about_media.png';
import MeetOurTeam from "@/components/modules/static/meet-our-team";
import Cta from "@/components/modules/home/cta";


export default function About() {
  return (
    <main className="">
      <Header headerType="transparent" />
      <StaticBanner
        heading="About Us"
        content='Welcome to alai! We are an innovative startup that uses an AI-driven chatbot to revolutionize the traditional car insurance brokerage process. Our name "alai" combines "all" and "AI," reflecting our mission to make everything related to car insurance more efficient and accessible.'
      />
      <ContentMedia
        image={mediaImg}
        heading="Our Mission and Story"
        content={<>
          <span className="block mb-4">At alai, our mission is to transform the car insurance process through cutting-edge technology, making it accessible and simple for everyone.</span>
          <span className="block">Alai was founded in 2023 by a team of experienced professionals in insurance and technology, driven by a desire to modernize the insurance market. The idea was born from frustration with complicated and opaque insurance processes. With alai, we aim to change this and provide customers with a user-friendly alternative.</span>
        </>}
      />
        <Brand
          sectionTitle = "Our Partners"
          sectionBg="bg-[#000F28]"
        />
      <ContentMedia
        mediaposition="right"
        image={mediaImg}
        heading="What Sets Us Apart &amp; Our Vision"
        content={<>
          <span className="block mb-4">At alai, we combine state-of-the-art AI technology with deep industry knowledge to offer tailored insurance solutions. Our chatbot is available 24/7 to help you find the best insurance deals and manage your policies. We prioritize transparency and simplicity to provide you with the best service possible.</span>
          <span className="block">We aspire to become the leading provider of AI-powered insurance services, offering a seamless, user-friendly, and transparent experience for our customers.</span>
        </>}
      />
      <MeetOurTeam />
      <Cta sectionBg="bg-[#162035]" />
      <Footer />
    </main>
  );
}
