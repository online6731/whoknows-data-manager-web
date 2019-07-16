import { ObjectId } from './ObjectId';

export class Resource {
  _id: ObjectId;
  headers: {
    name: string;
    type: string;
    base: string;
    id_resource: string;
    id_pattern: string;
  } = {
    name: '',
    type: '',
    base: '',
    id_resource: '',
    id_pattern: '',
  };
  getters: {} = {};
  // getters: {
  //   name: string;
  //   xpath: string;
  //   select: string;
  //   replace: string[]
  // };
}
