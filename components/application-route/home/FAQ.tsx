import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import { faqs as faqData } from "@/lib/faqData";

interface FaqAccordionItemProps {
  value: string;
  label: string;
  content: string;
}


const FAQ = () => {
  return (
    <section className="flex flex-col items-center overflow-x-hidden bg-[#040714] py-16">
      <h2 className="text-5xl font-bold">Frequently Asked Questions</h2>
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
    <AccordionItem value={value} className="bg-[#13151d] p-0  ">
      <AccordionTrigger className="p-6 text-xl font-bold text-[#F9F9F9]">
        {label}
      </AccordionTrigger>
      <AccordionContent className="px-6 text-lg font-normal text-[#C0C0C0]">
        {content}
      </AccordionContent>
    </AccordionItem>
  );
};

export default FAQ;
