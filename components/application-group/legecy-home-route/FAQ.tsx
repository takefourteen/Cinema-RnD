import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs as faqData } from "@/data/faqData";

interface FaqAccordionItemProps {
  value: string;
  label: string;
  content: string;
}

/* 
convert this:
background: linear-gradient(48deg, #070739 0%, #060212 35%);
to tailwindcss:
bg-gradient-to-r from-[#070739] via-transparent to-[#060212]
*/

const FAQ = () => {
  // bg-gradient-to-r from-lime-600 via-yellow-300 to-red-600
  return (
    <section className="master-container flex flex-col items-center overflow-x-hidden bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#070739] via-black/70 to-[#060212] py-[72px] ">
      <h2 className="text-center text-4xl font-bold text-white lg:text-5xl">
        Frequently Asked Questions
      </h2>
      <div className="mt-8 w-full max-w-3xl">
        <FaqAccordion />
      </div>
    </section>
  );
};

const FaqAccordion = () => {
  return (
    <Accordion type="single" collapsible className="w-full">
      {faqData.map((item) => (
        <FaqAccordionItem
          key={item.value}
          value={item.value}
          label={item.label}
          content={item.content}
        />
      ))}
    </Accordion>
  );
};

const FaqAccordionItem = ({ value, label, content }: FaqAccordionItemProps) => {
  return (
    <AccordionItem value={value} className="border-b-1 bg-transparent p-0  ">
      <AccordionTrigger className="px-0 py-6 text-base font-semibold tracking-wide text-[#F9F9F9] md:text-lg">
        {label}
      </AccordionTrigger>
      <AccordionContent className="px-0  text-base text-[#C0C0C0] lg:text-lg">
        {content}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQ;
