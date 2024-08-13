import FormInput from "./FormInput";
import { Input } from "./ui/input";
import Image from "next/image";

export default function Footer() {
  const footerLinks = [
    { label: "Company", links: [
      { label: "About", url: "#" },
      { label: "Team", url: "#" },
      { label: "Location", url: "#" },
      { label: "Careers", url: "#" },
    ] },
    { label: "Services", links: [
      { label: "Web Development", url: "#" },
      { label: "Mobile Development", url: "#" },
      { label: "UI/UX Design", url: "#" },
      { label: "Digital Marketing", url: "#" },
    ] },
    { label: "Helpful Links", links: [
      { label: "Nextjs Docs", url: "#" },
      { label: "Supabase Docs", url: "#" },
      { label: "Clerk Docs", url: "#" },
    ] },
  ]

  const currentYear = new Date().getFullYear()

  return (
    <footer className="bg-white dark:bg-neutral-900 border-neutral-100 border-t">
    <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
      <div className="lg:grid lg:grid-cols-2">
        <div
          className="border-b border-gray-100 dark:border-neutral-500 py-8 lg:order-last lg:border-b-0 lg:border-s lg:py-16 lg:ps-16"
        >

          <div className="flex items-center gap-2 lg:hidden">
          <Image src={'/briefinly-favicon.png'} alt="logo" width={50} height={50}/>
                <p className="text-2xl font-bold text-brown-500">Briefinly.</p>
          </div>
  
          <div className="mt-8 space-y-4 lg:mt-0">
            <span className="hidden h-1 w-10 rounded bg-brown-500 lg:block"></span>
  
            <div>
              <h2 className="text-2xl font-medium text-neutral-900 dark:text-zinc-100">Request a Demo</h2>
  
              <p className="mt-4 max-w-lg text-neutral-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis, harum deserunt
                nesciunt praesentium, repellendus eum perspiciatis ratione pariatur a aperiam eius
                numquam doloribus asperiores sunt.
              </p>
            </div>
  
            <form className="mt-6 w-full">
              {/* <label htmlFor="UserEmail" className="sr-only"> Email </label>
  
              <div
                className="rounded-md border border-neutral-100 p-2 focus-within:ring sm:flex sm:items-center sm:gap-4"
              >
                <input
                  type="email"
                  id="UserEmail"
                  placeholder="john@rhcp.com"
                  className="w-full border-none focus:border-transparent focus:ring-transparent sm:text-sm"
                />
  
                <button
                  className="mt-1 w-full rounded bg-teal-500 px-6 py-3 text-sm font-bold uppercase tracking-wide text-white transition-none hover:bg-teal-600 sm:mt-0 sm:w-auto sm:shrink-0"
                >
                  Sign Up
                </button>
              </div> */}
              <FormInput name="email">
                <Input />
              </FormInput>
            </form>
          </div>
        </div>
  
        <div className="py-8 lg:py-16 lg:pe-16">
          <div className="items-center gap-2 lg:flex hidden">
          <Image src={'/briefinly-favicon.png'} alt="logo" width={50} height={50}/>
                <p className="text-2xl font-bold text-brown-500">Briefinly.</p>
          </div>
  
          <div className="mt-8 grid grid-cols-2 gap-8 sm:grid-cols-3">
            {footerLinks.map((link,i)=>(
              <div key={i}>
              <p className="font-medium text-neutral-900 dark:text-zinc-100">{link.label}</p>
              <ul className="mt-6 space-y-4 text-sm">
                {link.links.map((item,i)=>(
                  <li key={i}>
                  <a href={item.url} className="text-neutral-500 transition hover:opacity-75"> {item.label} </a>
                </li>
                ))}
              </ul>
            </div>
            ))}

          </div>
  
          <div className="mt-8 border-t border-gray-100 dark:border-neutral-500 pt-8">
            <ul className="flex flex-wrap gap-4 text-xs">
              <li>
                <a href="#" className="text-neutral-500 transition hover:opacity-75"> Terms & Conditions </a>
              </li>
  
              <li>
                <a href="#" className="text-neutral-500 transition hover:opacity-75"> Privacy Policy </a>
              </li>
  
              <li>
                <a href="#" className="text-neutral-500 transition hover:opacity-75"> Cookies </a>
              </li>
            </ul>
  
            <p className="mt-8 text-xs text-neutral-500">&copy; {currentYear}. Briefinly. All rights reserved.</p>
          </div>
        </div>
      </div>
    </div>
  </footer>
  );
}
