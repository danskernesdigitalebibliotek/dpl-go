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

  "materialtypes.icons": {
    book: ["BOOK"],
    ebook: ["EBOOK", "BOOK_ELECTRONIC"],
    comic: ["COMIC", "GRAPHIC_NOVEL"],
    comicOnline: [
      "COMIC_ONLINE",
      "COMIC_ELECTRONIC",
      "GRAPHIC_NOVEL_ONLINE",
      "GRAPHIC_NOVEL_ELECTRONIC",
    ],
    pictureBook: ["PICTURE_BOOK"],
    pictureBookOnline: ["PICTURE_BOOK_ONLINE", "PICTURE_BOOK_ELECTRONIC"],
    audioBook: ["AUDIO_BOOK"],
    audioBookOnline: ["AUDIO_BOOK_ONLINE", "AUDIO_BOOK_ELECTRONIC"],
    podcast: ["PODCAST"],
  },
}

export default materialTypes
