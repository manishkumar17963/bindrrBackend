export type Token = { token: string };

export default interface BaseIdentifier {
  email: string;
  number: string;
  username: string;
  codeValid: boolean;
  code: number;
  password: string;
  createdAt: Date;
  updatedAt: Date;
  tokens: Token[];
}
