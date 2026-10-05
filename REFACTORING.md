# Refatoração do projeto FitZone

A refatoração reorganiza o código sem alterar o comportamento ou o visual do aplicativo.

## Organização

- `src/app/`: telas e rotas do Expo Router.
- `src/components/`: componentes reutilizáveis de interface.
- `src/styles/`: estilos das telas, separados da lógica e do JSX.
- `src/data/`: dados estáticos de produtos, categorias, favoritos e item inicial do carrinho.
- `src/services/`: regras de persistência/armazenamento usadas pelo aplicativo.
- `src/constants/`: constantes globais do projeto.
- `src/hooks/`: hooks reutilizáveis.
- `src/utils/`: reservado para funções utilitárias puras.

## O que foi mantido

Textos, imagens, preços, rotas, navegação, funcionalidades e aparência foram preservados. A mudança é estrutural, para separar responsabilidades e facilitar manutenção.
