import Menu from "@/components/Menu";
import Footer from "@/components/Foooter";
import Forum from "@/components/Forum";

function ForumPage() {
    return (
        <div className='w-full h-full flex flex-col gap-4 p-4'>
            <Menu />    
            <div className="bg-[url(/src/assets/img/background.svg)]">
                <Forum />
            </div>
            <Footer />
        </div>
    )
}

export default ForumPage;