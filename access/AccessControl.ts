import { BaseContent } from '../interfaces/BaseContent';

type Role = 'admin' | 'editor' | 'viewer';

type Permission = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
};

type AccessControl<T extends BaseContent> = {
    [role in Role]: Permission;
};

export function createAccessControl<T extends BaseContent>(): AccessControl<T> {
    return {
        admin: { create: true, read: true, update: true, delete: true },
        editor: { create: true, read: true, update: true, delete: false },
        viewer: { create: false, read: true, update: false, delete: false },
    };
}
