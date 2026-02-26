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
    GRAPHIC_NOVEL_ELECTRONIC: "Graphic novel (e-bog)",
    GRAPHIC_NOVEL_ONLINE: "Graphic novel (online)",
    COMIC: "Tegneserie",
    COMIC_ELECTRONIC: "Tegneserie (e-bog)",
    COMIC_ONLINE: "Tegneserie (online)",
    PICTURE_BOOK: "Billedbog",
    PICTURE_BOOK_ELECTRONIC: "Billedbog (e-bog)",
    PICTURE_BOOK_ONLINE: "Billedbog (online)",
    AUDIO_BOOK_ONLINE: "Lydbog (online)",
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
