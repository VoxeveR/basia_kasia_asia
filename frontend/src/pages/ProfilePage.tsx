import Menu from "@/components/Menu";

const dummyDate="28-11-2001";

function ProfilePage() {
    return (
        <div className='w-full h-full flex flex-col gap-4 p-4'>
            <Menu />
            <div className="justify-center items-center flex flex-col gap-4">
                <div className="text-5xl bold">Profile Page</div>
                <div>Joined: {dummyDate}</div>
                <img src="/path/to/profile-pic.jpg" alt="Profile Picture" className="rounded-full w-32 h-32" />
                
            </div>
        </div>
    )
}

export default ProfilePage;