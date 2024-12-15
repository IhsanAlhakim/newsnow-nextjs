/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useToast } from "@/hooks/use-toast";
import { deleteImage, getImageUrl, uploadImage } from "@/lib/supabase";
import { Error } from "@/types/error";
import { News } from "@/types/news";
import Image from "next/image";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import { addNews, updateNews } from "../../lib/action";
import { addNewsFormSchema } from "../../lib/validation";
import Tiptap from "./TipTap";

export interface newsBody {
  title?: string | undefined;
  image?: File | undefined;
  imageName?: string | undefined;
  oldImageName?: string | undefined;
  content?: string | undefined;
  category?: string | undefined;
  status?: string | undefined;
}

interface AddEditNewsFormProps {
  type?: "ADD" | "EDIT";
  data?: News | null;
}

export default function AddEditNewsForm({ type, data }: AddEditNewsFormProps) {
  const [newsData, setNewsData] = useState<newsBody>({
    title: "",
    image: undefined,
    imageName: "",
    oldImageName: "",
    content: "",
    category: "",
    status: "",
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const { toast } = useToast();
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (type === "EDIT") {
      setNewsData({
        ...newsData,
        title: data?.title,
        oldImageName: data?.image,
        content: data?.content,
        category: data?.category,
        status: data?.status,
      });
    }
  }, [data]);

  useEffect(() => {
    let fileReader: FileReader | null;
    let isCancel = false;
    if (newsData.image) {
      fileReader = new FileReader();
      fileReader.onload = (e: ProgressEvent<FileReader>) => {
        const result = e.target?.result as string | null;
        if (result && !isCancel) {
          setPreviewImage(result);
        }
      };
      fileReader.readAsDataURL(newsData.image);
    }
    return () => {
      //return di useEffect = Cleanup code to run when the component unmounts
      isCancel = true;
      if (fileReader && fileReader.readyState === 1) {
        fileReader.abort();
      }
      fileReader = null;
    };
  }, [newsData.image]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.name === "image") {
      const images = e.target.files;
      if (images?.length) {
        const image = images[0];
        if (image.size > 1024 * 1024) {
          toast({
            title: "Image Size Too Big",
            description: "Please Select Image with size lower than 1MB",
          });
          return;
        }

        const imageExtension = image.name.split(".").pop();

        return setNewsData({
          ...newsData,
          image: image,
          imageName: Date.now().toString() + "." + imageExtension,
        });
      } else {
        toast({
          title: "No Image",
          description: "Please Select an Image",
        });
        return;
      }
    }
    const name = e.target.name;
    const value = e.target.value;
    setNewsData({
      ...newsData,
      [name]: value,
    });
  };

  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    setNewsData({
      ...newsData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (type === "ADD") {
      console.log("Add");
      const validate = addNewsFormSchema.safeParse({
        title: newsData.title,
        content: newsData.content,
        image: newsData.imageName,
        category: newsData.category,
        status: newsData.status,
      });
      if (!validate.success) {
        const errorDesc = validate.error.issues.map((issue) => issue.message);
        setLoading(false);
        return setError({
          errorTitle: "Error Validation",
          errorDesc,
        });
      }

      const createNews = await addNews({
        title: newsData?.title,
        content: newsData?.content,
        image: newsData?.imageName,
        category: newsData?.category,
        status: newsData?.status,
      });

      if (createNews.isAddSuccess) {
        if (newsData.image && newsData.imageName) {
          uploadImage(newsData.image, newsData.imageName);
        }
        toast({
          title: "Success",
          description: "News Added Successfully",
        });
      } else {
        toast({
          title: "Failed",
          description: "Failed to Add Data, Please Try Again Later",
        });
        return redirect("/dashboard/news");
      }
      redirect("/dashboard/news");
    }

    if (type === "EDIT") {
      const EditNewsFormSchema = addNewsFormSchema.omit({ image: true });
      const validate = EditNewsFormSchema.safeParse({
        title: newsData.title,
        content: newsData.content,
        category: newsData.category,
        status: newsData.status,
      });
      if (!validate.success) {
        const errorDesc = validate.error.issues.map((issue) => issue.message);
        setLoading(false);
        return setError({
          errorTitle: "Error Validation",
          errorDesc,
        });
      }
      let imageName;
      if (newsData.image && newsData.imageName) {
        imageName = newsData.imageName;
      } else {
        imageName = newsData.oldImageName;
      }
      const updatedNews = await updateNews(data?._id, {
        title: newsData?.title,
        content: newsData?.content,
        image: imageName,
        category: newsData?.category,
        status: newsData?.status,
      });
      if (updatedNews.isUpdateSuccess) {
        if (newsData.image && newsData.imageName) {
          uploadImage(newsData.image, newsData.imageName);
          deleteImage(newsData.oldImageName);
        }
        toast({
          title: "Success",
          description: "Data Updated Successfully",
        });
        return redirect("/dashboard/news");
      } else {
        toast({
          title: "Failed",
          description: "Failed to Update Data, Please Try Again Later",
        });
        return redirect("/dashboard/news");
      }
    }
    setLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <ErrorMessage
        errorDesc={error?.errorDesc}
        errorTitle={error?.errorTitle}
      />
      <div className="lg:grid lg:grid-cols-2">
        <div className="flex flex-col gap-3">
          <div>
            <label htmlFor="title" className="font-semibold">
              News Title
            </label>
            <div className="w-full bg-transparent p-2 mt-1 flex outline-none rounded-md border-2 gap-2 items-center">
              <input
                type="text"
                name="title"
                id="title"
                value={newsData?.title}
                onChange={handleChange}
                placeholder="Insert News Title..."
                className="w-full bg-transparent outline-none font-semibold"
              />
            </div>
          </div>
          <div>
            <label htmlFor="image" className="font-semibold">
              News Image
            </label>
            <div className="w-full bg-transparent p-2 mt-1 flex outline-none rounded-md border-2 gap-2 items-center">
              <input
                type="file"
                name="image"
                id="image"
                onChange={handleChange}
                className="w-full bg-transparent outline-none font-semibold"
              />
            </div>
          </div>
          <div className="bg-violet-950 w-full md:w-3/4 h-60 mx-auto lg:hidden">
            {previewImage && (
              <Image
                alt="News Header"
                width={100}
                height={100}
                src={previewImage}
                className="w-full h-full object-cover"
              />
            )}

            {newsData.oldImageName && !previewImage && (
              <Image
                alt="News Header"
                width={100}
                height={100}
                src={getImageUrl(newsData?.oldImageName)}
                className="w-full h-full object-cover"
              />
            )}

            {!previewImage && !newsData.oldImageName && (
              <div className="flex justify-center items-center w-full h-full">
                <div>
                  <p className="text-2xl text-white">No Image</p>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="category" className="font-semibold">
              News Category
            </label>
            <select
              value={newsData?.category}
              onChange={handleSelectChange}
              name="category"
              id="category"
              className="border-2 bg-transparent p-2 mt-1 outline-none rounded-md font-semibold"
            >
              <option value={""}>Select Category</option>
              {["politics", "sports", "health", "business", "travel"].map(
                (category, index) => (
                  <option value={category} key={index}>
                    {category.charAt(0).toUpperCase() +
                      category.slice(1).toLowerCase()}
                  </option>
                )
              )}
            </select>
          </div>
          <div>
            <label htmlFor="newsContent" className="font-semibold">
              News Content
            </label>
            <div className="w-full mt-2">
              <Tiptap newsData={newsData} setNewsData={setNewsData} />
            </div>
          </div>
          <div className="my-4 flex gap-5">
            <div className="flex gap-2">
              <input
                type="radio"
                checked={newsData?.status === "published"}
                onChange={handleChange}
                name="status"
                id="publish"
                value="published"
              />
              <label htmlFor="publish">Publish</label>
            </div>
            <div className="flex gap-2">
              <input
                type="radio"
                checked={newsData?.status === "drafted"}
                onChange={handleChange}
                name="status"
                id="draft"
                value="drafted"
              />
              <label htmlFor="draft">Draft</label>
            </div>
          </div>
          <Button
            disabled={loading}
            className="w-full lg:w-fit py-7 lg:py-0 text-md bg-violet-900 hover:bg-violet-950"
          >
            {type === "ADD" ? "Add" : "Update"}
            {loading && "..."}
          </Button>
        </div>
        <div className="hidden lg:block bg-violet-950 w-3/4 h-60 mx-auto">
          {previewImage && (
            <Image
              alt="News Header"
              width={100}
              height={100}
              src={previewImage}
              className="w-full h-full object-cover"
            />
          )}

          {newsData.oldImageName && !previewImage && (
            <Image
              alt="News Header"
              width={100}
              height={100}
              src={getImageUrl(newsData?.oldImageName)}
              className="w-full h-full object-cover"
            />
          )}

          {!previewImage && !newsData.oldImageName && (
            <div className="flex justify-center items-center w-full h-full">
              <div>
                <p className="text-2xl text-white">No Image</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </form>
  );
}
