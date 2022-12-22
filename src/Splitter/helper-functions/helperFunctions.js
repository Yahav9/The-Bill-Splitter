export function splitItem(item, splitters, people) {
    const splittedPrice = item / splitters.length;
    for (const splitter of splitters) {
        for (const person of people) {
            if (splitter === person.name) {
                person.payment += splittedPrice;
            }
        }
    }
}

export function calculatePayment(tip, people) {
    for (const person of people) {
        person.payment = Math.ceil((person.payment * tip * 10).toFixed(2)) / 10;
    }
    return people.map(person => {
        return person.payment;
    });
}
