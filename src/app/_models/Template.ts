import { Tag } from './Tag';
import { ObjectId } from './ObjectId';
import { Dataset } from './Dataset';

class X {
    text: string[] = [];
    audio: string[] = [];
    video: string[] = [];
    image: string[] = [];
}

export class Template {
    _id: ObjectId;
    values: any = {};
    __idea: string = '';
    '&&choose': any = {
        title: X,
        subtitle: X,
        choice: X,
        answer: X,
    };
    '&&select': any = {
        title: X,
        subtitle: X,
        choice: X,
        answer: X,
    };
    '&&write': any = {
        title: X,
        subtitle: X,
        answer: X,
    };
    '&&bool': any = {
        title: X,
        subtitle: X
    };
    tags: Tag[] = [];
    usage: string[] = [];
    'score_function': string = '';
    'time_function': string = '';
    '__state': string = 'acceptance';
    '__test_info' = {
        acceptance: {
            ok: false,
            problems: []
        },
        data: {
            ok: false,
            problems: []
        },
        duplication: {
            ok: false,
            problems: []
        },
        generation: {
            ok: false,
            problems: []
        },
        manual: {
            ok: false,
            problems: []
        },
        structure: {
            ok: false,
            problems: []
        },
        usage_tagging: {
            ok: false,
            problems: []
        }
    };
    datasets: Dataset[] = [];
}
