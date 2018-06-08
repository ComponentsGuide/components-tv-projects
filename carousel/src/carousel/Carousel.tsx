import * as React from 'react'
import * as types from './types'

interface ISlideProps {
  item: types.ICarouselItem
}

function CarouselSlide({ item }: ISlideProps): React.ReactElement<any> {
  return (
    <div style={{ minWidth: '100vw', height: '100%' }}>
      <img src={ item.imageURL } alt={ item.description } />
    </div>
  )
}

interface ITrackProps {
  items: types.ICarouselItem[]
  offset: number
}

class CarouselTrack extends React.Component<ITrackProps> {
  public render() {
    const { items, offset } = this.props
    return <div style={{ display: 'flex', flexDirection: 'row', width: 50000, transform: `translateX(${offset * -100}vw)` }}>
      {
        items.map((item) => (
          <CarouselSlide item={ item } />
        ))
      }
    </div>
  }
}

interface IRenderNavArgs {
  goPrevious: () => void
  goNext: () => void
}

interface IFrameProps {
  items: types.ICarouselItem[]
  renderNav: (args: IRenderNavArgs) => React.ReactElement<any>
}

interface IFrameState {
  offset: number
}

class CarouselFrame extends React.Component<IFrameProps, IFrameState> {
  state = {
    offset: 0
  }

  get maxOffset() {
    return this.props.items.length
  }

  private onGoPrevious = () => {
    this.setState(({ offset }) => ({ offset: (offset + this.maxOffset - 1.0) % this.maxOffset }))
  }

  private onGoNext = () => {
    this.setState(({ offset }) => ({ offset: (offset + 1.0) % this.maxOffset }))
  }

  public render() {
    const { items, renderNav } = this.props
    const { offset } = this.state
    return <div>
      <div style={{ overflow: 'hidden' }}>
        <CarouselTrack items={items} offset={offset} />
      </div>
      { renderNav({ goPrevious: this.onGoPrevious, goNext: this.onGoNext }) }
    </div>
  }
}

export {
  CarouselTrack,
  CarouselFrame
}
