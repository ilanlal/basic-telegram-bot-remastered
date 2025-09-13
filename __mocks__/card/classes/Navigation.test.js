const Navigation = require('./Navigation')
const Card = require('./Card')

describe('Navigation', () => {
  let navigation

  beforeEach(() => {
    navigation = new Navigation()
  })

  test('pushCard should add a card to the navigation stack', () => {
    const card = new Card()
    navigation.pushCard(card)

    console.log('hi..', navigation.getData())
    expect(navigation.getData().cardNavigations[0]).toEqual({ pushCard: card.getData() })
  })

  test('updateCard should update the top card in the navigation stack', () => {
    const card = new Card()
    navigation.pushCard(card)
    const updatedCard = new Card().setName('Updated Card')
    navigation.updateCard(updatedCard)
    expect(navigation.getData().cardNavigations).toHaveLength(2)
    expect(navigation.getData().cardNavigations[1]).toEqual({ updateCard: updatedCard.getData() })
  })

  test('popCard should remove the top card from the navigation stack', () => {
    const card = new Card()
    navigation.pushCard(card)
    navigation.popCard()
    expect(navigation.getData().cardNavigations).toHaveLength(2)
    expect(navigation.getData().cardNavigations[0]).toEqual({ pushCard: card.getData() })
  })
})
