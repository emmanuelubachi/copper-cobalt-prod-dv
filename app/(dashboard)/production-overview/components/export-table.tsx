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

  const products = ["Cobalt", "Copper"];

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
              className="gap-2 rounded-md p-1"
            >
              {products.map((product) => (
                <ToggleGroupItem
                  key={product}
                  value={product}
                  aria-label={`Toggle product ${product}`}
                  className="bg-accent px-3 text-foreground/80 ring-1 ring-neutral-200 data-[state=on]:bg-neutral-200 data-[state=on]:font-black data-[state=on]:text-foreground dark:bg-background/15 dark:ring-0 dark:data-[state=on]:bg-background"
                >
                  {product}
                </ToggleGroupItem>
              ))}
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
                    className={`bg hidden rounded-md xl:table-cell ${selectedProduct === "Cobalt" ? "bg-chart6 text-background" : "bg-chart5 text-background"}`}
                    variant="outline"
                  >
                    {selectedProduct}
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
