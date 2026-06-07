import { Perfume, CollectionItem, StoryMilestone } from "./types";

export const COLLECTIONS: CollectionItem[] = [
  {
    id: "les-lumieres",
    name: "LES LUMIÈRES",
    fullName: "Collection Les Lumières",
    description: "Éclatantes, sensuelles et inoubliables. Des fragrances solaires conçues pour capturer et refléter la lumière dorée de Paris.",
    image: "/src/assets/images/coll_lumieres_1780834916008.png",
    subtext: "Éclatantes. Sensuelles. Inoubliables."
  },
  {
    id: "les-intemporels",
    name: "LES INTEMPORELS",
    fullName: "Collection Les Intemporels",
    description: "Des classiques réinventés. Une élégance innée à travers des accords intemporels de roses, d'iris et de bois précieux.",
    image: "/src/assets/images/coll_intemporels_1780834929558.png",
    subtext: "Des classiques réinventés."
  },
  {
    id: "les-exclusifs",
    name: "LES EXCLUSIFS",
    fullName: "Collection Les Exclusifs",
    description: "Des créations rares et précieuses. Des sillages audacieux associant le cuir de Russie, le safran persan et le précieux bois d'Oud.",
    image: "/src/assets/images/coll_exclusifs_1780834948001.png",
    subtext: "Des créations rares et précieuses."
  },
  {
    id: "les-coffrets",
    name: "LES COFFRETS",
    fullName: "Les Coffrets d'Élégance",
    description: "L'élégance à offrir. Des rituels parfumés enveloppés dans des écrins de prestige texturés, parfaits pour les fêtes et les présents.",
    image: "/src/assets/images/coll_coffrets_1780834961257.png",
    subtext: "L'élégance à offrir."
  }
];

export const PERFUMES: Perfume[] = [
  // Les Lumieres
  {
    id: "eclat-de-nuit",
    name: "Éclat de Nuit",
    collectionId: "les-lumieres",
    collectionName: "Les Lumières",
    tagline: "Une symphonie d'ambre et de jasmin sous le ciel étoilé de Paris.",
    description: "Inspiré par le scintillement de la Tour Eiffel à la tombée de la nuit, Éclat de Nuit est une création intensément mystérieuse et lumineuse. La délicatesse du jasmin de Grasse s'enveloppe de la chaleur hypnotique d'un ambre sombre et de notes boisées veloutées.",
    price: 145,
    sizes: ["50 ml", "100 ml"],
    image: "/src/assets/images/hero_perfume_1780834900418.png",
    topNotes: ["Néroli de Grasse", "Zeste de Bergamote"],
    heartNotes: ["Jasmin Royal", "Poivre Rose en grains"],
    baseNotes: ["Ambre Sombre", "Bois de Cèdre de l'Atlas"],
    intensity: 5,
    character: "Mystérieux, Solaire, Hypnotique",
    rating: 4.9
  },
  {
    id: "or-solaire",
    name: "Or Solaire",
    collectionId: "les-lumieres",
    collectionName: "Les Lumières",
    tagline: "La chaleur d'un rayon de soleil couchant capturée dans un flacon céleste.",
    description: "Un sillage divin qui évoque la caresse d'un soleil d'été sur une peau salée. Entre fraîcheur d'agrumes gorgés de lumière et la sensualité crémeuse de l'ylang-ylang d'Anjouan et de la vanille sauvage.",
    price: 135,
    sizes: ["50 ml", "100 ml"],
    image: "/src/assets/images/coll_lumieres_1780834916008.png",
    topNotes: ["Mandarine mûre", "Fleur d'Oranger d'Égypte"],
    heartNotes: ["Ylang-Ylang des Comores", "Fleur de Tiaré"],
    baseNotes: ["Vanille de Madagascar", "Noix de Coco Sauvage"],
    intensity: 4,
    character: "Solaire, Enveloppant, Voluptueux",
    rating: 4.8
  },
  // Les Intemporels
  {
    id: "eau-de-mai",
    name: "Eau de Mai",
    collectionId: "les-intemporels",
    collectionName: "Les Intemporels",
    tagline: "Le souffle frais et pur des roses Centifolia au point du jour.",
    description: "Cette fragrance capture la poésie éphémère d'une promenade matinale à Grasse au mois de mai. Les roses couvertes de rosée s'expriment en toute légèreté, soutenues par l'innocence zestée du litchi et le confort poudré des muscs blancs.",
    price: 125,
    sizes: ["50 ml", "100 ml"],
    image: "/src/assets/images/coll_intemporels_1780834929558.png",
    topNotes: ["Litchi de Chine", "Accord Rosée de Grasse"],
    heartNotes: ["Rose Centifolia Absolue", "Pivoine sauvage"],
    baseNotes: ["Muscs Blancs Poudrés", "Santal précieux"],
    intensity: 3,
    character: "Frais, Romantique, Cristallin",
    rating: 4.7
  },
  {
    id: "voile-de-velours",
    name: "Voile de Velours",
    collectionId: "les-intemporels",
    collectionName: "Les Intemporels",
    tagline: "Un classique réinventé, mariant la délicatesse de l'iris au mystère du cuir.",
    description: "Une interprétation poudrée du cuir, d'une douceur absolue. Le velouté de l'iris de Florence tapisse un accord cuir sophistiqué, réchauffé par des notes d'épices chaudes et une fève tonka délicieusement balsamique.",
    price: 130,
    sizes: ["50 ml", "100 ml"],
    image: "/src/assets/images/coll_lumieres_1780834916008.png", // fallback visually similar
    topNotes: ["Cardamome Verte", "Mandarine d'Italie"],
    heartNotes: ["Beurre d'Iris Pallida", "Pétales de Violette"],
    baseNotes: ["Cuir Doux Suédé", "Fève Tonka du Brésil", "Patchouli d'Indonésie"],
    intensity: 4,
    character: "Poudré, Sophistiqué, Intemporel",
    rating: 4.6
  },
  // Les Exclusifs
  {
    id: "cuir-d-orient",
    name: "Cuir d'Orient",
    collectionId: "les-exclusifs",
    collectionName: "Les Exclusifs",
    tagline: "Une création rare et mystique où la force du cuir rencontre la douceur ambrée.",
    description: "Un choc olfactif d'une élégance rare. L'ouverture épicée de safran et d'encens noir cède la place à un accord de cuir de Russie enveloppant, sublimé par la majesté du bois d'Oud de Malaisie et les effluves de tabac blond.",
    price: 185,
    sizes: ["100 ml"],
    image: "/src/assets/images/coll_exclusifs_1780834948001.png",
    topNotes: ["Safran de Perse", "Encens Noir de Somalie"],
    heartNotes: ["Cuir de Russie Sauvage", "Rose Absolue de Damas"],
    baseNotes: ["Bois d'Oud d'Assam", "Feuilles de Tabac Blond", "Bois de Gaïac"],
    intensity: 5,
    character: "Mystique, Puissant, Caractériel",
    rating: 4.95
  },
  {
    id: "santal-imperial",
    name: "Santal Impérial",
    collectionId: "les-exclusifs",
    collectionName: "Les Exclusifs",
    tagline: "Une majestueuse alliance boisée, mariant santal crémeux et épices enveloppantes.",
    description: "Écorces de cannelle, cardamome pétillante et l'onctuosité incomparable d'un bois de santal de Mysore d'origine éthique. Un monument de complexité boisée, enveloppé d'ambre gris.",
    price: 195,
    sizes: ["100 ml"],
    image: "/src/assets/images/coll_exclusifs_1780834948001.png", // fallback
    topNotes: ["Cannelle de Ceylan", "Muscade des Indes"],
    heartNotes: ["Santal de Mysore", "Notes de Papyrus Sauvage"],
    baseNotes: ["Ambre Gris", "Fève de Cacao brute", "Vétiver de Haïti"],
    intensity: 5,
    character: "Boisé, Crémeux, Majestueux",
    rating: 4.9
  },
  // Les Coffrets
  {
    id: "trilogie-lumiere",
    name: "Trilogie de Lumière",
    collectionId: "les-coffrets",
    collectionName: "Les Coffrets",
    tagline: "Coffret de découverte réunissant trois mini-flacons de prestige en édition limitée.",
    description: "Un voyage olfactif unique à travers l'art de Maison Lumière. Ce coffret de dégustation habillé de papier de création texturé contient trois flacons vaporisateurs miniatures (15 ml) de nos chefs-d'œuvre : Éclat de Nuit, Or Solaire, et Eau de Mai.",
    price: 95,
    sizes: ["3 x 15 ml"],
    image: "/src/assets/images/coll_coffrets_1780834961257.png",
    topNotes: ["Assortiment floral rare"],
    heartNotes: ["Matières premières d'exception"],
    baseNotes: ["Sillages précieux signature"],
    intensity: 4,
    character: "Exquis, Idéal pour offrir, Pluriel",
    rating: 4.9
  },
  {
    id: "l-ecrin-recherche",
    name: "L'Écrin Recherché",
    collectionId: "les-coffrets",
    collectionName: "Les Coffrets",
    tagline: "Un rituel d'exception comprenant notre eau de parfum phare et son lait corporel.",
    description: "Le présent suprême. Un magnifique coffret rigide habillé de lin naturel comprenant l'Eau de Parfum Éclat de Nuit (100 ml) accompagnée de sa Crème Parfumée pour le Corps (150 ml), formulé avec une texture onctueuse nourrissante.",
    price: 160,
    sizes: ["100 ml + 150 ml"],
    image: "/src/assets/images/coll_coffrets_1780834961257.png", // fallback
    topNotes: ["Néroli", "Zeste de Bergamote"],
    heartNotes: ["Jasmin Royal", "Poivre Rose"],
    baseNotes: ["Ambre Sombre", "Crème d'Amande douce"],
    intensity: 5,
    character: "Opulent, Bienfaisant, Sublime",
    rating: 4.95
  }
];

export const STORIES: StoryMilestone[] = [
  {
    year: "1924",
    title: "La Naissance à Paris",
    description: "Le maître parfumeur Antoine Lumière ouvre son premier atelier parisien rue Saint-Honoré. Il s'associe à des artisans d'art pour fusionner la Haute Parfumerie avec l'élégance du verre soufflé bouche.",
    location: "Rue Saint-Honoré, Paris Ier",
    image: "/src/assets/images/paris_heritage_1780834976481.png"
  },
  {
    year: "1948",
    title: "L'Âge d'Or des Salons",
    description: "Maison Lumière devient le refuge secret de l'élite littéraire et cinématographique parisienne d'après-guerre. Cocteau, Piaf et d'autres célèbrent le parfum comme le sillage d'une liberté retrouvée.",
    location: "Place Vendôme, Paris",
    image: "/src/assets/images/paris_heritage_1780834976481.png"
  },
  {
    year: "1975",
    title: "Le Flacon d'Artiste",
    description: "La maison collabore avec les sculpteurs phares et les verriers d'art de Murano pour façonner des flacons géométriques audacieux. Le parfum n'est plus seulement une essence, c'est une sculpture tactile.",
    location: "Ateliers d'Art de la Seine",
    image: "/src/assets/images/hero_perfume_1780834900418.png"
  },
  {
    year: "2024",
    title: "Une Nouvelle Lumière",
    description: "Célébrant ses 100 ans d'histoire et de passion, Maison Lumière réinvente ses ateliers de Grasse avec des pratiques d'éco-conception intransigeantes, mêlant matières naturelles d'exception et flaconnage rechargeable.",
    location: "Grasse & Saint-Honoré, France",
    image: "/src/assets/images/paris_heritage_1780834976481.png"
  }
];
