# Pokedex API

Uma API RESTful desenvolvida em **FastAPI** para consultar, criar, atualizar e deletar Pokémons, utilizando **MongoDB** como banco de dados. O projeto está dockerizado e utiliza **Pipenv** para gerenciamento de dependências.

---

## 🗂 Estrutura do Projeto

```
C14/
│
├── .gitignore
├── Pipfile
├── Pipfile.lock
├── README.md
├── Dockerfile
├── compose.yaml
├── Makefile
│
├── app/
│   ├── __init__.py
│   ├── main.py
│   ├── config/dbconfig.py
│   ├── models/pokemodel.py
│   ├── repositories/pokerepository.py
│   ├── routes/pokeroute.py
│   └── services/poke_service.py
│
└── data/pokedex.json
```

---

## ⚡ Tecnologias

- Python 3.12
- FastAPI
- MongoDB
- Pipenv
- Docker & Docker Compose
- Uvicorn

---

## 🖼 Arquitetura da API

```
+-----------------+           +--------------------+
|                 |  REST API |                    |
|  Cliente (Postman| <------> |  FastAPI (app.main)|
|   ou Front-end) |           |                    |
+-----------------+           +--------------------+
                                     |
                                     v
                          +---------------------+
                          | PokeService         |
                          | - lógica de negócios|
                          +---------------------+
                                     |
                                     v
                          +---------------------+
                          | PokemonRepository   |
                          | - acesso ao MongoDB |
                          +---------------------+
                                     |
                                     v
                          +---------------------+
                          | MongoDB (pokedex)   |
                          +---------------------+
```

---

## 🐳 Rodando com Docker

1. **Clone o projeto**

```bash
git clone <URL_DO_SEU_REPOSITORIO>
cd C14
```

2. **Suba os containers com Docker Compose**

```bash
make run
```

> Isso vai iniciar o MongoDB e a API na porta `8000`.

3. **Acesse a API**

- Documentação interativa (Swagger): [http://localhost:8000/docs](http://localhost:8000/docs)
- Redoc: [http://localhost:8000/redoc](http://localhost:8000/redoc)

---

## ⚙️ Variáveis de Ambiente

O projeto utiliza a variável de ambiente:

```
MONGODB_URI=mongodb://mongo:27017/
```

Ela já está configurada no `compose.yaml`. Se rodar localmente, você pode criar um arquivo `.env` com:

```
MONGODB_URI=mongodb://localhost:27017/
```

---

## 🚀 Rotas da API

| Método | Endpoint               | Descrição                                  |
| ------ | ---------------------- | ------------------------------------------ |
| GET    | `/`                    | Mensagem de boas-vindas                    |
| GET    | `/pokemon/name/{name}` | Retorna Pokémon pelo nome                  |
| GET    | `/pokemon/{id}`        | Retorna Pokémon pelo ID                    |
| GET    | `/pokemon/type/{type}` | Retorna Pokémons pelo tipo (com paginação) |
| POST   | `/pokemon/`            | Cria um novo Pokémon                       |
| PUT    | `/pokemon/{id}`        | Atualiza um Pokémon existente              |
| DELETE | `/pokemon/{id}`        | Deleta um Pokémon existente                |

**Exemplo de retorno:**

```json
{
  "id": 1,
  "name": {
    "english": "Bulbasaur",
    "japanese": "フシギダネ",
    "chinese": "妙蛙种子",
    "french": "Bulbizarre"
  },
  "type": ["Grass", "Poison"],
  "base": {
    "HP": 45,
    "Attack": 49,
    "Defense": 49,
    "Sp. Attack": 65,
    "Sp. Defense": 65,
    "Speed": 45
  }
}
```

---

## 🛠 Rodando local sem Docker

1. Instale dependências com Pipenv:

```bash
pip install pipenv
pipenv install --dev
pipenv shell
```

2. Execute a API:

```bash
uvicorn app.main:app --reload
```

---

## 📝 Observações

- Certifique-se de que o MongoDB esteja rodando.
- O arquivo `data/pokedex.json` contém os dados estáticos iniciais.
- A API faz validação com **Pydantic** e retorna erros HTTP quando algo não é encontrado ou inválido.

---

## 👨‍💻 Autor

Pedro Vilas Boas Vasconcelos
