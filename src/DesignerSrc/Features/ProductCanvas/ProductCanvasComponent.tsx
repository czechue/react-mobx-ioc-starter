import { observer } from "mobx-react";
import { useEffect, useRef } from "react";

import { useInject } from "../../../Core/Providers/Injection";
import { InjectableProps } from "../../../libs/react-di";
import { ProductCanvasPresenter } from "./ProductCanvasPresenter";

const services: InjectableProps<{
  presenters: ProductCanvasPresenter;
}> = {
  presenters: ProductCanvasPresenter,
};

export const ProductCanvasComponent = observer(() => {
  const { presenters } = useInject(services);
  const htmlElementReference = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (htmlElementReference.current) {
      presenters.initCanvas(htmlElementReference.current);
    }
  }, [htmlElementReference.current]);

  return <div ref={htmlElementReference}></div>;
});
