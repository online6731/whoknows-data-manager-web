import { Resource } from './Resource';

export class ResourceFindResponse {
    ok: boolean;
    problems: string[];
    resources: Resource[];
}
