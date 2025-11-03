import Menu from "@/components/Menu";
import Footer from "@/components/Foooter";
import Forum from "@/components/Forum";

function ForumPage() {
    return (
        <div className='w-full min-h-screen flex flex-col gap-4 p-4 bg-gray-50'>
            <Menu />    
            <div className="bg-[url(/src/assets/img/background.svg)] flex-1">
                <Forum />
            </div>
            <Footer />
        </div>
    )
}

export default ForumPage;