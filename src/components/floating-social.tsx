"use client";

import Link from "next/link";
import { Phone } from "lucide-react";
import { usePathname } from "next/navigation";

const FACEBOOK_URL = "https://www.facebook.com/CapitalJEYCarTrading/";
const MESSENGER_URL = "https://m.me/CapitalJEYCarTrading";
const INSTAGRAM_URL = "https://www.instagram.com/capitaljautofocus";
const PHONE_NUMBER = "+639972530052"; // 0997 253 0052

const focusRing =
  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white";

// lucide-react no longer ships brand/logo icons, so these are inline SVGs.
interface BrandIconProps {
  size?: number;
  className?: string;
}

function FacebookIcon({ size = 18, className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M22 12.06C22 6.51 17.52 2 12 2S2 6.51 2 12.06c0 5.02 3.66 9.18 8.44 9.94v-7.03H7.9v-2.91h2.54V9.85c0-2.52 1.49-3.91 3.77-3.91 1.09 0 2.23.2 2.23.2v2.47h-1.26c-1.24 0-1.63.78-1.63 1.58v1.89h2.78l-.44 2.91h-2.34V22c4.78-.76 8.44-4.92 8.44-9.94Z" />
    </svg>
  );
}

function MessengerIcon({ size = 18, className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="currentColor"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 0C5.24 0 0 4.952 0 11.64c0 3.499 1.434 6.521 3.769 8.61a.96.96 0 0 1 .323.683l.065 2.135a.96.96 0 0 0 1.347.85l2.381-1.053a.96.96 0 0 1 .641-.046A13 13 0 0 0 12 23.28c6.76 0 12-4.952 12-11.64S18.76 0 12 0m6.806 7.44c.522-.03.971.567.63 1.094l-4.178 6.457a.707.707 0 0 1-.977.208l-3.87-2.504a.44.44 0 0 0-.49.007l-4.363 3.01c-.637.438-1.415-.317-.995-.966l4.179-6.457a.707.707 0 0 1 .977-.21l3.87 2.505c.15.097.344.094.49-.007l4.362-3.008a.7.7 0 0 1 .365-.13" />
    </svg>
  );
}

function InstagramIcon({ size = 18, className }: BrandIconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.75" fill="currentColor" stroke="none" />
    </svg>
  );
}

export interface FloatingSocialProps {
  facebookHref?: string;
  messengerHref?: string;
  instagramHref?: string;
  phone?: string;
}

interface SocialLink {
  name: string;
  href: string;
  icon: React.ElementType;
  bg: string;
  text: string;
}

export default function FloatingSocial({
  facebookHref = FACEBOOK_URL,
  messengerHref = MESSENGER_URL,
  instagramHref = INSTAGRAM_URL,
  phone = PHONE_NUMBER,
}: FloatingSocialProps) {
  const pathname = usePathname() ?? "";

  // Hide floating social buttons on all admin pages
  if (pathname.startsWith("/admin")) {
    return null;
  }

  const links: SocialLink[] = [
    {
      name: "Facebook",
      href: facebookHref,
      icon: FacebookIcon,
      bg: "bg-[#1877F2]",
      text: "text-white",
    },
    {
      name: "Messenger",
      href: messengerHref,
      icon: MessengerIcon,
      bg: "bg-gradient-to-tr from-[#00B2FF] to-[#006AFF]",
      text: "text-white",
    },
    {
      name: "Instagram",
      href: instagramHref,
      icon: InstagramIcon,
      bg: "bg-gradient-to-tr from-[#F58529] via-[#DD2A7B] to-[#8134AF]",
      text: "text-white",
    },
  ];

  if (phone) {
    links.push({
      name: "Call Us",
      href: `tel:${phone}`,
      icon: Phone,
      // White so it stays visible on red page sections
      bg: "bg-white",
      text: "text-[#E31B23]",
    });
  }

  return (
    <div
      aria-label="Contact us"
      className="fixed right-0 top-1/2 z-40 -translate-y-1/2"
    >
      {/* Black rail with a red edge. Buttons are square, with each brand's own color */}
      <div className="flex flex-col items-center gap-px border-y border-l-4 border-y-white/10 border-l-[#E31B23] bg-[#0B0B0B]">
        {links.map((link) => {
          const Icon = link.icon;

          return (
            <Link
              key={link.name}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              aria-label={link.name}
              className={`group relative flex h-11 w-11 items-center justify-center transition-[filter] duration-200 hover:brightness-95 sm:h-12 sm:w-12 ${link.bg} ${link.text} ${focusRing}`}
            >
              <Icon size={18} strokeWidth={2.25} className="sm:h-5 sm:w-5" />

              {/* Tooltip */}
              <span className="pointer-events-none absolute right-full mr-3 translate-x-1 whitespace-nowrap bg-[#0B0B0B] px-2.5 py-1 text-xs font-semibold uppercase tracking-wider text-white opacity-0 transition-all duration-200 group-hover:translate-x-0 group-hover:opacity-100">
                {link.name}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
