import { Separator } from "@/components/ui/separator";
import AddEditNewsForm from "../../components/AddEditNewsForm";
import { getNewsById } from "@/app/(home)/lib/data";

interface EditNewsProps {
  params: {
    id: string;
  };
}

export default async function EditNews({ params }: EditNewsProps) {
  const { id } = await params;
  const newsData = await getNewsById(id);
  const news = JSON.parse(JSON.stringify(newsData));
  return (
    <div className="bg-white min-h-[450px] rounded-xl p-5">
      <div className="flex items-center">
        <h3 className="text-xl font-bold">Edit News</h3>
      </div>
      <Separator className="my-3 border-1 bg-violet-950" />
      <AddEditNewsForm type="EDIT" data={news} />
    </div>
  );
}
