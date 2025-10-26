import  Menu  from '@/components/Menu'
import Cards from '@/components/Card';
import Footer from '@/components/Foooter';

function HomePage() {
    return (
        <div className='w-full h-full flex flex-col gap-4 p-4'> 
            <Menu />
            <div className="flex flex-col items-center">
                <div className="w-full max-w-fit">
                    <p className='text-4xl font-bold'>Your Voice! Your Space!</p>
                    <p className='text-4xl font-bold mb-8'>Your Community!</p>
                    <p className="text-2xl font-semibold mb-4">Our Founders</p>
                    <div className="flex gap-6 flex-wrap">
                        <Cards 
                            imageSrc="/src/assets/img/Basia.jpg"
                            title="Basia"
                            description="Współzałożycielka i główna wizjonerka platformy. Odpowiada za strategię rozwoju i budowanie społeczności."
                        />
                        <Cards 
                            imageSrc="/src/assets/img/Kasia.jpg"
                            title="Kasia"
                            description="Ekspertka od technologii i rozwoju produktu. Dba o to, żeby platforma działała bezproblemowo."
                        />
                        <Cards 
                            imageSrc="/src/assets/img/Asia.jpg"
                            title="Asia"
                            description="Specjalistka od komunikacji i marketingu. Tworzy mosty między społecznością a platformą."
                        />
                    </div>
                </div>
            </div>
            <Footer  />
        </div>
    )
}

export default HomePage;