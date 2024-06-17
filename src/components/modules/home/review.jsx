import H4 from "@/components/molecules/headings/h4";
import H6 from "@/components/molecules/headings/h6";
import BodyText from "@/components/molecules/bodyText";
import { FaStar } from "react-icons/fa6";
import Image from "next/image";
import user1 from "@/assets/img/user1.jpg";
import user2 from "@/assets/img/user2.jpg";
import user3 from "@/assets/img/user3.jpg";

export default function Review() {
  const users = [
    { url: user1, key: "user1" },
    { url: user2, key: "user2" },
    { url: user3, key: "user3" },
  
  ];
  const star = [
    { count: 1, key: 1 },
    { count: 2, key: 2 },
    { count: 3, key: 3 },
    { count: 4, key: 4 },
    { count: 5, key: 5 },
  ];

  return (
    <div className="bg-[#162035] lg:py-24 py-8">
      <div className="container">
        <div className="items-center justify-between mb-12 lg:flex">
          <div className="flex-[0.5]">
            <H4 label="Read Honest Reviews of what Clients Say About Us!" />
          </div>
          <div className="items-center flex-1 mt-4 sm:flex lg:mt-0 lg:justify-end">
            <div className="flex items-center users_img">
              {users.map((user, index) => (
                <Image
                  key={user.key}
                  src={user.url}
                  alt={`User ${index + 1}`}
                  className="rounded-[50%]"
                  width={250}
                  height={250}
                  priority
                  
                />
              ))}
            </div>
            <div className="mt-2 sm:pl-4 sm:mt-0">
              <BodyText additionalClass="md:text-[18px] text-sm" text="Loved by" />
              <H6 additionalClass="md:text-[24px]" label="1,000,000 +" />
            </div>
          </div>
        </div>
        <div className="lg:flex mx-[-15px]">
          {users.map((user, index) => (
            <div
              key={user.key}
              className="px-[15px] lg:mb-0 mb-5 lg:w-[33.33%]"
            >
              <div className="bg-secondary border border-[#fff] rounded-[8px] p-4 after_grad_review overflow-hidden relative">
                <Image
                  src={user.url}
                  alt={`User ${index + 1}`}
                  className="rounded-[50%] user_thubnails mb-4"
                  width={260}
                  height={260}
                  priority
                />
                <H6 additionalClass="text-[20px]" label="Sam Wiseman" />
                <ul className="flex items-center justify-start mt-2 mb-6 gap-x-3">
                  {star.map((s) => (
                    <li key={s.key}>
                      <FaStar size={18} color={"#D5A402"} />
                    </li>
                  ))}
                </ul>
                <BodyText
                  additionalClass="text-base mb-2"
                  text="I transitioned to this insurance provider following some challenges I encountered with my previous one. After encountering certain difficulties with my previous insurance company, I made the decision to switch to this provider."
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
