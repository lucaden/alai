"use client";
import Footer from "@/components/includes/footer";
import Header from "@/components/includes/header";
import Review from "@/components/modules/home/review";
import Banner from "@/components/modules/home/banner";
import Brand from "@/components/modules/home/brand";
import WhyFuture from "@/components/modules/home/why-future";
import Cta from "@/components/modules/home/cta";

export default function Home() {
  return (
    <main className="">
      <Header headerType="transparent" />
      <Banner />
      <Brand />
      <WhyFuture
        sectionHeading="Why alai is the future"
        subHeading="We understand that unexpected events can have a major impact on your life. That's why we're committed to providing comprehensive insurance suggestions to protect you and your assets with the help of AI."
      />
      <Review />
      <Cta />
      <Footer />
    </main>
  );
}
