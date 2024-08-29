"use client";

import { useState } from "react";
import Flags from "country-flag-icons/react/3x2";

import { Search, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";

import { CompaniesList } from "@/constants/application";
import Link from "next/link";

const companies = [
  {
    country: "Australia",
    flag: "🇦🇺",
    companies: ["Societe D'Exploitation De Kipoi"],
  },
  {
    country: "Canada",
    flag: "🇨🇦",
    companies: ["Kamoa Copper SA"],
  },
  {
    country: "China",
    flag: "🇨🇳",
    companies: [
      "Anvil Mining Congo SARL",
      "Chengtun Congo Ressources SARL",
      "Congo Dongfang International Mining",
      "Congo Jinjun Cheng",
      "Societe Cnmc Congo Compagnie Minier",
      "Compagnie Miniere De Kambove SPRL",
      "Compagnie Miniere De Luisha",
      "La Compagnie Miniere De Musonoie GI",
      "Congo Moon Mining SARL",
      "Divine Land Mining SARL",
      "Everbright Mining SARL",
      "Excelent Minerals SARL",
      "Hanuri Metal Congo",
      "CNMC Huachin Mabende Mining SPRL",
      "Huachin Metal Leach SPRL",
      "Jin Xun Congo Mining SARL",
      "Societe Kai Peng Mining",
      "Kalongwe Mining S.A",
      "Kambove Mining SAS",
      "Kamoa Copper SA",
      "Kisanfu Mining",
      "Kinsenda Copper Company SARL",
      "La Miniere De Kalunkundi",
      "Lualaba Copper Smelter SAS",
      "Luilu Ressources SAS",
      "Metal Mines SPRL",
      "La Miniere De Kasombo",
      "Macrolink Jiayuan Mining SPRL",
      "La Miniere De Kalubwe Myunga",
      "MMG Kinsevere SARL",
      "Mineral Metal Technology SARL",
      "New Minerals",
      "Ruashi Mining SPRL",
      "Sabwe Mining SARL",
      "Shituru Mining Corporation SPRL",
      "Sino Congolaise Des Mines SARL",
      "Societe Miniere De Deziwa SAS",
      "Tengyuan Cobalt & Copper Resources",
      "Tenke Fungurume Mining",
      "Thomas Mining SARL",
    ],
  },
];

type FlagProps = {
  countryCode: string;
};

const Flag = ({ countryCode }: FlagProps) => {
  const FlagComponent = Flags[countryCode.toUpperCase() as keyof typeof Flags];
  return <FlagComponent className="h-5 w-8 rounded-[5px]" />;
};

export default function SearchBarDialog() {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");

  const filteredCompanies = CompaniesList.map((country) => ({
    ...country,
    children: country.children.filter((company) =>
      company.label.toLowerCase().includes(search.toLowerCase()),
    ),
  })).filter((country) => country.children.length > 0);

  return (
    <div className="relative w-full max-w-sm">
      <Button
        variant="outline"
        size="lg"
        className="w-full justify-start bg-muted text-left font-normal"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search companies...</span>
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="flex h-[80vh] flex-col sm:max-w-[850px]">
          <DialogHeader>
            <DialogTitle>Search Companies</DialogTitle>
          </DialogHeader>
          <div className="flex-1 overflow-hidden p-1 pb-20">
            <Input
              placeholder="Type to search..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="mb-4 w-full rounded-xl bg-muted pl-8 focus:border-0"
            />
            <ScrollArea className="h-full pb-10">
              {filteredCompanies.map((country) => (
                <div key={country.value} className="mb-6">
                  <h3 className="mb-2 flex items-center text-lg font-semibold">
                    <span className="mr-2">
                      {/* {getFlagEmoji(country.flagCode)} */}
                      <Flag countryCode={country.flagCode} />
                    </span>
                    {country.label}
                    <span className="ml-2 text-sm font-normal text-gray-500">
                      {country.children.length}
                    </span>
                  </h3>
                  <div className="mt-2 grid grid-cols-2 gap-2 sm:mt-4 sm:grid-cols-2 sm:gap-1 sm:gap-x-4 lg:grid-cols-3 xl:grid-cols-3">
                    {country.children.map((child) => (
                      <Link
                        key={child.value}
                        href={`/projects?project_id=${child.value.toLowerCase().trim()}`}
                        className="__button_pressed group relative flex items-center justify-between rounded-md p-2 hover:bg-neutral-100 hover:dark:bg-muted"
                        // onClick={closeFilter}
                      >
                        <p className="truncate text-sm text-foreground/70">
                          {child.label}
                        </p>

                        <span
                          className="pointer-events-none hidden text-neutral-400 group-hover:text-foreground/70 dark:text-neutral-700 lg:block"
                          aria-hidden={true}
                        >
                          {/* <ArrowUpRight className="h-4 w-4" aria-hidden={true} /> */}
                        </span>
                      </Link>
                    ))}
                  </div>
                  {/* <div className="grid grid-cols-3 gap-2">
                    {country.children.map((company) => (
                      <div
                        key={company.value}
                        className="flex items-center justify-between rounded p-2 hover:bg-gray-100"
                      >
                        <span>{company.label}</span>
                        <ChevronRight className="h-4 w-4 text-gray-400" />
                      </div>
                    ))}
                  </div> */}
                </div>
              ))}
            </ScrollArea>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

// export default function Component() {
//   const [open, setOpen] = useState(false);
//   const [search, setSearch] = useState("");

//   const filteredCompanies = companies
//     .map((country) => ({
//       ...country,
//       companies: country.companies.filter((company) =>
//         company.toLowerCase().includes(search.toLowerCase()),
//       ),
//     }))
//     .filter((country) => country.companies.length > 0);

//   return (
//     <div className="relative w-full max-w-sm">
//       <Button
//         variant="outline"
//         className="w-full justify-start text-left font-normal"
//         onClick={() => setOpen(true)}
//       >
//         <Search className="mr-2 h-4 w-4" />
//         <span>Search companies...</span>
//       </Button>
//       <Dialog open={open} onOpenChange={setOpen}>
//         <DialogContent className="flex h-[80vh] flex-col sm:max-w-[850px]">
//           <DialogHeader>
//             <DialogTitle>Search Companies</DialogTitle>
//           </DialogHeader>
//           <div className="flex-1 overflow-hidden">
//             <Input
//               placeholder="Type to search..."
//               value={search}
//               onChange={(e) => setSearch(e.target.value)}
//               className="mb-4"
//             />
//             <ScrollArea className="h-full p-4">
//               {filteredCompanies.map((country) => (
//                 <div key={country.country} className="mb-6">
//                   <h3 className="mb-2 flex items-center text-lg font-semibold">
//                     <span className="mr-2">{country.flag}</span>
//                     {country.country}
//                     <span className="ml-2 text-sm font-normal text-gray-500">
//                       {country.companies.length}
//                     </span>
//                   </h3>
//                   <div className="grid grid-cols-3 gap-2">
//                     {country.companies.map((company) => (
//                       <div
//                         key={company}
//                         className="flex items-center justify-between rounded p-2 hover:bg-gray-100"
//                       >
//                         <span>{company}</span>
//                         <ChevronRight className="h-4 w-4 text-gray-400" />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               ))}
//             </ScrollArea>
//           </div>
//         </DialogContent>
//       </Dialog>
//     </div>
//   );
// }

// "use client";

// import { useState } from "react";
// import { Search } from "lucide-react";
// import { Input } from "@/components/ui/input";
// import { Button } from "@/components/ui/button";
// import {
//   CommandDialog,
//   CommandEmpty,
//   CommandGroup,
//   CommandInput,
//   CommandItem,
//   CommandList,
// } from "@/components/ui/command";

// export default function Component() {
//   const [open, setOpen] = useState(false);

//   return (
//     <div className="relative w-full max-w-sm">
//       <Button
//         variant="outline"
//         className="w-full justify-start text-left font-normal"
//         onClick={() => setOpen(true)}
//       >
//         <Search className="mr-2 h-4 w-4" />
//         <span>Select a project...</span>
//       </Button>
//       <CommandDialog open={open} onOpenChange={setOpen}>
//         <CommandInput placeholder="Type a command or search..." />
//         <CommandList>
//           <CommandEmpty>No results found.</CommandEmpty>
//           <CommandGroup heading="Projects">
//             <CommandItem>Documentation</CommandItem>
//             <CommandItem>Components</CommandItem>
//             <CommandItem>Blocks</CommandItem>
//             <CommandItem>Charts</CommandItem>
//             <CommandItem>Themes</CommandItem>
//             <CommandItem>Examples</CommandItem>
//           </CommandGroup>
//         </CommandList>
//       </CommandDialog>
//     </div>
//   );
// }
