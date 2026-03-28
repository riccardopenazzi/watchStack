# Vuetify Grid System & Layout — Guida Rapida (Mobile-First)

## Struttura Base

Vuetify usa un sistema a **12 colonne** basato su Flexbox.  
Gerarchia obbligatoria: `v-container` → `v-row` → `v-col`.

```html
<v-container fluid class="pa-4">
  <v-row>
    <v-col cols="12">Contenuto</v-col>
  </v-row>
</v-container>
```

---

## `v-container`

Wrapper esterno che aggiunge padding e (opzionalmente) limita la larghezza.

| Prop | Descrizione |
|------|-------------|
| `fluid` | Rimuove il `max-width`, occupa tutta la larghezza. **Sempre per mobile.** |
| `class="pa-N"` | Padding (0–16). `pa-4` è un buon default mobile |
| `class="fill-height"` | Fa occupare tutta l'altezza disponibile |

---

## `v-row`

Crea una riga flessibile (`display: flex; flex-wrap: wrap`).

### Props principali

| Prop | Descrizione | Valori utili |
|------|-------------|--------------|
| `no-gutters` | Rimuove il gutter (spazio) tra le colonne | — |
| `dense` | Riduce il gutter a metà | Ottimo per mobile |
| `justify` | Allineamento **orizzontale** dei figli | `start`, `center`, `end`, `space-between`, `space-around` |
| `align` | Allineamento **verticale** dei figli | `start`, `center`, `end`, `stretch` |
| `align-content` | Come `align` ma per righe wrappate multiple | `start`, `center`, `end` |

### Esempi

```html
<!-- Centra tutto orizzontalmente e verticalmente -->
<v-row justify="center" align="center">

<!-- Spazio distribuito: primo a sinistra, ultimo a destra -->
<v-row justify="space-between">

<!-- Nessuno spazio tra colonne -->
<v-row no-gutters>
```

---

## `v-col`

Definisce una colonna dentro una `v-row`. La larghezza si esprime in **frazioni di 12**.

### Props principali

| Prop | Descrizione | Esempio |
|------|-------------|---------|
| `cols` | Larghezza in colonne (1–12) | `cols="12"` = tutta la riga |
| `offset` | Sposta la colonna a destra di N colonne | `offset="2"` |
| `order` | Cambia l'ordine visivo | `order="2"` |
| `align-self` | Allineamento verticale **solo** di questa colonna | `start`, `center`, `end` |

> [!TIP]
> Se ometti `cols`, le colonne si dividono lo spazio **equamente** in automatico.

### Combinazioni di larghezza

```html
<!-- Tutta la larghezza (stack verticale, tipico mobile) -->
<v-col cols="12">

<!-- Due colonne uguali -->
<v-col cols="6"> + <v-col cols="6">

<!-- Tre colonne uguali -->
<v-col cols="4"> + <v-col cols="4"> + <v-col cols="4">

<!-- 1/3 + 2/3 -->
<v-col cols="4"> + <v-col cols="8">

<!-- Auto-width: occupa solo lo spazio del contenuto -->
<v-col cols="auto">
```

---

## Posizionamento e Allineamento

### Concetti chiave

In una `v-row` (che è un flex container):
- **Asse principale** = orizzontale → controllato da `justify`
- **Asse incrociato** = verticale → controllato da `align`

```
         justify (orizzontale) →
        ┌──────────────────────────┐
   a  ↓ │ [Col A]  [Col B]  [Col C] │
   l    │                          │
   i    │                          │
   g    │                          │
   n    └──────────────────────────┘
```

### Allineamento nella `v-row`

#### `justify` — asse orizzontale

| Valore | Comportamento | Visuale |
|--------|--------------|---------|
| `start` | A sinistra (default) | `[A][B][C]·········` |
| `center` | Al centro | `····[A][B][C]····` |
| `end` | A destra | `·········[A][B][C]` |
| `space-between` | Spazio tra gli elementi | `[A]····[B]····[C]` |
| `space-around` | Spazio uguale attorno | `··[A]··[B]··[C]··` |
| `space-evenly` | Spazio perfettamente uguale | `·[A]··[B]··[C]·` |

#### `align` — asse verticale

| Valore | Comportamento |
|--------|--------------|
| `start` | In alto (default) |
| `center` | Centrato verticalmente |
| `end` | In basso |
| `stretch` | Stirato per tutta l'altezza |
| `baseline` | Allineato alla baseline del testo |

#### Combinare entrambi (centratura perfetta)

```html
<!-- Centra un elemento sia orizzontalmente che verticalmente -->
<v-row justify="center" align="center" class="fill-height">
  <v-col cols="auto">
    Sono perfettamente centrato!
  </v-col>
</v-row>
```

### Allineamento nella `v-col`

La `v-col` è a sua volta un contenitore. Per controllare il posizionamento del suo **contenuto interno**, usa le classi helper di Vuetify:

#### Classi Flex sulla `v-col`

```html
<!-- Contenuto centrato orizzontalmente -->
<v-col cols="12" class="d-flex justify-center">

<!-- Contenuto a destra -->
<v-col cols="12" class="d-flex justify-end">

<!-- Contenuto centrato sia orizzontalmente che verticalmente -->
<v-col cols="12" class="d-flex justify-center align-center">

<!-- Contenuto in colonna (stack verticale) -->
<v-col cols="12" class="d-flex flex-column align-center">
```

> [!IMPORTANT]
> La `v-col` **non è flex per default**. Devi aggiungere `class="d-flex"` per attivare il flexbox e poi usare `justify-*` e `align-*`.

#### `align-self` — override per singola colonna

Quando una `v-row` ha `align="start"`, puoi sovrascrivere l'allineamento di **una sola** colonna:

```html
<v-row align="start" style="height: 200px">
  <v-col>Io sto in alto</v-col>
  <v-col align-self="center">Io sto al centro</v-col>
  <v-col align-self="end">Io sto in basso</v-col>
</v-row>
```

### `text-center`, `text-left`, `text-right`

Per allineare solo il **testo** dentro una colonna (senza flexbox):

```html
<v-col cols="12" class="text-center">
  <h1>Titolo centrato</h1>
</v-col>
```

### Classi Flex Helper (Riepilogo)

| Classe | Effetto |
|--------|---------|
| `d-flex` | Attiva flexbox |
| `flex-column` | Asse principale diventa verticale |
| `flex-wrap` | Permette wrapping |
| `justify-start` | Allinea a inizio asse principale |
| `justify-center` | Centra sull'asse principale |
| `justify-end` | Allinea a fine asse principale |
| `justify-space-between` | Spazio tra gli elementi |
| `align-start` | Allinea a inizio asse incrociato |
| `align-center` | Centra sull'asse incrociato |
| `align-end` | Allinea a fine asse incrociato |
| `align-self-center` | Override allineamento per singolo elemento |

### Esempio pratico: card centrata con azione a destra

```html
<v-row align="center">
  <v-col cols="8">
    <span class="text-h6">Titolo film</span>
  </v-col>
  <v-col cols="4" class="d-flex justify-end">
    <v-btn icon="mdi-heart" variant="text" />
  </v-col>
</v-row>
```

---

## Breakpoints Responsive

Vuetify permette larghezze diverse per ogni breakpoint:

| Breakpoint | Larghezza | Prop |
|------------|-----------|------|
| Extra small | < 600px | `cols` |
| Small | 600-959px | `sm` |
| Medium | 960-1279px | [md](file:///home/rpenazzi/mie_cose/watchStack/README.md) |
| Large | 1280-1919px | `lg` |
| Extra large | 1920px+ | `xl` |

```html
<!-- 12 colonne su mobile, 6 su tablet, 4 su desktop -->
<v-col cols="12" sm="6" md="4">
```

> [!NOTE]
> Per un'app mobile simulata con viewport fisso, basta `cols` senza breakpoints.

---

## Pattern Comuni per App Mobile

### Layout a stack verticale (il più usato)

```html
<v-row>
  <v-col cols="12">Sezione 1</v-col>
</v-row>
<v-row>
  <v-col cols="12">Sezione 2</v-col>
</v-row>
```

### Due card affiancate (statistiche, categorie)

```html
<v-row dense>
  <v-col cols="6">
    <v-card class="pa-3">Film visti: 12</v-card>
  </v-col>
  <v-col cols="6">
    <v-card class="pa-3">Da vedere: 5</v-card>
  </v-col>
</v-row>
```

### Griglia di poster/immagini (3 per riga)

```html
<v-row dense no-gutters>
  <v-col cols="4" v-for="movie in movies" :key="movie.id">
    <v-img :src="movie.poster" aspect-ratio="2/3" cover />
  </v-col>
</v-row>
```

### Header con titolo e azione

```html
<v-row align="center" justify="space-between" class="px-2">
  <v-col cols="auto">
    <h3>La mia lista</h3>
  </v-col>
  <v-col cols="auto">
    <v-btn variant="text" size="small">Vedi tutti</v-btn>
  </v-col>
</v-row>
```

### Scroll orizzontale (carosello film)

```html
<v-row no-gutters class="flex-nowrap overflow-x-auto">
  <v-col cols="auto" v-for="movie in movies" :key="movie.id" class="pa-1">
    <v-card width="120">
      <v-img :src="movie.poster" height="180" cover />
    </v-card>
  </v-col>
</v-row>
```

> [!IMPORTANT]
> `flex-nowrap` impedisce il wrap → gli elementi escono dalla riga → `overflow-x-auto` abilita lo scroll orizzontale.

---

## `v-bottom-navigation`

Barra di navigazione fissa in basso, tipica delle app mobile.

### Props principali

| Prop | Descrizione |
|------|-------------|
| `v-model` | Valore del tab attivo (corrisponde al `value` dei `v-btn`) |
| `grow` | I bottoni si espandono per occupare tutta la larghezza |
| `color` | Colore dell'elemento selezionato |
| `bg-color` | Colore di sfondo della barra |
| `elevation` | Ombra (0–24) |
| `mode="shift"` | Animazione: il label appare solo sul tab selezionato |

### Esempio con navigazione via router

```html
<v-bottom-navigation v-model="activePage" grow color="primary">
  <v-btn value="home">
    <v-icon>mdi-home</v-icon>
    <span>Home</span>
  </v-btn>
  <v-btn value="search">
    <v-icon>mdi-magnify</v-icon>
    <span>Cerca</span>
  </v-btn>
  <v-btn value="profile">
    <v-icon>mdi-account</v-icon>
    <span>Profilo</span>
  </v-btn>
</v-bottom-navigation>
```

```javascript
data() {
  return { activePage: 'home' }
},
watch: {
  activePage(val) {
    this.$router.push({ name: val });
  }
}
```

> [!TIP]
> Usa `meta: { hideBottomBar: true }` sulle rotte dove non vuoi la bottom bar (es. login), e in `v-show` controlla `!this.$route.meta.hideBottomBar`.

---

## Classi di Spacing Utili

Formato: `{property}{direction}-{size}` dove size va da 0 a 16.

| Prefisso | Significato |
|----------|-------------|
| `pa` | padding all |
| `px` / `py` | padding orizzontale / verticale |
| `ma` | margin all |
| `mx` / `my` | margin orizzontale / verticale |
| `mt` / `mb` | margin top / bottom |

```html
<v-col cols="12" class="pa-2 mb-4">  <!-- padding 8px, margin-bottom 16px -->
```

---

## Regole d'Oro per Mobile

1. **`v-col` sempre dentro `v-row`**, `v-row` sempre dentro `v-container`
2. **`cols="12"` è il default** → layout a stack verticale
3. Usa `dense` e `no-gutters` per massimizzare lo spazio su schermi piccoli
4. `fluid` su `v-container` sempre, per non sprecare spazio
5. Per scroll orizzontale: `flex-nowrap` + `overflow-x-auto` su `v-row`
6. Max **3-5 bottoni** nella `v-bottom-navigation`
