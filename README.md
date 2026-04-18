# 💰 Finance Tracker

Aplicação web para gerenciamento de finanças pessoais, desenvolvida com foco em arquitetura escalável, boas práticas e experiência de desenvolvimento moderna.

---

## 🚀 Tecnologias

* Vue 3 (Composition API)
* TypeScript
* Vite
* Pinia (state management)
* Tailwind CSS
* Axios
* Vitest (testes)

---

## 🧠 Arquitetura

O projeto foi estruturado utilizando **feature-based architecture (modules)**, separando responsabilidades por domínio.

```bash
src/
  modules/
    transactions/
      components/
      services/
      store/
      types/
      pages/

  modules/
    auth/

  services/
    http.ts

  router/
```

### 🔹 Principais decisões

* **Separação por domínio (modules)** → facilita escalabilidade
* **Camada de serviço desacoplada** → isola comunicação com API
* **HTTP client centralizado** → permite interceptors e controle global
* **State management com Pinia** → evita duplicação de lógica
* **Error handling global** → padroniza tratamento de erros

---

## 🔐 Autenticação

* Login com persistência em localStorage
* Proteção de rotas via navigation guards
* Interceptor Axios para envio automático de token

---

## 🔄 Fluxo de dados

```text
UI → Store (Pinia) → Service → HTTP → API
```

---

## ⚙️ Funcionalidades

* CRUD de transações
* Autenticação básica
* Proteção de rotas
* Tratamento global de erros
* Atualização otimizada de estado (sem refetch desnecessário)

---

## 🧪 Testes

Testes unitários implementados com Vitest:

* Services (mock de API)
* Stores (lógica de negócio)

```bash
npm run test
```

---

## 📦 Como rodar o projeto

```bash
# instalar dependências
npm install

# rodar aplicação
npm run dev

# rodar API fake
npx json-server --watch db.json --port 3000

# rodar testes
npm run test
```

---

## 📌 Melhorias futuras

* Refresh token
* Testes de componentes
* UI/UX refinada (feedback visual, toasts)
* Integração com backend real

---

## 💬 Sobre o projeto

Este projeto foi desenvolvido com foco em simular um ambiente real de desenvolvimento frontend, aplicando boas práticas de arquitetura, organização de código e qualidade.

---
