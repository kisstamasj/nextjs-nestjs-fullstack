"use client";

import { useDataTable } from "@/contexts/datatable-context";
import useAxios from "@/hooks/use-axios";
import { useConfirmDialog } from "@/hooks/use-confirm-dialog";
import { RequestError } from "@/types/errors";
import {
  ColumnsIcon,
  MoreVertical,
  PencilIcon,
  PlusCircleIcon,
  RotateCw,
  Trash2Icon,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";
import { ButtonLoader } from "../loader";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";

export default function DataTableControls() {
  const { table, pageRoute, loading, api, fetchData, resetTable } =
    useDataTable();
  const router = useRouter();
  const rowsSelected = table.getSelectedRowModel().rows.length > 0;
  const [isPending, startTransition] = useTransition();
  const { axiosBackend: axios } = useAxios();

  const onDelete = () => {
    startTransition(async () => {
      const rows = table.getSelectedRowModel().rows;
      for (let i = 0; i < rows.length; i++) {
        try {
          await axios.delete(`${api}/${rows[i].getValue("id")}`);
        } catch (error) {
          let e = error as RequestError;
          console.log(error);
          let message = e.response?.data?.message as string;
          toast.error(message, { description: rows[i].getValue("name") });
          return;
        }
      }
      toast.success("Sikeres törlés", {
        description: rows.length + " sor sikeresen törölve.",
      });
      fetchData();
    });
  };

  const { showConfirmDialog } = useConfirmDialog((state) => {
    state.title = "Biztosan törli a kijelölt sorokat?";
    state.description = "A művelet nem visszavonható!";
    state.onConfirm = onDelete;
    return state;
  });

  const onCreateHandler = () => {
    router.push(`${pageRoute}/create`);
  };
  const onUpdateHandler = () => {
    const rowId = table.getSelectedRowModel().rows[0].getValue("id");
    if (!rowId) return;
    router.push(`${pageRoute}/${rowId}`);
  };

  const onDeleteHandler = () => {
    if (!rowsSelected) return;
    showConfirmDialog();
  };

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
                  {column.columnDef.meta?.label as string}
                </DropdownMenuCheckboxItem>
              );
            })}
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={resetTable}>
            <RotateCw className="w-4 h-4 mr-2" /> Alaphelyzet
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <div className="hidden sm:flex gap-2 flex-wrap justify-end flex-1">
        <Button
          disabled={loading}
          variant={"outline"}
          onClick={onCreateHandler}
        >
          <PlusCircleIcon className="w-4 h-4 mr-2" /> Létrehozás
        </Button>
        <Button
          disabled={loading || !rowsSelected}
          variant={"outline"}
          onClick={onUpdateHandler}
        >
          <PencilIcon className="w-4 h-4 mr-2" /> Módosítás
        </Button>
        <Button
          disabled={loading || !rowsSelected}
          variant={"outline"}
          onClick={onDeleteHandler}
        >
          {isPending ? (
            <ButtonLoader />
          ) : (
            <Trash2Icon className="w-4 h-4 mr-2" />
          )}{" "}
          Törlés
        </Button>
      </div>

      <div className="flex sm:hidden gap-2 flex-wrap justify-end flex-1">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" size={"icon"} disabled={loading}>
              <MoreVertical className="w-4 h-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={onCreateHandler} disabled={loading}>
              <PlusCircleIcon className="w-4 h-4 mr-2" /> Létrehozás
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onUpdateHandler}
              disabled={loading || !rowsSelected}
            >
              <PencilIcon className="w-4 h-4 mr-2" /> Módosítás
            </DropdownMenuItem>
            <DropdownMenuItem
              onClick={onDeleteHandler}
              disabled={loading || !rowsSelected}
            >
              {isPending ? (
                <ButtonLoader />
              ) : (
                <Trash2Icon className="w-4 h-4 mr-2" />
              )}{" "}
              Törlés
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
