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


function LoginPage() {
    const [open, setOpen] = React.useState(false)
    const [date, setDate] = React.useState<Date | undefined>(undefined)
    return (
        <div className='w-full h-full flex flex-col gap-4 p-4'>
            <Menu />
            <div className="bg-[url(/src/assets/img/background.svg)] p-4">
                <Tabs defaultValue="signIn" className="w-3/10 justify-center bg-white/80 mx-auto p-4 rounded-lg">
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
                                    <Input id="tabs-demo-email" defaultValue="your.email@gmail.com" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-password">Password</Label>
                                    <Input id="tabs-demo-password" defaultValue="your password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="text-white !bg-black">Sign In</Button>
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
                                    <Input id="tabs-demo-name" defaultValue="Name" />
                                </div>
                                <div className="grid gap-3">
                                    <Select>
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
                                    <Label htmlFor="tabs-demo-localization">Locatization</Label>
                                    <Input id="tabs-demo-localization" defaultValue="Cracow" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-email">Email</Label>
                                    <Input id="tabs-demo-email" defaultValue="your.email@gmail.com" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-password">Password</Label>
                                    <Input id="tabs-demo-password" defaultValue="your password" />
                                </div>
                                <div className="grid gap-3">
                                    <Label htmlFor="tabs-demo-repeat-password">Repeat password</Label>
                                    <Input id="tabs-demo-repeat-password" defaultValue="repeat password" />
                                </div>
                            </CardContent>
                            <CardFooter>
                                <Button className="!bg-black text-white">Sign Up</Button>
                            </CardFooter>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>
        </div>
    )
}

export default LoginPage;