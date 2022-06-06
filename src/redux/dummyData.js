import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { CONFIG } from 'configuration';

export const chapters = [
  {
    id: CONFIG.FIRST_CHAPTER_ID,
    chapterNumber: 1,
    oldNumber: 1,
    title: 'First chapter - the journey begins.',
    content:
      'W pewnej norze ziemnej mieszkał sobie pewien hobbit. Nie była to szkaradna, brudna, wilgotna nora, rojąca się od robaków i cuchnąca błotem, ani też sucha, naga, piaszczysta nora bez stołka, na którym by można usiąść, i bez dobrze zaopatrzonej spiżarni; była to nora hobbita, a to znaczy: nora z wygodami.\n' +
      'Do you want to go to the next chapter SECOND {2}?\n' +
      '..or you prefer to go to some distant chapter!!! 400 {400}\n' +
      "...or maybe you don't know, where to go yet {}?",
    status: {
      start: true,
      fixed: true,
    },
  },
  {
    id: uuidv4(),
    chapterNumber: 2,
    oldNumber: 2,
    title: 'Second chapter - co to hobbit',
    content:
      'Matką naszego hobbita… ale co to jest hobbit? Zdaje mi się, że wymaga to wyjaśnienia. W dzisiejszych czasach bowiem hobbitów bardzo rzadko można spotkać: nie ma ich wiele, a poza tym unikają Dużych Ludzi – jak nazywają nas. Hobbici są – czy może byli – małymi ludźmi, mniejszymi od krasnoludów – różnią się też od nich tym, że nie noszą brody – lecz znacznie większymi od liliputów.\n' +
      `\nNext chapters THIRD {3} FIFTH {5},\nlink to random distant {${Math.floor(Math.random() * (100 - 2)) + 100
      }},\nlink to empty {}`,
    status: {
      fixed: Math.random() < 0.2,
      dead: Math.random() < 0.92 && Math.random() > 0.9,
      win: Math.random() > 0.92,
    },
  },
  {
    id: uuidv4(),
    chapterNumber: 3,
    oldNumber: 3,
    title: 'Third chapter - pewnego ranka',
    content:
      'Dziwnym trafem pewnego ranka, dawno, dawno temu, w czas dla świata spokojny, gdy mniej na nim było zgiełku, a więcej zieleni, gdy hobbici żyli liczni i szczęśliwi, a Bilbo Baggins zjadłszy śniadanie stał pod swymi drzwiami i ćmił olbrzymią, długą, drewnianą fajkę, sięgającą mu prawie do kosmatych palców u nóg.' +
      `\nNext chapters FOURTH {4} FIFTH {5},\nlink to random distant {${Math.floor(Math.random() * (100 - 2)) + 100
      }},\nlink to empty {}`,
    status: {
      fixed: Math.random() < 0.2,
      dead: Math.random() < 0.92 && Math.random() > 0.9,
      win: Math.random() > 0.92,
    },
  },
  {
    id: uuidv4(),
    chapterNumber: 4,
    oldNumber: 4,
    title: 'Fourth chapter - wejście smoka',
    content:
      'Nic więc nie podejrzewał Bilbo, gdy owego ranka zobaczył małego staruszka w wysokim, spiczastym, niebieskim kapeluszu, w długim szarym płaszczu przepasanym srebrną szarfą, z długą siwą brodą, sięgającą poniżej pasa, obutego w ogromne czarne buty.' +
      `\nNext chapters FIFTH {5} SIXTH {6},\nlink to random distant {${Math.floor(Math.random() * (100 - 2)) + 100
      }},\nlink to empty {}`,
    status: {
      fixed: Math.random() < 0.2,
      dead: Math.random() < 0.92 && Math.random() > 0.9,
      win: Math.random() > 0.92,
    },
  },
  {
    id: uuidv4(),
    chapterNumber: 5,
    oldNumber: 5,
    title: 'Fifth chapter - naród prosty',
    content:
      '– My tu jesteśmy naród prosty i spokojny, nie potrzeba nam przygód. Przygody! To znaczy: nieprzyjemności, zburzony spokój, brak wygód. Przez takie rzeczy można się spóźnić na obiad.' +
      `\nNext chapters SIXTH {6} SEVENTH {7},\nlink to random distant {${Math.floor(Math.random() * (100 - 2)) + 100
      }},\nlink to empty {}`,
    status: {
      fixed: Math.random() < 0.2,
      dead: Math.random() < 0.92 && Math.random() > 0.9,
      win: Math.random() > 0.92,
    },
  },
  {
    id: uuidv4(),
    chapterNumber: 6,
    oldNumber: 6,
    title: 'Sixth chapter - Gandalf, Gandalf',
    content:
      '– Gandalf! Gandalf! Wielkie nieba! Czyżby ten sam wędrowny czarodziej, który Staremu Tukowi podarował magiczne brylantowe spinki, co to same się zapinały, a odpinały tylko na rozkaz?' +
      `\nNext chapters EIGHTH {8} NINETH {9},\nlink to random distant {${Math.floor(Math.random() * (100 - 2)) + 100
      }},\nlink to empty {}`,
    status: {
      fixed: Math.random() < 0.2,
      dead: Math.random() < 0.92 && Math.random() > 0.9,
      win: Math.random() > 0.92,
    },
  },
  {
    id: uuidv4(),
    chapterNumber: 7,
    oldNumber: 7,
    title: 'Seventh chapter - kłopoty to moja specjalność',
    content:
      'Nazajutrz prawie zapomniał o Gandalfie. Nigdy nie pamiętał zbyt dokładnie różnych rzeczy, jeśli ich nie zapisał w swoim kalendarzyku terminowym, na przykład tak: środa, herbata z Gandalfem. Poprzedniego dnia zanadto był podniecony, by o czymś takim pomyśleć.' +
      `\nNext chapters TEHTH {10} ELEVENTH {11},\nlink to random distant {${Math.floor(Math.random() * (100 - 2)) + 100
      }},\nlink to empty {}`,
    status: {
      fixed: Math.random() < 0.1,
      dead: Math.random() < 0.92 && Math.random() > 0.9,
      win: Math.random() > 0.92,
    },
  },
  /**/
  ...Array.from({ length: 30 }, (_, i) => {
    return {
      id: uuidv4(),
      chapterNumber: i + 8,
      oldNumber: i + 8,
      title: faker.lorem.lines(1),
      content:
        faker.lorem.paragraphs(Math.floor(Math.random() * (6 - 2)) + 2) +
        `\nNext chapters {${i + 9}} {${i + 25
        }},\nlink to random near {${Math.floor(Math.random() * (i)) + 16
        }},\nlink to random distant {${Math.floor(Math.random() * (i - 2)) + 100
        }},\nlink to empty {}`,
      status: {
        fixed: Math.random() < 0.1,
        // end: Math.random() < 0.9 && Math.random() > 0.85,
        dead: Math.random() < 0.92 && Math.random() > 0.9,
        win: Math.random() > 0.92,
      },
    };
  }),
  /**/
]