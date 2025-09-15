"use client";

import { deletePostAction } from "@/app/actions/post";
import { useTransition } from "react";

export function DeleteButton({ postId }: { postId: string }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      disabled={isPending}
      onClick={() => {
        startTransition(async () => {
          await deletePostAction(postId);
        });
      }}
    >
      {isPending ? "Deleting" : "Delete"}
    </button>
  );
}
