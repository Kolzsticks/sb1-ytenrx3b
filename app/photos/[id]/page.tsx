import { ImageView } from "@/components/image-view";

export default function PhotoPage({ params }: { params: { id: string } }) {
  return (
    <div className="container mx-auto p-8">
      <ImageView id={params.id} />
    </div>
  );
}