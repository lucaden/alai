import BodyText from '@/components/molecules/bodyText';
import H2 from '@/components/molecules/headings/h2';
import TeamImg1 from '@/assets/img/Simon.png';
import TeamImg2 from '@/assets/img/Luca.png';
import TeamImg3 from '@/assets/img/Andri.png';
import H4 from '@/components/molecules/headings/h4';
import H6 from '@/components/molecules/headings/h6';
import { LuArrowUpRight } from "react-icons/lu";



export default function MeetOurTeam() {
    
    const teamList = [
        { 
            id: '0',
            teamImg:TeamImg1,
            memberName: "Simon Röllin",
            desination:"Shareholder and Chairman of the Management Board",
            intro:"B.Sc. in Economics, experienced insurance advisor at Glimex AG, now Executive Assistant at a Consulting Firm."
        },
        { 
            id: '1',
            teamImg:TeamImg2,
            memberName: "Luca De Nisco",
            desination:"Shareholder and Member of the Management Board.",
            intro:"Student at ETH Zürich, interested in technology. Combining studies with the successful development and launch of alai."
        },
        { 
            id: '2',
            teamImg:TeamImg3,
            memberName: "Andri Spiller",
            desination:"Co-Founder",
            intro:"Andri Spiller, as a previuos professional ice hockey player in the top Swiss league and investment advisor, Andri knows how to perform at the highest level. His clients benefit from precisely this today."
        },
    ];

  return (
    <div className={`bg-[#000F28] border-b border-b-[#162035] flex items-centerjustify-center md:py-24 py-12`}>
        <div className='container'>
            <div className='text-center sm:max-w-[50%] mx-auto mb-16'>
                <H2 additionalClass="mb-4" label="Our Team"  />
                <BodyText additionalClass="opacity-[0.6]"  text="Our team consists of experts in artificial intelligence, insurance, and customer service. We are passionate about developing innovative solutions that make our customers' lives easier. Our values are integrity, innovation, and customer satisfaction." />
            </div>
            <div className="lg:flex gap-x-8">
                {teamList.map((items) => (
                    <div key={items.id} className="lg:mb-0 mb-5 lg:w-[33.33%] relative">
                        <div className="bg-primary p-5 min-h-[620px] bg_banner_team" style={{ background: `url(${items.teamImg.src})`}}>
                            <div className='bg-black p-4 bg-opacity-60 border border-[#00000080] absolute w-[calc(100%_-_40px)] left-[20px] bottom-[20px] min-h-[210px] backdrop'>
                                 <div className='flex items-cener justify-between md:mb-6 mb-2'>
                                    <H4 label={items.memberName} additionalClass="max-w-[calc(100%_-_40px)] overflow-hidden text-ellipsis whitespace-nowrap" />
                                    <LuArrowUpRight size={30} strokeWidth={'2'} color={'#fff'} />
                                 </div>
                                 <H6 additionalClass="text-[18px]" label={items.desination} />
                                 <BodyText text={items.intro} additionalClass={'p'+items.id}/>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </div>
  );

  
}
