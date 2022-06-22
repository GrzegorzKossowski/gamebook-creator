import { faker } from '@faker-js/faker';
import { v4 as uuidv4 } from 'uuid';
import { CONFIG } from 'configuration';

const firstChapter = {
  id: CONFIG.FIRST_CHAPTER_ID,
  chapterNumber: 1,
  oldNumber: 1,
  title: 'First chapter - the journey begins.',
  content:
    "This is the first chapter of your gamebook. You can edit it, but you cannot delete it. " +
    "It is also fixated permanently on the first position. You can't shuffle it like the others." +
    "If you want to create a link to the next chapter, use parentheses and a number in the middle, such as:\n\n" +
    "You see a door on the north wall. You open it and go on {2} or choose the corridor to the left {3}.\n\n" +
    "You can enter a chapter number that does not yet exist, e.g. {400}.  However, remember to create it eventually. " +
    "If you are not sure how the adventure will go, you can use an empty link {}",
  status: {
    start: true,
    fixed: true,
  },
}

const someChapters = [{
  id: uuidv4(),
  chapterNumber: 2,
  oldNumber: 2,
  title: 'Second chapter - co to hobbit',
  content:
    'Second chapter - do trzeci {3}, do czwarty {4},\n logn {99}, empty {}',
  // content:
  //   'Matką naszego hobbita… ale co to jest hobbit? Zdaje mi się, że wymaga to wyjaśnienia. W dzisiejszych czasach bowiem hobbitów bardzo rzadko można spotkać: nie ma ich wiele, a poza tym unikają Dużych Ludzi – jak nazywają nas. Hobbici są – czy może byli – małymi ludźmi, mniejszymi od krasnoludów – różnią się też od nich tym, że nie noszą brody – lecz znacznie większymi od liliputów.\n' +
  //   `\nNext chapters THIRD {3} FIFTH {5},\nlink to random distant {${Math.floor(Math.random() * (100 - 2)) + 100
  //   }},\nlink to empty {}`,
  status: {
    fixed: true,// Math.random() < 0.2,
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
    'Third chapter - do drugi {2}\ndo czwarty {4}\n logn {99}, empty {}',
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
    'Fourth chapter - to pierszy {1} to drugi {2} to trzeci {3} to czwarty {4}\n logn {99}, empty {}',
  status: {
    fixed: false,//Math.random() < 0.2,
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
    'Fifth chapter - pierwszy {1}, ostatni {6}, daleki {99}, pusty {}',
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
    'Sixth chapter - pierwszy {1}, ostatni {6}, daleki {99}, pusty {}',
  status: {
    fixed: Math.random() < 0.2,
    dead: Math.random() < 0.92 && Math.random() > 0.9,
    win: Math.random() > 0.92,
  },
},
  // {
  //   id: uuidv4(),
  //   chapterNumber: 7,
  //   oldNumber: 7,
  //   title: 'Seventh chapter - kłopoty to moja specjalność',
  //   content:
  //     'Nazajutrz prawie zapomniał o Gandalfie. Nigdy nie pamiętał zbyt dokładnie różnych rzeczy, jeśli ich nie zapisał w swoim kalendarzyku terminowym, na przykład tak: środa, herbata z Gandalfem. Poprzedniego dnia zanadto był podniecony, by o czymś takim pomyśleć.' +
  //     `\nNext chapters TEHTH {10} ELEVENTH {11},\nlink to random distant {${Math.floor(Math.random() * (100 - 2)) + 100
  //     }},\nlink to empty {}`,
  //   status: {
  //     fixed: true, //Math.random() < 0.1,
  //     dead: Math.random() < 0.92 && Math.random() > 0.9,
  //     win: Math.random() > 0.92,
  //   },
  // },
]

const arrayChapters = (amount) => Array.from({ length: amount }, (_, i) => {
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
})

export const chapters = [
  firstChapter,
  ...someChapters,
  // ...arrayChapters(3),
]

export const introduction = 'Introduction. Here you can describe to the reader what gamebooks are, how they are played. In addition, you can include information on game mechanics if you intend to introduce one. This text will appear in the exports before the first paragraph.'