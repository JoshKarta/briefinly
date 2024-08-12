import PricingBlock from "@/blocs/pricing-block";
import AboutBlock from "@/blocs/about-block";
import BentobBlock from "@/blocs/bento-block";
import { HeroBlock } from "@/blocs/hero-block";
import MarqueeBlock from "@/blocs/marquee-block";
import NewsBlock from "@/blocs/news-block";
import { ProjectsBlock } from "@/blocs/projects-block";

export default function Home() {

  return (
    <main className="flex flex-col lg:pt-28 dark:bg-black">

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

      {/* Services
      <div className="w-full" id="services">
        <BentobBlock />
      </div>

      Projects
      <div className="pb-16">
        <ProjectsBlock />
      </div> */}

      {/* Pricing */}
      <div className="w-full py-2 md:py-12">
        <PricingBlock />
      </div>


      {/* NewsLetter */}
      <div>
        <NewsBlock />
      </div>
    </main>
  );
}
