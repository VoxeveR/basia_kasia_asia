import {
  NavigationMenu,
  NavigationMenuContent,
//   NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
//   NavigationMenuViewport,
} from "@/components/ui/navigation-menu"
import { Link } from "react-router";
import Logo from "../assets/img/Logo-full.svg"


function Menu() {
    return (
    <div className="inline-flex items-center justify-between w-full">
        <div>
            <img src={Logo} alt="Logo" className="h-20 m-2" />
        </div>
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                        <Link to="/" >Main Page</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                        <Link to="/forum">Forum</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                        <Link to="/profile">Profile</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
                <NavigationMenuItem>
                    <NavigationMenuLink asChild className="text-xl">
                        <Link to="/login">Login</Link>
                    </NavigationMenuLink>
                </NavigationMenuItem>
            </NavigationMenuList>   
        </NavigationMenu>
    </div>
    )
}

export default Menu;