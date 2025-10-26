import Menu from "@/components/Menu";
import * as React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { ChevronDownIcon } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import { register } from "../services/auth";
import { toast } from "sonner";


function LoginPage() {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    const [activeTab, setActiveTab] = React.useState("signIn")
    const [emailLogin, setEmailLogin] = React.useState("");
    const [passwordLogin, setPasswordLogin] = React.useState("");
    const [nameRegister, setNameRegister] = React.useState("");
    const [emailRegister, setEmailRegister] = React.useState("");
    const [passwordRegister, setPasswordRegister] = React.useState("");
    const [repeatPasswordRegister, setRepeatPasswordRegister] = React.useState("");
    const [genderRegister, setGenderRegister] = React.useState("");
    const auth = useAuth();
    
    const handleLogin = async () => {
        const id = toast.loading("Logging in...");
        try{
            if (emailLogin === "" && passwordLogin === "") {
                toast.warning("Email and password are required", {id});
                return;
            }

            await auth.login(emailLogin, passwordLogin);
        } catch (error) {
            toast.error(`Login error: ${error}`, {id});
        }
    }

    const handleRegister = async () => {
        const id = toast.loading("Registering...");
        try {
            if (emailRegister === "" && passwordRegister === "") {
                toast.warning("Email and password are required", { id });
                return;
            }

            if (passwordRegister !== repeatPasswordRegister) {
                toast.warning("Passwords do not match", { id });
                return;
            }

            await register(emailRegister, passwordRegister, nameRegister, date, genderRegister);
            
            // Success - switch to sign in tab
            toast.success("Registration successful! Please sign in.", { id });
            setActiveTab("signIn");
            
            // Pre-populate email in login form for convenience
            setEmailLogin(emailRegister);
            
            // Clear registration form
            setNameRegister("");
            setEmailRegister("");
            setPasswordRegister("");
            setRepeatPasswordRegister("");
            setGenderRegister("");
            setDate(undefined);
            
        } catch (error) {
            toast.error(`Registration error: ${error}`, { id });
        }
    }

    return (
        <div className='w-full h-full flex flex-col gap-4 p-4'>
            <Menu />
            <div className="bg-[url(/src/assets/img/background.svg)] p-4">
                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-3/10 justify-center bg-white/80 mx-auto p-4 rounded-lg">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="signIn">Sign In</TabsTrigger>
                        <TabsTrigger value="signUp">Sign Up</TabsTrigger>
                    </TabsList>
                    <TabsContent value="signIn">
                        <Card>
                            <CardHeader>
                                <CardTitle>Sign In!</CardTitle>
                                <CardDescription>Please sign in to your account.</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-email">Email</Label>
                                    <Input id="tabs-demo-email" value={emailLogin} placeholder="your.email@gmail.com" onChange={(e) => setEmailLogin(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-password">Password</Label>
                                    <Input id="tabs-demo-password" type="password" value={passwordLogin} placeholder="Your password" onChange={(e) => setPasswordLogin(e.target.value)} onKeyDown={(e) => e.key === "Enter" && handleLogin()}/>
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="bg-black! text-white" onClick={handleLogin}>Sign In</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                    <TabsContent value="signUp">
                        <Card className="overflow-auto h-3/5">
                            <CardHeader>
                                <CardTitle>Sign Up!</CardTitle>
                                <CardDescription>Don't have an account? Register now!</CardDescription>
                            </CardHeader>
                            <CardContent className="grid gap-6">
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-name">Name</Label>
                                    <Input id="tabs-demo-name" value={nameRegister} placeholder="Your name" onChange={(e) => setNameRegister(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Select value={genderRegister} onValueChange={setGenderRegister}>
                                        <SelectTrigger className="w-[180px]">
                                            <SelectValue placeholder="Select gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectGroup>
                                                <SelectLabel>Gender</SelectLabel>
                                                <SelectItem value="female">female</SelectItem>
                                                <SelectItem value="male">male</SelectItem>
                                                <SelectItem value="non-binary">non-binary</SelectItem>
                                            </SelectGroup>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex flex-col gap-3">
                                    <Label htmlFor="date" className="px-1">
                                        Date of birth
                                    </Label>
                                    <Popover open={open} onOpenChange={setOpen}>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant="outline"
                                                id="date"
                                                className="w-48 justify-between font-normal"
                                            >
                                                {date ? date.toLocaleDateString() : "Select date"}
                                                <ChevronDownIcon />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto overflow-hidden p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={date}
                                                captionLayout="dropdown"
                                                onSelect={(date) => {
                                                    setDate(date)
                                                    setOpen(false)
                                                }}
                                            />
                                        </PopoverContent>
                                    </Popover>
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-email">Email</Label>
                                    <Input id="tabs-demo-email" value={emailRegister} placeholder="your.email@gmail.com" onChange={(e) => setEmailRegister(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-password">Password</Label>
                                    <Input id="tabs-demo-password" type="password" value={passwordRegister} placeholder="Your password" onChange={(e) => setPasswordRegister(e.target.value)} />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-repeat-password">Repeat password</Label>
                                    <Input id="tabs-demo-repeat-password" type="password" value={repeatPasswordRegister} placeholder="Repeat password" onChange={(e) => setRepeatPasswordRegister(e.target.value)} />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="bg-black! text-white" onClick={handleRegister}>Sign Up</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default LoginPage;