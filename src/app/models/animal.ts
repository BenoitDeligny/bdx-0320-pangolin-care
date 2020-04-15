export class Animal {
    taxonid: number; // reprendre l'ID de REDLIST UICN ?
    scentificName: string;
    class: string; // ex: Mammalia
    order: string;
    family: string;
    genus: string;
    commonName: string; // African Elephant
    redListStatus: string;
    /* or number (0-7)
    list:
    DD (DataDeficient = 0),
    LC (LeastConcern = 1),
    NT (NearThreatened = 2),
    VU (VUlnerable = 3),
    EN (ENdangered = 4),
    CR (CRiticallyEndangered = 5),
    EW (ExtinctInTheWild = 6),
    EX (EXtinct = 7)
    */
    populationTrend: string; // boolean ? Decreasing & Increasing
    system: string; // marine, freshwater ou terrestrial => number de 0 à 2 ?
}
