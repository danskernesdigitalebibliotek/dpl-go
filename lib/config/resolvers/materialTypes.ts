export type TMaterialTypeCategories = {
  reading: string[]
  listening: string[]
  gaming: string[]
  video: string[]
  ebook: string[]
  podcast: string[]
}

const materialTypes = {
  "materialtypes.sortpriority": [
    "BOOK",
    "EBOOK",
    "BOOK_ELECTRONIC",
    "GRAPHIC_NOVEL",
    "GRAPHIC_NOVEL_ELECTRONIC",
    "GRAPHIC_NOVEL_ONLINE",
    "COMIC",
    "COMIC_ELECTRONIC",
    "COMIC_ONLINE",
    "PICTURE_BOOK",
    "PICTURE_BOOK_ELECTRONIC",
    "PICTURE_BOOK_ONLINE",
    "AUDIO_BOOK_ONLINE",
    "PODCAST",
  ] as string[],

  "materialtypes.translations": {
    BOOK: "Bog",
    EBOOK: "E-bog",
    BOOK_ELECTRONIC: "E-bog",
    GRAPHIC_NOVEL: "Graphic novel",
    GRAPHIC_NOVEL_ELECTRONIC: "E-Graphic novel",
    GRAPHIC_NOVEL_ONLINE: "E-Graphic novel",
    COMIC: "Tegneserie",
    COMIC_ELECTRONIC: "E-Tegneserie",
    COMIC_ONLINE: "E-Tegneserie",
    PICTURE_BOOK: "Billedbog",
    PICTURE_BOOK_ELECTRONIC: "E-Billedbog",
    PICTURE_BOOK_ONLINE: "E-Billedbog",
    AUDIO_BOOK_ONLINE: "E-Lydbog",
    PODCAST: "Podcast",
  } as { [key: string]: string },

  "materialtypes.categories": {
    reading: ["BOOK", "GRAPHIC_NOVEL", "COMIC", "PICTURE_BOOK"],
    listening: ["AUDIO_BOOK_ONLINE"],
    gaming: [] as string[],
    video: [] as string[],
    ebook: [
      "EBOOK",
      "BOOK_ELECTRONIC",
      "GRAPHIC_NOVEL_ELECTRONIC",
      "GRAPHIC_NOVEL_ONLINE",
      "COMIC_ELECTRONIC",
      "COMIC_ONLINE",
      "PICTURE_BOOK_ELECTRONIC",
      "PICTURE_BOOK_ONLINE",
    ],
    podcast: ["PODCAST"],
  },
}

export default materialTypes
