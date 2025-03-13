import { describe, it, expect } from "vitest";
import { updateNestedComments, removeComment } from "./commentTree";
import type { Comment } from "../types/types";

describe("commentTree utils", () => {
  const mockComments: Comment[] = [
    {
      id: 1,
      text: "Parent",
      parent_id: null,
      replies: [
        {
          id: 2,
          text: "Child",
          parent_id: 1,
          replies: [],
        },
      ],
    },
  ];

  it("adds a top-level comment", () => {
    const newComment: Comment = {
      id: 3,
      text: "New Comment",
      parent_id: null,
      replies: [],
    };

    const result = updateNestedComments(mockComments, newComment);
    expect(result).toHaveLength(2);
    expect(result[1]).toEqual(newComment);
  });

  it("removes a comment and its replies", () => {
    const result = removeComment(mockComments, 1);
    expect(result).toHaveLength(0);
  });
});
