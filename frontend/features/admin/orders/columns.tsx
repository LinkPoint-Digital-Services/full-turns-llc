"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";
import { OrderSummary } from "./types";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export const columns: ColumnDef<OrderSummary>[] = [
  {
    accessorKey: "id",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Order ID
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "itemsCount",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Items
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const count = row.getValue("itemsCount") as number;
      const items = row.original.items || [];
      
      return (
        <div className="pl-4">
           {items.length > 0 ? (
             <TooltipProvider>
               <Tooltip>
                 <TooltipTrigger asChild>
                   <span className="cursor-pointer underline decoration-dotted underline-offset-4">
                     {count} items
                   </span>
                 </TooltipTrigger>
                 <TooltipContent>
                    <ul className="list-disc pl-4 space-y-1">
                      {items.map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>
                 </TooltipContent>
               </Tooltip>
             </TooltipProvider>
           ) : (
             <span>{count} items</span>
           )}
        </div>
      );
    }
  },
  {
    accessorKey: "property",
    header: "Property",
    cell: ({ row }) => row.original.property || "—",
  },
  {
    accessorKey: "total",
    header: ({ column }) => {
      return (
        <div className="text-right">
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            className="p-0 hover:bg-transparent"
          >
            Total
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        </div>
      );
    },
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("total"));
      const formatted = new Intl.NumberFormat("en-PH", {
        style: "currency",
        currency: "PHP",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const order = row.original;
      // In a real app, this would use a mutation hook
      const handleStatusChange = (value: string) => {
        console.log(`Order ${order.id} status changed to ${value}`);
        // Here you would call your API update function
      };

      const getStatusColor = (status: string) => {
        switch (status) {
          case 'Completed': return 'bg-green-100 text-green-700 hover:bg-green-100/80 border-green-200';
          case 'Processing': return 'bg-blue-100 text-blue-700 hover:bg-blue-100/80 border-blue-200';
          case 'Cancelled': return 'bg-red-100 text-red-700 hover:bg-red-100/80 border-red-200';
          default: return 'bg-gray-100 text-gray-700 hover:bg-gray-100/80 border-gray-200'; // Pending
        }
      };

      return (
        <Select defaultValue={order.status} onValueChange={handleStatusChange}>
          <SelectTrigger className="w-[140px] h-8 border-none bg-transparent focus:ring-0 shadow-none p-0">
             <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {["Pending", "Processing", "Completed", "Cancelled"].map((status) => (
              <SelectItem key={status} value={status}>
                <Badge variant="outline" className={getStatusColor(status)}>
                  {status}
                </Badge>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      );
    },
  },
];
