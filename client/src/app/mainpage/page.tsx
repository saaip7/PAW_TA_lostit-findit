import { DetailProductCard } from "@/components/detailProductCard";



export default function Mainpage() {
    return (
        <div className="relative bg-white min-h-screen w-full">
            <div className="py-[4rem]">
            <DetailProductCard
                imageUrl="https://i.pinimg.com/564x/ac/f5/2c/acf52c313c4b320fda1fce42c66a8486.jpg" 
                title="Sample Title" 
                location="Sample Location" 
                date="2023-10-01" 
                status="Found" //ini bisa diganti jadi Gone, ntar warnanya bisa diganti
                description="Sample Description" 
            />
            </div>
        </div>
    )
}