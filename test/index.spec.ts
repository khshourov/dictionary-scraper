const { add } = require('../src');

test("Add 2 and 3 will return 5", () => {
    expect(add(2, 3)).toEqual(5);
});
