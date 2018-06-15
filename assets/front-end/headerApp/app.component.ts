import { Component, OnInit} from '@angular/core';

import { NotifyService } from './notification.service';
import { NotifyModel } from './notification.model';
@Component({
    selector: 'my-app2',
    templateUrl: './app.component.html',
    providers: [NotifyService]
})
export class AppComponent implements OnInit {
    notifies: NotifyModel[];
    index = false;
    indexId;
    contentId;
    showOverflow = null;
    constructor(private notifyService: NotifyService) {}

    ngOnInit() {
        this.notifies = this.notifyService.getContent();
    }

    getId(contentId: number) {
        this.index = !this.index;
        this.indexId = contentId;
    }

    removeId(contentId: number) {
        this.indexId = -1;
    } 

    getClass() {
        if (this.index) {
            return {
                'site-header__menu--notification--ct__close': this.indexId >=0 ,
            };
        } else if (this.index === false) {
            return {
                'site-header__menu--notification--ct__open': this.indexId >=0 ,
            };
        }    
    }

    getOverflow() {
        if (this.index === false){
                return {
                    'site-header__menu--notification__wrapper--hideOverflow': this.indexId >= 0,
                }; 
        }
    }

}