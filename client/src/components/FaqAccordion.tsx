import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
  } from "@/components/ui/accordion"

  const FAQ = [
    {  question: "Apa yang harus saya lakukan?", answer: "Tinggal klik lapor barang" },
    { question: "Apakah aplikasi ini gratis digunakan?", answer: "Ya, aplikasi ini dapat digunakan secara gratis oleh semua pengguna."},
    { question: "Bagaimana cara mencari barang yang hilang?", answer: "Anda dapat menggunakan kolom pencarian di bagian atas aplikasi untuk mengetikkan nama atau deskripsi barang yang hilang. Hasil pencarian akan menunjukkan daftar barang yang sesuai."},
    { question: "Bagaimana cara melaporkan barang temuan?", answer: "Klik tombol Lapor Barang Temuan di bagian atas halaman. Isi formulir dengan deskripsi lengkap barang temuan, termasuk lokasi dan waktu penemuan."},
    { question: "Apakah data pribadi saya aman di aplikasi ini?", answer: "Kami menjaga privasi dan keamanan data Anda dengan enkripsi end-to-end serta kebijakan privasi yang sesuai dengan peraturan."},
    { question: "Bagaimana saya dapat menghubungi pemilik barang yang hilang?", answer: "Setelah Anda menemukan barang yang cocok, gunakan fitur Lapor Barang Temuan yang tersedia di deskripsi barang untuk menghubungi pemilik secara langsung."},
    { question: "Bisakah saya memfilter hasil pencarian?", answer: "Ya, Anda dapat memfilter hasil pencarian berdasarkan Waktu laporan baran temuan yaitu fiter terbaru dan terlama menggunakan fitur filter di halaman pencarian."},
    { question: "Bagaimana cara saya menghapus laporan yang sudah saya buat?", answer: "Anda dapat mengakses laporan Anda di halaman profil. Pilih laporan yang ingin dihapus, lalu klik tombol Hapus Laporan."},
    { question: "Bagaimana jika saya tidak menemukan barang yang saya cari?", answer: "Jika barang Anda belum ditemukan, Anda dapat membuat laporan baru di aplikasi, dan kami akan memberitahukan Anda jika ada barang yang cocok."}
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
