/** Represents a comment with nested replies */
export interface Comment {
  id: number;
  text: string;
  parent_id: number | null;
  replies: Comment[];
}
