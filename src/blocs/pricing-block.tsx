"use client";
import { cn } from "@/lib/utils";
import { AnimatePresence, motion } from "framer-motion";
import { Check } from "lucide-react";
import { useState } from "react";

const pricingPlans = [
  {
    name: "Basic",
    description: "Start with essential tools to boost your online presence.",
    monthlyPrice: 69,
    annualPrice: 49,
    link: "https://github.com/ansub/syntaxUI",
    features: [
      "SEO Strategy & Topic Recommendations",
      "Competitor Analysis to stand out",
      "Built-in Keyword Research",
      "Target latest Google trends",
      "SEO optimized blogs and socials",
      "Technical SEO analysis and Reports",
      "Target 100+ regions and languages",
    ],
  },
  {
    name: "Professional",
    description:
      "Unlock enhanced features and premium content to supercharge your business.",
    monthlyPrice: 299,
    annualPrice: 199,
    link: "https://github.com/ansub/syntaxUI",
    features: [
      "Everything in Basic plan",
      "Get 25 premium blogs",
      "Index upto 1000 pages",
      "Premium support",
      "Local SEO",
      "SEO Agent",
    ],
  },
  {
    name: "Premium",
    description:
      "Ultimate customization and dedicated support for enterprises.",
    monthlyPrice: 2499,
    annualPrice: 1666,
    link: "https://github.com/ansub/syntaxUI",
    features: [
      "Everything in Professional plan",
      "Get Unlimited premium blogs",
      "Add your own AI Model key",
      "Premium support & training sessions",
    ],
  },
];

const Pricing = () => {
  const [billingCycle, setBillingCycle] = useState<"M" | "A">("M");

  const Heading = () => (
    <div className="relative z-10 my-12 flex flex-col items-center justify-center gap-4">
      <div className="flex w-full flex-col items-center justify-center space-y-4 text-center">
        <div className="mb-2 inline-block rounded-full bg-brown-100 px-2 py-[0.20rem] text-xs font-medium uppercase text-brown-500 dark:bg-brown-200">
          {" "}
          Pricing
        </div>
        <p className="mt-2 text-3xl font-bold tracking-tight text-gray-800 dark:text-gray-200 sm:text-4xl">
          Fair pricing, unfair advantage.
        </p>
        <p className="text-md max-w-xl text-gray-700 dark:text-gray-300 md:text-center">
          Get started with Acme today and take your business to the next level.
        </p>
      </div>
      <div className="flex items-center justify-center gap-3">
        <button
          onClick={() => setBillingCycle("M")}
          className={cn(
            `rounded-lg px-4 py-2 text-sm font-medium`,
            billingCycle === "M"
              ? "relative bg-brown-500 text-white"
              : "text-gray-700 hover:bg-brown-100 dark:text-gray-300 dark:hover:text-black",
          )}
        >
          Monthly
          {billingCycle === "M" && <BackgroundShift shiftKey="monthly" />}
        </button>
        <button
          onClick={() => setBillingCycle("A")}
          className={cn(
            `rounded-lg px-4 py-2 text-sm font-medium`,
            billingCycle === "A"
              ? "relative bg-brown-500 text-white"
              : "text-gray-700 hover:bg-brown-100 dark:text-gray-300 dark:hover:text-black",
          )}
        >
          Annual
          {billingCycle === "A" && <BackgroundShift shiftKey="annual" />}
        </button>
      </div>
    </div>
  );

  const PricingCards = () => (
    // Cards div row
    <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center lg:items-stretch gap-8 lg:flex-row lg:gap-4">
      {pricingPlans.map((plan, index) => (
        // Single card
        <motion.div
          initial={{ opacity: 0, y: 100 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.3, ease: "easeInOut", delay: 0.3 * index }}
          key={index}
          className="z-30 w-3/4 md:w-full rounded-lg border-[1px] border-gray-300 bg-white p-6 text-left shadow-md dark:border-neutral-500 dark:bg-black dark:shadow-neutral-600"
        >
          <p className="mb-1 mt-0 text-sm font-medium uppercase text-brown-500 dark:text-zinc-100">
            {plan.name}
          </p>
          <p className="my-0 mb-6 text-sm text-neutral-500">
            {plan.description}
          </p>
          <div className="mb-8 overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.p
                key={billingCycle === "M" ? "monthly" : "annual"}
                initial={{ y: -50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 100 }}
                className="my-0 text-3xl font-semibold text-gray-900 dark:text-gray-100"
              >
                <span>
                  ${billingCycle === "M" ? plan.monthlyPrice : plan.annualPrice}
                </span>
                <span className="text-sm font-medium">
                  /{billingCycle === "M" ? "month" : "year"}
                </span>
              </motion.p>
            </AnimatePresence>
            <motion.button
              whileTap={{ scale: 0.985 }}
              onClick={() => {
                window.open(plan.link);
              }}
              className="mt-8 w-full rounded-lg bg-brown-500 py-2 text-sm font-medium text-white hover:bg-brown-500/90"
            >
              Get Started
            </motion.button>
          </div>
          {plan.features.map((feature, idx) => (
            <div key={idx} className="mb-3 flex items-center gap-2">
              <Check className="text-brown-500" size={18} />
              <span className="text-sm text-neutral-500">{feature}</span>
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );

  return (
    <section className="relative w-full overflow-hidden py-12 text-black dark:bg-black lg:py-12">
      <img src="/vector-2.png" alt="" className="absolute z-10 object-contain w-full" />
      <div className="px-4 lg:px-2">
        <Heading />
        <PricingCards />
      </div>
    </section>
  );
};

const BackgroundShift = ({ shiftKey }: { shiftKey: string }) => (
  <motion.span
    key={shiftKey}
    layoutId="bg-shift"
    className="absolute inset-0 -z-10 rounded-lg bg-brown-500"
    initial={{ opacity: 0, scale: 0.8 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.8 }}
    transition={{ type: "spring", stiffness: 200, damping: 20 }}
  />
);

export default function PricingBlock() {
  return <Pricing />;
}
