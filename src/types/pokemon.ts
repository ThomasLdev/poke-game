export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: Pokemon[];
}

export interface NamedAPIResource {
  name: string;
  url: string;
}

export interface FlavorTextEntry {
  flavor_text: string;
  language: {
    name: string;
  }
  version: {
    name: string;
  }
}

export interface Pokemon {
  id: number;
  name: string;
  height: number;
  weight: number;
  base_experience: number;
  order: number;
  types: PokemonType[];
  stats: PokemonStat[];
  abilities: PokemonAbility[];
  sprites: PokemonSprites;
  moves: PokemonMoveEntry[];
  species_detail: PokemonSpecies | null;
}

export interface PokemonSpecies {
  flavor_text_entries: FlavorTextEntry[];
}

export interface PokemonMoveEntry {
  move: NamedAPIResource;
  version_group_details: VersionGroupDetail[];
}

export interface VersionGroupDetail {
  level_learned_at: number;
  move_learn_method: NamedAPIResource;
  version_group: NamedAPIResource;
}

export interface MoveDetail {
  name: string;
  type: NamedAPIResource;
  power: number | null;
  accuracy: number | null;
  pp: number;
  damage_class: NamedAPIResource;
}

export interface PokemonType {
  slot: number;
  type: NamedAPIResource;
}

export interface PokemonStat {
  base_stat: number;
  stat: NamedAPIResource;
}

export interface PokemonAbility {
  ability: NamedAPIResource;
  is_hidden: boolean;
}

export interface PokemonSprites {
  other: {
    'official-artwork': {
      front_default: string;
    };
  };
}

// export interface PokemonEvolutionTree {
//
// }
