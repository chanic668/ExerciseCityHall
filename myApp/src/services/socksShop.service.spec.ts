/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SocksShopService } from './socksShop.service';

describe('Service: SocksShop', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SocksShopService]
    });
  });

  it('should ...', inject([SocksShopService], (service: SocksShopService) => {
    expect(service).toBeTruthy();
  }));
});
