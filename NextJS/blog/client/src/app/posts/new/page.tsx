import { PostForm } from "@/components/PostForm";
import { UserSelectOptions } from "../userSelectOptions";
import { createPostAction } from "@/app/actions/post";

export default function NewPostPage() {
  return (
    <>
      <h1 className="page-title">New Post</h1>
      <PostForm
        userSelectOptions={<UserSelectOptions />}
      />
    </>
  );
}
