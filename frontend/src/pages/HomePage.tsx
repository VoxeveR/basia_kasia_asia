import  Menu  from '@/components/Menu'

function HomePage() {
    return (
        <div className='w-full h-full flex flex-col gap-4 p-4'> 
            <Menu />
            <div>Home Page</div>
        </div>
    )
}

export default HomePage;