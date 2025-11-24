export interface WilayaInterface {
  id: number;
  code: number;
  nom: string;
  nom_maj: string;
  nom_ar: string;
}

export interface CommuneInterface {
  id: number;
  code_48: number;
  code_58: number;
  code_5: number;
  nom: string;
  nom_maj: string;
  nom_ar: string | null;
  code_wil: number;
}
