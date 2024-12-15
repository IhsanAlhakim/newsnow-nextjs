"use client";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";
import { deleteImage, getImageUrl } from "@/lib/supabase";
import { News } from "@/types/news";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { deleteNews } from "../lib/action";

interface NewsTableProps {
  newsList: News[] | undefined;
}

interface selectedNewsType {
  newsId: string;
  newsImage: string;
}

export default function ManageNewsTable({ newsList }: NewsTableProps) {
  const initialState = {
    newsId: "",
    newsImage: "",
  };
  const [showModal, setShowModal] = useState(false);
  const [selectedNews, setSelectedNews] =
    useState<selectedNewsType>(initialState);
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDelete = async (selectedNews: selectedNewsType) => {
    setLoading(true);
    const isNewsDeleted = await deleteNews(selectedNews.newsId);
    if (!isNewsDeleted) {
      toast({
        title: "Delete Failed",
        description: "Failed to delete news, please try again later",
      });
      return;
    }

    deleteImage(selectedNews.newsImage);

    toast({
      title: "Delete Success",
      description: "News deleted successfully",
    });

    setShowModal(false);
    setSelectedNews(initialState);
    setLoading(false);
  };

  return (
    <>
      {newsList && newsList.length > 0 ? (
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow className="grid grid-cols-[100px_200px_300px_100px_100px_200px] lg:grid-cols-[1fr_2fr_3fr_1fr_1fr_2fr]">
              <TableHead>Image</TableHead>
              <TableHead>Title</TableHead>
              <TableHead>Content</TableHead>
              <TableHead>Last Edited By</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {newsList.map((news) => (
              <TableRow
                key={news._id}
                className="grid grid-cols-[1fr_2fr_3fr_1fr_1fr_2fr]"
              >
                <TableCell>
                  <Image
                    src={getImageUrl(news.image)}
                    alt="News Image"
                    width={60}
                    height={60}
                  />
                </TableCell>
                <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {news.title}
                </TableCell>
                <TableCell className="whitespace-nowrap overflow-hidden text-ellipsis">
                  {news.content.replace(/<[^>]*>/g, "")}
                </TableCell>
                <TableCell>{news.editedBy}</TableCell>
                <TableCell>{news.status}</TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    asChild
                    className="w-20 bg-violet-900 hover:bg-violet-950"
                  >
                    <Link href={`/dashboard/news/edit/${news._id}`}>Edit</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    className="w-20"
                    onClick={() => {
                      setSelectedNews({
                        newsId: news._id,
                        newsImage: news.image,
                      });
                      setShowModal(true);
                    }}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div>No News Data Yet</div>
      )}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white p-8 rounded shadow-lg">
            <h2 className="text-xl font-bold mb-4">Delete Confirmation</h2>
            <p>Are you sure want to delete this news data?</p>
            <div className="mt-4 flex justify-center gap-4">
              <Button
                className="bg-violet-950 w-24"
                disabled={loading}
                onClick={() => {
                  handleDelete(selectedNews);
                }}
              >
                {loading ? "Deleting..." : "Confirm"}
              </Button>
              <Button
                variant="destructive"
                className="w-24"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
