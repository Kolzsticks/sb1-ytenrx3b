"use client";

import { Dialog, DialogContent } from "@/components/ui/dialog";
import { ImageView } from "@/components/image-view";
import { useRouter } from "next/navigation";

export default function PhotoModal({ params }: { params: { id: string } }) {
  const router = useRouter();

  return (
    <Dialog open onOpenChange={() => router.back()}>
      <DialogContent className="max-w-7xl bg-background/95 p-0">
        <ImageView id={params.id} />
      </DialogContent>
    </Dialog>
  );
}