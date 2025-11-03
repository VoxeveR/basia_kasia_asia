import Footer from "@/components/Foooter";
import Menu from "@/components/Menu";
import { columns, type Users } from "@/components/columns";
import { DataTable } from "@/components/data-table";


function AdminPanelPage() {
    const data: Users[] = [
        {
            username: "john_doe",
            email: "john.doe@example.com",
            date_of_birth: "1990-05-15",
            gender: "male",
            role: "user",
        },
        {
            username: "jane_smith",
            email: "jane.smith@example.com",
            date_of_birth: "1985-08-22",
            gender: "female",
            role: "admin",
        },
        {
            username: "alice_johnson",
            email: "alice.johnson@example.com",
            date_of_birth: "1992-03-10",
            gender: "female",
            role: "user",
        },
        {
            username: "bob_williams",
            email: "bob.williams@example.com",
            date_of_birth: "1988-11-30",
            gender: "male",
            role: "user",
        },
        {
            username: "charlie_brown",
            email: "charlie.brown@example.com",
            date_of_birth: "1995-07-14",
            gender: "male",
            role: "admin",
        },
        {
            username: "diana_prince",
            email: "diana.prince@example.com",
            date_of_birth: "1987-12-25",
            gender: "female",
            role: "user",
        },
        {
            username: "admin",
            email: "admin@example.com",
            date_of_birth: "1980-01-01",
            gender: "other",
            role: "admin",
        },
        {
            username: "test_user",
            email: "test@example.com",
            gender: "male",
            role: "user",
        },
    ]
    return (
        <div className='w-full h-full flex flex-col gap-4 p-4'> 
            <Menu />
            
            <DataTable columns={columns} data={data} />

            <Footer  />
        </div>
    )
}

export default AdminPanelPage;