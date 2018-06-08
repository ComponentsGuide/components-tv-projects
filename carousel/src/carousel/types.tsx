import * as React from "react";

export interface ICarouselItem {
  description: string;
  imageURL?: string;
  render?: (item: ICarouselItem) => React.ReactElement<any>;
}
