import * as React from 'react';
import './App.css';
import { CarouselFrame } from './carousel/Carousel'
import { ICarouselItem } from './carousel/types'

const items: ICarouselItem[] = [
  {
    description: '100x100',
    imageURL: 'https://placehold.it/100x100'
  },
  {
    description: '200x200',
    imageURL: 'https://placehold.it/200x200'
  },
  {
    description: '300x300',
    imageURL: 'https://placehold.it/300x300'
  }
]

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CarouselFrame
          items={ items }
          renderNav={this.renderNav}
        />
      </div>
    );
  }

  private renderNav({ goPrevious, goNext }: { goPrevious: () => {}, goNext: () => {} }) {
    return (<>
      <button onClick={goPrevious}>Previous</button>
      <button onClick={goNext}>Next</button>
    </>)
  }
}

export default App;
