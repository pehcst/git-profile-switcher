# 🔄 Git Profile Switcher

[![Visual Studio Marketplace](https://img.shields.io/visual-studio-marketplace/v/pehcst.git-profile-switcher?label=VS%20Marketplace)](https://marketplace.visualstudio.com/items?itemName=pehcst.git-profile-switcher)
[![Instalar](https://img.shields.io/badge/instalar-no%20VSCode-blue?logo=visual-studio-code)](https://marketplace.visualstudio.com/items?itemName=pehcst.git-profile-switcher)
[![License: MIT](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

Troque rapidamente entre múltiplos perfis Git direto no VSCode.

Ideal para quem trabalha em várias empresas ou possui projetos pessoais com identidades diferentes.

---

## 🚀 Funcionalidades

- 👤 Troque o perfil Git (nome + e-mail) com um clique
- 💼 Gerencie perfis personalizados
- 🧠 Detecta automaticamente o perfil pelo caminho do projeto (`pathRules`)
- 🔁 Reaplica o último perfil usado ao reabrir o projeto
- ✅ Atualiza tanto `.git/config` local quanto o `~/.gitconfig` global
- 📦 Exibe o nome e o perfil atual na status bar

---

## 🛠️ Como usar

### 1. Abra a paleta de comandos (`Ctrl+Shift+P`)

- `Git Profile Switcher: Trocar Perfil Git`
- `Git Profile Switcher: Gerenciar Perfis Git`

### 2. Configure seus perfis

- Adicione `nome`, `e-mail` e um identificador (ex: `pessoal`, `empresaXPTO`)

### 3. Use com praticidade

- O perfil ativo aparece na barra inferior do VSCode
- Pode ser trocado a qualquer momento com um clique

---

## 📁 Exemplo de configuração `.gitprofiles.json`

Esse arquivo é salvo automaticamente em `~/.gitprofiles.json` após criar seus perfis:

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
    "/Users/pedro/projects/xpto": "empresaXPTO"
  }
}
