/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useToast } from "@/hooks/use-toast";
import { SendHorizonal } from "lucide-react";
import { useActionState } from "react";
import { createComment } from "../lib/action";
import { addCommentFormSchema } from "../lib/validation";

interface CommentFormProps {
  newsId: string;
}

export default function CommentForm({ newsId }: CommentFormProps) {
  const initialState = {
    errorTitle: "",
    errorDesc: [],
  };
  const { toast } = useToast();

  async function commentFormAction(prevState: any, formData: FormData) {
    const validate = addCommentFormSchema.safeParse({
      comment: formData.get("comment"),
    });

    if (!validate.success) {
      const errorDesc = validate.error.issues.map((issue) => issue.message);
      return { errorTitle: "Validation Error", errorDesc: errorDesc };
    }
    const comment = validate.data.comment;
    const newsId = formData.get("newsId") as string;

    const sendComment = await createComment(comment, newsId);
    if (!sendComment.isSuccess) {
      toast({
        title: "Comment not sent",
        description: "Your comment failed to be sent",
      });
      return {
        errors: "Comment not sent",
      };
    }
    toast({
      title: "Comment sent",
      description: "Your comment has been sent ",
    });
    return {
      errorTitle: undefined,
      errorDesc: undefined,
    };
  }

  const [state, formAction, isPending] = useActionState(
    commentFormAction,
    initialState
  );

  return (
    <div className="bg-slate-100 p-3 rounded">
      <h3 className="mb-4 font-bold">Tulis Komentar</h3>
      <ErrorMessage
        errorDesc={state?.errorDesc}
        errorTitle={state?.errorTitle}
      />
      <div className="bg-white p-3 mt-3 rounded-lg flex flex-col gap-3">
        <form action={formAction}>
          <input type="hidden" name="newsId" value={newsId} />
          <textarea
            name="comment"
            id="comment"
            rows={4}
            placeholder="Write A Comment..."
            className="w-full bg-transparent resize-none outline-none"
          />
          <div>
            <Button
              disabled={isPending}
              className="bg-blue-700 hover:bg-blue-950"
            >
              Kirim{isPending && "..."}
              <SendHorizonal className="ml-2" size={15} />
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
