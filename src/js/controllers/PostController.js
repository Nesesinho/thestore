class Post {
    constructor() {
        this.serverUrl = "https://caff-200-229-250-1.ngrok-free.app/send";
    }

    makeRequestOptions(data) {
        return {
            method: 'POST', // Método HTTP
            headers: {
              'Content-Type': 'application/json', // Tipo de conteúdo (JSON no exemplo)
            },
            body: JSON.stringify(data), // Dados a serem enviados (convertidos para JSON)
          }
    }

    sendToServer(data) {
        fetch(this.serverUrl, this.makeRequestOptions(data))
            .then((response) => {
                if (!response.ok) {
                throw new Error('Erro na solicitação para o servidor');
                }
                return response.json(); // Se você espera uma resposta em JSON
            })
            .then((data) => {
                // Manipular a resposta do servidor aqui
                console.log('Resposta do servidor:', data);
            })
            .catch((error) => {
                console.error('Erro:', error);
            });
    }
} 

export const post = new Post();