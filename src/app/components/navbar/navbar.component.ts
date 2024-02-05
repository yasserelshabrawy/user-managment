import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit{
  username:any[]=[]
  admin:string=''
  constructor(private authService:AuthService){}
ngOnInit(): void {
  this.authService.getAdmin().subscribe((res:any)=>{
    this.username = res
    this.username.map((res:any)=>{
      this.admin = res.username
    })
  })
}
}
