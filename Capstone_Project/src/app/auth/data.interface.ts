export interface Data {
  token: string;
  user: {
      id: number;
      nome: string;
      cognome: string;
      username: string;
      email: string;
      image: File;
  };
}
