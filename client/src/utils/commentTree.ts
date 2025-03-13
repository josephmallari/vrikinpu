import { Comment } from "../types/types";

/**
 * recursively updates the comments tree with a new comment
 * returns updated array of comments with the new comment in correct position
 */
export function updateNestedComments(comments: Comment[], newComment: Comment): Comment[] {
  if (!newComment.parent_id) return [...comments, newComment];

  return comments.map((c) => {
    if (c.id === newComment.parent_id) {
      return { ...c, replies: [...c.replies, newComment] };
    }
    return { ...c, replies: updateNestedComments(c.replies, newComment) };
  });
}

/**
 * recursively removes a comment from the comments tree
 * returns Updated array of comments with the specified comment removed
 */
export function removeComment(comments: Comment[], id: number): Comment[] {
  return comments.filter((c) => c.id !== id).map((c) => ({ ...c, replies: removeComment(c.replies, id) }));
}
