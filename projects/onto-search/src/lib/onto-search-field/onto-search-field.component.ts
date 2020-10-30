import {Component, EventEmitter, Input, OnInit, Output, TemplateRef} from '@angular/core';
import {Observable, of} from 'rxjs';
import {SearchModel} from './models/search-model';

@Component({
  selector: 'onto-search',
  templateUrl: './onto-search-field.component.html',
  styleUrls: ['./onto-search-field.component.scss'],
})
export class OntoSearchFieldComponent implements OnInit {
  @Input()
  customTemplate?: TemplateRef<any>;
  @Input()
  private selectedList: any[];
  @Output()
  onSearch: EventEmitter<any> = new EventEmitter<any>();

  statesRespond: Observable<SearchModel[]> = of([{
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB01708',
    },
    'label': 'Dehydroepiandrosterone',
    'type': 'small molecule',
    'score': 1.1766968,
    'definition': 'Dehydroepiandrosterone (DHEA) is a major C19 steroid produced by the adrenal cortex. It is also produced in small quantities in the testis and the ovary. Dehydroepiandrosterone (DHEA) can be converted to testosterone; androstenedione; estradiol; and estrone. Most of DHEA is sulfated (dehydroepiandrosterone sulfate) before secretion.\n\nIn the United States, DHEA or DHEAS have been advertised with claims that they may be beneficial for a wide variety of ailments. DHEA and DHEAS are readily available in the United States, where they are marketed as over-the-counter dietary supplements.\n\nIn Canada, a prescription is required to buy DHEA.',
    'labels': ['Prasterone', '5-Dehydroepiandrosterone', 'DHEA', '5-DHEA', '3-beta-Hydroxy-5-androsten-17-one', 'DHA'],
  }, {
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB02901',
    },
    'label': 'Dihydrotestosterone',
    'type': 'small molecule',
    'score': 1.1766968,
    'definition': 'A potent androgenic metabolite of testosterone. Dihydrotestosterone (DHT) is generated by a 5-alpha reduction of testosterone. Unlike testosterone, DHT cannot be aromatized to estradiol therefore DHT is considered a pure androgenic steroid. [PubChem]',
    'labels': ['5alpha-Dihydrotestosterone', 'Stanolone', '(5a,17b)-17-Hydroxyandrostan-3-one', '17beta-Hydroxyandrostan-3-one', 'Androlone', '17beta-Hydroxy-5alpha-androstan-3-one', 'Androstan-17b-ol-3-one', '4-Dihydrotestosterone', '5.alpha.-Dihydrotestosterone', 'Stanaprol', 'Androstan-17beta-ol-3-one', '5alpha dihydrotestosterone', 'Androstanolone', 'Anaboleen', '17beta-Hydroxy-5alpha-androstane-3-one', '5a-Dihydrotestosterone', '(5alpha,17beta)-17-hydroxyandrostan-3-one'],
  }, {
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB00988',
    },
    'label': 'Dopamine',
    'type': 'small molecule',
    'score': 1.1766968,
    'definition': 'One of the catecholamine neurotransmitters in the brain.  It is derived from tyrosine and is the precursor to norepinephrine and epinephrine. Dopamine is a major transmitter in the extrapyramidal system of the brain, and important in regulating movement. A family of receptors (receptors, dopamine) mediate its action. [PubChem]',
    'labels': ['Dopamin', 'Dopamine HCl', 'Hydroxytyramine', 'Hydroxytyramin', 'Oxytyramine', 'Dophamine'],
  }, {
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB00851',
    },
    'label': 'Dacarbazine',
    'type': 'small molecule',
    'score': 1.1766968,
    'definition': 'An antineoplastic agent. It has significant activity against melanomas. (from Martindale, The Extra Pharmacopoeia, 31st ed, p564)',
    'labels': ['Imidazole Carboxamide', 'Dacarbazinum [INN-Latin]', 'Dacarbazino [INN-Spanish]', 'ICDT', 'DTIE', 'Biocarbazine R', 'ICDMT', 'DTIC', 'Dtic-Dome'],
  }, {
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB01262',
    },
    'label': 'Decitabine',
    'type': 'small molecule',
    'score': 1.1766968,
    'definition': 'Decitabine is indicated for treatment of patients with myelodysplastic syndrome (MDS). It is a chemical analogue of cytidine, a nucleoside present in DNA and RNA. Cells in the presence of Decitabine incorporate it into DNA during replication and RNA during transcription. The incorporation of Decitabine into DNA or RNA inhibits methyltransferase thereby causing demethylation in that sequence. This adversely affects the way that cell regulatory proteins are able to bind to the DNA/RNA substrate.',
    'labels': ['Azadc', '5-aza-2\'-deoxycytidine', 'Dezocitidine'],
  }, {
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB00254',
    },
    'label': 'Doxycycline',
    'type': 'small molecule',
    'score': 1.1766968,
    'definition': 'A synthetic tetracycline derivative with similar antimicrobial activity. Animal studies suggest that it may cause less tooth staining than other tetracyclines. It is used in some areas for the treatment of chloroquine-resistant falciparum malaria (malaria, falciparum). [PubChem]',
    'labels': ['Doxycycline Hyclate', 'Doxytetracycline', 'Doxcycline anhydrous', 'Doxycycline Monohydrate'],
  }, {
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB00476',
    },
    'label': 'Duloxetine',
    'type': 'small molecule',
    'score': 1.1766968,
    'definition': 'Duloxetine (brand names Cymbalta, Yentreve, and in parts of Europe, Xeristar or Ariclaim) is a drug which primarily targets major depressive disorder (MDD), generalized anxiety disorder (GAD), pain related to diabetic peripheral neuropathy and in some countries stress urinary incontinence (SUI). It is manufactured and marketed by Eli Lilly and Company.\n\nDuloxetine has not yet been FDA approved for stress urinary incontinence or for fibromyalgia.\n\nDuloxetine is a selective SNRI (selective serotonin-norepinephrine reuptake inhibitor). Duloxetine is a systemic drug therapy which affects the body as a whole. Known also under the code name LY248686, it is a potent dual reuptake inhibitor of serotonin (5-hydroxytryptamine, 5-HT) and norepinephrine (NE), possessing comparable affinities in binding to NE- and 5-HT transporter sites. It is a less potent inhibitor of dopamine reuptake.',
    'labels': ['Duloxetine Hydrochloride', 'Duloxetine HCl'],
  }, {
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB01248',
    },
    'label': 'Docetaxel',
    'type': 'small molecule',
    'score': 1.1766968,
    'definition': 'Docetaxel is a clinically well established anti-mitotic chemotherapy medication used mainly for the treatment of breast, ovarian, and non-small cell lung cancer. Docetaxel binds to microtubules reversibly with high affinity and has a maximum stoichiometry of 1 mole docetaxel per mole tubulin in microtubules.',
    'labels': ['TXL', 'Docetaxel anhydrous', 'Docetaxel, Trihydrate'],
  }, {
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB01609',
    },
    'label': 'Deferasirox',
    'type': 'small molecule',
    'score': 1.1766968,
    'definition': 'Deferasirox is an oral iron chelator. Its main use is to reduce chronic iron overload in patients who are receiving long term blood transfusions for conditions such as beta-thalassemia and other chronic anemias. It is the first oral medication approved in the USA for this purpose.',
    'labels': ['Deferasiroxum [inn-latin]', 'ICL 670'],
  }, {
    'uri': {
      'namespace': 'http://linkedlifedata.com/resource/drugbank/drug/',
      'localName': 'DB00003',
    },
    'label': 'Dornase Alfa',
    'type': 'biotech',
    'score': 1.1766968,
    'definition': 'Dornase alfa is a biosynthetic form of human deoxyribunuclease I (DNase I) enzyme. It is produced in genetically modified Chinese hamster ovary (CHO) cells using recombinant DNA technology. The 260-amino acid sequence of dornase alfa is identical to the endogenous human enzyme. Dornase alfa cleaves extracellular DNA to 5´-phosphodinucleotide and 5´-phosphooligonucleotide end products without affecting intracellular DNA. In individuals with cystic fibrosis, extracellular DNA, which is an extremely viscous anion, is released by degenerating leukocytes that accumulate during inflammatory responses to infections. Enzymatic breakdown of this extracellular DNA appears to reduce sputum viscosity and viscoelasticity.',
    'labels': ['Deoxyribonuclease I', 'rhDNase', 'DNase I', 'Deoxyribonuclease-1 precursor', 'DNase'],
  }]);

  states: Observable<SearchModel[]>;

  constructor() { }

  ngOnInit(): void {
    this.states = this.statesRespond;
  }

  public onSearchEvent($event: any) {
    this.onSearch.emit($event);
  }

  public getSelectedList(): any[] {
    return this.selectedList || [];
  }
}
