import { ObjectId } from './ObjectId';

export class Dataset {
  _id: ObjectId;
  headers: {
    name: string;
  } = {
    name: ''
  };
  fields: {} = {};
}
