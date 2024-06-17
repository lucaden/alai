import Image from "next/image";
import Link from "next/link";
import LightLogo from '../../assets/img/logo.svg'
import FooterLogo from '../../assets/img/Cicero_Gütsesiegel.png'
import BodyText from "../molecules/bodyText";
import H4 from "../molecules/headings/h4";
import { BsInstagram, BsLinkedin } from "react-icons/bs";
import { RiMapPinFill } from "react-icons/ri";


export default function Footer() {

  return (
    <footer className={`bg-[#000] py-16`}>
        <div className="container">
            <div className="flex items-center">
                <div className="flex flex-col sm:items-start items-center lg:flex-[0.8] flex-1">
                    <div className="logo">
                        <figure className="mb-4">
                            <Link href="/">
                                <Image
                                    src={LightLogo}
                                    alt="Logo"
                                    width={65}
                                    height={35}
                                    priority
                                />
                            </Link>
                        </figure>
                    </div>    
                    <H4 additionalClass="text-[18px] !font-semibold mb-3 mt-4" label="Contact Us" />
                    <div className="flex items-center mb-4 gap-x-2">
                        <RiMapPinFill size={18} />
                        <BodyText text="Räspweg 9, 8126 Zumikon, Switzerland" additionalClass="sm:text-[18px] text-sm  sm:leading-[30px] sm:text-left text-center" />
                    </div>
                    <BodyText additionalClass="sm:text-[18px] text-sm mb-5 sm:leading-[30px] sm:text-left text-center" text={
                        <span> We look forward to hearing from you! You can reach us via email at<Link href="mailto:=support@alai.insure" className="px-2 text-[16px] text-[#7EB9FF] ">
                                support@alai.insure
                            </Link>
                            <span>Follow us on social media for the latest updates.</span>
                        </span>
                    } />
                    <ul className="flex items-center sm:gap-x-6 gap-x-3">
                        <li>
                            <Link href="/about" className="sm:text-base text-[12px]">
                                About Us
                            </Link>
                        </li>
                        <li>
                            <Link href="/privacy-policy" className="sm:text-base text-[12px]">
                                Privacy Policy
                            </Link>
                        </li>
                        <li>
                            <Link href="/terms-conditions" className="sm:text-base text-[12px]">
                                Terms and Conditions
                            </Link>
                        </li>
                    </ul>
                    <ul className='mt-5 flex items-center gap-x-5 '>
                        <li>
                            <Link href="https://www.instagram.com/alai.insure/?igsh=MXdwMGxnOWgxZjFtMg%3D%3D&utm_source=qr">
                                <BsInstagram size={20} />
                            </Link>
                        </li>
                        <li>
                            <Link href="https://www.linkedin.com/company/alai-insure/">
                                <BsLinkedin size={20} />
                            </Link>
                        </li>
                    </ul>
                </div>
                <div className="flex-1  justify-end items-center lg:flex hidden">
                    <Image
                        src={FooterLogo}
                        alt="Logo"
                        width={190}
                        height={190}
                        priority
                    />
                </div>
            </div>
        </div>
    </footer>
  );
}
