"use client";

import Link from "next/link";

export default function CTA() {
    return (
        <section className="relative overflow-hidden bg-[#000000] border-t border-[#E31B23]/30 backdrop-blur-2xl backdrop-[#E31B23]/10 py-14 text-center">
            {/* Background glow */}
            <div className="absolute left-1/2 top-1/2 h-[450px] w-[700px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/[0.06] blur-[130px]" />

            <div className="relative mx-auto max-w-4xl px-5 sm:px-6">
                <div className="mb-5 flex items-center justify-center gap-3">
                    <span className="h-px w-10 bg-[#E31B23]" />
                    <span className="text-xs font-semibold uppercase tracking-[0.3em] text-[#FF6B71]">
                        Your Next Drive
                    </span>
                    <span className="h-px w-10 bg-[#E31B23]" />
                </div>

                <h2 className="text-4xl font-black tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Ready to find your
                    <span className="block text-[#FF6B71]">
                        next car?
                    </span>
                </h2>

                <p className="mt-5 text-sm leading-7 text-[var(--muted)] sm:text-base">
                    Explore our collection or speak with our team about
                    finding the right vehicle for you.
                </p>

                <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">
                    <Link
                        href="/showroom"
                        className="inline-flex items-center justify-center rounded-full bg-[#E31B23] px-7 py-3.5 text-sm font-semibold text-black transition-all duration-300 hover:bg-[#FF3B43] hover:shadow-[0_0_30px_rgba(191,152,13,0.25)]"
                    >
                        Visit Showroom
                    </Link>

                    <Link
                        href="/contact"
                        className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/5 px-7 py-3.5 text-sm font-semibold text-white backdrop-blur-sm transition-all duration-300 hover:border-[#E31B23]/50 hover:bg-white/10"
                    >
                        Contact Us
                    </Link>
                </div>
            </div>
        </section>
    )
}