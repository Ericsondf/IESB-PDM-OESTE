# RotinaIESB

Atividade Integradora — Disciplina Programação para Dispositivos Móveis (React Native / Expo)
Professor: Marcelo Alves Farias — IESB
Aulas relacionadas: 02, 03, 04, 05 e 06

App organizador da rotina acadêmica: cadastro, listagem e remoção de
compromissos (aula, estudo, trabalho, lazer), com persistência local via
AsyncStorage.

## 1) Comando usado para criar o projeto

```bash
npx create-expo-app@latest RotinaIESB --template blank
cd RotinaIESB
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context
```

## 2) Como colocar no repositório IESB-PDM-OESTE e entregar

Este projeto deve ficar em `praticas/pratica06` no repositório
`Ericsondf/IESB-PDM-OESTE`. Passo a passo:

```bash
# 1. clonar seu repositório (se ainda não tiver localmente)
git clone https://github.com/Ericsondf/IESB-PDM-OESTE.git
cd IESB-PDM-OESTE

# 2. criar a branch da atividade
git checkout -b feature/atividade03

# 3. copiar o conteúdo deste zip para dentro de praticas/pratica06
#    (a pasta praticas/pratica06 já deve conter: App.js, labels.js,
#    assets/, components/, package.json, app.json, README.md)

# 4. instalar as dependências dentro da pasta da prática
cd praticas/pratica06
npx expo install
# ou, se preferir garantir as libs específicas:
npx expo install @react-native-async-storage/async-storage react-native-safe-area-context

# 5. rodar e testar
npx expo start

# 6. voltar à raiz do repositório e enviar
cd ../..
git add praticas/pratica06
git commit -m "Feat: Finaliza a implementacao da Pratica 06 (RotinaIESB)"
git push origin feature/atividade03
```

Depois, abra o Pull Request de `feature/atividade03` para `main` no
GitHub e envie o link do PR na plataforma de ensino.

## 2) Prints

> Substitua os placeholders abaixo pelas capturas de tela reais do app
> rodando no emulador/Expo Go antes de entregar.

- **Tela vazia** (sem compromissos cadastrados): `docs/print-vazia.png`
- **Tela com itens** (compromissos cadastrados na lista): `docs/print-com-itens.png`
- **Após reabrir o app** (mostrando que os dados persistiram): `docs/print-reabertura.png`

## 3) Onde está o useEffect de carga e o de salvamento

Ambos ficam em `App.js`:

- **useEffect de CARGA** (linha ~34, roda apenas na montagem — array de
  dependências `[]`): lê a chave `@rotina_iesb_compromissos` do
  `AsyncStorage`, faz `JSON.parse` e preenche o estado `compromissos`.
  Ao final, marca `setCarregado(true)`.

- **useEffect de SALVAMENTO** (linha ~52, roda sempre que `compromissos`
  ou `carregado` mudam): se `carregado` ainda for `false` ele não faz
  nada (evita sobrescrever o storage com uma lista vazia antes da carga
  terminar); caso contrário, salva a lista atual com
  `AsyncStorage.setItem` usando `JSON.stringify`.

## 4) Arquivos criados

- `labels.js` — rótulos de texto exportados (título, placeholder, botão, etc.)
- `components/CompromissoInput.js` — formulário (TextInput + Pressable de adicionar)
- `components/CompromissoList.js` — lista de compromissos (FlatList + Pressable de remover)
- `App.js` — tela principal, estado, useEffect e integração dos componentes

## Estrutura do projeto

```
RotinaIESB/
  App.js
  labels.js
  assets/
    logo.png
  components/
    CompromissoInput.js
    CompromissoList.js
  package.json
  app.json
  README.md
```

## Requisitos atendidos

- [x] Projeto Expo (template blank) com App.js, app.json, package.json e assets/
- [x] labels.js com export nomeado, importado em App.js
- [x] SafeAreaProvider + SafeAreaView (react-native-safe-area-context)
- [x] Cabeçalho em linha (Image + Text)
- [x] Formulário em linha (TextInput ~68% + Pressable com flex)
- [x] Lista com flex: 1
- [x] StyleSheet.create com width percentual, flex e justifyContent/alignItems
- [x] useState para texto e lista de compromissos
- [x] Objeto de compromisso `{ id, texto, criadoEm }` com id único (Date.now())
- [x] Componentização: CompromissoInput e CompromissoList recebendo props
- [x] FlatList com keyExtractor pelo id (nunca pelo index)
- [x] Validação de texto vazio com Alert.alert
- [x] Remoção com Pressable + filter por id
- [x] android_ripple nos Pressable
- [x] AsyncStorage com chave `@rotina_iesb_compromissos`
- [x] useEffect de carga (montagem) e useEffect de salvamento (dependência da lista)
- [x] try/catch com Alert amigável em caso de erro

## Desafios opcionais (não implementados)

Nenhum desafio opcional (O1–O4) foi implementado nesta entrega — o app
cobre apenas os requisitos obrigatórios (itens A a E do enunciado).
