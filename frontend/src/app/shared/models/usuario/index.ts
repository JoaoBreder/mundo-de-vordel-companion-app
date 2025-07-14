export interface UsuarioBase {
	uid: string;
	email: string;
	nome: string;
	identificacao: string;
	dataCadastro: any;
}

export class Usuario implements UsuarioBase {
	uid: string;
	email: string;
	token: string;

	nome: string;
	identificacao: string;

	dataCadastro: Date;

	constructor(usuario: Partial<Usuario>) {
		const { uid, email, token, nome, identificacao, dataCadastro } = usuario;

		this.uid = uid ?? '';
		this.email = email ?? '';
		this.token = token ?? '';

		this.nome = nome ?? '';
		this.identificacao = identificacao ?? '';

		this.dataCadastro = dataCadastro ?? new Date();
	}
}
