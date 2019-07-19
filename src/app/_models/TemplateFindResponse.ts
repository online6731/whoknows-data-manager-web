
import { Template } from '../_models/Template'

export class TemplateFindResponse {
    ok          : Boolean
    problem     : String
    templates   : Template[]
}