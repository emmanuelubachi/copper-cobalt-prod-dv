"use client";
import { useState } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import { CopyIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Share2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

type ShareButtonProps = {
  tooltip?: string;
  className?: string;
};

export function ShareButton({ ...props }: ShareButtonProps) {
  const { tooltip = "Share Page", className } = props;
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const rootUrl = process.env.NEXT_PUBLIC_ROOT_URL;

  let url;
  if (searchParams.toString() === "") {
    url = `${rootUrl}${pathname}`;
  } else {
    url = `${rootUrl}${pathname}?${searchParams.toString()}`;
  }

  const link = url;

  // State to handle copy feedback (e.g., showing "Copied!" message)
  const [isCopied, setIsCopied] = useState(false);

  // Function to copy the link to the clipboard
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(link);
      setIsCopied(true);
      // Reset the copied state after a short delay
      setTimeout(() => setIsCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy: ", error);
    }
  };

  return (
    <Dialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                size="icon"
                className={cn(
                  className,
                  "__button_style __button_pressed gap-2 rounded-lg",
                )}
              >
                <span className="sr-only">Share</span>
                <Share2Icon className="h-4 w-4" />
              </Button>
            </DialogTrigger>
          </TooltipTrigger>
          <TooltipContent side="top">{tooltip}</TooltipContent>
        </Tooltip>
      </TooltipProvider>

      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share link</DialogTitle>
          <DialogDescription>
            Anyone who has this link will be able to view this.
          </DialogDescription>
        </DialogHeader>
        <div className="flex items-center space-x-2">
          <div className="grid flex-1 gap-2">
            <Label htmlFor="link" className="sr-only">
              Link
            </Label>
            <Input id="link" defaultValue={link} readOnly />
          </div>
          <Button
            type="submit"
            size="sm"
            className="px-3"
            onClick={copyToClipboard}
          >
            <span className="sr-only">Copy</span>
            <CopyIcon className="h-4 w-4" />
          </Button>
        </div>

        {/* Feedback message */}
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div className="flex items-center space-x-2">
              <Button type="button" variant="secondary">
                Close
              </Button>

              <p
                className={`text-sm text-green-600 transition-opacity duration-500 ${
                  isCopied ? "opacity-100" : "opacity-0"
                }`}
              >
                Copied!
              </p>
            </div>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
