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
import { IDataTableContext, useDataTable } from "@/contexts/datatable-context";
import React from "react";

export default function DataTableControls() {
  const {table, pageRoute, loading} = useDataTable()
  const router = useRouter();
  const rowsSelected = table.getSelectedRowModel().rows.length > 0;
  const onUpdateHandler = () => {
    if(!rowsSelected){
        return alert('Nem választott ki sort!');
    }
    const rowId = table.getSelectedRowModel().rows[0].getValue("id");
    
    router.push(`${pageRoute}/${rowId}`);
  }
  return (
    <div className="flex justify-start flex-wrap items-center py-2 gap-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" disabled={loading}>
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
      <Button disabled={loading} variant={"outline"} className="ml-auto" onClick={() => router.push(`${pageRoute}/create`)}>
        <PlusCircleIcon className="w-4 h-4 mr-2" /> Létrehozás
      </Button>
      <Button disabled={loading || !rowsSelected} variant={"outline"} onClick={onUpdateHandler}>
        <PencilIcon className="w-4 h-4 mr-2" /> Módosítás
      </Button>
    </div>
  );
}
