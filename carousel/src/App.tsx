import * as React from "react";
import "./App.css";
import { CarouselFrame } from "./carousel/Carousel";
import { ICarouselItem } from "./carousel/types";

function YouTubeVideo({ videoID }: { videoID: string }) {
  return (
    <div
      style={{
        maxWidth: "100vw", height: '56.25vw'
      }}
    >
      <iframe
        width="1120"
        height="630"
        src={`https://www.youtube-nocookie.com/embed/${videoID}?rel=0&amp;showinfo=0`}
        frameBorder="0"
        allowFullScreen
        style={{ display: 'block', margin: 'auto', maxWidth: "100%", maxHeight: "100%" }}
      />
    </div>
  );
}

const items: ICarouselItem[] = [
  {
    description: "100x100",
    imageURL: "https://placehold.it/100x100"
  },
  {
    description: "200x200",
    imageURL: "https://placehold.it/200x200"
  },
  {
    description: "300x300",
    imageURL: "https://placehold.it/300x300"
  },
  {
    description: "",
    render() {
      return (
        <YouTubeVideo videoID='ZJj7uNdzPpM' />
      );
    }
  }
];

class App extends React.Component {
  public render() {
    return (
      <div className="App">
        <CarouselFrame items={items} renderNav={this.renderNav} />
      </div>
    );
  }

  private renderNav({
    goPrevious,
    goNext
  }: {
    goPrevious: () => {};
    goNext: () => {};
  }) {
    return (
      <>
        <button onClick={goPrevious}>Previous</button>
        <button onClick={goNext}>Next</button>
      </>
    );
  }
}

export default App;
