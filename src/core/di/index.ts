import { createInjection } from "../../libs/reactDI";

export { container } from "./ioc";

export const { InjectionProvider, useInject } = createInjection();
