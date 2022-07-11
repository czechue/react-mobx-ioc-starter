export type CustimizationDefinition = {
  variant: {
    color: string;
  };
  region: {
    key: string;
    label: string;
    printArea: string;
    blueprint: string;
    dimensions: {
      width: number;
      height: number;
      widthInch: number;
      heightInch: number;
      dpi: number;
    };
  };
};
