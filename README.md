# 🔄 Git Profile Switcher

Troque rapidamente entre múltiplos perfis Git direto no VSCode.

Ideal para quem trabalha em várias empresas ou possui projetos pessoais com identidades diferentes.

---

## 🚀 Funcionalidades

- 👤 Troque o perfil Git (nome + e-mail) com um clique
- 💼 Gerencie perfis personalizados
- 🧠 Detecta automaticamente o perfil pelo caminho do projeto (`pathRules`)
- 🔁 Reaplica o último perfil usado ao reabrir o projeto
- ✅ Atualiza tanto `.git/config` local quanto o `~/.gitconfig` global
- 📦 Status bar com nome e perfil atual ativo

---

## 🛠️ Como usar

### 1. Abra a paleta de comandos (`Ctrl+Shift+P`)

- `Git Profile Switcher: Trocar Perfil Git`
- `Git Profile Switcher: Gerenciar Perfis Git`

### 2. Configure seus perfis

- Adicione `nome`, `e-mail` e um identificador (ex: `pessoal`, `xpto`)

### 3. Use com praticidade

- O perfil ativo aparece na barra inferior do VSCode
- Pode ser trocado a qualquer momento com um clique

---

## 📁 Exemplo de configuração `.gitprofiles.json`

Salvo automaticamente em `~/.gitprofiles.json` após criar perfis:

```json
{
  "pessoal": {
    "name": "Pedro Costa",
    "email": "pedro@teste.com"
  },
  "empresaXPTO": {
    "name": "Pedro Costa",
    "email": "pedro@xpto.com.br"
  },
  "pathRules": {
    "/Users/pedro/projects/xpto": "xpto"
  }
}
```
