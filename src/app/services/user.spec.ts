import { TestBed } from '@angular/core/testing';
import { Album } from './user';

describe('Album', () => {
  let service: Album;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(Album);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
