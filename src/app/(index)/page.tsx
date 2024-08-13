import PricingBlock from "@/blocs/pricing-block";
import AboutBlock from "@/blocs/about-block";
import { HeroBlock } from "@/blocs/hero-block";
import MarqueeBlock from "@/blocs/marquee-block";
import ActionBlock from "@/blocs/action-block";

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
      <div className="w-full py-2 md:py-12">
        <PricingBlock />
      </div>

      {/* Action */}
      <div className="w-full py-2 md:py-12">
        <ActionBlock />
      </div>
    </main>
  );
}
