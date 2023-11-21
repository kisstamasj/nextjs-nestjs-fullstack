import { Eye, LayoutDashboard, LogOut, User } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut, useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

export function UserMenu() {
  const pathname = usePathname();
  const router = useRouter();
  const {data} = useSession()

  const monogram = () => {
    let arr = data?.user.name.split(' ');
    if(!arr) return '';
    const firstName = arr[0];
    const latstName = arr[1] ? arr[1] : [''];
    return firstName[0]+latstName[0]
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={data?.user.avatar} alt={data?.user.name} />
          <AvatarFallback>{monogram()}</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{data?.user.name}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <User className="mr-2 h-4 w-4" />
            <span>Profile</span>
          </DropdownMenuItem>
          {pathname.startsWith("/admin") ? (
            <DropdownMenuItem>
              <Eye className="mr-2 h-4 w-4" />
              <span onClick={() => router.push("/")}>Visit site</span>
            </DropdownMenuItem>
          ) : (
            <DropdownMenuItem>
              <LayoutDashboard className="mr-2 h-4 w-4" />
              <span onClick={() => router.push("/admin")}>Dashboard</span>
            </DropdownMenuItem>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut({ redirect: true })}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
