import { Animal } from './animal';
import { CountryList } from './country-list';

export class AnimalDetailsAnswer {

    constructor(public name: string, public result: Animal[]) {
    }
}

export class AnimalCountriesAnswer {

    constructor(public name: string, public count: number, public result: CountryList[]) {
    }
}
