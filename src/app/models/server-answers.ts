import { Animal } from './animal';
import { Country } from './country-list';

export class AnimalDetailsAnswer {

    constructor(public name: string, public result: Animal[]) {
    }
}

export class AnimalCountriesAnswer {

    constructor(public name: string, public count: number, public result: Country[]) {
    }
}

export class AnimalByCountryAnswer {

    constructor(public result: Animal[]) {
    }
}
