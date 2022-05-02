import { createInjection } from "../../libs/react-di";

export { container } from "./ioc";

export const { InjectionProvider, useInject } = createInjection();
