import type { Timestamp } from "firebase/firestore";
import type { CategoryItem } from "@lib/modals/category";

export interface Step {
    id: string
    title: string
    description: string
    completed: boolean
}

export interface Goal {
    id: string;
    completed: boolean;
    title: string;
    description: string;
    estimatedCompletionDate: Timestamp;
    steps: Step[]
    categories: CategoryItem[]
}

