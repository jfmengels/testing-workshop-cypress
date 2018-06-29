import add from '../../todomvc/lib/add'

it('should add two numbers', function() {
  expect(add(0, 0)).to.equal(0)
  expect(add(2, 7)).to.equal(9);
})
