import { splitItem, calculatePayment } from './helperFunctions';

const ROSS = {
    name: 'Ross',
    payment: 0
};
const CHANDLER = {
    name: 'Chandler',
    payment: 0
};
const JOEY = {
    name: 'Joey',
    payment: 0
};
const RACHEL = {
    name: 'Rachel',
    payment: 0
};
const MONICA = {
    name: 'Monica',
    payment: 0
};
const PHOEBE = {
    name: 'Phoebe',
    payment: 0
};

const examplePeople = [
    ROSS,
    CHANDLER,
    JOEY,
    RACHEL,
    MONICA,
    PHOEBE,
];

describe('Test splitItem function', () => {
    it('Should split to one person each time', () => {
        splitItem(10, ['Ross'], examplePeople);
        expect(ROSS.payment).toEqual(10);
        expect(CHANDLER.payment).toEqual(0);
        expect(JOEY.payment).toEqual(0);
        expect(RACHEL.payment).toEqual(0);
        expect(MONICA.payment).toEqual(0);
        expect(PHOEBE.payment).toEqual(0);

        splitItem(20, ['Chandler'], examplePeople);
        expect(ROSS.payment).toEqual(10);
        expect(CHANDLER.payment).toEqual(20);
        expect(JOEY.payment).toEqual(0);
        expect(RACHEL.payment).toEqual(0);
        expect(MONICA.payment).toEqual(0);
        expect(PHOEBE.payment).toEqual(0);

        splitItem(30, ['Joey'], examplePeople);
        expect(ROSS.payment).toEqual(10);
        expect(CHANDLER.payment).toEqual(20);
        expect(JOEY.payment).toEqual(30);
        expect(RACHEL.payment).toEqual(0);
        expect(MONICA.payment).toEqual(0);
        expect(PHOEBE.payment).toEqual(0);

        splitItem(40, ['Rachel'], examplePeople);
        expect(ROSS.payment).toEqual(10);
        expect(CHANDLER.payment).toEqual(20);
        expect(JOEY.payment).toEqual(30);
        expect(RACHEL.payment).toEqual(40);
        expect(MONICA.payment).toEqual(0);
        expect(PHOEBE.payment).toEqual(0);

        splitItem(50, ['Monica'], examplePeople);
        expect(ROSS.payment).toEqual(10);
        expect(CHANDLER.payment).toEqual(20);
        expect(JOEY.payment).toEqual(30);
        expect(RACHEL.payment).toEqual(40);
        expect(MONICA.payment).toEqual(50);
        expect(PHOEBE.payment).toEqual(0);

        splitItem(60, ['Phoebe'], examplePeople);
        expect(ROSS.payment).toEqual(10);
        expect(CHANDLER.payment).toEqual(20);
        expect(JOEY.payment).toEqual(30);
        expect(RACHEL.payment).toEqual(40);
        expect(MONICA.payment).toEqual(50);
        expect(PHOEBE.payment).toEqual(60);

        splitItem(60, ['Ross'], examplePeople);
        expect(ROSS.payment).toEqual(70);
        expect(CHANDLER.payment).toEqual(20);
        expect(JOEY.payment).toEqual(30);
        expect(RACHEL.payment).toEqual(40);
        expect(MONICA.payment).toEqual(50);
        expect(PHOEBE.payment).toEqual(60);

        splitItem(50, ['Chandler'], examplePeople);
        expect(ROSS.payment).toEqual(70);
        expect(CHANDLER.payment).toEqual(70);
        expect(JOEY.payment).toEqual(30);
        expect(RACHEL.payment).toEqual(40);
        expect(MONICA.payment).toEqual(50);
        expect(PHOEBE.payment).toEqual(60);

        splitItem(40, ['Joey'], examplePeople);
        expect(ROSS.payment).toEqual(70);
        expect(CHANDLER.payment).toEqual(70);
        expect(JOEY.payment).toEqual(70);
        expect(RACHEL.payment).toEqual(40);
        expect(MONICA.payment).toEqual(50);
        expect(PHOEBE.payment).toEqual(60);

        splitItem(30, ['Rachel'], examplePeople);
        expect(ROSS.payment).toEqual(70);
        expect(CHANDLER.payment).toEqual(70);
        expect(JOEY.payment).toEqual(70);
        expect(RACHEL.payment).toEqual(70);
        expect(MONICA.payment).toEqual(50);
        expect(PHOEBE.payment).toEqual(60);

        splitItem(20, ['Monica'], examplePeople);
        expect(ROSS.payment).toEqual(70);
        expect(CHANDLER.payment).toEqual(70);
        expect(JOEY.payment).toEqual(70);
        expect(RACHEL.payment).toEqual(70);
        expect(MONICA.payment).toEqual(70);
        expect(PHOEBE.payment).toEqual(60);

        splitItem(10, ['Phoebe'], examplePeople);
        expect(ROSS.payment).toEqual(70);
        expect(CHANDLER.payment).toEqual(70);
        expect(JOEY.payment).toEqual(70);
        expect(RACHEL.payment).toEqual(70);
        expect(MONICA.payment).toEqual(70);
        expect(PHOEBE.payment).toEqual(70);
    });

    it('Should split between two people each time', () => {
        splitItem(10, ['Ross', 'Rachel'], examplePeople);
        expect(ROSS.payment).toEqual(75);
        expect(CHANDLER.payment).toEqual(70);
        expect(JOEY.payment).toEqual(70);
        expect(RACHEL.payment).toEqual(75);
        expect(MONICA.payment).toEqual(70);
        expect(PHOEBE.payment).toEqual(70);

        splitItem(10, ['Chandler', 'Monica'], examplePeople);
        expect(ROSS.payment).toEqual(75);
        expect(CHANDLER.payment).toEqual(75);
        expect(JOEY.payment).toEqual(70);
        expect(RACHEL.payment).toEqual(75);
        expect(MONICA.payment).toEqual(75);
        expect(PHOEBE.payment).toEqual(70);

        splitItem(10, ['Joey', 'Phoebe'], examplePeople);
        expect(ROSS.payment).toEqual(75);
        expect(CHANDLER.payment).toEqual(75);
        expect(JOEY.payment).toEqual(75);
        expect(RACHEL.payment).toEqual(75);
        expect(MONICA.payment).toEqual(75);
        expect(PHOEBE.payment).toEqual(75);
    });

    it('Should split between three people each time', () => {
        splitItem(30, ['Ross', 'Chandler', 'Joey'], examplePeople);
        expect(ROSS.payment).toEqual(85);
        expect(CHANDLER.payment).toEqual(85);
        expect(JOEY.payment).toEqual(85);
        expect(RACHEL.payment).toEqual(75);
        expect(MONICA.payment).toEqual(75);
        expect(PHOEBE.payment).toEqual(75);

        splitItem(30, ['Rachel', 'Monica', 'Phoebe'], examplePeople);
        expect(ROSS.payment).toEqual(85);
        expect(CHANDLER.payment).toEqual(85);
        expect(JOEY.payment).toEqual(85);
        expect(RACHEL.payment).toEqual(85);
        expect(MONICA.payment).toEqual(85);
        expect(PHOEBE.payment).toEqual(85);
    });

    it('Should split between four people each time', () => {
        splitItem(10, ['Ross', 'Chandler', 'Joey', 'Rachel'], examplePeople);
        expect(ROSS.payment).toEqual(87.5);
        expect(CHANDLER.payment).toEqual(87.5);
        expect(JOEY.payment).toEqual(87.5);
        expect(RACHEL.payment).toEqual(87.5);
        expect(MONICA.payment).toEqual(85);
        expect(PHOEBE.payment).toEqual(85);

        splitItem(5, ['Ross', 'Chandler', 'Monica', 'Phoebe'], examplePeople);
        expect(ROSS.payment).toEqual(88.75);
        expect(CHANDLER.payment).toEqual(88.75);
        expect(JOEY.payment).toEqual(87.5);
        expect(RACHEL.payment).toEqual(87.5);
        expect(MONICA.payment).toEqual(86.25);
        expect(PHOEBE.payment).toEqual(86.25);
    });

    it('Should split between five people each time', () => {
        splitItem(11, ['Ross', 'Chandler', 'Joey', 'Monica', 'Phoebe'], examplePeople);
        expect(ROSS.payment).toEqual(90.95);
        expect(CHANDLER.payment).toEqual(90.95);
        expect(JOEY.payment).toEqual(89.7);
        expect(RACHEL.payment).toEqual(87.5);
        expect(MONICA.payment).toEqual(88.45);
        expect(PHOEBE.payment).toEqual(88.45);
    });

    it('Should split between six people each time', () => {
        splitItem(600, ['Ross', 'Chandler', 'Joey', 'Rachel', 'Monica', 'Phoebe'], examplePeople);
        expect(ROSS.payment).toEqual(190.95);
        expect(CHANDLER.payment).toEqual(190.95);
        expect(JOEY.payment).toEqual(189.7);
        expect(RACHEL.payment).toEqual(187.5);
        expect(MONICA.payment).toEqual(188.45);
        expect(PHOEBE.payment).toEqual(188.45);
    });
});

describe('Test calculatePayment function', () => {
    const testData = [
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.1, expected: [0, 1.1, 2.2, 3.3, 4.4, 5.5, 6.6, 7.7, 8.8, 9.9] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.11, expected: [0, 1.2, 2.3, 3.4, 4.5, 5.6, 6.7, 7.8, 8.9, 10] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.12, expected: [0, 1.2, 2.3, 3.4, 4.5, 5.6, 6.8, 7.9, 9, 10.1] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.13, expected: [0, 1.2, 2.3, 3.4, 4.6, 5.7, 6.8, 8, 9.1, 10.2] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.14, expected: [0, 1.2, 2.3, 3.5, 4.6, 5.7, 6.9, 8, 9.2, 10.3] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.15, expected: [0, 1.2, 2.3, 3.5, 4.6, 5.8, 6.9, 8.1, 9.2, 10.4] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.16, expected: [0, 1.2, 2.4, 3.5, 4.7, 5.8, 7, 8.2, 9.3, 10.5] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.17, expected: [0, 1.2, 2.4, 3.6, 4.7, 5.9, 7.1, 8.2, 9.4, 10.6] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.18, expected: [0, 1.2, 2.4, 3.6, 4.8, 5.9, 7.1, 8.3, 9.5, 10.7] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.19, expected: [0, 1.2, 2.4, 3.6, 4.8, 6, 7.2, 8.4, 9.6, 10.8] },
        { people: [{ payment: 0 }, { payment: 1 }, { payment: 2 }, { payment: 3 }, { payment: 4 }, { payment: 5 }, { payment: 6 }, { payment: 7 }, { payment: 8 }, { payment: 9 }], tip: 1.2, expected: [0, 1.2, 2.4, 3.6, 4.8, 6, 7.2, 8.4, 9.6, 10.8] },

        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.09, expected: [10.9, 21.8, 32.7, 43.6, 54.5, 65.4, 76.3, 87.2, 98.1] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.1, expected: [11, 22, 33, 44, 55, 66, 77, 88, 99] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.11, expected: [11.1, 22.2, 33.3, 44.4, 55.5, 66.6, 77.7, 88.8, 99.9] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.12, expected: [11.2, 22.4, 33.6, 44.8, 56, 67.2, 78.4, 89.6, 100.8] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.13, expected: [11.3, 22.6, 33.9, 45.2, 56.5, 67.8, 79.1, 90.4, 101.7] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.14, expected: [11.4, 22.8, 34.2, 45.6, 57, 68.4, 79.8, 91.2, 102.6] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.15, expected: [11.5, 23, 34.5, 46, 57.5, 69, 80.5, 92, 103.5] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.16, expected: [11.6, 23.2, 34.8, 46.4, 58, 69.6, 81.2, 92.8, 104.4] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.17, expected: [11.7, 23.4, 35.1, 46.8, 58.5, 70.2, 81.9, 93.6, 105.3] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.18, expected: [11.8, 23.6, 35.4, 47.2, 59, 70.8, 82.6, 94.4, 106.2] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.19, expected: [11.9, 23.8, 35.7, 47.6, 59.5, 71.4, 83.3, 95.2, 107.1] },
        { people: [{ payment: 10 }, { payment: 20 }, { payment: 30 }, { payment: 40 }, { payment: 50 }, { payment: 60 }, { payment: 70 }, { payment: 80 }, { payment: 90 }], tip: 1.2, expected: [12, 24, 36, 48, 60, 72, 84, 96, 108] },
    ];

    for (let i = 0; i < testData.length; i++) {
        it(`calculatePayment(${testData[i].tip}, ${JSON.stringify(testData[i].people)})`, () => {
            expect(calculatePayment(testData[i].tip, testData[i].people)).toEqual(testData[i].expected);
        });
    }
});
