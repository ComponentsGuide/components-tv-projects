import * as React from 'react'
import * as types from './types'

interface ISlideProps {
  item: types.ICarouselItem
}

function CarouselSlide({ item }: ISlideProps): React.ReactElement<any> {
  return (
    <figure style={{ margin: 0, minWidth: '100vw', height: '100%' }}>
      <img src={ item.imageURL } alt={ item.description } />
    </figure>
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
      <>
        {
          items.map((item, index) => (
            <CarouselSlide key={index} item={ item } />
          ))
        }
        {!!items[0] && <CarouselSlide key='extra' item={ items[0] } /> }
      </>
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
  offsetChangeRemaining: number
}

// async function nextFrame(): Promise<number> {
//   return new Promise((resolve) => {
//     requestAnimationFrame(resolve)
//   })
// }

class CarouselFrame extends React.Component<IFrameProps, IFrameState> {
  state = {
    offset: 0,
    offsetChangeRemaining: 0
  }

  get maxOffset() {
    return this.props.items.length
  }

  private changeOffsetBy(change: number) {
    let frameChange = change / 20.0
    let currentChange = 0.0
    let startOffset = this.state.offset

    this.setState(({ offset, offsetChangeRemaining }) => {
      change = change + offsetChangeRemaining
      frameChange = change / 20.0
      startOffset = offset
      return {
        offsetChangeRemaining: change
      }
    })
    
    const updateState = () => {
      currentChange = currentChange + frameChange
      let currentOffset = startOffset + currentChange
      
      if (Math.abs(currentChange) < Math.abs(change)) {
        requestAnimationFrame(updateState)
      }
      else {
        currentOffset = Math.round(currentOffset)
        currentChange = change
      }

      this.setState({
        offset: currentOffset,
        offsetChangeRemaining: change - currentChange
      })
    }

    requestAnimationFrame(updateState)
  }

  private onGoPrevious = () => {
    this.changeOffsetBy(-1.0)
  }

  private onGoNext = () => {
    this.changeOffsetBy(1.0)
  }

  public render() {
    const { items, renderNav } = this.props
    const { offset } = this.state
    const clampedOffset = ((offset + this.maxOffset) % this.maxOffset + this.maxOffset) % this.maxOffset
    return <div>
      <div style={{ overflow: 'hidden' }}>
        <CarouselTrack items={items} offset={clampedOffset} />
      </div>
      { renderNav({ goPrevious: this.onGoPrevious, goNext: this.onGoNext }) }
    </div>
  }
}

export {
  CarouselTrack,
  CarouselFrame
}
