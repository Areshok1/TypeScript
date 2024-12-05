import {BaseContent} from "./BaseContent";

export interface Article extends BaseContent {
    title: string;
    content: string;
    authorId: string;
    tags: string[];
}