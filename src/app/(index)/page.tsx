import PricingBlock from "@/blocs/pricing-block";
import AboutBlock from "@/blocs/about-block";
import { HeroBlock } from "@/blocs/hero-block";
import MarqueeBlock from "@/blocs/marquee-block";
import ActionBlock, { DottedCircle } from "@/blocs/action-block";

export default function Home() {
  return (
    <main className="flex flex-col dark:bg-black lg:pt-36">
      {/* Hero */}
      <div className="w-full" id="home">
        <HeroBlock />
      </div>

      {/* Marquees */}
      <div className="py-6 md:py-12">
        <MarqueeBlock />
      </div>

      {/* About */}
      <div className="w-full" id="about">
        <AboutBlock />
      </div>

      {/* Pricing */}
      <div className="z-20 w-full py-2 md:py-12">
        <PricingBlock />
      </div>

      {/* Action */}
      <div className="relative w-full overflow-hidden py-2 md:pb-12">
        <DottedCircle className="absolute -left-20 -top-14" />
        <DottedCircle className="absolute -bottom-12 -right-10 hidden md:inline-block" />
        <ActionBlock />
      </div>
    </main>
  );
}
