import { Pipe, PipeTransform } from '@angular/core';
import { TransportType } from 'src/app/shared/models/track';

@Pipe({
  name: 'transportType'
})
export class TransportTypePipe implements PipeTransform {

  transform(type: TransportType): string {
    let transformTransportType = '';
    
    switch(type) {
      case TransportType.Hiking: 
        transformTransportType = 'Пешком';
        break;
      case TransportType.Scooter: 
        transformTransportType = 'Самокат';
        break;
      case TransportType.Bicycle: 
        transformTransportType = 'Велосипед';
        break;
      case TransportType.Roller: 
        transformTransportType = 'Ролики';
        break;
      case TransportType.Skateboard: 
        transformTransportType = 'Скейтборд';
        break;
      case TransportType.Skiing: 
        transformTransportType = 'Лыжи';
        break;
    }

    return transformTransportType;
  }

}
