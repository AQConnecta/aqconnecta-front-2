# Guia de Desenvolvimento

Neste documento, há instruções sobre como preparar o ambiente de desenvolvimento
e também informações sobre as tecnologias necessárias para rodar a aplicação
localmente e conseguir adicionar novos recursos.

## Tech Stack
Primeiramente, é necessário que você tenha instalado os seguintes programas:
- [Docker](https://docs.docker.com/engine/install/);
- [Localstack](https://docs.localstack.cloud/aws/getting-started/installation/);
- [Terraform](https://developer.hashicorp.com/terraform/tutorials/aws-get-started/install-cli); e
- [Node.js](https://nodejs.org/en/download).

Essa aplicação utiliza o framework Next.js. Dirija-se à [documentação do framework] para
mais detalhes.

[documentação do framework]: https://nextjs.org/docs

## Extensões
Garanta que as extensões listadas abaixo estejam instaladas no Visual Studio Code.
Enquanto somente o VSCode será considerado neste guia, as extensões citadas devem
estar disponíveis — ou terem plugins correspondentes — em outros editores de
código ou IDEs.

- Biome;
- npm Intellisense;
- Tailwind CSS IntelliSense; e
- EditorConfig for VS Code (recomendado, mas não obrigatório).

## Levantando os serviços em desenvolvimento
1. Configure as variáveis de ambiente
```sh
cp .env.example .env
```

Confira os valores das variáveis. Se houver valores em branco, preencha-os conforme
as instruções nos comentários.

2. Levante todos os containers do Docker
```sh
docker compose up -d
```

3. Configure os serviços da AWS necessários localmente usando o Terraform e Localstack
```sh
terraform init   # inicia o terraform (só é necessário na primeira vez)
terraform apply  # levanta os serviços descritos no terraform no localstack
                 # (necessário sempre que o container do localstack for iniciado do 0:
                 # após a remoção do seu volume Docker ou na primeira vez que for
                 # levantado).
```

4. Instale as dependências da aplicação
```sh
npm install
```

5. Inicie a aplicação em desenvolvimento
```
npm run dev
```
