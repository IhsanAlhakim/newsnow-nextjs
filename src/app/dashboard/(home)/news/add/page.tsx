import { Separator } from "@/components/ui/separator";
import AddEditNewsForm from "../components/AddEditNewsForm";

export default function AddNews() {
  return (
    <div className=" bg-white min-h-[450px] rounded-xl p-5">
      <div className="flex items-center">
        <h3 className="text-xl font-bold">Add News</h3>
      </div>
      <Separator className="my-3 border-1 bg-violet-950" />
      <AddEditNewsForm type="ADD" />
    </div>
  );
}
