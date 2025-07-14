export interface UsuarioBase {
	uid: string;
	email: string;
	nome: string;
	identificacao: string;
	data_cadastro: any;
}

export class Usuario implements UsuarioBase {
	uid: string;
	email: string;
	token: string;

	nome: string;
	identificacao: string;

	data_cadastro: Date;

	constructor(usuario: Partial<Usuario>) {
		const { uid, email, token, nome, identificacao, data_cadastro } = usuario;

		this.uid = uid ?? '';
		this.email = email ?? '';
		this.token = token ?? '';

		this.nome = nome ?? '';
		this.identificacao = identificacao ?? '';

		this.data_cadastro = data_cadastro ?? new Date();
	}
}
