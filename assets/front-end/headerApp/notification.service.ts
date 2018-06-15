import { Subject } from "rxjs/Subject"

import {NotifyModel } from "./notification.model";

export class NotifyService {
    newContent;
    contentId = new Subject<number>();
    
    private notify: NotifyModel[] = [
        new NotifyModel("what is your view about all this stuffs",
    "f", "345k", "345k", "345k", "Question", "User User User User",2222222223, "22"),
    new NotifyModel("what is your view about all this stuffs",
    "f", "345k", "345k", "345k", "Post", "User User User User",2222222223, "23"),
    new NotifyModel("what is your view about all this stuffs",
    "f", "345k", "345k", "345k", "Group", "User User User User",2222222223, "23"),
    new NotifyModel("what is your view about all this stuffs",
    "f", "345k", "345k", "345k", "Post", "User User User User",2222222223, "23"),
    new NotifyModel("what is your view about all this stuffs",
    "f", "345k", "345k", "345k", "Post", "User User User User",2222222223, "23"),
    new NotifyModel("what is your view about all this stuffs",
    "f", "345k", "345k", "345k", "Post", "User User User User",2222222223, "23"),
    new NotifyModel("what is your view about all this stuffs",
    "f", "345k", "345k", "345k", "Post", "User User User User",2222222223, "23")
    ]; 

    getContent() {
        return this.notify;
    }

    getContentId(contentId: number) {
        return this.newContent = contentId;
    }

    getNewContentId() {
        return this.newContent;
    }

}