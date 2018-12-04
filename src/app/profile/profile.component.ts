import { AuthorizationService } from './../shared/authorization.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../shared/models/Models';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from '../shared/http.service';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  public user: User;
  public id: string;
  selectedFile: File = null;
  ImageLoaded = false;


  constructor(
    private router: Router,
    private http: HttpService,
    private route: ActivatedRoute,
    private auth: AuthorizationService
    ) { }
@ViewChild('Image') Image;

  ngOnInit() {
    this.user = this.auth.currentUser();
  }

  onFileSelected(event) {
    this.selectedFile = <File>event.target.files[0];
    this.ImageLoaded = false;
  }

onUpload() {
      const fd = new FormData();
      fd.append('image', this.selectedFile);
      this.http.addProfilePicture(fd).subscribe(
            (succes) => this.router.navigate(['home'])
          );
    }
}
