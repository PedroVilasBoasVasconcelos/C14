# PokemonAPI

Uma API em Flask para consulta de informações de Pokémons, utilizando MongoDB como banco de dados.

---

## 🚀 Tecnologias utilizadas

- Python 3.12+
- Flask
- MongoDB
- Docker
- Pytest

---

## 📦 Instalação

Clone o repositório:

```bash
git clone https://github.com/seu-usuario/PokemonAPI.git
cd PokemonAPI
```

Crie o ambiente virtual e instale as dependências:

```bash
pip install pipenv
pipenv install
```

Ative o ambiente virtual:

```bash
pipenv shell
```

---

## 🐳 Rodando com Docker

Suba os containers com:

```bash
docker compose -f compose.yaml up -d
```

Isso irá iniciar:

- MongoDB em `localhost:27017`
- A API em `http://127.0.0.1:5000`

---

## 🗂 Importando os dados para o MongoDB Compass

O arquivo `pokedex.json` que está na pasta `data/` deve ser importado no MongoDB.

1. Abra o **MongoDB Compass**
2. Crie uma nova conexão com a URI padrão:

   ```
   mongodb://localhost:27017/
   ```

3. Nomeie a conexão como **PokemonAPI** e conecte.
4. Crie um banco de dados chamado `pokemon`.
5. Dentro dele, crie a collection `pokedex`.
6. Clique em **ADD DATA → Import File** e selecione o arquivo `data/pokedex.json`.
7. Formato: `JSON`
8. Confirme a importação ✅

Agora a base de dados está pronta.

---

## ▶️ Executando a API

Com o servidor rodando, acesse os endpoints, por exemplo:

```bash
http://127.0.0.1:5000/pokemon/1
```

---

## 🧪 Rodando os testes

Para rodar os testes automatizados (Pytest), utilize:

```bash
pytest -v
```

Isso executará todos os testes presentes na pasta `tests/`.

---

## 📂 Estrutura do projeto

```
PokemonAPI/
│── app/
│   ├── routes.py
│   ├── models.py
│   ├── ...
│── data/
│   ├── pokedex.json   <- arquivo a ser importado no MongoDB
│── tests/
│   ├── test_api.py
│── compose.yaml
│── Pipfile
│── Pipfile.lock
│── README.md
```

---

## 👨‍💻 Autor

Projeto desenvolvido por Pedro Vilas Boas Vasconcelos.
