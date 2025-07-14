export interface RetornoSucessoErro {
    sucesso: boolean;
    tipo: 'success' | 'error' | 'warning';
    titulo?: string;
    mensagem?: string;
    error?: any;
}
