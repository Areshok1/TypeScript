import { BaseContent } from '../interfaces/BaseContent';

export type Versioned<T extends BaseContent> = T & {
    version: number;
};

export function createVersionedContent<T extends BaseContent>(content: T): Versioned<T> {
    return { ...content, version: 1 };
}
