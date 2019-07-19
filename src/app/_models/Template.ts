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
    _id: ObjectId = {
        $oid: ''
    };
    values: any = {};
    __idea: string = '';
    '&choose': any = {
        title: X,
        subtitle: X,
        choice: X,
        answer: X,
    };
    '&select': any = {
        title: X,
        subtitle: X,
        choice: X,
        answer: X,
    };
    '&write': any = {
        title: X,
        subtitle: X,
        answer: X,
    };
    '&bool': any = {
        title: X,
        subtitle: X
    };
    tags: Tag[];
    usage: string[];
    'score_function': string;
    'time_function': string;
    '__state': string;
    '__test_info': any;
    '__datasets': Dataset[];
}
