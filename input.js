export let genotypeResult = []; // das wird der vollständige Genotyp des Welpen

export function getInputValues() {

let locusResult = []; // Genotyp jedes einzelnen Lokus
const loci = ["s", "e", "k", "a", "b", "d", "i"];
genotypeResult = []; // setzt Wert zurück

loci.forEach(locus => {
  const dog1Genotype = document.getElementById(`${locus}-lokus-dog1`).value; // input Hund 1
  const dog2Genotype = document.getElementById(`${locus}-lokus-dog2`).value; // input Hund 2

  const dog1Alleles = dog1Genotype.split(',').map(value => value.trim()); // trennt die Werte, trim ist wichtig weil es sonst falsch sortiert wird
  
  if (dog1Alleles.length === 1) {
    locusResult[0] = dog1Alleles[0]; // wenn reinerbig Wert direkt übertragen
  } else {
    const randomIndex = Math.floor(Math.random() * 2); // wenn mischerbig zufälligen Wert aussuchen, dann übertragen
    locusResult[0] = dog1Alleles[randomIndex];
  }

  const dog2Alleles = dog2Genotype.split(',').map(value => value.trim()); // alles wiederholen für Hund 2

  if (dog2Alleles.length === 1) {
    locusResult[1] = dog2Alleles[0];
  } else {
    const randomIndex2 = Math.floor(Math.random() * 2);
    locusResult[1] = dog2Alleles[randomIndex2];
  }
  const locusResultSorted = locusResult.slice().sort();
  genotypeResult.push(locusResultSorted);
  })

  return genotypeResult;

};
