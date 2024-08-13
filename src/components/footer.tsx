"use client"
import { toast } from "sonner";
import FormInput from "./FormInput";
import { Button } from "./ui/button";
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
    <footer className="bg-white dark:bg-black border-neutral-100 dark:border-neutral-500 border-t">
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
              <FormInput name="email" className="relative">
                <Input className="pr-32 placeholder:text-neutral-300 placeholder:font-thin" placeholder="This is just for showcase" />
                <Button className="absolute w-fit right-[2px] top-5" size={"sm"} type="button" onClick={()=>{toast.success("Thank you for requesting a demo. We will contact you soon")}}>Send Request</Button>
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
