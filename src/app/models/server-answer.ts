import { Animal } from './animal';

export class ServerAnswer {

    constructor(public name: string, public result: Animal[]) {
    }
}
