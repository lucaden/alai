"use client";
import Header from "@/components/includes/header";
import BodyText from "@/components/molecules/bodyText";
import H3 from "@/components/molecules/headings/h3";
import { useState } from "react";
import { HiArrowLeft } from "react-icons/hi";
import TypeImg1 from "@/assets/img/MessageIcon.svg";
import TypeImg2 from "@/assets/img/GeneralQuery.svg";
import Image from "next/image";
import H6 from "@/components/molecules/headings/h6";
import ChatScreen from "@/components/modules/chat/chat-screen";
import { useRouter } from "next/navigation";
import CustomModel from "@/components/includes/model";

export default function Chat() {
  const [cardType, setCardType] = useState();
  const [model, setModel] = useState(false);
  const modelShow = () => setModel((model) => !model);
  const router = useRouter();

  const cardData = [
    {
      icon: TypeImg1,
      heading: "Need Advice on your current policy?",
      content: "Get expert guidance on your existing insurance policies",
      select: "current",
    },
    {
      icon: TypeImg2,
      heading: "General Query",
      content:
        "Have questions about your insurance? Need assistance or clarification? We're here to help with any inquiries you may have.",
      select: "general",
    },
  ];

  const selectActiveLinks = (activeSection) => {
    setCardType(cardType === activeSection ? null : activeSection);
  };
  return (
    <main className="">
      <CustomModel
        modelheading="Go to homepage"
        modelsubheading="Returning to the website will cause this chat session to expire."
        content="This action is permanent and cannot be undone"
        action={true}
        buttonnlabel="Go to homepage"
        showmodel={model}
        onClose={modelShow}
        onAction={() => router.push("/")}
      />
      <Header />
      <div className="relative h-full overflow-hidden bg-secondary before_grad after_grad">
        <div className="container relative z-[2]">
          <div className="py-6 ">
            <button
              className="flex items-center justify-start cursor-pointer w-fit"
              onClick={() => setModel(true)}
            >
              <HiArrowLeft color={"#fff"} size={18} />
              <BodyText
                text="Back to website"
                additionalClass="pl-2 text-[16px]"
              />
            </button>
          </div>
          <div
            className={`mb-6 h-[100vh] min-h-[400px] md:h-[calc(100vh_-_182px)] bg-black bg-opacity-60 rounded-[8px] shadow-[1px_1px_1px_#585252] p-4 ${
              !cardType && "flex items-center"
            }`}
          >
            <div
              className={`m-auto w-full max-w-[780px] min-h-[400px] text-center relative ${
                cardType && "h-full"
              }`}
            >
              {!cardType && (
                <>
                  <H3
                    additionalClass="mb-4"
                    label="Hi There, I am Alai your virtual assistant"
                  />
                  <BodyText
                    additionalClass="text-base opacity-[0.8]"
                    text="Connect with our AI assistant for help with your current policies. Let's simplify your insurance management."
                  />
                  <div className="flex flex-col mt-8 md:flex-row gap-x-6">
                    {cardData.map((item) => (
                      <button
                        key={item.select}
                        onClick={() => selectActiveLinks(`${item.select}`)}
                        className="p-6 rounded-[6px] bg-[#2B2B2B59] bg-opacity-35 hover:bg-[#0C1117] text-left md:mb-0 mb-4 cursor-pointer flex-1 border border-transparent hover:border-[#f1f1f1]"
                      >
                        <Image
                          src={item.icon}
                          alt={item.heading}
                          height="50"
                          loading="lazy"
                          objectFit="contain"
                          className="mb-4"
                        />
                        <H6
                          additionalClass="font-normal text-[24px]  mb-4"
                          label={item.heading}
                        />
                        <BodyText
                          additionalClass="text-base"
                          text={item.content}
                        />
                      </button>
                    ))}
                  </div>
                </>
              )}
              {cardType == "current" && (
                <ChatScreen chatWithUpload={true} status={true} />
              )}
              {cardType == "general" && (
                <ChatScreen chatWithUpload={false} status={false} />
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
