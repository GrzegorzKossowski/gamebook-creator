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
      'In a hole in the ground there lived a hobbit. Not a nasty, dirty, wet hole, filled with the ends of worms and an oozy smell, nor yet a dry, bare, sandy hole with nothing in it to sit down on or to eat: it was a hobbit-hole, and that means comfort.' +
      '\nDo you want to go to the next chapter SECOND {2}?' +
      '..or you prefer to go to some distant chapter!!! 400 {400}' +
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
    title: 'Second chapter',
    content:
      faker.lorem.lines(1) +
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
    title: 'Third chapter',
    content:
      faker.lorem.lines(1) +
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
    title: 'Fourth chapter',
    content:
      faker.lorem.lines(1) +
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
    title: 'Fifth chapter',
    content:
      faker.lorem.lines(1) +
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
    title: 'Sixth chapter',
    content:
      faker.lorem.lines(1) +
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
    title: 'Seventh chapter',
    content:
      faker.lorem.lines(1) +
      `\nNext chapters TEHTH {10} ELEVENTH {11},\nlink to random distant {${Math.floor(Math.random() * (100 - 2)) + 100
      }},\nlink to empty {}`,
    status: {
      fixed: Math.random() < 0.1,
      dead: Math.random() < 0.92 && Math.random() > 0.9,
      win: Math.random() > 0.92,
    },
  },
  /**/
   ...Array.from({ length: 5 }, (_, i) => {
     return {
       id: uuidv4(),
       chapterNumber: i + 8,
       oldNumber: i + 8,
      title: faker.lorem.lines(1),
      content:
      faker.lorem.lines(1) +
      `\nNext chapters {${i + 3}} {${i + 5
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