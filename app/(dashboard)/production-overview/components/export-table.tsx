"use client";
import { useEffect, useState } from "react";
import { MoreHorizontal, SortDesc } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { xShareDataProps } from "../page";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";
import {
  floatFormatter,
  numberFormatter,
  quantityFormatter,
  quantityFormatterT,
} from "@/lib/utils";

export default function ExportTable({ data }: { data: xShareDataProps }) {
  const [selectedProduct, setSelectedProduct] = useState<string>("Cobalt");
  const [sortOption, setSortOption] =
    useState<keyof xShareDataProps[number]>("quantity");
  const [tableData, setTableData] = useState<xShareDataProps>(data);

  useEffect(() => {
    const tableData = data
      .filter((item) => item.product === selectedProduct)
      .sort((a, b) => {
        const aValue = a[sortOption];
        const bValue = b[sortOption];

        if (typeof aValue === "number" && typeof bValue === "number") {
          return bValue - aValue;
        } else {
          return 0; // Or some other logic if sorting by non-numeric values is needed
        }
      });

    setTableData(tableData);
  }, [data, selectedProduct, sortOption]);

  return (
    <Card className="__card">
      <CardHeader>
        <div className="flex justify-between space-x-4">
          <div>
            <CardTitle>Cobalt and Copper Exporters</CardTitle>
            <CardDescription>
              Share of exported copper and cobalt products by exporter.
            </CardDescription>
          </div>
          <div className="flex items-center space-x-2">
            <ToggleGroup
              type="single"
              unselectable="off"
              size={"sm"}
              defaultValue={selectedProduct}
              onValueChange={(value) => {
                if (value) setSelectedProduct(value);
              }}
              className="gap-0"
            >
              <ToggleGroupItem
                value={"Cobalt"}
                aria-label={`Toggle product Cobalt`}
                className="__button_pressed rounded-none rounded-l-lg bg-chart6/10 px-3 text-chart6 transition-all duration-300 data-[state=on]:bg-chart6/20 data-[state=on]:font-black data-[state=on]:text-chart6 hover:bg-chart6/10 hover:text-chart6/80 dark:bg-background/15 dark:data-[state=on]:bg-chart6/10 dark:data-[state=on]:text-blue-400"
              >
                {"Cobalt"}
              </ToggleGroupItem>
              <ToggleGroupItem
                value={"Copper"}
                aria-label={`Toggle product Copper`}
                className="__button_pressed rounded-none rounded-r-lg bg-chart5/20 px-3 text-chart5 transition-all duration-300 data-[state=on]:bg-chart5/30 data-[state=on]:font-black data-[state=on]:text-orange-600 hover:bg-chart5/20 hover:text-chart5/90 dark:bg-background/15 dark:data-[state=on]:bg-chart5/10 dark:data-[state=on]:text-orange-400"
              >
                {"Copper"}
              </ToggleGroupItem>
            </ToggleGroup>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button aria-haspopup="true" size="sm" variant="outline">
                  Sort by
                  <SortDesc className="h-4 w-4" />
                  <span className="sr-only">Sort by options</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="center">
                <DropdownMenuCheckboxItem
                  checked={sortOption === "quantity"}
                  onCheckedChange={() => setSortOption("quantity")}
                >
                  Quantity
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={sortOption === "transaction"}
                  onCheckedChange={() => setSortOption("transaction")}
                >
                  Transaction
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Exporter</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead className="hidden md:table-cell">% Quantity</TableHead>
              <TableHead>Transaction</TableHead>
              <TableHead className="hidden md:table-cell">
                % Transaction
              </TableHead>
              <TableHead className="hidden xl:table-cell">Product</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tableData.map((product, index) => (
              <TableRow key={index}>
                <TableCell className="font-medium">
                  {product.exporter}
                </TableCell>

                <TableCell>{quantityFormatter(product.quantity)}</TableCell>
                <TableCell className="hidden text-xs md:table-cell">
                  <Progress className="w-20" value={product.quantity_percent} />
                  {product.quantity_percent}%
                </TableCell>
                <TableCell>{floatFormatter(product.transaction)}</TableCell>
                <TableCell className="hidden text-xs md:table-cell">
                  <Progress
                    slot="value"
                    className="w-20"
                    value={product.transaction_percent}
                  />
                  {product.transaction_percent}%
                </TableCell>

                <TableCell>
                  <Badge
                    className={`hidden rounded-md border-transparent xl:table-cell ${product.product === "Cobalt" ? "bg-chart6/10 text-chart6 dark:text-blue-400" : "bg-chart5/10 text-orange-600 dark:text-orange-400"}`}
                    variant="outline"
                  >
                    {product.product}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
