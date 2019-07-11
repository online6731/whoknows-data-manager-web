import { Resource } from './Resource';

export class ResourceDataDumpResponse {
    ok: boolean;
    problems: string[];
    info: {
        count: number;
    };
}
