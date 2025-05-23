import { ApiResponseCode } from "@/lib/rest/publizon/local-adapter/generated/model"

export const publizonErrorMessageMap = {
  105: "Bogen er desværre ikke tilgængelig for udlån lige nu (#105)",
  114: "Ugyldigt kortnummer og/eller pinkode (#114)",
  118: "Der er sket en uventet fejl (#118)",
  120: "Antallet af samtidige lån er overskredet (#120)",
  125: "Dit bibliotek har nået grænsen for antal udlån i denne måned (#125). Du kan stadig låne bøger og podcasts med blåt ikon.",
  128: "Bogen er ikke tilgængelig for udlån (#128)",
  129: "Bogen kan højst genlånes én gang (#129)",
  130: "Bogen kan først lånes igen 90 dage efter sidste låns udløb (#130)",
  131: "Bogen kan ikke lånes (#131)",
  133: "Der er sket en uventet fejl (#133)",
  134: "Kortet er midlertidigt blokeret pga. for mange fejlede loginforsøg. Prøv igen om 2 timer. (#134)",
  135: "Bogen kan ikke lånes (#135)",
  136: "Bogen kan ikke lånes (#136)",
  137: "Du kan højest reservere 3 titler (#137)",
  138: "Der er sket en uventet fejl (#138)",
  139: "Der er sket en uventet fejl (#139)",
  140: "Bogen er allerede reserveret (#140)",
  141: "Ugyldig e-mail adresse (#141)",
  142: "Ugyldig telefonnummer (#142)",
  143: "Du kan ikke låne flere blå titler lige nu (#143)",
  144: "Ukendt fejl hos biblioteket - prøv at logge ind igen senere (#144)",
  145: "Bibliotekets server svarer ikke - prøv at logge ind igen senere. (#145)",
  146: "Du har ikke adgang til digitale materialer fra dette bibliotek, da du ikke er registreret som bosiddende i Kommunen. Kontakt biblioteket (#146)",
  147: "Der kunne ikke findes et land med den givne landekode (#147)",
  148: "Der er sket en uventet fejl (#148)",
} as unknown as Record<ApiResponseCode, string>
