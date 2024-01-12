import { Eye, LayoutDashboard, LogOut, User, User2Icon } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { signOut } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { useCurrentUser } from "@/hooks/use-current-user";

export const UserMenu = () => {
  const pathname = usePathname();
  const router = useRouter();
  const currentUser = useCurrentUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src={currentUser?.avatar} alt={currentUser?.name} />
          <AvatarFallback className="hover:bg-muted">
            <User2Icon className="h-[1.2rem] w-[1.2rem]" />
          </AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuLabel>{currentUser?.name}</DropdownMenuLabel>
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
};
