import Footer from "@/components/Foooter";
import Menu from "@/components/Menu";
import { columns, type Users } from "@/components/columns";
import { DataTable } from "@/components/data-table";
import { forumColumns, type Forums } from "@/components/forum-columns";
import { ForumDataTable } from "@/components/forum-data-table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";


function AdminPanelPage() {
    const userData: Users[] = [
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
    ];

    const forumData: Forums[] = [
        { 
            id: "1", 
            title: "General Discussion", 
            description: "Talk about anything and everything",
            creator: "Admin",
            created_at: "2024-01-15T10:00:00Z"
        },
        { 
            id: "2", 
            title: "Technical Support", 
            description: "Get help with technical issues",
            creator: "Admin",
            created_at: "2024-01-16T14:30:00Z"
        },
        { 
            id: "3", 
            title: "Feature Requests", 
            description: "Suggest new features for the platform",
            creator: "Moderator",
            created_at: "2024-01-20T09:15:00Z"
        },
        { 
            id: "4", 
            title: "Bug Reports", 
            description: "Report bugs and issues you encounter",
            creator: "Admin",
            created_at: "2024-02-01T11:00:00Z"
        },
    ];

    return (
        <div className='w-full h-screen flex flex-col gap-4 p-4 bg-gray-50 overflow-hidden'> 
            <Menu />
            
            <div className="flex-1 flex flex-col overflow-hidden">
                <Tabs defaultValue="users" className="w-full flex flex-col flex-1 overflow-hidden">
                    <TabsList className="grid w-full grid-cols-2 max-w-md shrink-0">
                        <TabsTrigger value="users">Users</TabsTrigger>
                        <TabsTrigger value="forums">Forums</TabsTrigger>
                    </TabsList>
                    <TabsContent value="users" className="flex-1 overflow-hidden">
                        <DataTable columns={columns} data={userData} />
                    </TabsContent>
                    <TabsContent value="forums" className="flex-1 overflow-hidden">
                        <ForumDataTable columns={forumColumns} data={forumData} isAdmin={true} />
                    </TabsContent>
                </Tabs>
            </div>

            <Footer  />
        </div>
    )
}

export default AdminPanelPage;