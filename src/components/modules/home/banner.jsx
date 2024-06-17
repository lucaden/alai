import H1 from '@/components/molecules/headings/h1';
import bannerBg from '../../../assets/img/bg_image.png'
import H4 from '@/components/molecules/headings/h4';
import BodyText from '@/components/molecules/bodyText';
import Button from '@/components/molecules/button';
import { FiExternalLink } from "react-icons/fi";
import { useRouter } from 'next/navigation'


export default function Banner() {
  const router = useRouter()

  return (
    <div className={`bg-secondary banner_shape overflow-hidden relative sm:pt-0 pt-16`}>
      <span className='animation_shape'></span>
      <div className="container overflow-hidden">
        <div className="flex items-center justify-center lg:min-h-[calc(720px)] min-h-[calc(520px)] flex-col bg_banner" style={{ background: `url(${bannerBg.src})`}}>
            <div className='max-w-[850px] m-auto text-center relative z-[5]'>
              <H1 label="alai, all AI Insurance Assistant"/>
              <H4 label="Simple. Smart. alai: Your Key To Optimal Car Insurance" additionalClass="!font-normal my-4" />
              <BodyText additionalClass="text-[#b3b3b3] md:text-[18px] text-sm leading-[30px] md:px-12 md:text-opacity-75" text="We understand that unexpected events can have a major impact on your life. That's why we're committed to providing comprehensive insurance suggestions to protect you and your assets with the help of AI." />
              <Button onClick={() => router.push('/chat')} additionalClass="mx-auto md:mt-12 mt-6 py-3 shadow-[1px_1px_1px_#f1f1f1]" textClass="!font-light" label="Find right insurance" iconBtn={<FiExternalLink />} />
            </div>
        </div>
      </div>
    </div>
  );

  
}
