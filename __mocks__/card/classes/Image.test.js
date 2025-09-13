const Image = require('./Image')

describe('Image', () => {
  it('Should set image url', () => {
    const image = new Image().setImageUrl('url')

    expect(image.getData()).toEqual({ url: 'url' })
  })
})
