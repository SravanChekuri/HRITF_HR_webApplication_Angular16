import { Component, OnInit } from '@angular/core';
import { LoginService } from '../services/login.service';
import { Router, NavigationEnd,Event } from '@angular/router';
import { filter } from 'rxjs/operators';
 
 
 
@Component({
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css']
})
 
  export class NotificationsComponent implements OnInit{
 
    notificationsData: any={};
    oneYear:any[]=[];
    oneyearcompletionarr:any[]=[]
    probationCompletionArr:any[]=[]
    newEmpData: any[] = [];
    confrimEmp:any[]=[];
    notificationCount: number = 0; 
    probationData:any;
    combineProbationData:any;
   
    constructor(
                private service:LoginService,
                private router: Router
              ) {}
   
    ngOnInit():void{
      this.getNotifications();
      this.router.events.pipe(
        filter((event: Event): event is NavigationEnd => event instanceof NavigationEnd)
      ).subscribe((event: NavigationEnd) => {
        if (event.url === "/notifications" && !this.service.haveNotificationsBeenViewed()) {
          this.service.clearNotificationCount();
          this.service.markNotificationsAsViewed();
        }
      });
    }
 
    getNotifications(){
      this.service.notifications().subscribe((res)=>{
        this.notificationsData = res;  
        // console.log(res);
        this.newEmpData = res.newEmployees || [];
        this.confrimEmp = res.one_year_confirmation_employees || [];
        this.probationData=res.probation_complete_employees
        this.notificationCount = res.count || 0;
        // console.log("newemp",this.newEmpData);
        // console.log("one_year_confirmation_employees",this.confrimEmp);
        // console.log("probationData",this.probationData);
        for (let item of this.confrimEmp){
          let res={...item.data,msg:item.message}
          // console.log("res",res);
          this.oneyearcompletionarr.push(res);
        }
        // console.log("oneyearcompletiondata", this.oneyearcompletionarr);
        
     for (let item of this.probationData){
      let probRes={...item.data,msg:item.message}
      // console.log("probRes",probRes);
      this.probationCompletionArr.push(probRes)     
     }
    //  console.log("this.probationCompletionArr",this.probationCompletionArr);
      if (!this.service.haveNotificationsBeenViewed()) {
          this.service.updateNotificationCount(this.notificationCount);
        }
      },error =>{
        // console.log(error);
      });
    }
   
 
 
}
 