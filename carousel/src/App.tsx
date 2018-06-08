import * as React from 'react';
import './App.css';
import { CarouselInner } from './carousel/Carousel'
import { ICarouselItem } from './carousel/types'

const items: ICarouselItem[] = [
  {
    description: '100x100',
    imageURL: 'https://placehold.it/100x100'
  },
  {
    description: '200x200',
    imageURL: 'https://placehold.it/200x200'
  }
]

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CarouselInner items={ items } />
      </div>
    );
  }
}

export default App;
