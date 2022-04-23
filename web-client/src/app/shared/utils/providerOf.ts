import { Provider } from "@angular/core";
import { instance } from "ts-mockito";

export default function providerOf(serviceToken: unknown, mockedService: unknown): Provider {
  return {
    provide: serviceToken,
    useFactory: () => instance(mockedService),
  };
}