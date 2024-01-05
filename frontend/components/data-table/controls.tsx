"use client";

import { useRouter } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { ColumnsIcon, PencilIcon, PlusCircleIcon } from "lucide-react";
import { Table } from "@tanstack/react-table";

interface DataTableControlsProps<TData> {
  table: Table<TData>;
  route: string;
}

export default function DataTableControls<TData>({
  table,
  route,
}: DataTableControlsProps<TData>) {
  const router = useRouter();
  const onUpdateHandler = () => {
    if(!table.getSelectedRowModel().rows.length){
        return alert('Nem választott ki sort!');
    }
    const rowId = table.getSelectedRowModel().rows[0].getValue("id");
    
    router.push(`${route}/${rowId}`);
  }
  return (
    <div className="flex justify-start flex-wrap items-center py-2 gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <ColumnsIcon className="w-4 h-4 mr-2" />
            Oszlopok
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          {table
            .getAllColumns()
            .filter((column) => column.getCanHide())
            .map((column) => {
              return (
                <DropdownMenuCheckboxItem
                  key={column.id}
                  className="capitalize"
                  checked={column.getIsVisible()}
                  onCheckedChange={(value: any) =>
                    column.toggleVisibility(!!value)
                  }
                >
                  {column.id}
                </DropdownMenuCheckboxItem>
              );
            })}
        </DropdownMenuContent>
      </DropdownMenu>
      <Button variant={"outline"} className="ml-auto" onClick={() => router.push(`${route}/create`)}>
        <PlusCircleIcon className="w-4 h-4 mr-2" /> Létrehozás
      </Button>
      <Button variant={"outline"} onClick={onUpdateHandler}>
        <PencilIcon className="w-4 h-4 mr-2" /> Módosítás
      </Button>
    </div>
  );
}
