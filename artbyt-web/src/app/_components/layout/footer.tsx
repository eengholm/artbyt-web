import Container from "@/app/_components/container";
import { EXAMPLE_PATH } from "@/lib/constants";
import Avatar from "../avatar";

interface FooterProps {
  authorName?: string;
  authorPicture?: string;
  tagline?: string;
  copyright?: string;
  instagramUrl?: string;
  linkedinUrl?: string;
  contactEmail?: string;
  phoneNumber?: string;
}

export function Footer({
  authorName = "Tim Bylander",
  authorPicture = "/assets/portfolio/authors/tim.jpg",
  tagline = "Design by Tim Bylander. För alla dina designbehov.",
  copyright = "Tim Bylander. All rights reserved.",
  instagramUrl = "https://www.instagram.com/artbyt_official",
  linkedinUrl = "https://www.linkedin.com/in/your_linkedin_username",
  contactEmail = "",
  phoneNumber = "",
}: FooterProps = {}) {
  return (
    <footer className="border-t border-neutral-200">
      <Container>
        <div className="py-28 flex flex-col lg:flex-row items-center">
          <div className="flex-1 lg:pl-4 lg:w-1/2">
            <Avatar name={authorName} picture={authorPicture || null} />

            <p className="mt-4 text-lg">{tagline}</p>

            {/* Contact Information */}
            {(contactEmail || phoneNumber) && (
              <div className="mt-4 space-y-2">
                {contactEmail && (
                  <p className="text-base">
                    <a
                      href={`mailto:${contactEmail}`}
                      className="hover:underline"
                    >
                      {contactEmail}
                    </a>
                  </p>
                )}
                {phoneNumber && (
                  <p className="text-base">
                    <a
                      href={`tel:${phoneNumber.replace(/\s/g, "")}`}
                      className="hover:underline"
                    >
                      {phoneNumber}
                    </a>
                  </p>
                )}
              </div>
            )}

            <p className="mt-4 text-lg">
              © {new Date().getFullYear()} {copyright}
            </p>
          </div>
          <div
            id="social-links"
            className="flex flex-row justify-center lg:justify-end items-center lg:items-end lg:pl-4 lg:w-1/2 mt-8 lg:mt-0"
          >
            <a href={instagramUrl} className="mx-3 font-bold hover:underline">
              <span className="[&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M224.1 141c-63.6 0-114.9 51.3-114.9 114.9s51.3 114.9 114.9 114.9S339 319.5 339 255.9 287.7 141 224.1 141zm0 189.6c-41.1 0-74.7-33.5-74.7-74.7s33.5-74.7 74.7-74.7 74.7 33.5 74.7 74.7-33.6 74.7-74.7 74.7zm146.4-194.3c0 14.9-12 26.8-26.8 26.8-14.9 0-26.8-12-26.8-26.8s12-26.8 26.8-26.8 26.8 12 26.8 26.8zm76.1 27.2c-1.7-35.9-9.9-67.7-36.2-93.9-26.2-26.2-58-34.4-93.9-36.2-37-2.1-147.9-2.1-184.9 0-35.8 1.7-67.6 9.9-93.9 36.1s-34.4 58-36.2 93.9c-2.1 37-2.1 147.9 0 184.9 1.7 35.9 9.9 67.7 36.2 93.9s58 34.4 93.9 36.2c37 2.1 147.9 2.1 184.9 0 35.9-1.7 67.7-9.9 93.9-36.2 26.2-26.2 34.4-58 36.2-93.9 2.1-37 2.1-147.8 0-184.8zM398.8 388c-7.8 19.6-22.9 34.7-42.6 42.6-29.5 11.7-99.5 9-132.1 9s-102.7 2.6-132.1-9c-19.6-7.8-34.7-22.9-42.6-42.6-11.7-29.5-9-99.5-9-132.1s-2.6-102.7 9-132.1c7.8-19.6 22.9-34.7 42.6-42.6 29.5-11.7 99.5-9 132.1-9s102.7-2.6 132.1 9c19.6 7.8 34.7 22.9 42.6 42.6 11.7 29.5 9 99.5 9 132.1s2.7 102.7-9 132.1z" />
                </svg>
              </span>
            </a>
            <a href={linkedinUrl} className="mx-3 font-bold hover:underline">
              <span className="[&>svg]:h-5 [&>svg]:w-5">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 448 512"
                >
                  <path d="M100.3 448H7.4V148.9h92.9zM53.8 108.1C24.1 108.1 0 83.5 0 53.8a53.8 53.8 0 0 1 107.6 0c0 29.7-24.1 54.3-53.8 54.3zM447.9 448h-92.7V302.4c0-34.7-.7-79.2-48.3-79.2-48.3 0-55.7 37.7-55.7 76.7V448h-92.8V148.9h89.1v40.8h1.3c12.4-23.5 42.7-48.3 87.9-48.3 94 0 111.3 61.9 111.3 142.3V448z" />
                </svg>
              </span>
            </a>
          </div>
        </div>
      </Container>
    </footer>
  );
}

export default Footer;
