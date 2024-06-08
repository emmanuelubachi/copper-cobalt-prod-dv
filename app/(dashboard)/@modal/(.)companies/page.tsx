import React from "react";
import BackButton from "@/components/elements/backButton";
import GridList from "@/components/sections/gridList";
import Modal from "@/components/Modal";

export default function Page() {
  return (
    <Modal>
      <main className="mb-24 mt-10 flex-col space-y-8 p-4 sm:mb-20 sm:mt-16 sm:px-6 sm:py-4">
        <div className="flex">
          <BackButton />
        </div>
        <GridList />
      </main>
    </Modal>
  );
}
