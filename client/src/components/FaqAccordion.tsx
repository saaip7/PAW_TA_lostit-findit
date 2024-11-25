import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  const FAQ = [
    { question: "Apakah ini aksesibel?", answer: "Ya, ini mengikuti pola desain WAI-ARIA." },
    { question: "Bagaimana cara menggunakannya?", answer: "Cukup gunakan komponen ini di proyek Anda." },
    { question: "Dapatkah saya menyesuaikan gaya?", answer: "Ya, gunakan Tailwind CSS atau CSS Anda sendiri." },
    { question: "Apa yang harus saya lakukan?", answer: "Tinggal klik lapor barang" }
  ];

const FaqAccordion: React.FC = () => {
  return(
    <Accordion type="single" collapsible>
      {FAQ.map((item, index) => (
        <AccordionItem key={index} value={`item-${index + 1}`}>
          <AccordionTrigger>{item.question}</AccordionTrigger>
          <AccordionContent>{item.answer}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}

export default FaqAccordion;
