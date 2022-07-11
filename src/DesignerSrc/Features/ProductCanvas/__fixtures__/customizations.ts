import { CustimizationDefinition } from "./CustomizationDefinitionType";
import response from "./response";

const customizations: Array<CustimizationDefinition> = [
  {
    variant: response.generator.colors.color2,
    region: {
      key: "front",
      label: "Front",
      printArea: response.generator.regions.front.printArea.path,
      blueprint: response.generator.regions.front.blueprint.path,
      dimensions: response.generator.printfile.front.all,
    },
  },
  {
    variant: response.generator.colors.color1,
    region: {
      key: "back",
      label: "Back",
      printArea: response.generator.regions.back.printArea.path,
      blueprint: response.generator.regions.back.blueprint.path,
      dimensions: response.generator.printfile.back.all,
    },
  },
];

export default customizations;
