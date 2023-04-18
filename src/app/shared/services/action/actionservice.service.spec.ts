import { TestBed } from '@angular/core/testing';

import { ActionserviceService } from './actionservice.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('ActionserviceService', () => {
  let service: ActionserviceService;
  let someService: ActionserviceService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        HttpClientTestingModule
      ],
      providers:[
          ActionserviceService
      ]
    });
    service = TestBed.inject(ActionserviceService);
    someService = TestBed.get( ActionserviceService );
    httpTestingController = TestBed.get( HttpTestingController );

  });


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  // it('can test HttpClient.get', () => {
  //   const  data = {
  //     id: 1,
  //     datdat: 'string',
  //     name: 'string',
  //     title: 'string',
  //     description: 'string',
  //     imagePath: 'string',
  //   }
  //   const id = 1
  //   someService.getOne(id).subscribe( (response:any) => expect(response).toBe(data) )
  //
  //   const req = httpTestingController.expectOne('http://localhost:3000/actions/1')
  //
  //   expect(req.request.method).toBe('GET')
  //
  //   req.flush(data)
  // });

  // it('can test HttpClient.getAll', () => {
  //   const  data = {
  //     id: 1,
  //     datdat: 'string',
  //     name: 'string',
  //     title: 'string',
  //     description: 'string',
  //     imagePath: 'string',
  //   }
  //   someService.getAll().subscribe( (response:any) => expect(response).toBe(data) )
  //
  //   const req = httpTestingController.expectOne('http://localhost:3000/actions')
  //
  //   expect(req.request.method).toBe('GET')
  //
  //   req.flush(data)
  // });

  afterEach(() => httpTestingController.verify())
});
