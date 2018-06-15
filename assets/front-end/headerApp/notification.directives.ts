import { Directive, HostBinding, HostListener, OnInit} from '@angular/core';

import { NotifyService } from './notification.service'
@Directive({
    selector: '[toggleNotify]'
})
export class ToggleNotify  {
    @HostBinding('class.site-header__menu--notification--ct__open') opened = false;
    // @HostListener('mouseover')
    contentId:number;
    constructor(private notifyService: NotifyService) {
        this.notifyService.contentId.subscribe(
            (contentId: number) => {
                this.contentId = contentId;
                console.log(this.contentId);
            }
        );
        console.log(this.notifyService.getNewContentId())
    }
    
}