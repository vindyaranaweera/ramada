import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {FrontOfficeService} from "../../Services/front-office.service";
import {AddGuestComponent} from "../../models/add-guest/add-guest.component";

@Component({
  selector: 'app-rooms',
  templateUrl: './rooms.component.html',
  styleUrls: ['./rooms.component.css']
})
export class RoomsComponent implements OnInit {

  roomList: any = [
    {roomNo: "101", availability: 1},
    {roomNo: "102", availability: 1},
    {roomNo: "103", availability: 1},
    {roomNo: "104", availability: 0},
    {roomNo: "105", availability: 1},
    {roomNo: "106", availability: 0},
    {roomNo: "107", availability: 1},
    {roomNo: "108", availability: 1},
    {roomNo: "110", availability: 0},
    {roomNo: "111", availability: 1},
    {roomNo: "112", availability: 1},
    {roomNo: "114", availability: 1},
    {roomNo: "115", availability: 0},
    {roomNo: "116", availability: 1},
    {roomNo: "117", availability: 1},
    {roomNo: "118", availability: 0},
    {roomNo: "119", availability: 0},
    {roomNo: "120", availability: 1},
    {roomNo: "121", availability: 1},
    {roomNo: "122", availability: 0},
    {roomNo: "123", availability: 1},
    {roomNo: "124", availability: 1},
    {roomNo: "125", availability: 1},
    {roomNo: "126", availability: 0},
    {roomNo: "127", availability: 1},
    {roomNo: "128", availability: 0},
    {roomNo: "129", availability: 1},
    {roomNo: "130", availability: 1},
    {roomNo: "131", availability: 0},
    {roomNo: "132", availability: 1},
    {roomNo: "133", availability: 0},
    {roomNo: "134", availability: 1},
    {roomNo: "135", availability: 0},
    {roomNo: "136", availability: 1},
    {roomNo: "137", availability: 1},
    {roomNo: "138", availability: 0},
    {roomNo: "139", availability: 0},
    {roomNo: "140", availability: 1},
    {roomNo: "141", availability: 1},
    {roomNo: "142", availability: 0},
    {roomNo: "143", availability: 1},
    {roomNo: "144", availability: 1},
    {roomNo: "145", availability: 1},
    {roomNo: "146", availability: 0},
    {roomNo: "147", availability: 1},
    {roomNo: "148", availability: 0},
    {roomNo: "149", availability: 1},
    {roomNo: "150", availability: 1},
    {roomNo: "150", availability: 1},
    {roomNo: "151", availability: 1},
    {roomNo: "152", availability: 0},
    {roomNo: "153", availability: 1},
    {roomNo: "154", availability: 1},
    {roomNo: "155", availability: 1},
    {roomNo: "156", availability: 0},
    {roomNo: "157", availability: 1},
    {roomNo: "158", availability: 0},
    {roomNo: "159", availability: 1},
    {roomNo: "160", availability: 1},
    {roomNo: "161", availability: 1},
    {roomNo: "162", availability: 0},
    {roomNo: "163", availability: 1},
    {roomNo: "164", availability: 1},
    {roomNo: "165", availability: 1},
    {roomNo: "166", availability: 0},
    {roomNo: "167", availability: 1},
    {roomNo: "168", availability: 0},
    {roomNo: "169", availability: 1},
    {roomNo: "170", availability: 1},
    {roomNo: "171", availability: 0},
    {roomNo: "172", availability: 1},
    {roomNo: "173", availability: 0},
    {roomNo: "174", availability: 1},
    {roomNo: "175", availability: 0},
    {roomNo: "176", availability: 1},
    {roomNo: "177", availability: 1},
    {roomNo: "178", availability: 0},
    {roomNo: "179", availability: 0},
    {roomNo: "180", availability: 1},
    {roomNo: "181", availability: 1},
    {roomNo: "182", availability: 0},
    {roomNo: "183", availability: 1},
    {roomNo: "184", availability: 1},
    {roomNo: "185", availability: 1},
    {roomNo: "186", availability: 0},
    {roomNo: "187", availability: 1},
    {roomNo: "188", availability: 0},
    {roomNo: "189", availability: 1},
    {roomNo: "190", availability: 1},
    {roomNo: "190", availability: 1},
    {roomNo: "191", availability: 1},
    {roomNo: "192", availability: 0},
    {roomNo: "193", availability: 1},
    {roomNo: "194", availability: 1},
    {roomNo: "195", availability: 1},
    {roomNo: "196", availability: 0},
    {roomNo: "197", availability: 1},
    {roomNo: "198", availability: 0},
    {roomNo: "199", availability: 1},
    {roomNo: "200", availability: 1},
    {roomNo: "201", availability: 1},
    {roomNo: "202", availability: 1},
    {roomNo: "203", availability: 1},
    {roomNo: "204", availability: 0},
    {roomNo: "205", availability: 1},
    {roomNo: "206", availability: 0},
    {roomNo: "207", availability: 1},
    {roomNo: "208", availability: 1},
    {roomNo: "210", availability: 0},
    {roomNo: "211", availability: 1},
    {roomNo: "212", availability: 1},
    {roomNo: "213", availability: 0},
    {roomNo: "214", availability: 1},
    {roomNo: "215", availability: 0},
    {roomNo: "216", availability: 1},
    {roomNo: "217", availability: 1},
    {roomNo: "218", availability: 0},
    {roomNo: "219", availability: 0},
    {roomNo: "220", availability: 1},
    {roomNo: "221", availability: 1},
    {roomNo: "222", availability: 0},
    {roomNo: "223", availability: 1},
    {roomNo: "224", availability: 1},
    {roomNo: "225", availability: 1},
    {roomNo: "226", availability: 0},
    {roomNo: "227", availability: 1},
    {roomNo: "228", availability: 0},
    {roomNo: "229", availability: 1},
    {roomNo: "230", availability: 1},
    {roomNo: "231", availability: 0},
    {roomNo: "232", availability: 1},
    {roomNo: "233", availability: 0},
    {roomNo: "234", availability: 1},
    {roomNo: "235", availability: 0},
    {roomNo: "236", availability: 1},
    {roomNo: "237", availability: 1},


  ]
  showRoomslist:any=[]
  guestVisibility:any
  visibleType:any;

  dateFormat: any;
  isVisible: boolean = false;

  currentRoom:any

  constructor(private frontOfficeService:FrontOfficeService) {
  }

  ngOnInit(): void {
    this.reFreshPage(true);
  }

  reFreshPage(value:boolean){
    if(value===true){
      this.frontOfficeService.getAllRooms().subscribe(response=>{
        this.showRoomslist=response;
      })
    }
  }

  showRoom(visibility:number) {
    if(visibility===1){
      this.visibleType=1
    }else {
      this.visibleType=0;

    }
    this.guestVisibility=true;
  }

  add() {
    this.isVisible = false;
  }

  handleOk() {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  showModal() {
    this.isVisible = true;
  }

  handleCancel() {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }
}
