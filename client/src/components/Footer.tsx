import { Footer, FooterCopyright, FooterDivider, FooterIcon, FooterLink, FooterLinkGroup, FooterTitle } from 'flowbite-react';
import { BsFacebook, BsGithub, BsInstagram, BsLinkedin, BsTwitter, BsWhatsapp } from 'react-icons/bs';
import { Link } from 'react-router-dom';

export default function FooterComponent() {
  return (
    <Footer container className="border border-t-8 border-teal-500">
      <div className="w-full max-w-7xl mx-auto">
        <div className="grid w-full justify-between sm:flex md:grid-cols-1">
          {/* logo */}
          <div className="mt-5">
            <Link to="/" className="self-center whitespace-nowrap text-lg sm:text-xl font-semibold dark:text-white">
              <span className="px-2 py-2 bg-linear-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white">Guru's</span>
              Blog
            </Link>
          </div>
          {/*  */}
          <div className="grid grid-cols-2 gap-8 mt-4 sm:grid-cols-3 sm:gap-6">
            <div>
              <FooterTitle title="About" />
              <FooterLinkGroup col>
                <FooterLink href="/about">About</FooterLink>
                <FooterLink href="/#">Gituhub</FooterLink>
              </FooterLinkGroup>
            </div>

            <div>
              <FooterTitle title="FOLLOW US" />
              <FooterLinkGroup col>
                <FooterLink href="#">LinkedIn</FooterLink>
                <FooterLink href="#">Github</FooterLink>
              </FooterLinkGroup>
            </div>

            <div>
              <FooterTitle title="LEGAL" />
              <FooterLinkGroup col>
                <FooterLink href="#">Pivacy Poicy</FooterLink>
                <FooterLink href="#">Terms &amp; Conditons</FooterLink>
              </FooterLinkGroup>
            </div>
          </div>
        </div>

        <FooterDivider />
        <div className="w-full sm:flex sm:items-center sm:justify-between">
          <FooterCopyright href="#" by="Gnanaguru's blog app" year={new Date().getFullYear()} />
          <div className="flex gap-6 mt-4 sm:mt-0  sm:justify-center ">
            <FooterIcon href="#" icon={BsInstagram} />
            <FooterIcon href="#" icon={BsFacebook} />
            <FooterIcon href="#" icon={BsLinkedin} />
            <FooterIcon href="#" icon={BsGithub} />
            <FooterIcon href="#" icon={BsTwitter} />
          </div>
        </div>
      </div>
    </Footer>
  );
}
