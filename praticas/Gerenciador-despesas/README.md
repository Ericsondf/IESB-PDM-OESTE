# Gerenciador de Despesas

Atividade prática da Aula 08 — Programação para Dispositivos Móveis (React Native + Expo).
Expansão do gerenciador de despesas com **Categorização** e **Filtro Dinâmico por categoria**.

## Como rodar

```bash
npm install
npx expo start
```

Abra no emulador Android (`a`) ou no Expo Go lendo o QR Code.

## Estrutura

```
App.js                      # Navegação (Bottom Tabs dentro de Native Stack)
src/
├── components/
│   ├── IconButton.js
│   ├── FiltroCategorias.js # chips de filtro por categoria
│   └── despesa/
│       ├── DespesaItem.js    # data, categoria (tag), descrição e valor
│       ├── DespesaLista.js   # FlatList + keyExtractor
│       ├── DespesaSaida.js   # Sumário + Lista
│       └── DespesaSumario.js # .reduce() + toFixed(2) + alerta > R$ 200
├── screens/
│   ├── TodasDespesas.js
│   ├── DespesasRecentes.js
│   └── GerenciarDespesa.js   # formulário, regex, DateTimePicker, validação
├── data/despesas.js          # CATEGORIAS e DUMMY_DESPESAS (com categoria)
└── utils/filtros.js          # filtrarPorCategoria() com .filter()
```

## O que foi implementado

- **Tarefa 1** – `categoria` nos objetos; `useState('')` para categoria; seleção por `Pressable` lado a lado; regex `/^\d*\.?\d{0,2}$/`; `@react-native-community/datetimepicker`; validação de descrição, valor e categoria antes de salvar.
- **Tarefa 2** – `DespesaItem` exibe data (`getDataFormatada`), categoria em tag cinza arredondada, descrição e valor; `DespesaSumario` soma com `.reduce()` e formata `R$ x.toFixed(2)`.
- **Tarefa 3** – `filtrarPorCategoria()` usa `.filter()`; a lista filtrada vai para `DespesaSaida`, então a `FlatList` e o somatório atualizam sozinhos.
- **Bônus** – total acima de R$ 200,00 fica vermelho no `DespesaSumario`.

## Entrega (Git)

```bash
git checkout -b feature/gerenciador-despesas
git add praticas/Gerenciador-despesas
git commit -m "feat: gerenciador de despesas com categoria e filtro"
git push -u origin feature/gerenciador-despesas
# depois abra o Pull Request no GitHub
```
