import * as React from 'react'
import * as types from './types'

interface IProps {
  items: types.ICarouselItem[]
}

interface IState {
  currentIndex: number | null
}

class CarouselInner extends React.Component<IProps, IState> {
  public render() {
    const { items } = this.props
    return <>
      {
        items.map((item) => (
          <img src={ item.imageURL } alt={ item.description } />
        ))
      }
    </>
  }
}

export {
  CarouselInner
}
