import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Comments } from "@/types/news-comment";

interface NewsCommentProps {
  commentData: Comments;
}

export default function NewsComment({ commentData }: NewsCommentProps) {
  return (
    <div className="flex gap-3 p-5">
      <Avatar>
        <AvatarImage src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <p className="font-bold">Anonymous</p>
        <p>{commentData.comment}</p>
      </div>
    </div>
  );
}
