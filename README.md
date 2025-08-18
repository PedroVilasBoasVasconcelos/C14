# 📝 To-do List Web

Uma aplicação simples de lista de tarefas (To-do List) desenvolvida em **HTML, CSS e JavaScript**.  
O objetivo é demonstrar o uso de **gerenciamento de dependências com Node.js** e **automação de build**, conforme proposto no exercício prático da disciplina **Engenharia de Software (C14)**.

---

## 🚀 Funcionalidades
- ✅ Adicionar novas tarefas  
- ✏️ Marcar tarefas como concluídas  
- ❌ Remover tarefas  
- 🎨 Interface simples, responsiva e intuitiva  

---

## 📂 Estrutura do Projeto
```
TODO-WEB/
│-- index.html         # Estrutura principal da aplicação
│-- style.css          # Estilos da página
│-- main.js            # Lógica da aplicação
│-- package.json       # Configuração do projeto e dependências
│-- package-lock.json
│-- node_modules/      # Dependências instaladas (ignorado no Git)
│-- .gitignore         # Arquivo para ignorar itens irrelevantes
│-- README.md          # Documentação do projeto
```

---

## ⚙️ Configuração do Ambiente

### 🔹 Pré-requisitos
Antes de começar, verifique se você tem instalado:
- [Node.js](https://nodejs.org/) (versão LTS recomendada)  
- [npm](https://www.npmjs.com/) (vem junto com o Node.js)  

Para confirmar, execute no terminal:
```bash
node -v
npm -v
```

---

## 📦 Instalação de Dependências

Clone o repositório e instale as dependências:

```bash
git clone https://github.com/seu-usuario/todo-web.git
cd todo-web
npm install
```

---

## 🛠️ Execução e Build

### Executar localmente

Você pode rodar o projeto de duas formas:

**1. Abrindo o arquivo `index.html` no navegador**  
Basta abrir o arquivo manualmente ou usar uma extensão como Live Server no VS Code.

**2. Pelo terminal, usando o comando:**
```bash
npm run start
```
Isso irá iniciar o projeto automaticamente no navegador (caso você tenha configurado um script `start` no `package.json`).
---

### Gerar build
Neste projeto simples, o build consiste apenas em garantir que as dependências estejam instaladas:

```bash
npm install
```
(Em projetos mais complexos, poderia ser configurado um bundler como Vite, Webpack ou Parcel.)

---

## 📸 Exemplo da Interface

Exemplo de como a aplicação funciona:

- Adicionar uma nova tarefa
- Marcar como concluída
- Remover quando não for mais necessária

💡 Aqui você pode inserir prints da aplicação rodando (por exemplo: docs/screenshot1.png, docs/screenshot2.png).

---

## 👨‍💻 Autor

Projeto desenvolvido por Pedro Vilas Boas Vasconcelos  
📚 Engenharia de Software – INATEL
