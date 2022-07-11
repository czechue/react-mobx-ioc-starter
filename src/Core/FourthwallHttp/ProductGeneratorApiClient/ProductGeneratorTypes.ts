export namespace ProductGenerator {
  export type Color = {
    bv: number;
    color: string;
    cv: number;
    gv: number;
    hl: number;
    hr: number;
    name: string;
    sa: number;
    sh: number;
  };

  export type Colors = {
    [key: string]: Color;
  };

  export type FallbackProduct = {
    name: string;
    thumbnail: string;
  };

  export type FallbackProducts = {
    [key: string]: FallbackProduct;
  };

  export type PrintifleItem = {
    dpi: number;
    height: number;
    heightInch: number;
    width: number;
    widthInch: number;
  };

  export type Printfile = {
    [key: string]: PrintifleItem;
  };

  export type Printfiles = {
    [key: string]: Printfile;
  };

  export interface Blueprint {
    path?: string;
    height?: number;
    left?: number;
    scale?: number;
    top?: number;
    width?: number;
  }

  export type PrintArea = {
    path?: string;
    height?: number;
    left?: number;
    top?: number;
    width?: number;
  };

  export type Region = {
    regions?: any;
    originKey?: string;
    blueprint: Blueprint;
    label: string;
    orderId: number;
    printArea: PrintArea;
    collideWith?: string[];
    vectorBlueprint?: string;
  };

  export type Regions = {
    [key: string]: Region;
  };

  export type ViewImages = {
    main: string;
    mask: string;
  };

  export type View = {
    cameraZ: number;
    cameraFocal?: number;
    images: ViewImages;
    // todo: why isOrtho and isPreview are numbers?
    isBlueprint: boolean | number;
    isOrtho: boolean | number;
    isPreview: boolean | number;
    label: string;
    mesh: string;
    meshPos: {
      x: number;
      y: number;
    };
    renderingSettings?: {
      threadDensity?: number;
      threadThickness?: number;
      threadLength?: number;
      threadOffset?: number;
      threadScale?: number;
    };
    meshScale: number;
    orderId: number;
    region: string;
    regions?: {
      [key: string]: string;
    };
  };

  export type Views = {
    [key: string]: View;
  };

  export type MockupRegion = {
    name: string;
    src: string;
    width: number;
    height: number;
    top: number;
    left: number;
  };

  export type Mockup = {
    id?: string;
    regions: {
      [key: string]: MockupRegion;
    };
  };

  export type ProductSettings = {
    availableStitchesColors?: { label: string; value: string }[];
  };

  export interface RootObject {
    version?: 1 | 2;
    mockup?: Mockup;
    documentId?: string;
    brand: string;
    colors: Colors;
    fallbackProducts: FallbackProducts;
    label: string;
    model: string;
    printMethod: string;
    printfile: Printfiles;
    defaultRegion?: string;
    regions: Regions;
    views: {
      [key: string]: View;
    };
    settings?: ProductSettings;
  }
}
